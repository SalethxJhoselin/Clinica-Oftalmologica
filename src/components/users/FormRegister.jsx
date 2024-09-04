import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker } from 'antd';
import assets from '../../utils';

const FormRegister = () => {
    const onFinish = (values) => {
        console.log('envia los datos del usuario: ', values);
    };

    return (
        <div className="flex h-screen">
            <div className="relative w-1/2 h-full overflow-hidden max-sm:hidden">
                <img
                    src={assets.auth}
                    alt="Background"
                    className="object-cover h-full"
                />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-white max-sm:w-full">
                <Form
                    name="Login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 360,
                    }}
                    onFinish={onFinish}
                >
                    <h1 className='py-3'>Registro de Usuario</h1>
                    <Form.Item
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su nombre!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nombre" />
                    </Form.Item>
                    <Form.Item
                        name="firstLastName"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su primer apellido!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Primer Apellido" />
                    </Form.Item>
                    <Form.Item
                        name="secondLastName"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su segundo apellido!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Segundo Apellido" />
                    </Form.Item>

                    <Form.Item
                        name="birthdate"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su fecha de nacimiento!'
                        }]}
                    >
                        <DatePicker prefix={<UserOutlined />} className="w-full" placeholder="Fecha de Nacimiento" />
                    </Form.Item>
                    <Form.Item
                        name="CI"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su CI!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="C.I." />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="E-mail" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su contrasena!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Contrasena" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese nuevamente su contrasena!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Confirmar Contrasena" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Registrarse
                        </Button>
                        <h1>Ya tienes una cuenta? <a href="/login">Inicia sesion!</a></h1>

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default FormRegister;