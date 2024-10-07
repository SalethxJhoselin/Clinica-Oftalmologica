import { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Select, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchRoles, getProfessions, getUserByCI, createEmployee } from '../../../api/apiService';
const { Option } = Select;

const RegisterEmployee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesData = await fetchRoles();
                const professionsData = await getProfessions();
                setRoles(rolesData);
                setProfessions(professionsData);
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
        setUserData(null); // Limpiar los datos del usuario al cerrar el modal
    };

    const onFinish = async (values) => {
        try {
            // Mapear valores del formulario al formato esperado por el backend
            const employeeData = {
                direccion: values.direccion,
                fecha_contratacion: values.fechaContratacion.format('YYYY-MM-DD'),
                usuario_id: userData?.id || null,
                profesiones_id: values.profesion,
                estadoo: values.estado === 'activo' ? 'true' : 'false',
                rol_id: values.rol,
            };

            await createEmployee(employeeData); // Enviar datos al backend
            message.success('Empleado registrado exitosamente');
            form.resetFields();
            setIsModalOpen(false);
        } catch (error) {
            message.error('Error al registrar el empleado');
        }
    };

    const handleEnterCI = async (e) => {
        const ciValue = e.target.value;
        try {
            console.log("ciValue")
            console.log(ciValue)
            const user = await getUserByCI(ciValue);
            console.log("user")
            console.log(user)
            setUserData(user);
            form.setFieldsValue({
                ci: user.ci,
                apellidoPaterno: user.apellido_paterno,
                apellidoMaterno: user.apellido_materno,
                nombres: user.nombre,
                email: user.email,
            });
        } catch (error) {
            message.error('Error al obtener los datos del empleado');
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
                <span>Registrar Empleado</span>
            </Button>
            <Modal
                title="Registrar Empleado"
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
                    <Form.Item
                        name="genero"
                        label="Género"
                    >
                        <Select>
                            <Option value="Masculino">Masculino</Option>
                            <Option value="Femenino">Femenino</Option>
                        </Select>
                    </Form.Item>
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
                        name="profesion"
                        label="Profesión"
                        rules={[{ required: true, message: 'Por favor seleccione la profesión' }]}
                    >
                        <Select>
                            {professions.map(prof => (
                                <Option key={prof.id} value={prof.id}>{prof.nombre}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="rol"
                        label="Rol"
                        rules={[{ required: true, message: 'Por favor seleccione el rol' }]}
                    >
                        <Select>
                            {roles.map(role => (
                                <Option key={role.id} value={role.id}>{role.nombre}</Option>
                            ))}
                        </Select>
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
                        name="fechaContratacion"
                        label="Fecha de Contratación"
                    >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RegisterEmployee;
