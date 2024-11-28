import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import EspecialityModal from './EspecialityModal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllSpecialties, editSpecialty, deleteSpecialty } from '../../../api/apiService';
import { useUser } from '../../../context/UserContext'; // Para obtener el id_sub

const { Title } = Typography;

const ManageEspeciality = () => {
  const { userSubId } = useUser(); // Obtener el id_sub del usuario
  const [editingSpecialtyId, setEditingSpecialtyId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [specialties, setSpecialties] = useState([]);

  // Obtener especialidades desde el backend
  const fetchSpecialties = async () => {
    try {
      const specialtiesData = await getAllSpecialties();
      // Filtrar las especialidades por el id_sub del usuario
      const filteredSpecialties = specialtiesData.filter(specialty => specialty.id_sub === userSubId);
      setSpecialties(filteredSpecialties); // Asigna las especialidades filtradas
    } catch (error) {
      message.error('Error al obtener especialidades');
    }
  };

  useEffect(() => {
    fetchSpecialties(); // Llamada inicial para cargar especialidades filtradas
  }, [userSubId]); // Dependiendo del id_sub, si cambia, volvemos a cargar las especialidades

  // Manejar la edición de especialidades
  const handleEditSpecialty = useCallback((specialtyId) => {
    setEditingSpecialtyId(specialtyId);
    const specialty = specialties.find(specialty => specialty.id === specialtyId);
    setEditedData({ [specialtyId]: { name: specialty.nombre, description: specialty.tiempo_estimado } });
  }, [specialties]);

  // Guardar los cambios de edición
  const handleSaveSpecialty = useCallback(async (specialtyId) => {
    try {
      const updatedSpecialty = {
        nombre: editedData[specialtyId]?.name,
        tiempo_estimado: editedData[specialtyId]?.description,
      };
      await editSpecialty(specialtyId, updatedSpecialty); // Llamar a la API para editar
      message.success('Especialidad editada exitosamente');
      setEditingSpecialtyId(null);
      // Actualizar la lista después de la edición
      const updatedSpecialties = specialties.map(specialty =>
        specialty.id === specialtyId ? { ...specialty, ...updatedSpecialty } : specialty
      );
      setSpecialties(updatedSpecialties);
    } catch (error) {
      message.error('Error al editar la especialidad');
    }
  }, [editedData, specialties]);

  // Cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingSpecialtyId(null);
    setEditedData({});
  }, []);

  // Eliminar especialidad
  const handleDeleteSpecialty = useCallback(async (specialtyId) => {
    try {
      await deleteSpecialty(specialtyId); // Llamar a la API para eliminar
      message.success('Especialidad eliminada exitosamente');
      setSpecialties(prevSpecialties => prevSpecialties.filter(specialty => specialty.id !== specialtyId));
    } catch (error) {
      message.error('Error al eliminar la especialidad');
    }
  }, []);

  // Manejar el cambio en los campos de edición
  const handleInputChange = useCallback((value, specialtyId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [specialtyId]: {
        ...prevState[specialtyId],
        [field]: value
      }
    }));
  }, []);

  // Renderizar los inputs editables
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

  // Definir las columnas de la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'name',
      render: (text, record) => renderEditableInput(text, record, 'name'),
    },
    {
      title: 'Tiempo Estimado',
      dataIndex: 'tiempo_estimado',
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
        <EspecialityModal getDatos={fetchSpecialties} />
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
