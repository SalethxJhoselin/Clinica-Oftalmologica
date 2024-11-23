import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllTriajes, deleteTriaje } from '../../../api/apiService'; // Importa deleteTriaje
import RegisterTriaje from './RegisterTriaje';

const { Title } = Typography;

const ManageTriaje = () => {
  const [editingTriajeId, setEditingTriajeId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [triajes, setTriajes] = useState([]);

  // Obtener triajes de la API
  useEffect(() => {
    const fetchTriajes = async () => {
      try {
        const data = await getAllTriajes();
        setTriajes(data);
      } catch (error) {
        console.error('Error al obtener los triajes:', error);
      }
    };
    fetchTriajes();
  }, []);

  // Función para iniciar la edición de un triaje
  const handleEditTriaje = useCallback((triajeId) => {
    setEditingTriajeId(triajeId);
    const triaje = triajes.find((t) => t.id === triajeId);
    setEditedData({
      [triajeId]: {
        fecha: triaje.fecha,
        hora: triaje.hora,
        nivel_prioridad: triaje.nivel_prioridad,
        frecuencia_cardiaca: triaje.frecuencia_cardiaca,
        frecuencia_respiratoria: triaje.frecuencia_respiratoria,
        temperatura: triaje.temperatura,
        saturacion_oxigeno: triaje.saturacion_oxigeno,
        presion_arterial: triaje.presion_arterial,
        descripcion: triaje.descripcion,
        vision_inicial_od: triaje.vision_inicial_od,
        vision_inicial_oi: triaje.vision_inicial_oi,
      },
    });
  }, [triajes]);

  // Función para guardar los cambios realizados en un triaje
  const handleSaveTriaje = useCallback((triajeId) => {
    console.log('Datos modificados:', editedData[triajeId]);
    setEditingTriajeId(null);
  }, [editedData]);

  // Función para cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingTriajeId(null);
    setEditedData({});
  }, []);

  // Función para eliminar un triaje
  const handleDeleteTriaje = useCallback(async (triajeId) => {
    try {
      await deleteTriaje(triajeId); // Llama a la API para eliminar el triaje en el backend
      message.success(`Triaje con ID ${triajeId} eliminado exitosamente`);
      // Actualiza la lista de triajes en el estado
      setTriajes((prevTriajes) => prevTriajes.filter((triaje) => triaje.id !== triajeId));
    } catch (error) {
      console.error('Error al eliminar el triaje:', error);
      message.error('Error al eliminar el triaje');
    }
  }, []);

  // Función para manejar los cambios de entrada
  const handleInputChange = useCallback((value, triajeId, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [triajeId]: {
        ...prevState[triajeId],
        [field]: value,
      },
    }));
  }, []);

  // Función para renderizar el input editable
  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingTriajeId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveTriaje(record.id)}
        />
      );
    }
    return text;
  }, [editingTriajeId, editedData, handleInputChange, handleSaveTriaje]);

  // Definir las columnas para la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text, record) => renderEditableInput(text, record, 'fecha'),
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      key: 'hora',
      render: (text, record) => renderEditableInput(text, record, 'hora'),
    },
    {
      title: 'Nivel de Prioridad',
      dataIndex: 'nivel_prioridad',
      key: 'nivel_prioridad',
      render: (text, record) => renderEditableInput(text, record, 'nivel_prioridad'),
    },
    {
      title: 'Frecuencia Cardíaca',
      dataIndex: 'frecuencia_cardiaca',
      key: 'frecuencia_cardiaca',
      render: (text, record) => renderEditableInput(text, record, 'frecuencia_cardiaca'),
    },
    {
      title: 'Frecuencia Respiratoria',
      dataIndex: 'frecuencia_respiratoria',
      key: 'frecuencia_respiratoria',
      render: (text, record) => renderEditableInput(text, record, 'frecuencia_respiratoria'),
    },
    {
      title: 'Temperatura',
      dataIndex: 'temperatura',
      key: 'temperatura',
      render: (text, record) => renderEditableInput(text, record, 'temperatura'),
    },
    {
      title: 'Saturación Oxígeno',
      dataIndex: 'saturacion_oxigeno',
      key: 'saturacion_oxigeno',
      render: (text, record) => renderEditableInput(text, record, 'saturacion_oxigeno'),
    },
    {
      title: 'Presión Arterial',
      dataIndex: 'presion_arterial',
      key: 'presion_arterial',
      render: (text, record) => renderEditableInput(text, record, 'presion_arterial'),
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => renderEditableInput(text, record, 'descripcion'),
    },
    {
      title: 'Visión Inicial OD',
      dataIndex: 'vision_inicial_od',
      key: 'vision_inicial_od',
      render: (text, record) => renderEditableInput(text, record, 'vision_inicial_od'),
    },
    {
      title: 'Visión Inicial OI',
      dataIndex: 'vision_inicial_oi',
      key: 'vision_inicial_oi',
      render: (text, record) => renderEditableInput(text, record, 'vision_inicial_oi'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingTriajeId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveTriaje(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditTriaje(record.id)}><EditOutlined /></Button>
              <Button
                style={{
                  backgroundColor: '#F44336',
                  color: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => handleDeleteTriaje(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Triajes</Title>
      <div className="flex justify-end mb-6">
        <RegisterTriaje />
      </div>
      <Table
        columns={columns}
        dataSource={triajes}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageTriaje;