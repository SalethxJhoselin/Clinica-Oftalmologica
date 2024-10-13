import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ value, onChange, tileClassName, onClickDay }) => {
  return (
    <div>
      <h3 className="text-center mb-4 text-xl font-bold">{`${value.toLocaleString('default', {
        month: 'long',
      })} de ${value.getFullYear()}`}</h3>
      <Calendar
        onChange={onChange} // Pasamos la función para cambiar la fecha
        value={value} // Pasamos el valor actual de la fecha seleccionada
        tileClassName={tileClassName} // Pasamos la función para resaltar las fechas
        onClickDay={onClickDay} // Pasamos la función para manejar el clic en un día
      />
    </div>
  );
};

export default CustomCalendar;
