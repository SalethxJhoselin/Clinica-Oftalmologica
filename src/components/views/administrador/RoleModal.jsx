import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createRole } from '../../../api/apiService';
import { useUser } from '../../../context/UserContext'; // Importamos el hook para obtener userSubId

const RoleModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    
    const { userSubId } = useUser(); // Obtenemos el userSubId desde el contexto

    const handleOk = async () => {
        try {
            if (!userSubId) {
                messageApi.error('No se pudo obtener el ID de usuario.');
                return;
            }
            await createRole(roleName, userSubId); // Pasamos userSubId a la función createRole
            console.log(`El usuario con ID ${userSubId} creo el rol: ${roleName}`);
            setIsModalOpen(false);
            setRoleName('');
            getDatos();
            messageApi.success('Rol guardado exitosamente');
        } catch (error) {
            console.error('Error al crear el rol:', error);
            messageApi.error('Error al guardar el rol');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setRoleName('');
    };

    return (
        <>
            <Button
                style={{
                    backgroundColor: '#4CAF50', // Color de fondo
                    color: '#fff', // Color del texto
                    borderRadius: '15px', // Bordes redondeados
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Sombra
                }}
                onClick={() => setIsModalOpen(true)}
            >
                <PlusOutlined />
                <span>Crear Rol</span>
            </Button>
            <Modal
                title="Agregar Rol"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !roleName }}
            >
                <Input
                    placeholder="Nombre del rol..."
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default RoleModal;
