import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

const PatientModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientBirthDate, setPatientBirthDate] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const handleOk = () => {
        if (!patientName || !patientAge || !patientBirthDate) {
            messageApi.error('Todos los campos son requeridos');
            return;
        }

        // Enviar datos al backend
        axios.post('https://clinica-oftalmologica.onrender.com/pacientes/crear', { 
            nombre: patientName,
            edad: patientAge,
            fechaNacimiento: patientBirthDate 
        })
            .then(() => {
                messageApi.success('Paciente guardado exitosamente');
                setPatientName('');
                setPatientAge('');
                setPatientBirthDate('');
                setIsModalOpen(false);
                getDatos(); // Actualiza la lista de pacientes
            })
            .catch(error => {
                console.error('Error al crear el paciente:', error);
                messageApi.error('Error al guardar el paciente');
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPatientName('');
        setPatientAge('');
        setPatientBirthDate('');
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
                <span>Nuevo Paciente</span>
            </Button>
            <Modal
                title="Agregar Paciente"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !(patientName && patientAge && patientBirthDate) }}
            >
                <Input
                    placeholder="Nombre del paciente..."
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />
                <Input
                    placeholder="Edad del paciente..."
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    type="number"
                />
                <Input
                    placeholder="Fecha de nacimiento..."
                    value={patientBirthDate}
                    onChange={(e) => setPatientBirthDate(e.target.value)}
                    type="date"
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default PatientModal;