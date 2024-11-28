import React, { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createRecipe } from '../../../api/apiService'; // API para registrar receta

const RegisterRecipe = ({ onSuccess }) => {
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
      // Llamamos a la API para crear la receta
      await createRecipe(values);
      message.success('Receta registrada exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess();  // Actualiza la lista de recetas
    } catch (error) {
      message.error('Error al registrar la receta');
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
        <span>Registrar Receta</span>
      </Button>

      <Modal
        title="Registrar Receta"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="medicamento"
            label="Medicamento"
            rules={[{ required: true, message: 'Por favor ingrese los medicamentos' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dosis"
            label="Dosis"
            rules={[{ required: true, message: 'Por favor ingrese la dosis' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="frecuencia"
            label="Frecuencia"
            rules={[{ required: true, message: 'Por favor ingrese la frecuencia' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="id_tratamiento"
            label="ID Tratamiento"
            rules={[{ required: true, message: 'Por favor ingrese el ID del tratamiento' }]}
          >
            <Input type="number" />
          
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterRecipe;