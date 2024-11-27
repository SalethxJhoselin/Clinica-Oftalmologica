import React, { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createDiagnostic } from '../../../api/apiService';

const RegisterDiagnostic = ({ onSuccess }) => {
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
      await createDiagnostic(values); // Enviar datos al backend
      message.success('Diagnóstico registrado exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error('Error al registrar el diagnóstico');
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
        <span>Registrar Diagnóstico</span>
      </Button>

      <Modal
        title="Registrar Diagnóstico"
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
            rules={[{ required: true, message: 'Por favor ingrese la descripción del diagnóstico' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tipo_diagnostico"
            label="Tipo de Diagnóstico"
            rules={[{ required: true, message: 'Por favor seleccione el tipo de diagnóstico' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterDiagnostic;