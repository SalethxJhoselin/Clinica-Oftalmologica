import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getRecipes, editRecipe } from '../../../api/apiService'; // APIs para gestionar recetas
import RegisterRecipe from './RegisterRecipe';

const { Title } = Typography;

const ManageRecipes = () => {
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [recipes, setRecipes] = useState([]);

  // Obtener recetas de la API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(); // Llamamos a la API para obtener las recetas
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
        message.error('Error al obtener las recetas');
      }
    };
    fetchRecipes();
  }, []);

  // Iniciar edición de una receta
  const handleEditRecipe = useCallback((recipeId) => {
    setEditingRecipeId(recipeId);
    const recipe = recipes.find((r) => r.id === recipeId);
    setEditedData({
      ...recipe, // Cargar los datos de la receta seleccionada para la edición
    });
  }, [recipes]);

  // Guardar cambios realizados en una receta
   // Guardar cambios realizados en una receta
   const handleSaveRecipe = useCallback(async () => {
    if (!editedData.id) return; // Validar que el 'id' esté presente

    try {
      await editRecipe(editedData.id, editedData);  // Llamamos a la API para editar la receta
      message.success('Receta actualizada exitosamente');
      setEditingRecipeId(null); // Cerramos el modo de edición
      setRecipes((prev) =>
        prev.map((r) => (r.id === editedData.id ? { ...r, ...editedData } : r)) // Actualizamos la receta editada
      );
    } catch (error) {
      console.error('Error al actualizar la receta:', error);
      message.error('Error al actualizar la receta');
    }
  }, [editedData]);

  // Cancelar la edición
  const handleCancelEdit = useCallback(() => {
    setEditingRecipeId(null);
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
    if (record.id === editingRecipeId) {
      return (
        <Input
          value={editedData[field] || text} // Usar el valor editado o el valor original
          onChange={(e) => handleInputChange(e.target.value, field)}
          onPressEnter={handleSaveRecipe}
        />
      );
    }
    return text;
  }, [editingRecipeId, editedData, handleInputChange, handleSaveRecipe]);

  // Definir columnas de la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Medicamentos',
      dataIndex: 'medicamento',
      key: 'medicamento',
      render: (text, record) => renderEditableInput(text, record, 'medicamentos'),
    },
    {
      title: 'Dosis',
      dataIndex: 'dosis',
      key: 'dosis',
      render: (text, record) => renderEditableInput(text, record, 'dosis'),
    },
    {
      title: 'Frecuencia',
      dataIndex: 'frecuencia',
      key: 'frecuencia',
      render: (text, record) => renderEditableInput(text, record, 'frecuencia'),
    },
    {
      title: 'ID Tratamiento',
      dataIndex: 'id_tratamiento',
      key: 'id_tratamiento',
      render: (text, record) => renderEditableInput(text, record, 'id_tratamiento'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingRecipeId === record.id ? (
            <>
              <Button type="primary" onClick={handleSaveRecipe}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <Button type="primary" onClick={() => handleEditRecipe(record.id)}><EditOutlined /></Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Recetas</Title>
      <div className="flex justify-end mb-6">
        <RegisterRecipe onSuccess={() => setRecipes([...recipes])} />
      </div>
      <Table
        columns={columns}
        dataSource={recipes}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageRecipes;