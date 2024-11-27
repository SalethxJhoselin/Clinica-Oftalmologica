import React, { useState } from 'react';
import { Button, Modal, Input, Form, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createTreatment } from '../../../api/apiService';

const { TextArea } = Input;

const RegisterTreatment = ({ onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      // Convertir fechas a formato adecuado
      const formattedValues = {
        ...values,
        fecha_inicio: values.fecha_inicio.format('YYYY-MM-DD'),
        fecha_fin: values.fecha_fin.format('YYYY-MM-DD'),
      };
      await createTreatment(formattedValues); // Enviar datos al backend
      message.success('Tratamiento registrado exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error('Error al registrar el tratamiento');
    }
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={showModal}
      >
        <PlusOutlined />
        <span>Registrar Tratamiento</span>
      </Button>

      <Modal
        title="Registrar Tratamiento"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="consulta_id"
            label="ID de la Consulta"
            rules={[{ required: true, message: 'Por favor ingrese el ID de la consulta' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción del tratamiento' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tipo_tratamiento"
            label="Tipo de Tratamiento"
            rules={[{ required: true, message: 'Por favor seleccione el tipo de tratamiento' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="medicacion"
            label="Medicación"
            rules={[{ required: true, message: 'Por favor ingrese la medicación' }]}
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="duracion_estimada"
            label="Duración Estimada"
            rules={[{ required: true, message: 'Por favor ingrese la duración estimada' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fecha_inicio"
            label="Fecha de Inicio"
            rules={[{ required: true, message: 'Por favor seleccione la fecha de inicio' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="fecha_fin"
            label="Fecha de Finalización"
            rules={[{ required: true, message: 'Por favor seleccione la fecha de finalización' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="observaciones"
            label="Observaciones"
            rules={[{ required: true, message: 'Por favor ingrese las observaciones' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterTreatment;