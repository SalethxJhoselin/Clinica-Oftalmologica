import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { getUserByCI } from '../../../api/apiService';
import dayjs from 'dayjs';

const RegistrationAppointment = ({ selectedSpecialist, selectedDate, startTime, isModalVisible, handleCancel, onAppointmentConfirmed }) => {
    const [comentario, setComentario] = useState('');
    const [ci, setCi] = useState('');
    const [user, setUser] = useState(null);
    const [localTime, setLocalTime] = useState(null);

    const fetchLocalTime = async (lat, lon) => {
        try {
            const response = await fetch(`http://worldtimeapi.org/api/timezone/Etc/GMT`);
            const data = await response.json();
            const currentTime = data.datetime;
            setLocalTime(currentTime);
        } catch (error) {
            console.error("Error obteniendo la hora local:", error);
        }
    };

    const getLocationAndTime = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchLocalTime(latitude, longitude); // Obtener la hora local utilizando la ubicación
            }, (error) => {
                console.error("Error obteniendo la geolocalización:", error);
            });
        } else {
            console.error("Geolocalización no soportada por el navegador");
        }
    };

    useEffect(() => {
        getLocationAndTime();
    }, []);

    const getByCI = async () => {
        try {
            const response = await getUserByCI(ci);
            console.log("response", response);
            setUser(response);
        } catch (error) {
            console.error("No se pudo obtener los datos", error);
        }
    };

    // Función para manejar el envío de datos al componente padre
    const handleSubmit = () => {
        const appointmentData = {
            usuario_id: user?.id,
            especialista_id: selectedSpecialist.profId,
            servicio_id: selectedSpecialist.servicioId,
            fecha: selectedDate.format('YYYY-MM-DD'),
            hora: startTime,
            comentario: comentario,
            fecha_hora_actual: localTime
        };

        console.log('Datos enviados al backend:', JSON.stringify(appointmentData, null, 2));

        // Enviar los datos al componente padre mediante la prop onAppointmentConfirmed
        onAppointmentConfirmed(appointmentData);
        console.log("appointmentData", appointmentData)


        // Cerrar el modal
        handleCancel();
    };

    const handleCiEnter = async (e) => {
        e.preventDefault();
        await getByCI();
    };

    return (
        <Modal
            title="Confirmar Cita"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            width={700}
            className="p-4 bg-white rounded-lg shadow-md"
        >
            <div className="mb-4">
                <p className="text-lg font-bold text-gray-700 mb-2"><strong>Medico:</strong> {selectedSpecialist.nombreCompleto}</p>
                <p className="text-base text-gray-600 mb-1"><strong>Servicio:</strong> {selectedSpecialist.servicio}</p>
                <p className="text-base text-gray-600 mb-1"><strong>Precio:</strong> {selectedSpecialist.precio} USD</p>
                <p className="text-base text-gray-600 mb-1"><strong>Fecha:</strong> {selectedDate.format('YYYY-MM-DD')}</p>
                <p className="text-base text-gray-600 mb-4"><strong>Hora de Reserva:</strong> {startTime}</p>
            </div>

            {user && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos del Paciente</h3>
                    <p className="text-base text-gray-600"><strong>Nombre completo:</strong> {`${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`}</p>
                    <p className="text-base text-gray-600"><strong>Fecha de nacimiento:</strong> {dayjs(user.fecha_nacimiento).format('YYYY-MM-DD')}</p>
                    <p className="text-base text-gray-600"><strong>Teléfono:</strong> {user.telefono}</p>
                </div>
            )}
            <Form layout="vertical" onFinish={handleSubmit} requiredMark="optional">
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
                <div className="flex justify-end">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        style={{ marginRight: '10px' }}
                    >
                        Confirmar Cita
                    </Button>
                    <Button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Cancelar
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default RegistrationAppointment;
