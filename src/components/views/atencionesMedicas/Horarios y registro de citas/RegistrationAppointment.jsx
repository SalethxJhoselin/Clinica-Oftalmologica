import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { getUserByCI, createBookingAppointment } from '../../../../api/apiService';
import MakePayments from './MakePayments';
import dayjs from 'dayjs';

const RegistrationAppointment = ({ selectedSpecialist, selectedDate, startTime, isModalVisible, handleCancel, onAppointmentConfirmed, ciPaciente, isViewDetail = false }) => {
    const [comentario, setComentario] = useState('');
    const [ci, setCi] = useState(ciPaciente || '');
    const [user, setUser] = useState(null);
    const [localTime, setLocalTime] = useState(null);

    const resetForm = () => {
        setComentario('');
        setCi('');
        setUser(null);
        setLocalTime(null);
    };

    const fetchLocalTime = async () => {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/Etc/GMT`);
            const data = await response.json();
            const currentTime = dayjs(data.datetime).format('YYYY-MM-DD HH:mm');
            setLocalTime(currentTime);
        } catch (error) {
            console.error("Error obteniendo la hora local:", error);
        }
    };

    useEffect(() => {
        fetchLocalTime();
    }, []);

    useEffect(() => {
        if (ciPaciente) {
            getByCI();
        }
    }, [ciPaciente]);

    const getByCI = async () => {
        try {
            console.log(ci)
            const response = await getUserByCI(ci);
            setUser(response);
        } catch (error) {
            console.error("No se pudo obtener los datos", error);
        }
    };

    const handleSubmitAppointment = async () => {
        const appointmentData = {
            usuario_id: user?.id,
            especialista_id: selectedSpecialist.profId,
            servicio_id: selectedSpecialist.servicioId,
            fecha: selectedDate.format('YYYY-MM-DD'),
            hora: startTime,
            comentario: comentario,
            fecha_hora_actual: localTime
        };

        try {
            await createBookingAppointment(appointmentData);
            message.success('Cita creada con éxito');
            resetForm();
            handleCancel();
        } catch (error) {
            message.error('Error al crear la cita');
            console.error("Error creando la cita:", error);
        }
    };

    const handleCiEnter = async (e) => {
        e.preventDefault();
        await getByCI();
    };

    const handlePaymentConfirmation = () => {
        handleSubmitAppointment();
    };

    return (
        <Modal
            title={isViewDetail ? "Detalles de la Cita" : "Confirmar Cita"}
            visible={isModalVisible}
            onCancel={() => {
                handleCancel();
                resetForm();
            }}
            footer={null}
            width={700}
            className="p-4 bg-white rounded-lg shadow-md"
        >
            <div className="mb-4">
                <p className="text-lg font-bold text-gray-700 mb-2"><strong>Médico:</strong> {selectedSpecialist.nombreCompleto}</p>
                <p className="text-base text-gray-600 mb-1"><strong>Especialidad:</strong> {selectedSpecialist.especialidad}</p> {/* Mostrar la especialidad */}
                <p className="text-base text-gray-600 mb-1"><strong>Servicio:</strong> {selectedSpecialist.servicio}</p>
                <p className="text-base text-gray-600 mb-1"><strong>Precio:</strong> {selectedSpecialist.precio} BOB</p>
                <p className="text-base text-gray-600 mb-1"><strong>Fecha:</strong> {selectedDate.format('YYYY-MM-DD')}</p>
                <p className="text-base text-gray-600 mb-4"><strong>Hora de Reserva:</strong> {startTime}</p>
            </div>
            {user && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos del Paciente</h3>
                    <p className="text-base text-gray-600"><strong>Nombre completo:</strong> {`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</p> {/* Mostrar nombre completo */}
                    <p className="text-base text-gray-600"><strong>CI:</strong> {ci}</p>
                    <p className="text-base text-gray-600"><strong>Fecha de nacimiento:</strong> {dayjs(user.fecha_nacimiento).format('YYYY-MM-DD')}</p>
                    <p className="text-base text-gray-600"><strong>Teléfono:</strong> {user.telefono}</p>
                </div>
            )}

            {!isViewDetail && ( // Muestra solo si no es la vista de detalles
                <>
                    <Form layout="vertical">
                        <Form.Item
                            label="Número de CI"
                            name="ci"
                            rules={[{ required: true, message: 'Por favor, ingresa un número de CI.' }]}
                            className="mb-4"
                        >
                            <Input
                                placeholder="Ingresa tu número de CI"
                                value={ci}
                                onChange={(e) => setCi(e.target.value)}
                                onPressEnter={handleCiEnter}
                                className="border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Comentario"
                            name="comentario"
                            rules={[{ required: true, message: 'Por favor, ingresa un comentario.' }]}
                            className="mb-4"
                        >
                            <Input.TextArea
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                                placeholder="Añadir un comentario (ej: consulta por emergencia)"
                                className="border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </Form.Item>
                    </Form>

                    <MakePayments
                        user={user}
                        selectedSpecialist={selectedSpecialist}
                        comentario={comentario}
                        onPaymentSuccess={handlePaymentConfirmation}  // Enlazar la confirmación del pago
                    />
                </>
            )}
        </Modal>
    );
};

export default RegistrationAppointment;
