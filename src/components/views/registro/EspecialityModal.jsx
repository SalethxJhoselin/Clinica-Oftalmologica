import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const EspecialityModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [specialityName, setSpecialityName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        // Simulación de creación de la especialidad
        console.log(`Simulación de creación de la especialidad con nombre: ${specialityName}`);
        getDatos(); // Actualiza la lista de especialidades
        setSpecialityName(''); // Limpiar el campo de entrada
        messageApi.success('Especialidad guardada exitosamente');
        setIsModalOpen(false); // Cierra el modal
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSpecialityName(''); // Limpiar el campo de entrada al cancelar
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
                <span>Nueva Especialidad</span>
            </Button>
            <Modal
                title="Agregar Especialidad"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !specialityName }} // Desactivar botón si el nombre está vacío
            >
                <Input
                    placeholder="Nombre de la especialidad..."
                    value={specialityName}
                    onChange={(e) => setSpecialityName(e.target.value)}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default EspecialityModal;