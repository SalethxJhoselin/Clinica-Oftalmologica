import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { createSpecialty } from '../../../api/apiService';

const EspecialityModal = ({ getDatos }) => {
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
      // Llamada a la API para crear una nueva especialidad
      await createSpecialty({
        nombre: values.nombre,
        tiempo_estimado: values.tiempoEstimado, // puedes cambiar esto según el campo que uses en tu API
      });

      message.success('Especialidad creada exitosamente');
      form.resetFields();
      setIsModalOpen(false);

      // Actualizar la lista de especialidades en la vista principal
      getDatos(); // Llamada para refrescar las especialidades después de la creación
    } catch (error) {
      message.error('Error al crear la especialidad');
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Registrar Especialidad
      </Button>
      <Modal
        title="Registrar Especialidad"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="nombre"
            label="Nombre de la Especialidad"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de la especialidad' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tiempoEstimado"
            label="Tiempo Estimado (minutos)"
            rules={[{ required: true, message: 'Por favor ingrese el tiempo estimado' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EspecialityModal;