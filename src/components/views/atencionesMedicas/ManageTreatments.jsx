import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getAllTreatments, updateTreatment } from '../../../api/apiService'; // Importa tus APIs
import RegisterTreatment from './RegisterTreatment';

const { Title } = Typography;

const ManageTreatments = () => {
  const [editingTreatmentId, setEditingTreatmentId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [treatments, setTreatments] = useState([]);

  // Obtener tratamientos de la API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const data = await getAllTreatments();
        setTreatments(data);
      } catch (error) {
        console.error('Error al obtener los tratamientos:', error);
      }
    };
    fetchTreatments();
  }, []);

  // Iniciar edición de un tratamiento
  const handleEditTreatment = useCallback((treatmentId) => {
    setEditingTreatmentId(treatmentId);
    const treatment = treatments.find((t) => t.id === treatmentId);
    setEditedData({
      [treatmentId]: {
        descripcion: treatment.descripcion,
        tipo_tratamiento: treatment.tipo_tratamiento,
        medicacion: treatment.medicacion,
        duracion_estimada: treatment.duracion_estimada,
        observaciones: treatment.observaciones,
      },
    });
  }, [treatments]);

  // Guardar cambios realizados en un tratamiento
  const handleSaveTreatment = useCallback(async (treatmentId) => {
    try {
        // Obtenemos los datos editados para el tratamiento actual
        const updatedData = {
            id: treatmentId,
            ...editedData[treatmentId], // Datos editados (e.g., descripcion, tipo_tratamiento, etc.)
            fecha_inicio: editedData[treatmentId]?.fecha_inicio || treatments.find(t => t.id === treatmentId).fecha_inicio,
            fecha_fin: editedData[treatmentId]?.fecha_fin || treatments.find(t => t.id === treatmentId).fecha_fin,
        };

        // Validar que todos los campos requeridos estén presentes
        if (!updatedData.descripcion || !updatedData.tipo_tratamiento || !updatedData.medicacion || !updatedData.duracion_estimada || !updatedData.fecha_inicio || !updatedData.fecha_fin) {
            throw new Error('Faltan datos requeridos para actualizar el tratamiento.');
        }

        // Enviar la solicitud de actualización
        await updateTreatment(treatmentId, updatedData);
        message.success(`Tratamiento actualizado exitosamente`);

        // Actualizamos la lista de tratamientos
        setEditingTreatmentId(null);
        setTreatments((prev) =>
            prev.map((t) =>
                t.id === treatmentId ? { ...t, ...updatedData } : t
            )
        );
    } catch (error) {
        console.error('Error al actualizar el tratamiento:', error);
        message.error('Error al actualizar el tratamiento');
    }
}, [editedData, treatments]);

  // Cancelar edición
  const handleCancelEdit = useCallback(() => {
    setEditingTreatmentId(null);
    setEditedData({});
  }, []);

  // Manejar cambios de entrada
  const handleInputChange = useCallback((value, treatmentId, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [treatmentId]: { ...prevState[treatmentId], [field]: value },
    }));
  }, []);

  // Renderizar input editable
  const renderEditableInput = useCallback((text, record, field) => {
    if (record.id === editingTreatmentId) {
      return (
        <Input
          value={editedData[record.id]?.[field] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, field)}
          onPressEnter={() => handleSaveTreatment(record.id)}
        />
      );
    }
    return text;
  }, [editingTreatmentId, editedData, handleInputChange, handleSaveTreatment]);

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => renderEditableInput(text, record, 'descripcion'),
    },
    {
      title: 'Tipo de Tratamiento',
      dataIndex: 'tipo_tratamiento',
      key: 'tipo_tratamiento',
      render: (text, record) => renderEditableInput(text, record, 'tipo_tratamiento'),
    },
    {
      title: 'Medicación',
      dataIndex: 'medicacion',
      key: 'medicacion',
      render: (text, record) => renderEditableInput(text, record, 'medicacion'),
    },
    {
      title: 'Duración Estimada',
      dataIndex: 'duracion_estimada',
      key: 'duracion_estimada',
      render: (text, record) => renderEditableInput(text, record, 'duracion_estimada'),
    },
    {
      title: 'Fecha Inicio',
      dataIndex: 'fecha_inicio',
      key: 'fecha_inicio',
    },
    {
      title: 'Fecha Fin',
      dataIndex: 'fecha_fin',
      key: 'fecha_fin',
    },
    {
      title: 'Observaciones',
      dataIndex: 'observaciones',
      key: 'observaciones',
      render: (text, record) => renderEditableInput(text, record, 'observaciones'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingTreatmentId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveTreatment(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditTreatment(record.id)}><EditOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Tratamientos</Title>
      <div className="flex justify-end mb-6">
        <RegisterTreatment onSuccess={() => setTreatments([...treatments])} />
      </div>
      <Table
        columns={columns}
        dataSource={treatments}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageTreatments;