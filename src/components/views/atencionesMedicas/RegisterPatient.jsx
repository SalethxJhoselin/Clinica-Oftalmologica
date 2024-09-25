import { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Select, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getUserByCI, createPatient } from '../../../api/apiService'; // Cambiamos las API
const { Option } = Select;

const RegisterPatient = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [bloodTypes, setBloodTypes] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bloodTypesData = await fetchBloodTypes();
                setBloodTypes(bloodTypesData); // Obtenemos tipos de sangre
            } catch (error) {
                message.error('Error al obtener datos.');
            }
        };
        fetchData();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setUserData(null); 
    };

    const onFinish = async (values) => {
        try {
            // Mapear valores del formulario al formato esperado por el backend
            const patientData = {
                ci: values.ci,
                nombre: values.nombres,
                apellidoPaterno: values.apellidoPaterno,
                apellidoMaterno: values.apellidoMaterno,
                fecha_nacimiento: values.fechaNacimiento.format('YYYY-MM-DD'),
                usuario_id: userData?.id || null,
                telefono: values.telefono,
                email: values.email,
                tipo_sangre: values.tipoSangre,  // Campo específico para pacientes
                direccion: values.direccion,
                estado: values.estado === 'activo' ? 'true' : 'false',
            };

            await createPatient(patientData); // Enviar datos al backend
            message.success('Paciente registrado exitosamente');
            form.resetFields();
            setIsModalOpen(false);
        } catch (error) {
            message.error('Error al registrar el paciente');
        }
    };

    const handleEnterCI = async (e) => {
        const ciValue = e.target.value;
        try {
            const user = await getUserByCI(ciValue);
            setUserData(user);
            form.setFieldsValue({
                ci: user.ci,
                apellidoPaterno: user.apellido_paterno,
                apellidoMaterno: user.apellido_materno,
                nombres: user.nombre,
                email: user.email,
            });
        } catch (error) {
            message.error('Error al obtener los datos del paciente');
        }
    };

    return (
        <>
            <Button
                style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    borderRadius: '15px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onClick={showModal}
            >
                <PlusOutlined />
                <span>Registrar Paciente</span>
            </Button>
            <Modal
                title="Registrar Paciente"
                visible={isModalOpen}
                onOk={form.submit}
                onCancel={handleCancel}
                okText="Registrar"
                cancelText="Cancelar"
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ estado: 'activo' }}
                >
                    <Form.Item
                        name="ci"
                        label="CI"
                    >
                        <Input onPressEnter={handleEnterCI} />
                    </Form.Item>
                    <Form.Item
                        name="apellidoPaterno"
                        label="Apellido Paterno"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="apellidoMaterno"
                        label="Apellido Materno"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nombres"
                        label="Nombres"
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        name="tipoSangre"
                        label="Tipo de Sangre"
                       
                    >
                         <Input />
                    </Form.Item> */}
                    <Form.Item
                        name="telefono"
                        label="Teléfono"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ type: 'email', message: 'El email no es válido' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="estado"
                        label="Estado"
                    >
                        <Select>
                            <Option value="activo">Activo</Option>
                            <Option value="inactivo">Inactivo</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="direccion"
                        label="Dirección"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fechaNacimiento"
                        label="Fecha de Nacimiento"
                    >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        name="observaciones"
                        label="observaciones"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RegisterPatient;