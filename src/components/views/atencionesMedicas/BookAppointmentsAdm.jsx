import React, { useEffect, useState } from 'react';
import { Table, DatePicker, Button, Tag } from 'antd';
import dayjs from 'dayjs';
import { specialistsSchedules } from '../../../utils/test'; // Importar la lista ajustada de especialistas

const BookAppointmentsAdm = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Fecha seleccionada (por defecto la fecha actual)
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [slots, setSlots] = useState([]); // Cupos generados basados en el tiempo estimado

  // Manejar el cambio de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filtrar los datos según la fecha seleccionada
  useEffect(() => {
    const selectedFormattedDate = selectedDate.format('YYYY-MM-DD');
    const filteredData = specialistsSchedules.flatMap((prof) =>
      prof.horarios.flatMap((horario) =>
        horario.fechas.includes(selectedFormattedDate)
          ? {
              key: prof.id,
              nombreCompleto: `${prof.nombre} ${prof.apellido_paterno} ${prof.apellido_materno}`,
              servicioId: horario.servicio.id, // ID del servicio
              servicio: horario.servicio.nombre, // Nombre del servicio
              descripcionServicio: horario.servicio.descripcion, // Mostrar la descripción del servicio
              especialidad: horario.servicio.especialidad.nombre, // Mostrar la especialidad del servicio
              tiempoEstimado: horario.servicio.especialidad.tiempo_estimado, // Tiempo estimado en minutos
              horaInicio: horario.horaInicio,
              horaFinal: horario.horaFinal,
              profId: prof.id, // ID del especialista
              horario // Guardamos el horario completo para usar en los cupos
            }
          : []
      )
    );
    setData(filteredData);
  }, [selectedDate]);

  // Generar los cupos basados en el tiempo estimado
  const generateSlots = (horaInicio, horaFinal, tiempoEstimado) => {
    const slots = [];
    let currentTime = dayjs(`${selectedDate.format('YYYY-MM-DD')}T${horaInicio}`);
    const endTime = dayjs(`${selectedDate.format('YYYY-MM-DD')}T${horaFinal}`);

    let index = 1;
    while (currentTime.isBefore(endTime)) {
      const slotEndTime = currentTime.add(tiempoEstimado, 'minute');
      if (slotEndTime.isAfter(endTime)) break;

      slots.push({
        key: currentTime.format('HH:mm'),
        numero: index++, // Número de fila
        paciente: '', // Paciente vacío (luego puedes actualizarlo)
        estado: 'Disponible', // Estado inicial
        horaInicio: currentTime.format('HH:mm'),
        horaFinal: slotEndTime.format('HH:mm'),
        accion: (
          <Button
            onClick={() => handleReservation(currentTime.format('HH:mm'))} 
            type="primary"
            disabled={slots.some(slot => slot.estado === 'Separado')}
          >
            Reservar
          </Button>
        ) // Acción de reserva
      });

      currentTime = slotEndTime; // Avanzar al siguiente intervalo de tiempo
    }

    return slots;
  };

  // Cuando se selecciona un especialista
  const handleSelectSpecialist = (record) => {
    setSelectedSpecialist(record);
    const newSlots = generateSlots(record.horaInicio, record.horaFinal, record.tiempoEstimado);
    setSlots(newSlots);
  };

  // Manejar el clic en "Reservar"
  const handleReservation = (horaInicio) => {
    // Simular envío de datos al "reservar"
    console.log("selectedSpecialist");
    console.log(selectedSpecialist);
    const reservationData = {
      horaInicio: horaInicio,
      /*profId: selectedSpecialist.profId, // ID del profesional de la salud
      servicioId: selectedSpecialist.servicioId // ID del servicio
    */};

    console.log('Datos de la cita reservada:', reservationData); // Simular envío con console.log
/*
    const updatedSlots = slots.map(slot =>
      slot.horaInicio === horaInicio
        ? { ...slot, estado: 'Separado', accion: <Button disabled type="primary">Reservado</Button> }
        : slot
    );
    setSlots(updatedSlots);*/
  };

  // Configuración de las columnas de la tabla de profesionales
  const columns = [
    {
      title: 'Nombre Completo',
      dataIndex: 'nombreCompleto',
      key: 'nombreCompleto'
    },
    {
      title: 'Servicio',
      dataIndex: 'servicio',
      key: 'servicio'
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
    }
  ];

  // Configuración de las columnas de la tabla de cupos
  const slotColumns = [
    {
      title: '#',
      dataIndex: 'numero',
      key: 'numero',
      width: 50 // Ajustar el ancho
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
      width: 200 // Ajustar el ancho
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      width: 150,
      render: (text) => (
        <Tag color={text === 'Disponible' ? 'green' : 'yellow'}>
          {text}
        </Tag>
      ) // Mostrar estado con un diseño diferenciado usando Ant Design Tag
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      key: 'accion',
      width: 100 // Ajustar el ancho
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">Seleccione una fecha para ver los horarios</h2>
      
      {/* Selector de Fecha */}
      <div className="mb-4 flex justify-center">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className="w-full max-w-xs"
        />
      </div>

      <div className="flex">
        {/* Tabla de Profesionales y Servicios */}
        <div className="w-1/2">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            onRow={(record) => ({
              onClick: () => handleSelectSpecialist(record), // Al hacer clic en un profesional
            })}
          />
        </div>

        {/* Tabla de Cupos Generados */}
        {selectedSpecialist && (
          <div className="w-1/2 ml-4">
            <h3 className="text-center text-xl font-bold mb-4">Cupos disponibles</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Añadir scroll solo a la tabla */}
              <Table
                columns={slotColumns}
                dataSource={slots}
                pagination={false}
                rowClassName="text-xs" // Clases de Tailwind CSS para hacer filas angostas
                size="small"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentsAdm;
