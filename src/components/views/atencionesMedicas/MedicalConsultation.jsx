import React, { useState } from 'react';
import { Table, Form, Input, Button, DatePicker, Select, Typography, Space } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const MedicalConsultation = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      paciente: 'Carlos Martínez',
      doctor: 'Dr. Juan Pérez',
      fecha: '2024-11-10',
      diagnostico: 'Miopía',
      tratamiento: 'Uso de gafas con lentes concavas',
    },
    {
      id: 2,
      paciente: 'Ana López',
      doctor: 'Dra. María Fernández',
      fecha: '2024-11-11',
      diagnostico: 'Catarata',
      tratamiento: 'Cirugía de cataratas',
    },
  ]);

  const [medicalHistories, setMedicalHistories] = useState([
    {
      id: 1,
      paciente: 'Carlos Martínez',
      fecha: '2024-01-15',
      tipo: 'Enfermedad Crónica',
      descripcion: 'Diabetes tipo II',
    },
    {
      id: 2,
      paciente: 'Ana López',
      fecha: '2024-05-10',
      tipo: 'Alergia',
      descripcion: 'Alergia a penicilina',
    },
  ]);

  const [formConsultation] = Form.useForm();
  const [formHistory] = Form.useForm();

  // Simulated data for doctors and patients
  const doctors = [
    { id: 1, nombre: 'Dr. Juan Pérez' },
    { id: 2, nombre: 'Dra. María Fernández' },
  ];

  const patients = [
    { id: 1, nombre: 'Carlos Martínez' },
    { id: 2, nombre: 'Ana López' },
  ];

  // Handle submission for new consultation
  const onFinishConsultation = (values) => {
    const newConsultation = {
      id: consultations.length + 1,
      paciente: patients.find(p => p.id === values.paciente).nombre,
      doctor: doctors.find(d => d.id === values.doctor).nombre,
      fecha: values.fecha.format('YYYY-MM-DD'),
      diagnostico: values.diagnostico,
      tratamiento: values.tratamiento,
    };

    setConsultations([...consultations, newConsultation]);
    formConsultation.resetFields();
  };

  // Handle submission for new medical history
  const onFinishHistory = (values) => {
    const newMedicalHistory = {
      id: medicalHistories.length + 1,
      paciente: patients.find(p => p.id === values.paciente).nombre,
      fecha: values.fecha.format('YYYY-MM-DD'),
      tipo: values.tipo,
      descripcion: values.descripcion,
    };

    setMedicalHistories([...medicalHistories, newMedicalHistory]);
    formHistory.resetFields();
  };

  const consultationColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Paciente', dataIndex: 'paciente', key: 'paciente' },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
    { title: 'Diagnóstico', dataIndex: 'diagnostico', key: 'diagnostico' },
    { title: 'Tratamiento', dataIndex: 'tratamiento', key: 'tratamiento' },
  ];

  const historyColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Paciente', dataIndex: 'paciente', key: 'paciente' },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      {/* Consultas Médicas Section */}
      <Title level={3} className="text-center">Consultas Médicas Realizadas</Title>
      
      <Table
        columns={consultationColumns}
        dataSource={consultations}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
        className="mb-6"
      />

      <Title level={4} className="text-center mt-5">Registrar Nueva Consulta Médica</Title>
      <Form form={formConsultation} onFinish={onFinishConsultation} layout="vertical" className="mt-3">
        <Form.Item
          name="paciente"
          label="Paciente"
          rules={[{ required: true, message: 'Seleccione un paciente' }]}
        >
          <Select placeholder="Seleccione el paciente">
            {patients.map(patient => (
              <Option key={patient.id} value={patient.id}>{patient.nombre}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="doctor"
          label="Doctor"
          rules={[{ required: true, message: 'Seleccione un doctor' }]}
        >
          <Select placeholder="Seleccione el doctor">
            {doctors.map(doctor => (
              <Option key={doctor.id} value={doctor.id}>{doctor.nombre}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="fecha"
          label="Fecha de Consulta"
          rules={[{ required: true, message: 'Seleccione la fecha de la consulta' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="diagnostico"
          label="Diagnóstico"
          rules={[{ required: true, message: 'Ingrese el diagnóstico' }]}
        >
          <Input placeholder="Diagnóstico de la consulta" />
        </Form.Item>

        <Form.Item
          name="tratamiento"
          label="Tratamiento"
          rules={[{ required: true, message: 'Ingrese el tratamiento' }]}
        >
          <Input placeholder="Tratamiento recomendado" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Registrar Consulta
          </Button>
        </Form.Item>
      </Form>

      {/* Antecedentes Médicos Section */}
      <Title level={3} className="text-center mt-10">Antecedentes Médicos Registrados</Title>
      
      <Table
        columns={historyColumns}
        dataSource={medicalHistories}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
        className="mb-6"
      />

      <Title level={4} className="text-center mt-5">Registrar Nuevo Antecedente Médico</Title>
      <Form form={formHistory} onFinish={onFinishHistory} layout="vertical" className="mt-3">
        <Form.Item
          name="paciente"
          label="Paciente"
          rules={[{ required: true, message: 'Seleccione un paciente' }]}
        >
          <Select placeholder="Seleccione el paciente">
            {patients.map(patient => (
              <Option key={patient.id} value={patient.id}>{patient.nombre}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="fecha"
          label="Fecha del Antecedente"
          rules={[{ required: true, message: 'Seleccione la fecha del antecedente' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="tipo"
          label="Tipo de Antecedente"
          rules={[{ required: true, message: 'Ingrese el tipo de antecedente' }]}
        >
          <Input placeholder="Ejemplo: Enfermedad Crónica, Alergia" />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'Ingrese la descripción del antecedente' }]}
        >
          <Input.TextArea placeholder="Descripción detallada del antecedente" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Registrar Antecedente
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MedicalConsultation;
