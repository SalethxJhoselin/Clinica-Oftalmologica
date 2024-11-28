import React, { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createLensMeasure } from '../../../api/apiService'; // API para registrar medidas

const RegisterLensMeasure = ({ onSuccess }) => {
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
      // Llamamos a la API para crear la medida de lentes
      await createLensMeasure(values);
      message.success('Medida de lentes registrada exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess();  // Actualiza la lista de medidas
    } catch (error) {
      message.error('Error al registrar la medida de lentes');
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
        <span>Registrar Medida de Lentes</span>
      </Button>

      <Modal
        title="Registrar Medida de Lentes"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="id_paciente"
            label="ID de Paciente"
            rules={[{ required: true, message: 'Por favor ingrese el ID del paciente' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="esfera_od"
            label="Esfera OD"
            rules={[{ required: true, message: 'Por favor ingrese la esfera del ojo derecho' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="cilindro_od"
            label="Cilindro OD"
            rules={[{ required: true, message: 'Por favor ingrese el cilindro del ojo derecho' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="eje_od"
            label="Eje OD"
            rules={[{ required: true, message: 'Por favor ingrese el eje del ojo derecho' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="adicion_od"
            label="Adición OD"
            rules={[{ required: true, message: 'Por favor ingrese la adición del ojo derecho' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="esfera_oi"
            label="Esfera OI"
            rules={[{ required: true, message: 'Por favor ingrese la esfera del ojo izquierdo' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="cilindro_oi"
            label="Cilindro OI"
            rules={[{ required: true, message: 'Por favor ingrese el cilindro del ojo izquierdo' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="eje_oi"
            label="Eje OI"
            rules={[{ required: true, message: 'Por favor ingrese el eje del ojo izquierdo' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="adicion_oi"
            label="Adición OI"
            rules={[{ required: true, message: 'Por favor ingrese la adición del ojo izquierdo' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="fecha"
            label="Fecha"
            rules={[{ required: true, message: 'Por favor ingrese la fecha del registro' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterLensMeasure;