import React, { useEffect, useState } from 'react';
import { Table, Button, Tag } from 'antd';
import dayjs from 'dayjs';
import RegistrationAppointment from './RegistrationAppointment'; // Componente para confirmar cita

const SlotsTable = ({ selectedSpecialist, selectedDate }) => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null); // Estado para manejar el cupo seleccionado
    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para abrir/cerrar el modal de registro
    const [isViewDetail, setIsViewDetail] = useState(false); // Estado para manejar si es vista de detalles
    const [reservations, setReservations] = useState([]); // Citas reservadas desde la API

    // Simulamos una llamada a la API para obtener las citas reservadas
    const fetchReservations = async () => {
        try {
            const response = await fetch("https://clinica-oftalmologica.onrender.com/citas/listar");
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    // Generar los slots disponibles
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
        fetchReservations(); // Cargar las citas reservadas cuando el componente se monta
    }, []);

    useEffect(() => {
        if (selectedSpecialist && reservations.length > 0) {
            const generatedSlots = generateSlots(
                selectedSpecialist.horaInicio,
                selectedSpecialist.horaFinal,
                selectedSpecialist.tiempoEstimado
            );

            // Filtrar los slots disponibles basándonos en las reservas existentes
            const availableSlots = generatedSlots.filter(slot => {
                // Formateamos la fecha en el formato correcto
                const formattedSelectedDate = selectedDate.add(1, 'day').format('DD-MM-YYYY'); // Agregar un día
                // Filtramos solo aquellos que no coinciden con las citas ya reservadas
                const isReserved = reservations.some(reservation => {
                    const formattedReservationDate = dayjs(reservation.fecha).add(1, 'day').format('DD-MM-YYYY'); // Agregar un día
                    const formattedReservationHour = dayjs(reservation.hora, 'HH:mm').format('HH:mm');
                    const formattedSlotHour = slot.horaInicio;

                    // Mostrar en la consola las comparaciones
                    console.log(`Comparando...`);
                    console.log(`Fecha Slot: ${formattedSelectedDate} - Fecha Reserva: ${formattedReservationDate}`);
                    console.log(`Hora Slot: ${formattedSlotHour} - Hora Reserva: ${formattedReservationHour}`);
                    console.log(`Especialista Slot: ${selectedSpecialist.nombre} - Especialista Reserva: ${reservation.especialista}`);
                    console.log(`Servicio Slot: ${selectedSpecialist.servicio} - Servicio Reserva: ${reservation.servicio}`);

                    const isMatch = (
                        reservation.especialista === selectedSpecialist.nombre &&
                        reservation.servicio === selectedSpecialist.servicio &&
                        formattedReservationDate === formattedSelectedDate && // Compara la fecha
                        formattedReservationHour === formattedSlotHour // Compara la hora de inicio
                    );
                    console.log(`Resultado de la comparación: ${isMatch}`);
                    return isMatch; // Retorna true si hay coincidencia
                });
                return !isReserved; // Solo mostrar los slots que no están reservados
            });

            setSlots(availableSlots);
        }
    }, [selectedSpecialist, selectedDate, reservations]); // Recalcular los slots disponibles cada vez que cambien estas dependencias

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

        // Aquí deberías agregar la nueva reserva al backend, por ejemplo:
        const newReservation = { horaInicio: selectedSlot.horaInicio, ci_usuario: appointmentData.ci_usuario };
        setReservations([...reservations, newReservation]);

        // Actualizar la tabla de slots
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
