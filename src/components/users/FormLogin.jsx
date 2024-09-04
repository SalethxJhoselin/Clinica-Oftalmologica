import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import assets from '../../utils';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const navigate = useNavigate(); // Para redirigir al usuario

    const onFinish = (values) => {
        console.log('Enviando los datos del usuario: ', values);
        window.localStorage.setItem("loggedIn", "true");//simulando enviar los datos
        // Simular la respuesta del servidor con un token de autenticación
        const simulatedToken = 'simulated_jwt_token_1234567890';
        
        // Almacenar el token en localStorage (o sessionStorage)
        localStorage.setItem('authToken', simulatedToken);
        
        console.log('Token de autenticación simulado recibido: ', simulatedToken);

        // Redirigir al usuario a la página "Home"
        navigate('/home');
        
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
                    <h1 className='py-5'>Inicio de sesion</h1>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese su usuario!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Usuario" />
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
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Recordar</Checkbox>
                            </Form.Item>
                            <a href="/forgotPassword">Olvide mi contrasena</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Ingresar
                        </Button>
                    </Form.Item>
                    <h1>Aun no tienes una cuenta?  <a href="/register">Registrate!</a></h1>

                </Form>
            </div>
        </div>
    );
};
export default FormLogin;