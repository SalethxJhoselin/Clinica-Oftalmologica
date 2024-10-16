import React, { useEffect, useState } from 'react';
import { Table, Button, Tag } from 'antd';
import dayjs from 'dayjs';
import RegistrationAppointment from './RegistrationAppointment'; // Componente para confirmar cita

const SlotsTable = ({ selectedSpecialist, selectedDate }) => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null); // Estado para manejar el cupo seleccionado
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para abrir/cerrar el modal

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
            setSlots(generatedSlots);
        }
    }, [selectedSpecialist, selectedDate]);

    const handleReservation = (slotKey) => {
        const selected = slots.find(slot => slot.key === slotKey);
        setSelectedSlot(selected);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAppointmentConfirmed = (appointmentData) => {
        console.log('Cita confirmada:', appointmentData);
        setIsModalVisible(false); // Cerrar el modal después de confirmar
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
                    type="primary"
                    disabled={slot.isReserved}
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
                    onAppointmentConfirmed={handleAppointmentConfirmed} // Pasamos el callback aquí
                />
            )}
        </div>
    );
};

export default SlotsTable;
