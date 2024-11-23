import React, { useState } from 'react';
import { Button, Modal, Input, Form, Upload, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { createPatologia, uploadImage } from '../../../api/apiService';

const RegisterPatologia = ({ onSuccess }) => {
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
      const url = await uploadImage(file); // Sube la imagen a Cloudinary
      setImageUrl(url);
      message.success('Imagen subida exitosamente');
    } catch (error) {
      message.error('Error al subir la imagen');
    }
  };

  const onFinish = async (values) => {
    try {
      await createPatologia(values.nombre, values.descripcion, imageUrl);
      message.success('Patología registrada exitosamente');
      form.resetFields();
      setIsModalOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error('Error al registrar la patología');
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
        <span>Registrar Patología</span>
      </Button>

      <Modal
        title="Registrar Patología"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="nombre"
            label="Nombre de la Patología"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de la patología' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingrese la descripción de la patología' }]}
          >
            <Input.TextArea rows={4} />
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

export default RegisterPatologia;