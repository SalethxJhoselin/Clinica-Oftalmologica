import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getLensMeasures, editLensMeasure } from '../../../api/apiService'; // Importa las APIs
import RegisterLensMeasure from './RegisterLensMeasure';

const { Title } = Typography;

const ManageLensMeasures = () => {
  const [editingMeasureId, setEditingMeasureId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [lensMeasures, setLensMeasures] = useState([]);

  // Obtener medidas de lentes de la API
  useEffect(() => {
    const fetchLensMeasures = async () => {
      try {
        const data = await getLensMeasures(); // Llamamos a la API para obtener las medidas
        setLensMeasures(data);
      } catch (error) {
        console.error('Error al obtener las medidas de lentes:', error);
        message.error('Error al obtener las medidas de lentes');
      }
    };
    fetchLensMeasures();
  }, []);

  // Iniciar edición de una medida
  const handleEditLensMeasure = useCallback((measureId) => {
    setEditingMeasureId(measureId);
    const measure = lensMeasures.find((m) => m.id === measureId);
    setEditedData({
      ...measure, // Cargar los datos de la medida seleccionada para la edición
    });
  }, [lensMeasures]);

  // Guardar cambios realizados en una medida
  const handleSaveLensMeasure = useCallback(async () => {
    if (!editedData.id) return; // Validar que el 'id' esté presente

    try {
      await editLensMeasure(editedData.id, editedData);  // Llamamos a la API para editar la medida de lentes
      message.success('Medida de lentes actualizada exitosamente');
      setEditingMeasureId(null); // Cerramos el modo de edición
      setLensMeasures((prev) =>
        prev.map((m) => (m.id === editedData.id ? { ...m, ...editedData } : m)) // Actualizamos la medida editada
      );
    } catch (error) {
      console.error('Error al actualizar la medida de lentes:', error);
      message.error('Error al actualizar la medida de lentes');
    }
  }, [editedData]);

  // Cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingMeasureId(null);
    setEditedData({});
  }, []);

  // Manejar cambios en los campos de entrada
  const handleInputChange = useCallback((value, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [field]: value, // Actualizar solo el campo que cambió
    }));
  }, []);

  // Renderizar el input editable en la tabla
  const renderEditableInput = useCallback((text, record, field) => {
    if (record.id === editingMeasureId) {
      return (
        <Input
          value={editedData[field] || text} // Usar el valor editado o el valor original
          onChange={(e) => handleInputChange(e.target.value, field)}
          onPressEnter={handleSaveLensMeasure}
        />
      );
    }
    return text;
  }, [editingMeasureId, editedData, handleInputChange, handleSaveLensMeasure]);

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Esfera OD',
      dataIndex: 'esfera_od',
      key: 'esfera_od',
      render: (text, record) => renderEditableInput(text, record, 'esfera_od'),
    },
    {
      title: 'Cilindro OD',
      dataIndex: 'cilindro_od',
      key: 'cilindro_od',
      render: (text, record) => renderEditableInput(text, record, 'cilindro_od'),
    },
    {
      title: 'Eje OD',
      dataIndex: 'eje_od',
      key: 'eje_od',
      render: (text, record) => renderEditableInput(text, record, 'eje_od'),
    },
    {
      title: 'Adición OD',
      dataIndex: 'adicion_od',
      key: 'adicion_od',
      render: (text, record) => renderEditableInput(text, record, 'adicion_od'),
    },
    {
      title: 'Esfera OI',
      dataIndex: 'esfera_oi',
      key: 'esfera_oi',
      render: (text, record) => renderEditableInput(text, record, 'esfera_oi'),
    },
    {
      title: 'Cilindro OI',
      dataIndex: 'cilindro_oi',
      key: 'cilindro_oi',
      render: (text, record) => renderEditableInput(text, record, 'cilindro_oi'),
    },
    {
      title: 'Eje OI',
      dataIndex: 'eje_oi',
      key: 'eje_oi',
      render: (text, record) => renderEditableInput(text, record, 'eje_oi'),
    },
    {
      title: 'Adición OI',
      dataIndex: 'adicion_oi',
      key: 'adicion_oi',
      render: (text, record) => renderEditableInput(text, record, 'adicion_oi'),
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingMeasureId === record.id ? (
            <>
              <Button type="primary" onClick={handleSaveLensMeasure}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <Button type="primary" onClick={() => handleEditLensMeasure(record.id)}><EditOutlined /></Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Medidas de Lentes</Title>
      <div className="flex justify-end mb-6">
        <RegisterLensMeasure onSuccess={() => setLensMeasures([...lensMeasures])} />
      </div>
      <Table
        columns={columns}
        dataSource={lensMeasures}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageLensMeasures;