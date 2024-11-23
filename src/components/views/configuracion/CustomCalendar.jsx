import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ value, onChange, tileClassName, tileContent, onClickDay }) => {
  const today = new Date();
  return (
    <Calendar
      onChange={onChange}
      value={value}
      tileClassName={tileClassName} // Aplicar las clases para marcar fechas
      tileContent={tileContent} // Mostrar el contenido personalizado como Popovers
      onClickDay={onClickDay} // Manejar los clics en los días
      minDate={today} // No permitir seleccionar fechas pasadas
      className="text-center rounded-lg custom-calendar" // Clases de estilo
    />
  );
};

export default CustomCalendar;
