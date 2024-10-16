// components/SaludoPopover.js
import React, { useEffect, useState } from 'react';
import { Popover, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';  
import { useUser } from '../../context/UserContext';
import { getUserByCI } from '../../api/apiService';

const UserPopover = () => {
    const { userCi } = useUser();
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserByCI(userCi); 
                console.log("response",response)
                setUser(response); 
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        if (userCi) {
            fetchUser(); 
        }
    }, [userCi]);

    if (!user) {
        return null; 
    }

    const hasImage = Boolean(user.imagen);

    return (
        <Popover
            content={
                <div className="p-4 text-center">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                        {user.nombre} {user.apellido_paterno} {user.apellido_materno}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    <Button 
                        type="link" 
                        className="text-blue-500 text-sm p-0" 
                        onClick={() => navigate('/perfil')}
                    >
                        Ver Perfil
                    </Button>
                </div>
            }
            title={null}
            trigger="hover"
            overlayClassName="rounded-lg shadow-lg bg-white"
        >
            <div className="w-10 h-10 rounded-full bg-blue flex items-center justify-center overflow-hidden cursor-pointer">  {/* Agregado cursor-pointer */}
                {hasImage ? (
                    <img 
                        src={user.imagen} 
                        alt="Avatar del usuario" 
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    <UserOutlined className="text-white text-2xl" /> 
                )}
            </div>
        </Popover>
    );
};

export default UserPopover;
