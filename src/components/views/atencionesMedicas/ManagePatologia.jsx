import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllPatologias, deletePatologia, editPatologia } from '../../../api/apiService'; // Importa tus APIs
import RegisterPatologia from './RegisterPatologia';

const { Title } = Typography;

const ManagePatologia = () => {
  const [editingPatologiaId, setEditingPatologiaId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [patologias, setPatologias] = useState([]);

  // Obtener patologías de la API
  useEffect(() => {
    const fetchPatologias = async () => {
      try {
        const data = await getAllPatologias();
        setPatologias(data);
      } catch (error) {
        console.error('Error al obtener las patologías:', error);
      }
    };
    fetchPatologias();
  }, []);

  // Función para iniciar la edición de una patología
  const handleEditPatologia = useCallback((patologiaId) => {
    setEditingPatologiaId(patologiaId);
    const patologia = patologias.find((p) => p.id === patologiaId);
    setEditedData({
      [patologiaId]: {
        nombre: patologia.nombre,
        descripcion: patologia.descripcion,
        imagen: patologia.imagen,
      },
    });
  }, [patologias]);

  // Función para guardar los cambios realizados en una patología
  const handleSavePatologia = useCallback(async (patologiaId) => {
    try {
      const updatedData = editedData[patologiaId];
      await editPatologia(patologiaId, updatedData.nombre, updatedData.descripcion, null); // Si no se cambia la imagen, envía `null`
      message.success(`Patología actualizada exitosamente`);
      setEditingPatologiaId(null);
      setPatologias((prev) =>
        prev.map((p) =>
          p.id === patologiaId ? { ...p, ...updatedData } : p
        )
      );
    } catch (error) {
      console.error('Error al actualizar la patología:', error);
      message.error('Error al actualizar la patología');
    }
  }, [editedData]);

  // Función para cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingPatologiaId(null);
    setEditedData({});
  }, []);

  // Función para eliminar una patología
  const handleDeletePatologia = useCallback(async (patologiaId) => {
    try {
      await deletePatologia(patologiaId);
      message.success(`Patología con ID ${patologiaId} eliminada exitosamente`);
      setPatologias((prev) => prev.filter((p) => p.id !== patologiaId));
    } catch (error) {
      console.error('Error al eliminar la patología:', error);
      message.error('Error al eliminar la patología');
    }
  }, []);

  // Función para manejar los cambios de entrada
  const handleInputChange = useCallback((value, patologiaId, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [patologiaId]: {
        ...prevState[patologiaId],
        [field]: value,
      },
    }));
  }, []);

  // Función para renderizar el input editable
  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingPatologiaId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSavePatologia(record.id)}
        />
      );
    }
    return text;
  }, [editingPatologiaId, editedData, handleInputChange, handleSavePatologia]);

  // Definir las columnas para la tabla
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
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => renderEditableInput(text, record, 'descripcion'),
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      render: (text) => <img src={text} alt="Imagen" style={{ maxWidth: '100px' }} />,
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingPatologiaId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSavePatologia(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditPatologia(record.id)}><EditOutlined /></Button>
              <Button
                style={{
                  backgroundColor: '#F44336',
                  color: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => handleDeletePatologia(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Patologías</Title>
      <div className="flex justify-end mb-6">
        <RegisterPatologia onSuccess={() => setPatologias([...patologias])} />
      </div>
      <Table
        columns={columns}
        dataSource={patologias}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManagePatologia;
