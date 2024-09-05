import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/users/AuthContext';
import assets from '../../utils';
import { user } from '../../utils/test';//solo para prueba,

const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = (values) => {
        const { username, password } = values;        
        const foundUser = user.find(u => u.CI === username && u.password === password);//validamos las credenciales
        if (foundUser) { // Simula validación exitosa
            login();// Llamamos a la función login del AuthContext,actualiza el estado isLoggedIn y guarda la información de sesión en el localStorage
            navigate('/home');  // Redirigimos al usuario a la página principal
        } else {
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
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                >
                    <h1 className='py-5'>Inicio de sesión</h1>
                    <Form.Item name="username" rules={[{ required: true, message: 'Por favor ingrese su usuario!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="Usuario" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Recordar</Checkbox>
                            </Form.Item>
                            <a href="/forgotPassword">Olvidé mi contraseña</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Ingresar</Button>
                    </Form.Item>
                    <h1>Aún no tienes una cuenta? <a href="/register">¡Regístrate!</a></h1>
                </Form>
            </div>
        </div>
    );
};

export default FormLogin;
