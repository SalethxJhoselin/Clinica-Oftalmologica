import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';

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
            <Button className="w-full font-bold" onClick={() => setIsModalOpen(true)}>
                Agregar Rol
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
