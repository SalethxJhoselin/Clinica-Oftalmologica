import React, { useEffect, useState, useCallback } from 'react';
import { Space, Table, Button, Input, Typography } from 'antd';
import PatientModal from './PatientModal'; // Asegúrate de tener este componente para agregar pacientes
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ManagePatient = () => {
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [patients, setPatients] = useState([]);

  // Obtener datos
  useEffect(() => {
    axios.get('https://clinica-oftalmologica.onrender.com/pacientes')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error al obtener los pacientes:', error));
  }, []);

  const handleEditPatient = useCallback((patientId) => {
    setEditingPatientId(patientId);
    const patient = patients.find(pat => pat.id === patientId);
    setEditedData({ [patientId]: { nombre: patient.nombre, edad: patient.edad, fechaNacimiento: patient.fechaNacimiento } });
  }, [patients]);

  const handleSavePatient = useCallback((patientId) => {
    axios.post('https://clinica-oftalmologica.onrender.com/pacientes/editar', { id: patientId, ...editedData[patientId] })
      .then(() => {
        console.log("Datos modificados:", editedData[patientId]);
        setEditingPatientId(null);
        // Actualizar la lista de pacientes
        axios.get('https://clinica-oftalmologica.onrender.com/pacientes')
          .then(response => setPatients(response.data))
          .catch(error => console.error('Error al obtener los pacientes:', error));
      })
      .catch(error => console.error('Error al guardar el paciente:', error));
  }, [editedData]);

  const handleCancelEdit = useCallback(() => {
    setEditingPatientId(null);
    setEditedData({});
  }, []);

  const handleDeletePatient = useCallback((patientId) => {
    axios.delete('https://clinica-oftalmologica.onrender.com/pacientes/eliminar', { data: { id: patientId } })
      .then(() => {
        console.log(`Simulación de eliminación del paciente con ID ${patientId}`);
        setPatients(prevPatients => prevPatients.filter(pat => pat.id !== patientId));
      })
      .catch(error => console.error('Error al eliminar el paciente:', error));
  }, []);

  const handleInputChange = useCallback((value, patientId, field) => {
    setEditedData(prevState => ({
      ...prevState,
      [patientId]: {
        ...prevState[patientId],
        [field]: value
      }
    }));
  }, []);

  const renderEditableInput = useCallback((text, record, dataIndex) => {
    if (record.id === editingPatientId) {
      return (
        <Input
          value={editedData[record.id]?.[dataIndex] || text}
          onChange={(e) => handleInputChange(e.target.value, record.id, dataIndex)}
          onPressEnter={() => handleSavePatient(record.id)}
        />
      );
    }
    return text;
  }, [editingPatientId, editedData, handleInputChange, handleSavePatient]);

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
      title: 'Edad',
      dataIndex: 'edad',
      key: 'edad',
      render: (text, record) => renderEditableInput(text, record, 'edad'),
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'fechaNacimiento',
      key: 'fechaNacimiento',
      render: (text, record) => renderEditableInput(text, record, 'fechaNacimiento'),
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {editingPatientId === record.id ? (
            <>
              <Button type="primary" onClick={() => handleSavePatient(record.id)}>Guardar</Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => handleEditPatient(record.id)}><EditOutlined /></Button>
              <Button style={{
                backgroundColor: '#F44336',
                color: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
                onClick={() => handleDeletePatient(record.id)}><DeleteOutlined /></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Gestionar Pacientes</Title>

      <div className="flex justify-end mb-6">
        <PatientModal getDatos={() => axios.get('https://clinica-oftalmologica.onrender.com/pacientes')
          .then(response => setPatients(response.data))
          .catch(error => console.error('Error al obtener los pacientes:', error))}
        />
      </div>
      <Table
        columns={columns}
        dataSource={patients}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManagePatient;