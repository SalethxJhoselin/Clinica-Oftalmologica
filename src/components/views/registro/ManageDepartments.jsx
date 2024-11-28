import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllDepartamentos, deleteDepartamento, editDepartamento } from '../../../api/apiService'; // Importa tus APIs
import RegisterDepartamento from './RegisterDepartamento';
import { useUser } from '../../../context/UserContext';

const { Title } = Typography;

const ManageDepartaments = () => {
  const { userSubId } = useUser(); // Obtenemos el userSubId desde el contexto
  const [editingDepartamentoId, setEditingDepartamentoId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [departamentos, setDepartamentos] = useState([]);

  // Obtener departamentos de la API y filtrar por id_sub
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await getAllDepartamentos();

        // Filtrar los departamentos para que solo se muestren aquellos con el mismo id_sub que el del usuario
        const filteredDepartamentos = data.filter((departamento) => departamento.id_sub === userSubId);

        setDepartamentos(filteredDepartamentos);
      } catch (error) {
        console.error('Error al obtener los departamentos:', error);
      }
    };
    fetchDepartamentos();
  }, [userSubId]); // Dependemos de userSubId, por lo que si cambia, volvemos a obtener los departamentos

  // Función para iniciar la edición de un departamento
  const handleEditDepartamento = useCallback((departamentoId) => {
    setEditingDepartamentoId(departamentoId);
    const departamento = departamentos.find((d) => d.id === departamentoId);
    setEditedData({
      [departamentoId]: { nombre: departamento.nombre },
    });
  }, [departamentos]);

  // Función para guardar los cambios realizados en un departamento
  const handleSaveDepartamento = useCallback(async (departamentoId) => {
    try {
      const updatedData = editedData[departamentoId];
      await editDepartamento(departamentoId, updatedData.nombre);
      message.success(`Departamento actualizado exitosamente`);
      setEditingDepartamentoId(null);
      setDepartamentos((prev) =>
        prev.map((d) =>
          d.id === departamentoId ? { ...d, nombre: updatedData.nombre } : d
        )
      );
    } catch (error) {
      console.error('Error al guardar el departamento:', error);
      message.error('Error al actualizar el departamento');
    }
  }, [editedData]);

  // Función para cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingDepartamentoId(null);
    setEditedData({});
  }, []);

  // Función para eliminar un departamento
  const handleDeleteDepartamento = useCallback(async (departamentoId) => {
    try {
      await deleteDepartamento(departamentoId);
      message.success(`Departamento con ID ${departamentoId} eliminado exitosamente`);
      setDepartamentos((prev) => prev.filter((d) => d.id !== departamentoId));
    } catch (error) {
      console.error('Error al eliminar el departamento:', error);
      message.error('Error al eliminar el departamento');
    }
  }, []);

  // Función para manejar los cambios de entrada
  const handleInputChange = useCallback((value, departamentoId) => {
    setEditedData((prevState) => ({
      ...prevState,
      [departamentoId]: { nombre: value },
    }));
  }, []);

  // Función para renderizar el input editable
  const renderEditableInput = useCallback((text, record) => {
    if (record.id === editingDepartamentoId) {
      return (
        <Input
          value={editedData[record.id]?.nombre || text}
          onChange={(e) => handleInputChange(e.target.value, record.id)}
          onPressEnter={() => handleSaveDepartamento(record.id)}
        />
      );
    }
    return text;
  }, [editingDepartamentoId, editedData, handleInputChange, handleSaveDepartamento]);

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
      render: (text, record) => renderEditableInput(text, record),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingDepartamentoId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveDepartamento(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditDepartamento(record.id)}><EditOutlined /></Button>
              <Button
                style={{
                  backgroundColor: '#F44336',
                  color: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => handleDeleteDepartamento(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Departamentos</Title>
      <div className="flex justify-end mb-6">
        <RegisterDepartamento onSuccess={() => setDepartamentos([...departamentos])} />
      </div>
      <Table
        columns={columns}
        dataSource={departamentos}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageDepartaments;
