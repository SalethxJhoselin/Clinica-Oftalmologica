import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ManageDepartments = () => {
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [departments, setDepartments] = useState([]);

  // Simulated data
  const fetchDepartments = async () => {
    const simulatedDepartments = [
      { id: 1, nombre: 'Recursos Humanos' },
      { id: 2, nombre: 'Desarrollo' },
      { id: 3, nombre: 'Marketing' },
    ];
    setDepartments(simulatedDepartments);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleEditDepartment = useCallback((departmentId) => {
    setEditingDepartmentId(departmentId);
    const department = departments.find(department => department.id === departmentId);
    setEditedData({ [departmentId]: { nombre: department.nombre } });
  }, [departments]);

  const handleSaveDepartment = useCallback((departmentId) => {
    setDepartments(prevDepartments => prevDepartments.map(department => 
      department.id === departmentId ? { ...department, ...editedData[departmentId] } : department
    ));
    setEditingDepartmentId(null);
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingDepartmentId(null);
    setEditedData({});
  }, []);

  const handleDeleteDepartment = useCallback((departmentId) => {
    setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== departmentId));
  }, []);

  const handleInputChange = useCallback((value, departmentId) => {
    setEditedData(prevState => ({
      ...prevState,
      [departmentId]: { nombre: value }
    }));
  }, []);

  const renderEditableInput = (text, record) => {
    if (record.id === editingDepartmentId) {
      return (
        <Input
          value={editedData[record.id]?.nombre || text}
          onChange={(e) => handleInputChange(e.target.value, record.id)}
          onPressEnter={() => handleSaveDepartment(record.id)}
        />
      );
    }
    return text;
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text, record) => renderEditableInput(text, record),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingDepartmentId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveDepartment(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditDepartment(record.id)}><EditOutlined /></Button>
              <Button
                style={{ backgroundColor: '#F44336', color: '#fff' }}
                onClick={() => handleDeleteDepartment(record.id)}
              ><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Departamentos</Title>
      <Table
        columns={columns}
        dataSource={departments}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageDepartments;
