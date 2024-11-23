import React, { useEffect, useState } from 'react';
import { Modal, Select, Input, Form, Button } from 'antd';
import { getAllServices, createSpecialistProgramming } from '../../../api/apiService';

const { Option } = Select;

const ProgramacionModal = ({ isVisible, onCancel, selectedPerson, additionalSelectedDates }) => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const selectedService = services.find(service => service.id === values.servicio);

      const dataToSend = {
        empleado_id: selectedPerson.id,
        fechas: additionalSelectedDates,
        hora_inicio: values.horaInicio,
        hora_fin: values.horaFinal,
        servicio_id: values.servicio,
        especialidad_id: selectedService ? selectedService.id_especialidad : null,
      };

      const response = await createSpecialistProgramming(dataToSend);
      form.resetFields();
      onCancel();
      console.log('Datos enviados al backend:', dataToSend, 'Respuesta:', response);
    } catch (error) {
      console.error('Error al enviar la programación:', error);
    }
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
            {services.map(service => (
              <Option key={service.id} value={service.id}>
                {service.nombre}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="horaInicio"
          label="Hora Inicio"
          rules={[{ required: true, message: 'Por favor seleccione la hora de inicio' }]}
        >
          <Input
            type="time"
            className="border rounded-md w-full p-2"
          />
        </Form.Item>

        <Form.Item
          name="horaFinal"
          label="Hora Final"
          rules={[{ required: true, message: 'Por favor seleccione la hora final' }]}
        >
          <Input
            type="time"
            className="border rounded-md w-full p-2"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProgramacionModal;
