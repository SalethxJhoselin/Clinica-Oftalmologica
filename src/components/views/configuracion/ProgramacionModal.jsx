import React from 'react';
import { Modal, Select, TimePicker, Input, Form, Button } from 'antd';

const { Option } = Select;

const ProgramacionModal = ({ isVisible, onCancel, selectedPerson, selectedProgramming }) => {
  const [form] = Form.useForm(); // Para manejar el formulario

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(selectedProgramming);
    console.log("selectedProgramming antes snjv");
    const dataToSend = {
      programming: selectedProgramming,
      formData: values,
    };
    console.log('Datos estructurados para enviar al backend:', dataToSend);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Confirmar Programación"
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Aceptar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="servicio"
          label="Servicio"
          rules={[{ required: true, message: 'Por favor seleccione un servicio' }]}
        >
          <Select placeholder="Seleccione un servicio">
            <Option value="consulta">Consulta</Option>
            <Option value="tratamiento">Tratamiento</Option>
            <Option value="cirugia">Cirugía</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="horaInicio"
          label="Hora Inicio"
          rules={[{ required: true, message: 'Por favor seleccione la hora de inicio' }]}
        >
          <TimePicker format="HH:mm" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="horaFinal"
          label="Hora Final"
          rules={[{ required: true, message: 'Por favor seleccione la hora final' }]}
        >
          <TimePicker format="HH:mm" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="detalle"
          label="Detalle"
          rules={[{ required: true, message: 'Por favor ingrese un detalle' }]}
        >
          <Input.TextArea rows={4} placeholder="Ingrese detalles adicionales de la programación" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProgramacionModal;
