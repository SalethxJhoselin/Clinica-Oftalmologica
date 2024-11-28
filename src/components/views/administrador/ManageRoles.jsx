import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, notification } from 'antd';
import RoleModal from './RoleModal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchRoles, updateRole, deleteRole } from '../../../api/apiService';
import { useUser } from '../../../context/UserContext'; // Importa el hook de contexto

const { Title } = Typography;

const ManageRoles = () => {
  const { userSubId } = useUser(); // Obtén el id_sub desde el contexto
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [roles, setRoles] = useState([]);

  // Obtener datos y filtrar por id_sub
  const fetchData = async () => {
    try {
      const rolesData = await fetchRoles();

      // Filtrar roles según el id_sub en el contexto
      const filteredRoles = rolesData.filter(role => role.id_sub === userSubId);

      setRoles(filteredRoles);
    } catch (error) {
      notification.error({ message: 'Error al obtener roles', description: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [userSubId]); // Vuelve a obtener los roles si el id_sub cambia

  const handleEditRole = useCallback((roleId) => {
    setEditingRoleId(roleId);
    const role = roles.find(role => role.id === roleId);
    setEditedData({ [roleId]: { nombre: role.nombre } });
  }, [roles]);

  const handleSaveRole = useCallback(async (roleId) => {
    try {
      await updateRole(roleId, editedData[roleId]);
      setRoles(prevRoles => prevRoles.map(role => role.id === roleId ? { ...role, ...editedData[roleId] } : role));
      setEditingRoleId(null);
    } catch (error) {
      notification.error({ message: 'Error al guardar el rol', description: error.message });
    }
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingRoleId(null);
    setEditedData({});
  }, []);

  const handleDeleteRole = useCallback(async (roleName) => {
    try {
      await deleteRole(roleName);
      setRoles(prevRoles => prevRoles.filter(role => role.nombre !== roleName));
    } catch (error) {
      notification.error({ message: 'Error al eliminar el rol', description: error.message });
    }
  }, []);

  const handleInputChange = useCallback((value, roleId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [roleId]: {
        ...prevState[roleId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingRoleId && dataIndex === 'nombre') {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveRole(record.id)}
        />
      );
    }
    return text;
  }, [editingRoleId, editedData, handleInputChange, handleSaveRole]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text, record) => renderEditableInput(text, record, 'nombre'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingRoleId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveRole(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditRole(record.id)}><EditOutlined /></Button>
              <Button style={{
                backgroundColor: '#F44336',
                color: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
                onClick={() => handleDeleteRole(record.nombre)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Roles</Title>
      <div className="flex justify-end mb-6">
        <RoleModal getDatos={fetchData} />
      </div>
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageRoles;
