import React, { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createDepartamento } from '../../../api/apiService'; // Asegúrate de importar tu función de servicio

const RegisterDepartamento = ({ onSuccess }) => {
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
      await createDepartamento(values.nombre); // Enviar los datos al backend
      message.success('Departamento registrado exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error('Error al registrar el departamento');
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
        <span>Registrar Departamento</span>
      </Button>

      <Modal
        title="Registrar Departamento"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="nombre"
            label="Nombre del Departamento"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del departamento' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterDepartamento;