import React, { useState } from 'react';
import { Table, Form, Input, Button, DatePicker, Select, Typography, Space } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const TriageRecord = () => {
  const [triages, setTriages] = useState([
    {
      id: 1,
      paciente: 'Carlos Martínez',
      fecha: '2024-11-10',
      presion: '120/80',
      temperatura: '36.5°C',
      peso: '70 kg',
      altura: '1.75 m',
    },
    {
      id: 2,
      paciente: 'Ana López',
      fecha: '2024-11-11',
      presion: '130/85',
      temperatura: '37.0°C',
      peso: '65 kg',
      altura: '1.60 m',
    },
  ]);

  const [form] = Form.useForm();

  // Datos simulados de pacientes
  const patients = [
    { id: 1, nombre: 'Carlos Martínez' },
    { id: 2, nombre: 'Ana López' },
  ];

  // Manejar el envío del formulario para agregar un nuevo registro de triaje
  const onFinish = (values) => {
    const newTriage = {
      id: triages.length + 1,
      paciente: patients.find(p => p.id === values.paciente).nombre,
      fecha: values.fecha.format('YYYY-MM-DD'),
      presion: values.presion,
      temperatura: values.temperatura,
      peso: values.peso,
      altura: values.altura,
    };

    setTriages([...triages, newTriage]);
    form.resetFields();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Paciente', dataIndex: 'paciente', key: 'paciente' },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
    { title: 'Presión Arterial', dataIndex: 'presion', key: 'presion' },
    { title: 'Temperatura', dataIndex: 'temperatura', key: 'temperatura' },
    { title: 'Peso', dataIndex: 'peso', key: 'peso' },
    { title: 'Altura', dataIndex: 'altura', key: 'altura' },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Registros de Triaje</Title>
      
      <Table
        columns={columns}
        dataSource={triages}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
        className="mb-6"
      />

      <Title level={4} className="text-center mt-5">Registrar Nuevo Triaje</Title>
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-3">
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
          label="Fecha"
          rules={[{ required: true, message: 'Seleccione la fecha del triaje' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="presion"
          label="Presión Arterial"
          rules={[{ required: true, message: 'Ingrese la presión arterial' }]}
        >
          <Input placeholder="Ejemplo: 120/80" />
        </Form.Item>

        <Form.Item
          name="temperatura"
          label="Temperatura"
          rules={[{ required: true, message: 'Ingrese la temperatura' }]}
        >
          <Input placeholder="Ejemplo: 36.5°C" />
        </Form.Item>

        <Form.Item
          name="peso"
          label="Peso"
          rules={[{ required: true, message: 'Ingrese el peso' }]}
        >
          <Input placeholder="Ejemplo: 70 kg" />
        </Form.Item>

        <Form.Item
          name="altura"
          label="Altura"
          rules={[{ required: true, message: 'Ingrese la altura' }]}
        >
          <Input placeholder="Ejemplo: 1.75 m" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Registrar Triaje
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TriageRecord;
