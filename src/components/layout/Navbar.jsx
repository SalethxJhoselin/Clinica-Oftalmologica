import assets from '../../utils';
import { navLists } from '../../utils';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CurrentUser from './NavbarComponents/CurrentUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import Toggel from './NavbarComponents/Toggel';


const Navbar = ({ isLoggedIn, userType }) => {
    const [isLoggedOut, setIsLoggedOut] = useState(isLoggedIn)
    const handleLogOut = () => {
        setIsLoggedOut(!isLoggedOut);
        //solo es para prueba, modificar por el token 
        window.localStorage.setItem("loggedIn", "false");
        navigate("/login")
    };
    //const navigate=useNavigate()
    const user=localStorage.getItem("loggedIn")||""
    
    console.log("isLoggedIn");
    console.log(isLoggedIn);
    
    console.log(isLoggedOut)
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
                {/*{!isLoggedOut && (<>
                    <Button type="default" shape="round" href='/login'>
                        <LoginOutlined />
                    </Button>
                    <Button type="primary" shape="round" href='/register'>
                        <UserAddOutlined />
                    </Button>
                </>)}
                {isLoggedOut && (<>
                    <Button shape="round" onClick={handleLogOut}>Cerrar sesion</Button>
                    <CurrentUser userType={userType} />
                </>)}*/}
                {!user? (<>
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
                </>)}

            </div>
        </header>
    )
}
export default Navbar