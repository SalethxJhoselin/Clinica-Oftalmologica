import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import SpecialistTable from './SpecialistTable';
import SlotsTable from './SlotsTable';
import { getAllSpecialistProgramming } from '../../../../api/apiService';

const BookAppointmentsAdm = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Fecha inicial establecida como hoy
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [specialistsSchedules, setSpecialistsSchedules] = useState([]);

  const fetchSpecialistsSchedules = async () => {
    try {
      const response = await getAllSpecialistProgramming();
      console.log("response specialistsSchedules", response);
      setSpecialistsSchedules(response);
    } catch (error) {
      console.error("Error fetching specialist schedules:", error);
    }
  };

  // Función para deshabilitar las fechas pasadas
  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date ? date : dayjs()); // Si la fecha es eliminada, establecerla como hoy
  };

  useEffect(() => {
    fetchSpecialistsSchedules();
  }, []); // Solo se ejecuta cuando el componente se monta

  useEffect(() => {
    if (specialistsSchedules.length > 0) { // Verificar que specialistsSchedules no esté vacío
      const selectedFormattedDate = selectedDate.format('YYYY-MM-DD');
      const filteredData = specialistsSchedules.flatMap((prof) =>
        prof.horarios.flatMap((horario) =>
          horario.fechas.includes(selectedFormattedDate)
            ? {
                key: prof.id,
                nombreCompleto: `${prof.nombre} ${prof.apellido_paterno} ${prof.apellido_materno}`,
                servicioId: horario.servicio.id,
                servicio: horario.servicio.nombre,
                descripcionServicio: horario.servicio.descripcion,
                especialidad: horario.servicio.especialidad.nombre,
                tiempoEstimado: horario.servicio.especialidad.tiempo_estimado,
                precio: horario.servicio.precio,
                horaInicio: horario.horaInicio,
                horaFinal: horario.horaFinal,
                profId: prof.id,
                horario
              }
            : []
        )
      );
      setData(filteredData);
    }
  }, [selectedDate, specialistsSchedules]); // Añadir specialistsSchedules como dependencia

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-4">Horarios y Registro de Citas</h2>

      <div className="mb-4 flex justify-center">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className="w-full max-w-xs"
          allowClear={false} // No permite limpiar la fecha
          disabledDate={disabledDate} // No permite seleccionar fechas pasadas
        />
      </div>

      <div className="flex">
        <div className="w-1/2">
          <SpecialistTable data={data} onSelectSpecialist={setSelectedSpecialist} />
        </div>
        <div className="w-1/2 ml-4">
          {selectedSpecialist && <SlotsTable selectedSpecialist={selectedSpecialist} selectedDate={selectedDate} />}
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentsAdm;
