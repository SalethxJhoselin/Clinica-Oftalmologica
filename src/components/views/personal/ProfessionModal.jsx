import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

const ProfessionModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [professionName, setProfessionName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if (!professionName) {
            messageApi.error('El nombre de la profesión es requerido');
            return;
        }

        // Enviar datos al backend
        axios.post('https://clinica-oftalmologica.onrender.com/profesiones/crear', { nombre: professionName })
            .then(() => {
                messageApi.success('Profesión guardada exitosamente');
                setProfessionName('');
                setIsModalOpen(false);
                getDatos(); // Actualiza la lista de profesiones
            })
            .catch(error => {
                console.error('Error al crear la profesión:', error);
                messageApi.error('Error al guardar la profesión');
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setProfessionName('');
    };

    return (
        <>
            <Button style={{
                backgroundColor: '#4CAF50', // Color de fondo
                color: '#fff', // Color del texto
                borderRadius: '15px', // Bordes redondeados
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Sombra
            }}
                onClick={() => setIsModalOpen(true)}>
                <PlusOutlined />
                <span>Nuevo</span>
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