import assets from '../../utils';
import { navLists } from '../../utils';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CurrentUser from './NavbarComponents/CurrentUser';
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userType }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Verificar el estado de autenticación al cargar el componente
    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogOut = () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.removeItem("authToken");  // Eliminar el token de autenticación
        setIsLoggedIn(false);
        navigate("/login");  // Redirige al usuario a la página de inicio de sesión
    };
    return (
        <header className="bg-white w-full py-3 sm:px-10 px-5 flex justify-between justify-center screen-max-width items-center">
            <img src={assets.eyeImg} alt="Eye" width={30}
                height={0} className="cursor-pointer"
            />
            <div className="flex flex-1 justify-center items-center max-sm:hidden">
                {navLists.map((nav) => (
                    <div key={nav} className="px-6 text-sm cursor-pointer text-gray 
                        hover:text-black transition-all">
                        {nav}
                    </div>
                ))}
            </div>
            <div className="flex items-baseline max-sm:justify-end max-sm:flex-1 space-x-4">
                {!isLoggedIn && (<>
                    <Button type="default" shape="round" href='/login'>
                        <LoginOutlined />
                    </Button>
                    <Button type="primary" shape="round" href='/register'>
                        <UserAddOutlined />
                    </Button>
                </>)}
                {isLoggedIn && (<>
                    <Button shape="round" onClick={handleLogOut}>Cerrar sesion</Button>
                    <CurrentUser userType={userType} />
                </>)}
                {/*{!isLoggedIn ? (<>
                    <Button type="default" shape="round" href='/login'>
                        <LoginOutlined />
                    </Button>
                    <Button type="primary" shape="round" href='/register'>
                        <UserAddOutlined />
                    </Button>
                </>):
                 (<>
                    <Button shape="round" onClick={handleLogOut}>Cerrar sesion</Button>
                    <CurrentUser userType={userType} />
                </>)}*/}

            </div>
        </header>
    )
}
export default Navbar