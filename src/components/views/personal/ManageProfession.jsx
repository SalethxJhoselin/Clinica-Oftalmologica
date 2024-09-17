import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography } from 'antd';
import ProfessionModal from './ProfessionModal'; // Asegúrate de tener este componente para agregar profesiones
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const ManageProfession = () => {
  const [editingProfessionId, setEditingProfessionId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [professions, setProfessions] = useState([]);

  // Obtener datos
  useEffect(() => {
    axios.get('https://clinica-oftalmologica.onrender.com/profesiones')
      .then(response => setProfessions(response.data))
      .catch(error => console.error('Error al obtener las profesiones:', error));
  }, []);

  const handleEditProfession = useCallback((professionId) => {
    setEditingProfessionId(professionId);
    const profession = professions.find(prof => prof.id === professionId);
    setEditedData({ [professionId]: { nombre: profession.nombre } });
  }, [professions]);

  const handleSaveProfession = useCallback((professionId) => {
    axios.post('https://clinica-oftalmologica.onrender.com/profesiones/editar', { id: professionId, ...editedData[professionId] })
      .then(() => {
        console.log("Datos modificados:", editedData[professionId]);
        setEditingProfessionId(null);
        // Actualizar la lista de profesiones
        axios.get('https://clinica-oftalmologica.onrender.com/profesiones')
          .then(response => setProfessions(response.data))
          .catch(error => console.error('Error al obtener las profesiones:', error));
      })
      .catch(error => console.error('Error al guardar la profesión:', error));
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingProfessionId(null);
    setEditedData({});
  }, []);

  const handleDeleteProfession = useCallback((professionId) => {
    axios.delete('https://clinica-oftalmologica.onrender.com/profesiones/eliminar', { data: { id: professionId } })
      .then(() => {
        console.log(`Simulación de eliminación de la profesión con ID ${professionId}`);
        setProfessions(prevProfessions => prevProfessions.filter(prof => prof.id !== professionId));
      })
      .catch(error => console.error('Error al eliminar la profesión:', error));
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
    if (record.id === editingProfessionId && dataIndex === 'nombre') {
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
      dataIndex: 'nombre',
      key: 'nombre',
      render: (text, record) => renderEditableInput(text, record, 'nombre'),
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
              <Button type="primary" onClick={() => handleEditProfession(record.id)}><EditOutlined /></Button>
              <Button style={{
                backgroundColor: '#F44336',
                color: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
                nClick={() => handleDeleteProfession(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Profesiones</Title>

      <div className="flex justify-end mb-6">
        <ProfessionModal getDatos={() => axios.get('https://clinica-oftalmologica.onrender.com/profesiones')
          .then(response => setProfessions(response.data))
          .catch(error => console.error('Error al obtener las profesiones:', error))}
        />
      </div>
      <Table
        columns={columns}
        dataSource={professions}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageProfession;