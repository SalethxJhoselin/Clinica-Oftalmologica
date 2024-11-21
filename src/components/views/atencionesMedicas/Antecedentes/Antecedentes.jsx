import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Typography, Space } from 'antd';
import { getAllPatients } from '../../../../api/apiService';
const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const Antecedentes = () => {
  const [patients, setPatients] = useState([]);
  const [antecedentes, setAntecedentes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAntecedentes, setSelectedAntecedentes] = useState([]);
  const [form] = Form.useForm();

  // Datos simulados de antecedentes médicos
  const antecedentesData = [
    {
      usuario: { id: 1, nombre: "Jhon Said", apellido_paterno: "Andia", apellido_materno: "Merino" },
      fecha_apertura: "2024-11-20T00:00:00.000Z",
      antecedentes: [
        { id: 3, tipo: "Alergias" },
        { id: 7, tipo: "Familiar" },
      ],
    },
    {
      usuario: { id: 8, nombre: "jhoel", apellido_paterno: "rodas", apellido_materno: "cabrera" },
      fecha_apertura: "2024-11-20T00:00:00.000Z",
      antecedentes: [
        { id: 1, tipo: "Alergias" },
        { id: 6, tipo: "Operacion" },
      ],
    },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getAllPatients(); // Obtiene los pacientes desde el backend
        setPatients(response.data);
      } catch (error) {
        message.error('Error al obtener la lista de pacientes');
      }
    };

    fetchPatients();
    setAntecedentes(antecedentesData); // Carga los antecedentes simulados
  }, []);

  const showModal = (patient) => {
    setSelectedPatient(patient); // Guarda al paciente seleccionado
    form.resetFields(); // Resetea los campos del formulario
    setIsModalVisible(true); // Muestra el modal
  };

  const handleModalOk = async () => {
    try {
      const formData = await form.validateFields(); // Valida los campos del formulario
      const payload = {
        ...formData,
        usuario_id: selectedPatient.id, // Incluye el ID del paciente seleccionado
      };
      console.log('Antecedente registrado:', payload); // Simula el envío al backend
      message.success('Antecedente registrado exitosamente');
      setIsModalVisible(false); // Cierra el modal
    } catch (error) {
      console.error('Error al registrar antecedente:', error);
      message.error('Error al registrar el antecedente');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Cierra el modal
    setSelectedPatient(null); // Resetea el paciente seleccionado
  };

  const handleDetailModalOpen = (record) => {
    setSelectedAntecedentes(record.antecedentes); // Obtiene los antecedentes del paciente seleccionado
    setSelectedPatient(record.usuario); // Establece el paciente seleccionado
    setIsDetailModalVisible(true); // Abre el modal
  };

  const handleDetailModalClose = () => {
    setIsDetailModalVisible(false); // Cierra el modal
    setSelectedAntecedentes([]); // Resetea los antecedentes seleccionados
  };

  const patientColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre Completo',
      key: 'nombre_completo',
      render: (_, record) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (text) => (text ? 'Activo' : 'Inactivo'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => showModal(record)}>
            Registrar Antecedente
          </Button>
        </Space>
      ),
    },
  ];

  const antecedentesColumns = [
    {
      title: 'Paciente',
      dataIndex: 'usuario',
      key: 'usuario',
      render: (usuario) => `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button type="default" onClick={() => handleDetailModalOpen(record)}>
          Ver Detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2">
      <Title level={3} className="text-center">Registro de Antecedentes Médicos</Title>
      <Table
        columns={patientColumns}
        dataSource={patients}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
      <Title level={3} className="text-center mt-5">Lista de Antecedentes Médicos</Title>
      <Table
        columns={antecedentesColumns}
        dataSource={antecedentes}
        rowKey={(record) => record.usuario.id}
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
      <Modal
        title={`Registrar Antecedente - ${selectedPatient?.nombre} ${selectedPatient?.apellido_paterno}`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Registrar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tipo de Antecedente"
            name="tipo_antecedente"
            rules={[{ required: true, message: 'Por favor, seleccione el tipo de antecedente' }]}
          >
            <Select placeholder="Seleccione un tipo">
              <Option value="cirugia">Cirugía</Option>
              <Option value="alergia">Alergia</Option>
              <Option value="enfermedad">Enfermedad</Option>
              <Option value="otro">Otro</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: 'Por favor, ingrese una descripción' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Detalles del Paciente - ${selectedPatient?.id}`}
        visible={isDetailModalVisible}
        onCancel={handleDetailModalClose}
        footer={null}
      >
        <ul>
          <li><b>ID del Paciente:</b> {selectedPatient?.id}</li>
          <b>IDs de Antecedentes:</b>
          <ul>
            {selectedAntecedentes.map((antecedente) => (
              <li key={antecedente.id}>{antecedente.id}</li>
            ))}
          </ul>
        </ul>
      </Modal>
    </div>
  );
};

export default Antecedentes;
