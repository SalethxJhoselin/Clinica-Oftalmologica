import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllServicios, deleteServicio, editServicio } from '../../../api/apiService';
import RegisterServicio from './RegisterServicio';

const { Title } = Typography;

const ManageServicios = () => {
  const [editingServicioId, setEditingServicioId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [servicios, setServicios] = useState([]);

  // Obtener servicios de la API
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getAllServicios();
        setServicios(data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };
    fetchServicios();
  }, []);

  // Función para iniciar la edición de un servicio
  const handleEditServicio = useCallback((servicioId) => {
    setEditingServicioId(servicioId);
    const servicio = servicios.find((s) => s.id === servicioId);
    setEditedData({
      [servicioId]: {
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
      },
    });
  }, [servicios]);

  // Función para guardar los cambios realizados en un servicio
  const handleSaveServicio = useCallback(async (servicioId) => {
    try {
      const { nombre, descripcion } = editedData[servicioId];
      await editServicio(servicioId, nombre, descripcion);
      message.success('Servicio actualizado exitosamente');
  
      // Actualizar el estado
      setServicios((prevServicios) =>
        prevServicios.map((servicio) =>
          servicio.id === servicioId ? { ...servicio, nombre, descripcion } : servicio
        )
      );
      setEditingServicioId(null);
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      message.error('Error al actualizar el servicio');
    }
  }, [editedData]);

  // Función para cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingServicioId(null);
    setEditedData({});
  }, []);

  // Función para eliminar un servicio
  const handleDeleteServicio = useCallback(async (servicioId) => {
    try {
      await deleteServicio(servicioId);
      message.success(`Servicio con ID ${servicioId} eliminado exitosamente`);
      setServicios((prevServicios) => prevServicios.filter((servicio) => servicio.id !== servicioId));
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      message.error('Error al eliminar el servicio');
    }
  }, []);

  // Función para manejar los cambios de entrada
  const handleInputChange = useCallback((value, servicioId, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [servicioId]: {
        ...prevState[servicioId],
        [field]: value,
      },
    }));
  }, []);

  // Render input editable
  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingServicioId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveServicio(record.id)}
        />
      );
    }
    return text;
  }, [editingServicioId, editedData, handleInputChange, handleSaveServicio]);

  // Columnas de la tabla
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', render: (text, record) => renderEditableInput(text, record, 'nombre') },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion', render: (text, record) => renderEditableInput(text, record, 'descripcion') },
    {
      title: 'Imagen',
      dataIndex: 'imagen_url', // Asegúrate de que este campo coincida con el nombre en tus datos
      key: 'imagen_url',
      render: (text) => (
        text ? <img src={text} alt="Imagen del servicio" style={{ maxWidth: '100px', borderRadius: '5px' }} /> : 'Sin imagen'
      ),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingServicioId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveServicio(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditServicio(record.id)}><EditOutlined /></Button>
              <Button danger onClick={() => handleDeleteServicio(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Servicios</Title>
      <div className="flex justify-end mb-6">
        <RegisterServicio onSuccess={() => setServicios([...servicios])} />
      </div>
      <Table
        columns={columns}
        dataSource={servicios}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageServicios;