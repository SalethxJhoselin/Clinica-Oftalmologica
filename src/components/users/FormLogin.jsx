import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import assets from '../../utils';
import { loginRequest } from '../../api/apiService';
import { useUser } from '../../context/UserContext';
import { jwtDecode } from 'jwt-decode';

const FormLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { userCi, userRol, userPermisos } = useUser();
    const {setUserCi, setUserRol, setUserPermisos} = useUser()

    const onFinish = async (values) => {
        const { username, password } = values;
        try {
            const data = await loginRequest(username, password);
            const { token } = data;
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            localStorage.setItem('token', token);

            setUserCi(decodedToken.ci);
            setUserRol(decodedToken.rol?.nombre || null);
            setUserPermisos(decodedToken.permisos?.map(permiso => permiso.nombre) || []);
            console.log(userCi)
            console.log(userRol)
            console.log(userPermisos)

            login();
            navigate('/home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.response.data);
        }
    };

    return (
        <div className="flex h-screen fixed top-0 left-0 right-0">
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
                            {/*<a href="/forgotPassword">Olvidé mi contraseña</a>*/}
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Ingresar</Button>
                    </Form.Item>
                    <h1>Aún no tienes una cuenta? <Link to="/register">¡Regístrate!</Link></h1>
                </Form>
            </div>
        </div>
    );
};

export default FormLogin;
