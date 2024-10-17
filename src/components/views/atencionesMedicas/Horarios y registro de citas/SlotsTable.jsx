import React, { useEffect, useState } from 'react';
import { Table, Button, Tag } from 'antd';
import dayjs from 'dayjs';
import RegistrationAppointment from './RegistrationAppointment'; // Componente para confirmar cita

const SlotsTable = ({ selectedSpecialist, selectedDate }) => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null); // Estado para manejar el cupo seleccionado
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para abrir/cerrar el modal de registro
    const [isViewDetail, setIsViewDetail] = useState(false); // Estado para manejar si es vista de detalles

    // Datos de reservaciones simuladas
    const reservaciones = [
        { horaInicio: "03:30", ci_usuario: 10101010 },
        { horaInicio: "00:00", ci_usuario: 10101010 },
        { horaInicio: "00:30", ci_usuario: 10101010 },
        { horaInicio: "02:30", ci_usuario: 10101010 }
    ];

    const generateSlots = (horaInicio, horaFinal, tiempoEstimado) => {
        const slotsArray = [];
        let currentTime = dayjs(`${selectedDate.format('YYYY-MM-DD')}T${horaInicio}`);
        const endTime = dayjs(`${selectedDate.format('YYYY-MM-DD')}T${horaFinal}`);

        let index = 1;
        while (currentTime.isBefore(endTime)) {
            const slotEndTime = currentTime.add(tiempoEstimado, 'minute');
            if (slotEndTime.isAfter(endTime)) break;

            slotsArray.push({
                key: currentTime.format('HH:mm'),
                numero: index++,
                paciente: '',
                estado: 'Disponible',
                horaInicio: currentTime.format('HH:mm'),
                horaFinal: slotEndTime.format('HH:mm'),
                accion: 'Reservar',
                isReserved: false
            });
            currentTime = slotEndTime;
        }
        return slotsArray;
    };

    useEffect(() => {
        if (selectedSpecialist) {
            const generatedSlots = generateSlots(
                selectedSpecialist.horaInicio,
                selectedSpecialist.horaFinal,
                selectedSpecialist.tiempoEstimado
            );
            const updatedSlots = generatedSlots.map(slot => {
                const reservacion = reservaciones.find(
                    r => r.horaInicio === slot.horaInicio
                );
                if (reservacion) {
                    return {
                        ...slot,
                        paciente: `CI: ${reservacion.ci_usuario}`,
                        estado: 'Reservado',
                        isReserved: true,
                        accion: 'Ver Detalles'
                    };
                }
                return slot;
            });
            setSlots(updatedSlots);
        }
    }, [selectedSpecialist, selectedDate]);

    const handleReservation = (slotKey) => {
        const selected = slots.find(slot => slot.key === slotKey);

        if (selected.accion === 'Reservar') {
            // Modo de reservar cita
            setSelectedSlot(selected);
            setIsModalVisible(true);
            setIsViewDetail(false); // No es detalle, es para reservar
        } else {
            // Modo de ver detalles de la cita
            setSelectedSlot(selected);
            setIsModalVisible(true);
            setIsViewDetail(true); // Es detalle, no reservar
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Cierra el modal de registro o de detalles
    };

    const handleAppointmentConfirmed = (appointmentData) => {
        console.log('Cita confirmada:', appointmentData);
        setIsModalVisible(false); // Cerrar el modal después de confirmar

        // Simula una actualización de las reservaciones
        const newReservacion = { horaInicio: selectedSlot.horaInicio, ci_usuario: appointmentData.ci_usuario };
        reservaciones.push(newReservacion); // Aquí se debería hacer una llamada para actualizar las reservas reales

        // Actualizar la tabla
        const updatedSlots = slots.map(slot => {
            if (slot.key === selectedSlot.key) {
                return {
                    ...slot,
                    paciente: `CI: ${appointmentData.ci_usuario}`,
                    estado: 'Reservado',
                    isReserved: true,
                    accion: 'Ver Detalles'
                };
            }
            return slot;
        });
        setSlots(updatedSlots);
    };

    const slotColumns = [
        {
            title: '#',
            dataIndex: 'numero',
            key: 'numero',
            width: 50
        },
        {
            title: 'Hora Inicio',
            dataIndex: 'horaInicio',
            key: 'horaInicio'
        },
        {
            title: 'Hora Final',
            dataIndex: 'horaFinal',
            key: 'horaFinal'
        },
        {
            title: 'Paciente',
            dataIndex: 'paciente',
            key: 'paciente',
            width: 200
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            width: 150,
            render: (text) => (
                <Tag color={text === 'Disponible' ? 'green' : 'yellow'}>{text}</Tag>
            )
        },
        {
            title: 'Acción',
            key: 'accion',
            width: 100,
            render: (_, slot) => (
                <Button
                    onClick={() => handleReservation(slot.key)}
                    type={slot.accion === 'Ver Detalles' ? 'default' : 'primary'} // Cambia el botón según la acción
                >
                    {slot.accion}
                </Button>
            )
        }
    ];

    return (
        <div>
            <h3 className="text-center text-xl font-bold mb-4">Cupos disponibles</h3>
            <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                <Table columns={slotColumns} dataSource={slots} pagination={false} size="small" />
            </div>
            {selectedSlot && (
                <RegistrationAppointment
                    selectedSpecialist={selectedSpecialist}
                    selectedDate={selectedDate}
                    startTime={selectedSlot.horaInicio}
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    onAppointmentConfirmed={handleAppointmentConfirmed}
                    ciPaciente={selectedSlot.paciente.split(': ')[1]} // Pasamos el CI del paciente
                    isViewDetail={isViewDetail} // Indica si es para ver detalles
                />
            )}
        </div>
    );
};

export default SlotsTable;

//cuando el cliente reserve una cita, 