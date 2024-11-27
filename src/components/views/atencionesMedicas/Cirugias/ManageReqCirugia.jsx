import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const ManageReqCirugia = ({ cirugiaId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (values) => {
    const { requerimiento, estado } = values;

    // Estructura de los datos que se enviarán al backend
    const crearRequerimiento = {
      requerimiento,
      estado,
      id_cirugia: cirugiaId,
    };

    setLoading(true);

    try {
      // Realizamos la solicitud POST para crear el requerimiento
      const response = await axios.post(
        'https://clinica-oftalmologica.onrender.com/requerimientos/crear',
        crearRequerimiento
      );

      if (response.status === 200) {
        notification.success({
          message: 'Requerimiento Creado',
          description: 'El requerimiento ha sido creado correctamente.',
        });
        form.resetFields(); // Limpiamos el formulario
      }
    } catch (error) {
      console.error('Error al crear el requerimiento:', error);
      notification.error({
        message: 'Error al Crear Requerimiento',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Requerimiento a la Cirugía</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ estado: 'Pendiente' }}
      >
        {/* Campo Requerimiento */}
        <Form.Item
          name="requerimiento"
          label="Requerimiento"
          rules={[{ required: true, message: 'Por favor ingresa un requerimiento' }]}
        >
          <Input.TextArea rows={4} placeholder="Descripción del requerimiento" />
        </Form.Item>

        {/* Campo Estado */}
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: 'Por favor selecciona un estado' }]}
        >
          <Input placeholder="Estado del requerimiento" />
        </Form.Item>

        {/* Botón de Enviar */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Crear Requerimiento
        </Button>
      </Form>
    </div>
  );
};

export default ManageReqCirugia;
