import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { navLists } from '../../utils';
import CurrentUser from '../users/CurrentUser';
import assets from '../../utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 bg-white w-full py-3 px-20 flex justify-between border-b border-gray-300 shadow-md z-10 rounded-2xl">
            <Link to="/"><img src={assets.eye} alt="Eye" width={40} className="cursor-pointer" /></Link>
            {/*<div className="flex flex-1 justify-center items-center max-sm:hidden">
                {navLists.map((nav) => (
                    <div key={nav} className="px-1 text-sm cursor-pointer text-gray hover:text-black transition-all">
                        {nav}
                    </div>
                ))}
            </div>*/}
            <div className="flex items-baseline max-sm:justify-end max-sm:flex-1 space-x-4">
                {!isLoggedIn && (
                    <>
                        <Link to="/login">
                            <Button type="default" shape="round">
                                <LoginOutlined />
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button type="primary" shape="round">
                                <UserAddOutlined />
                            </Button>
                        </Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Button shape="round" onClick={logout}>Cerrar sesión</Button>
                        <Link to="/perfil">
                            <CurrentUser />
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
