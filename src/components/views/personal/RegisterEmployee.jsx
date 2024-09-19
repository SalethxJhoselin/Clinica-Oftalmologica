import { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchRoles, getProfessions, getUserByCI } from '../../../api/apiService';

const { Option } = Select;
const datosss = {
    "id": 1,
    "ci": "123",
    "nombre": "Jhon",
    "apellido_paterno": "Andia",
    "apellido_materno": "Merino",
    "fecha_nacimiento": "2003-06-05T00:00:00.000Z",
    "email": "juan.perez@example.com",
    "password": "$2a$10$zyga.WM9Mof3574bCSZ5x.JNIjq2tiE7RYmNND2s.QzIjlQKtje1e",
    "rol_id": null,
    "estado": true,
    "telefono": null,
    "genero": null
}
const RegisterEmployee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch roles and professions on component mount
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

    const onFinish = (values) => {
        try {
            // Aquí puedes agregar la lógica para registrar al empleado
            console.log('Datos del empleado:', values);
            message.success('Empleado registrado exitosamente');
            form.resetFields(); 
            setIsModalOpen(false);
        } catch (error) {
            message.error('Error al registrar el empleado');
        }
    };
//rellena automaticamente en el form
    const handleEnterCI = async (e) => {
        const ciValue = e.target.value;
        try {
            const user = datosss; /*await getUserByCI(ciValue);*/ //no me funciona la peticion
            setUserData(user);
            console.log("user")
            console.log(user)
            form.setFieldsValue({
                ci: user.ci,
                apellidoPaterno: user.apellido_paterno,
                apellidoMaterno: user.apellido_materno,
                nombres: user.nombre,
                email: user.email,
                telefono: user.telefono || '',
                genero: user.genero || '',
                profesion: user.profesion?.id || undefined,
                rol: user.rol_id || undefined,
                estado: user.estado ? 'activo' : 'inactivo'
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Registrar Empleado
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RegisterEmployee;
