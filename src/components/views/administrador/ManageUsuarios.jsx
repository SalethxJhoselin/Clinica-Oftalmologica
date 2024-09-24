import React, { useEffect, useState } from 'react';
import { Table, Typography, Input } from 'antd';
import { getAllUsers } from '../../../api/apiService';

const { Title } = Typography;

const ManageUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
      setFilteredUsers(response.data || []); // Inicialmente, todos los usuarios están filtrados
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Manejar cambios en el input de búsqueda
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrar usuarios basados en el término de búsqueda
    const filtered = users.filter(user =>
      user.nombre.toLowerCase().includes(value) ||
      user.ci.toLowerCase().includes(value) ||
      user.apellido_paterno.toLowerCase().includes(value) ||
      user.apellido_materno.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'CI',
      dataIndex: 'ci',
      key: 'ci',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Apellido Paterno',
      dataIndex: 'apellido_paterno',
      key: 'apellido_paterno',
    },
    {
      title: 'Apellido Materno',
      dataIndex: 'apellido_materno',
      key: 'apellido_materno',
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'fecha_nacimiento',
      key: 'fecha_nacimiento',
      render: (text) => new Date(text).toLocaleDateString(), // Formatear fecha
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
      render: (text) => text || 'No disponible', // Manejo de valores nulos
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      key: 'genero',
      render: (text) => text || 'No especificado', // Manejo de valores nulos
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (text) => (text ? 'Activo' : 'Inactivo'), // Mostrar estado como texto
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Administrar Usuarios</Title>
      <Input
        placeholder="Buscar por nombre, CI, apellido..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageUsuarios;
