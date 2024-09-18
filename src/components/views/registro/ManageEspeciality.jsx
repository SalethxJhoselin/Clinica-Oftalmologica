import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography } from 'antd';
import EspecialityModal from './EspecialityModal'; // Cambiado a EspecialityModal
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Datos simulados
const simulatedSpecialties = [
  { id: 1, name: 'Oftalmología General', description: 'Revisión general de la salud visual.' },
  { id: 2, name: 'Cirugía Refractiva', description: 'Corrección quirúrgica de errores refractivos.' }
];

const { Title } = Typography;
const ManageEspeciality = () => {
  const [editingSpecialtyId, setEditingSpecialtyId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [specialties, setSpecialties] = useState([]);

  // Obtener datos
  useEffect(() => {
    setSpecialties(simulatedSpecialties);
  }, []);

  const handleEditSpecialty = useCallback((specialtyId) => {
    setEditingSpecialtyId(specialtyId);
    const specialty = specialties.find(specialty => specialty.id === specialtyId);
    setEditedData({ [specialtyId]: { name: specialty.name, description: specialty.description } });
  }, [specialties]);

  const handleSaveSpecialty = useCallback((specialtyId) => {
    console.log("Datos modificados:", editedData[specialtyId]);
    setEditingSpecialtyId(null);
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingSpecialtyId(null);
    setEditedData({});
  }, []);

  const handleDeleteSpecialty = useCallback((specialtyId) => {
    console.log(`Simulación de eliminación de la especialidad con ID ${specialtyId}`);
    setSpecialties(prevSpecialties => prevSpecialties.filter(specialty => specialty.id !== specialtyId));
  }, []);

  const handleInputChange = useCallback((value, specialtyId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [specialtyId]: {
        ...prevState[specialtyId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingSpecialtyId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveSpecialty(record.id)}
        />
      );
    }
    return text;
  }, [editingSpecialtyId, editedData, handleInputChange, handleSaveSpecialty]);

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
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => renderEditableInput(text, record, 'description'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingSpecialtyId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveSpecialty(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditSpecialty(record.id)}><EditOutlined /></Button>
              <Button
                style={{
                  backgroundColor: '#F44336', 
                  color: '#fff', 
                  borderRadius: '10px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => handleDeleteSpecialty(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Especialidades</Title>
      <div className="flex justify-end mb-6">
        <EspecialityModal getDatos={() => setSpecialties(simulatedSpecialties)} />
      </div>
      <Table
        columns={columns}
        dataSource={specialties}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageEspeciality;