import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Typography, Space } from 'antd';
import axios from 'axios';
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
            console.log('Datos enviados:', payload); // Muestra los datos que se enviarán

            // Enviar los datos al backend
            const response = await axios.post('https://clinica-oftalmologica.onrender.com/antecedentes/crear', payload);

            if (response.status === 201 || response.status === 200) {
                message.success('Antecedente registrado exitosamente');
                setIsModalVisible(false); // Cierra el modal
                form.resetFields(); // Limpia el formulario
            } else {
                throw new Error('Error al registrar antecedente');
            }
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
                    <Form.Item
                        label="Específico 1"
                        name="especifico1"
                        rules={[{ required: true, message: 'Por favor, ingrese un valor para Específico 1' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Específico 2"
                        name="especifico2"
                        rules={[{ required: true, message: 'Por favor, ingrese un valor para Específico 2' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Fecha del Evento"
                        name="fecha_evento"
                        rules={[{ required: true, message: 'Por favor, seleccione la fecha del evento' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="es_importante"
                        valuePropName="checked"
                    >
                        <Select>
                            <Option value={true}>Importante</Option>
                            <Option value={false}>No</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={`Detalles de Antecedentes - ${selectedPatient?.nombre} ${selectedPatient?.apellido_paterno}`}
                visible={isDetailModalVisible}
                onCancel={handleDetailModalClose}
                footer={null}
                width="80%"
            >
                <Table
                    dataSource={selectedAntecedentes}
                    columns={[
                        { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
                        { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
                        { title: 'Específico 1', dataIndex: 'especifico1', key: 'especifico1' },
                        { title: 'Específico 2', dataIndex: 'especifico2', key: 'especifico2' },
                        { title: 'Fecha del Evento', dataIndex: 'fecha_evento', key: 'fecha_evento' },
                        { title: 'Importante', dataIndex: 'es_importante', key: 'es_importante', render: (text) => (text ? 'Sí' : 'No') },
                    ]}
                    rowKey="id"
                    pagination={false}
                    scroll={{ y: 300, x: '100%' }}
                />
            </Modal>
        </div>
    );
};

export default Antecedentes;
