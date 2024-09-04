import React from 'react';
import { useAuth } from '../users/AuthContext';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import assets from '../../utils';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="bg-white w-full py-3 sm:px-10 px-5 flex justify-between justify-center screen-max-width items-center fixed top-0 z-50">
            <img src={assets.eyeImg} alt="Eye" width={30} className="cursor-pointer" />
            <div className="flex items-baseline space-x-4">
                {!isLoggedIn && (
                    <>
                        <Button type="default" shape="round" href='/login'>
                            <LoginOutlined />
                        </Button>
                        <Button type="primary" shape="round" href='/register'>
                            <UserAddOutlined />
                        </Button>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Button shape="round" onClick={logout}>Cerrar sesión</Button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
