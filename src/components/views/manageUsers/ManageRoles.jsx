import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography } from 'antd';
import RoleModal from './RoleModal';

// Datos simulados
const simulatedRoles = [ //aqui
  { id: 1, name: 'Administrador', permissions: [{ id: 1, name: 'Crear usuario' }, { id: 2, name: 'Eliminar usuario' }] },
  { id: 2, name: 'Usuario', permissions: [{ id: 3, name: 'Ver contenido' }] }
];

const { Title } = Typography;
const ManageRoles = () => {
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [roles, setRoles] = useState([]);

  // Obtener datos
  useEffect(() => {
    setRoles(simulatedRoles);
  }, []);

  const handleEditRole = useCallback((roleId) => {
    setEditingRoleId(roleId);
    const role = roles.find(role => role.id === roleId);
    setEditedData({ [roleId]: { name: role.name } });
  }, [roles]);

  const handleSaveRole = useCallback((roleId) => {
    console.log("Datos modificados:", editedData[roleId]);
    setEditingRoleId(null);
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingRoleId(null);
    setEditedData({});
  }, []);

  const handleDeleteRole = useCallback((roleId) => {
    console.log(`Simulación de eliminación del rol con ID ${roleId}`);
    setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
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
    if (record.id === editingRoleId && dataIndex === 'name') {
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
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => renderEditableInput(text, record, 'name'),
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => renderEditableInput(text, record, 'name'),
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
              <Button type="text" onClick={() => handleEditRole(record.id)}>Editar</Button>
              <Button onClick={() => handleDeleteRole(record.id)}>Eliminar</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Roles</Title>
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
      <div className="add-role-button">
        <RoleModal getDatos={() => setRoles(simulatedRoles)} />
      </div>
    </div>
  );
};

export default ManageRoles;