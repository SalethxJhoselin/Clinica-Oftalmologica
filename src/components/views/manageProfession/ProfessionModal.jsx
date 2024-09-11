import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';

const ProfessionModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [professionName, setProfessionName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        // Simulación de creación de la profesión
        console.log(`Simulación de creación de la profesión con nombre: ${professionName}`);
        getDatos();
        setProfessionName('');
        messageApi.success('Profesión guardada exitosamente');
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setProfessionName('');
    };

    return (
        <>
            <Button className="w-full font-bold" onClick={() => setIsModalOpen(true)}>
                Agregar Profesión
            </Button>
            <Modal
                title="Agregar Profesión"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !professionName }}
            >
                <Input
                    placeholder="Nombre de la profesión..."
                    value={professionName}
                    onChange={(e) => setProfessionName(e.target.value)}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default ProfessionModal;