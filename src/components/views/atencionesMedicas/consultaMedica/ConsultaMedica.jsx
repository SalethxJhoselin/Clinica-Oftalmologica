import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, DatePicker, TimePicker, Select, message } from 'antd';

const { TextArea } = Input;

const ConsultaMedica = () => {
  const [triajes, setTriajes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPacienteId, setSelectedPacienteId] = useState(null);
  const [selectedTriajeId, setSelectedTriajeId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTriajes = async () => {
      const data = [
        {
          id: 8,
          usuario_id: 8,
          fecha: "2024-11-19T04:00:00.000Z",
          hora: "10:30:00",
        },
        {
          id: 10,
          usuario_id: 8,
          fecha: "2024-11-19T04:00:00.000Z",
          hora: "10:30:00",
        },
      ];
      setTriajes(data);
    };

    fetchTriajes();
  }, []);

  const columns = [
    {
      title: 'ID Usuario',
      dataIndex: 'usuario_id',
      key: 'usuario_id',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      key: 'hora',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => handleVerDetalle(record.id)}>Ver Detalle Triaje</Button>
          <Button type="default" onClick={() => showModal(record.usuario_id, record.id)}>Generar Consulta</Button>
        </Space>
      ),
    },
  ];

  const handleVerDetalle = (id) => {
    console.log(`Ver detalle del triaje con ID: ${id}`);
  };

  const showModal = (usuarioId, triajeId) => {
    setSelectedPacienteId(usuarioId);
    setSelectedTriajeId(triajeId);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const formData = await form.validateFields();
      const payload = {
        ...formData,
        fecha: formData.fecha.format("YYYY-MM-DD"),
        hora_inicio: formData.hora_inicio.format("HH:mm:ss"),
        hora_fin: formData.hora_fin.format("HH:mm:ss"),
        id_triaje: selectedTriajeId,
        id_usuario: selectedPacienteId,
      };
      console.log('Datos enviados al backend:', payload);
      message.success('Consulta registrada exitosamente');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      message.error('Error al registrar la consulta');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2">
      <h2 className="text-center mb-4">Listado de Triajes</h2>
      <Table
        dataSource={triajes}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5, size: 'small' }}
      />
      {/* Modal para generar consulta */}
      <Modal
        title="Generar Consulta"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Motivo de Consulta"
            name="motivo_consulta"
            rules={[{ required: true, message: 'Ingrese el motivo de la consulta' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Refracción"
            name="refraccion"
            rules={[{ required: true, message: 'Ingrese la refracción' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tonometría"
            name="tonometria"
            rules={[{ required: true, message: 'Ingrese la tonometría' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Biomicroscopía"
            name="biomicroscopia"
            rules={[{ required: true, message: 'Ingrese la biomicroscopía' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Fondo de Ojo"
            name="fondo_de_ojo"
            rules={[{ required: true, message: 'Ingrese el fondo de ojo' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Campo Visual"
            name="campo_visual"
            rules={[{ required: true, message: 'Ingrese el campo visual' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo de Consulta"
            name="tipo_de_consulta"
            rules={[{ required: true, message: 'Ingrese el tipo de consulta' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Diagnóstico Principal"
            name="diagnostico_principal"
            rules={[{ required: true, message: 'Ingrese el diagnóstico principal' }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Diagnóstico Secundario"
            name="diagnostico_secundario"
            rules={[{ required: true, message: 'Ingrese el diagnóstico secundario' }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Fecha"
            name="fecha"
            rules={[{ required: true, message: 'Seleccione la fecha' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Hora Inicio"
            name="hora_inicio"
            rules={[{ required: true, message: 'Seleccione la hora de inicio' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="Hora Fin"
            name="hora_fin"
            rules={[{ required: true, message: 'Seleccione la hora de fin' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="Test Lagrimal"
            name="test_lagrimal"
            rules={[{ required: true, message: 'Ingrese el test lagrimal' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConsultaMedica;
