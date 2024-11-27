import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { getAllSpecialists, getAllPatients } from '../../../../api/apiService';
import axios from 'axios';

const { Option } = Select;

const ModalRegCirugia = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [specialists, setSpecialists] = useState([]); // Estado para almacenar los especialistas
    const [patients, setPatients] = useState([]); // Estado para almacenar los pacientes

    const [form] = Form.useForm();

    // Cargar especialistas y pacientes al montar el componente
    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await getAllSpecialists();
                setSpecialists(response);
            } catch (error) {
                console.error('Error al obtener especialistas:', error);
            }
        };

        const fetchPatients = async () => {
            try {
                const response = await getAllPatients();
                setPatients(response.data); // Usar response.data según los datos proporcionados
            } catch (error) {
                console.error('Error al obtener pacientes:', error);
            }
        };

        fetchSpecialists();
        fetchPatients();
    }, []);

    // Mostrar el modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Ocultar el modal
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // Resetea los campos del formulario
    };

    // Manejar el envío del formulario
    const handleSubmit = async (values) => {
        try {
            // Preparar los datos para el API
            const data = {
                id_paciente: values.paciente,
                id_especialista: values.especialista,
                fecha: values.fecha, // La fecha ya es un string con formato adecuado
                hora: values.hora || '', // Usar hora si existe
                tipo_cirugia: values.tipo_cirugia,
                observaciones: values.observaciones,
            };

            // Realizar la solicitud POST
            console.log(data);
            await axios.post('https://clinica-oftalmologica.onrender.com/cirugias/crear', data);

            message.success('Cirugía registrada exitosamente');
            setIsModalVisible(false); // Cierra el modal tras el registro
            form.resetFields(); // Resetea los campos del formulario
        } catch (error) {
            console.error('Error al registrar la cirugía:', error);
            message.error('Ocurrió un error al registrar la cirugía');
        }
    };

    return (
        <div className="flex justify-center items-center mt-5">
            {/* Botón para abrir el modal */}
            <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={showModal}
            >
                Registrar Cirugía
            </Button>

            {/* Modal */}
            <Modal
                title="Registrar Nueva Cirugía"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Oculta los botones predeterminados del modal
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4"
                >
                    {/* Campo Paciente */}
                    <Form.Item
                        name="paciente"
                        label="Paciente"
                        rules={[{ required: true, message: 'Por favor selecciona un paciente' }]} >
                        <Select placeholder="Selecciona un paciente" loading={!patients.length}>
                            {patients.map((patient) => (
                                <Option
                                    key={patient.usuario_id} // Usar paciente_id como clave única
                                    value={patient.usuario_id} // Enviar paciente_id en el formulario
                                >
                                    {`${patient.nombre} ${patient.apellido_paterno} ${patient.apellido_materno}`} {/* Mostrar nombre completo */}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Campo Especialista */}
                    <Form.Item
                        name="especialista"
                        label="Especialista"
                        rules={[{ required: true, message: 'Por favor selecciona un especialista' }]} >
                        <Select placeholder="Selecciona un especialista" loading={!specialists.length}>
                            {specialists.map((specialist) => (
                                <Option
                                    key={specialist.id}
                                    value={specialist.id}
                                >
                                    {`${specialist.usuario.nombre} ${specialist.usuario.apellido_paterno} ${specialist.usuario.apellido_materno}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Campo Fecha */}
                    <Form.Item
                        name="fecha"
                        label="Fecha"
                        rules={[{ required: true, message: 'Por favor selecciona una fecha' }]} >
                        <input
                            type="date"
                            value={form.getFieldValue('fecha')}
                            onChange={(e) => form.setFieldsValue({ fecha: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>

                    {/* Campo Hora */}
                    <Form.Item
                        name="hora"
                        label="Hora"
                        rules={[{ required: true, message: 'Por favor selecciona una hora' }]} >
                        <input
                            type="time"
                            value={form.getFieldValue('hora')}
                            onChange={(e) => form.setFieldsValue({ hora: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </Form.Item>

                    {/* Campo Tipo de Cirugía */}
                    <Form.Item
                        name="tipo_cirugia"
                        label="Tipo de Cirugía"
                        rules={[{ required: true, message: 'Por favor ingresa el tipo de cirugía' }]} >
                        <Input placeholder="Ejemplo: Cirugía de Cataratas" />
                    </Form.Item>

                    {/* Campo Observaciones */}
                    <Form.Item name="observaciones" label="Observaciones">
                        <Input.TextArea rows={3} placeholder="Escribe alguna observación (opcional)" />
                    </Form.Item>

                    {/* Botón de Enviar */}
                    <div className="flex justify-end">
                        <Button
                            type="default"
                            className="mr-2"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Registrar
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalRegCirugia;
