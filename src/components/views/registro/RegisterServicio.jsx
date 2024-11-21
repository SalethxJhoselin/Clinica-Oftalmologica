import React, { useState } from 'react';
import { Button, Modal, Input, Form, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { createServicio, uploadImage } from '../../../api/apiService';

const RegisterServicio = ({ onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageUrl(null);
  };

  const handleImageUpload = async (file) => {
    try {
      const url = await uploadImage(file); // Subir la imagen a Cloudinary o tu servicio
      setImageUrl(url);
      message.success('Imagen subida exitosamente');
    } catch (error) {
      message.error('Error al subir la imagen');
    }
  };

  const onFinish = async (values) => {
    try {
      const { nombre, descripcion, id_departamento, id_especialidad, precio } = values;
      await createServicio(nombre, descripcion, id_departamento, id_especialidad, precio, imageUrl);
      message.success('Servicio registrado exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess(); // Refrescar la lista de servicios
    } catch (error) {
      message.error('Error al registrar el servicio');
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
        <span>Registrar Servicio</span>
      </Button>

      <Modal
        title="Registrar Servicio"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="nombre"
            label="Nombre del Servicio"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del servicio' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción del servicio' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="id_departamento"
            label="ID del Departamento"
            rules={[{ required: true, message: 'Por favor ingrese el ID del departamento' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="id_especialidad"
            label="ID de la Especialidad"
            rules={[{ required: true, message: 'Por favor ingrese el ID de la especialidad' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="precio"
            label="Precio"
            rules={[{ required: true, message: 'Por favor ingrese el precio' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Imagen">
            <Upload
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false; // Evita la subida automática
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Seleccionar Imagen</Button>
            </Upload>
            {imageUrl && <img src={imageUrl} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterServicio;