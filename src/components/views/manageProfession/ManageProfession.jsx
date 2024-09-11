import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography } from 'antd';
import ProfessionModal from './ProfessionModal'; // Asegúrate de tener este componente para agregar profesiones

// Datos simulados para profesiones
const simulatedProfessions = [
  { id: 1, name: 'Oftalmólogo' },
  { id: 2, name: 'Optometrista' }
];

const { Title } = Typography;
const ManageProfession = () => {
  const [editingProfessionId, setEditingProfessionId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [professions, setProfessions] = useState([]);

  // Obtener datos
  useEffect(() => {
    setProfessions(simulatedProfessions);
  }, []);

  const handleEditProfession = useCallback((professionId) => {
    setEditingProfessionId(professionId);
    const profession = professions.find(prof => prof.id === professionId);
    setEditedData({ [professionId]: { name: profession.name } });
  }, [professions]);

  const handleSaveProfession = useCallback((professionId) => {
    console.log("Datos modificados:", editedData[professionId]);
    setEditingProfessionId(null);
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingProfessionId(null);
    setEditedData({});
  }, []);

  const handleDeleteProfession = useCallback((professionId) => {
    console.log(`Simulación de eliminación de la profesión con ID ${professionId}`);
    setProfessions(prevProfessions => prevProfessions.filter(prof => prof.id !== professionId));
  }, []);

  const handleInputChange = useCallback((value, professionId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [professionId]: {
        ...prevState[professionId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingProfessionId && dataIndex === 'name') {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSaveProfession(record.id)}
        />
      );
    }
    return text;
  }, [editingProfessionId, editedData, handleInputChange, handleSaveProfession]);

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
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingProfessionId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveProfession(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="text" onClick={() => handleEditProfession(record.id)}>Editar</Button>
              <Button onClick={() => handleDeleteProfession(record.id)}>Eliminar</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Profesiones</Title>
      <Table
        columns={columns}
        dataSource={professions}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
      <div className="add-profession-button">
        <ProfessionModal getDatos={() => setProfessions(simulatedProfessions)} />
      </div>
    </div>
  );
};

export default ManageProfession;