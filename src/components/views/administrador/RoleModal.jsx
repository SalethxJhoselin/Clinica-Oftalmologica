import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const RoleModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        // Simulación de creación del rol
        console.log(`Simulación de creación del rol con nombre: ${roleName}`);
        getDatos();
        setRoleName('');
        messageApi.success('Rol guardado exitosamente');
        setIsModalOpen(false);
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
                <span>Nuevo</span>
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
