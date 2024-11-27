import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getAllDiagnostics, updateDiagnostic } from '../../../api/apiService'; // Importa tus APIs
import RegisterDiagnostic from './RegisterDiagnostic';

const { Title } = Typography;

const ManageDiagnostics = () => {
  const [editingDiagnosticId, setEditingDiagnosticId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);

  // Obtener diagnósticos de la API
  useEffect(() => {
    const fetchDiagnostics = async () => {
      try {
        const data = await getAllDiagnostics();
        setDiagnostics(data);
      } catch (error) {
        console.error('Error al obtener los diagnósticos:', error);
      }
    };
    fetchDiagnostics();
  }, []);

  // Iniciar edición de un diagnóstico
  const handleEditDiagnostic = useCallback((diagnosticId) => {
    setEditingDiagnosticId(diagnosticId);
    const diagnostic = diagnostics.find((d) => d.id === diagnosticId);
    setEditedData({
      [diagnosticId]: {
        descripcion: diagnostic.descripcion,
        tipo_diagnostico: diagnostic.tipo_diagnostico,
      },
    });
  }, [diagnostics]);

  // Guardar cambios realizados en un diagnóstico
  const handleSaveDiagnostic = useCallback(async (diagnosticId) => {
    try {
      const updatedData = { id: diagnosticId, ...editedData[diagnosticId] };
      await updateDiagnostic(diagnosticId, updatedData);
      message.success('Diagnóstico actualizado exitosamente');
      setEditingDiagnosticId(null);
      setDiagnostics((prev) =>
        prev.map((d) =>
          d.id === diagnosticId ? { ...d, ...updatedData } : d
        )
      );
    } catch (error) {
      console.error('Error al actualizar el diagnóstico:', error);
      message.error('Error al actualizar el diagnóstico');
    }
  }, [editedData]);

  // Cancelar edición
  const handleCancelEdit = useCallback(() => {
    setEditingDiagnosticId(null);
    setEditedData({});
  }, []);

  // Manejar cambios de entrada
  const handleInputChange = useCallback((value, diagnosticId, field) => {
    setEditedData((prevState) => ({
      ...prevState,
      [diagnosticId]: { ...prevState[diagnosticId], [field]: value },
    }));
  }, []);

  // Renderizar input editable
  const renderEditableInput = useCallback((text, record, field) => {
    if (record.id === editingDiagnosticId) {
      return (
        <Input
          value={editedData[record.id]?.[field] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, field)}
          onPressEnter={() => handleSaveDiagnostic(record.id)}
        />
      );
    }
    return text;
  }, [editingDiagnosticId, editedData, handleInputChange, handleSaveDiagnostic]);

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
      title: 'Tipo de Diagnóstico',
      dataIndex: 'tipo_diagnostico',
      key: 'tipo_diagnostico',
      render: (text, record) => renderEditableInput(text, record, 'tipo_diagnostico'),
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
          {editingDiagnosticId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSaveDiagnostic(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <Button type="primary" onClick={() => handleEditDiagnostic(record.id)}><EditOutlined /></Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Diagnósticos</Title>
      <div className="flex justify-end mb-6">
        <RegisterDiagnostic onSuccess={() => setDiagnostics([...diagnostics])} />
      </div>
      <Table
        columns={columns}
        dataSource={diagnostics}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageDiagnostics;