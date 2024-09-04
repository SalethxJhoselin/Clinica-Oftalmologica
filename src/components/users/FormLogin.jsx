import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import assets from '../../utils';
import ForgotPassword from './ForgotPassword';
import { user } from '../../utils/test';

const FormLogin = () => {
    const navigate = useNavigate(); // Para redirigir al usuario

    const onFinish = (values) => {
        const { username, password } = values;
        const foundUser = user.find(u => u.CI === username && u.password === password);
        if (foundUser) {
            // Si las credenciales coinciden, simular un inicio de sesión exitoso
            window.localStorage.setItem("loggedIn", "true");
            const simulatedToken = 'simulated_jwt_token_1234567890';
            localStorage.setItem('authToken', simulatedToken);

            console.log('Inicio de sesión exitoso, token: ', simulatedToken);

            // Redirigir al usuario a la página "Home"
            navigate('/home');
        } else {
            // Si las credenciales no coinciden, mostrar un mensaje de error
            console.log('Error: Usuario o contraseña incorrectos');
        }

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