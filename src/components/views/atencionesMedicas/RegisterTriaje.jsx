import { useState } from "react";
import { Button, Modal, Input, Form, Select, message, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createTriaje } from "../../../api/apiService"; // Asegúrate de importar tu función de servicio

const { Option } = Select;

// Componente personalizado para el TimePicker
const CustomTimePicker = ({ value, onChange }) => {
  const handleTimeChange = (e) => {
    const time = e.target.value;
    onChange(time); // Envía el valor seleccionado al formulario
  };

  return (
    <input
      type="time"
      className="border rounded-md p-2 w-full"
      value={value}
      onChange={handleTimeChange}
    />
  );
};

const RegisterTriaje = () => {
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
      const triajeData = {
        usuario_id: values.usuarioId,
        fecha: values.fecha.format("YYYY-MM-DD"),
        hora: values.hora,
        nivel_prioridad: values.nivelPrioridad,
        frecuencia_cardiaca: values.frecuenciaCardiaca,
        frecuencia_respiratoria: values.frecuenciaRespiratoria,
        temperatura: values.temperatura,
        saturacion_oxigeno: values.saturacionOxigeno,
        presion_arterial: values.presionArterial,
        descripcion: values.descripcion,
        vision_inicial_od: values.visionInicialOD,
        vision_inicial_oi: values.visionInicialOI,
      };

      await createTriaje(triajeData);
      message.success("Triaje registrado exitosamente");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error al registrar el triaje");
    }
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: "#4CAF50",
          color: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={showModal}
      >
        <PlusOutlined />
        <span>Registrar Triaje</span>
      </Button>

      <Modal
        title="Registrar Triaje"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="usuarioId"
            label="ID del Usuario (CI)"
            rules={[{ required: true, message: "Por favor ingrese el CI del usuario" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fecha"
            label="Fecha"
            rules={[{ required: true, message: "Por favor seleccione la fecha" }]}
          >
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>

          <Form.Item
            name="hora"
            label="Hora"
            rules={[{ required: true, message: "Por favor seleccione la hora" }]}
          >
            <CustomTimePicker />
          </Form.Item>

          <Form.Item
            name="nivelPrioridad"
            label="Nivel de Prioridad"
            rules={[{ required: true, message: "Por favor seleccione el nivel de prioridad" }]}
          >
            <Select>
              <Option value="urgente">Urgente</Option>
              <Option value="media">Media</Option>
              <Option value="baja">Baja</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="frecuenciaCardiaca"
            label="Frecuencia Cardiaca (bpm)"
            rules={[{ required: true, message: "Por favor ingrese la frecuencia cardiaca" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="frecuenciaRespiratoria"
            label="Frecuencia Respiratoria (rpm)"
            rules={[{ required: true, message: "Por favor ingrese la frecuencia respiratoria" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="temperatura"
            label="Temperatura (°C)"
            rules={[{ required: true, message: "Por favor ingrese la temperatura" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="saturacionOxigeno"
            label="Saturación de Oxígeno (%)"
            rules={[{ required: true, message: "Por favor ingrese la saturación de oxígeno" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="presionArterial"
            label="Presión Arterial (mmHg)"
            rules={[{ required: true, message: "Por favor ingrese la presión arterial" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: "Por favor ingrese una descripción" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="visionInicialOD"
            label="Visión Inicial OD (esférico)"
            rules={[{ required: true, message: "Por favor ingrese la visión inicial OD" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="visionInicialOI"
            label="Visión Inicial OI (esférico)"
            rules={[{ required: true, message: "Por favor ingrese la visión inicial OI" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterTriaje;
