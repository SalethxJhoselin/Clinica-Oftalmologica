import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import ProgramacionModal from './ProgramacionModal';
import CustomCalendar from './CustomCalendar';
import { getAllSpecialistProgramming } from '../../../api/apiService';
import SpecialistTableSearch from './SpecialistTableSearch';

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const formatTime = (time) => {
  return time.slice(0, 5);
};

const ProgrammingCalendar = () => {
  const [specialistSchedule, setSpecialistSchedule] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [programacion, setProgramacion] = useState([]);
  const [selectedProgramming, setSelectedProgramming] = useState({ id: null, fechas: [] });
  const [allDatesWithTimes, setAllDatesWithTimes] = useState([]);
  const [additionalSelectedDates, setAdditionalSelectedDates] = useState([]);
  const [value, setValue] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchSpecialistsSchedules = async () => {
    try {
      const response = await getAllSpecialistProgramming();
      console.log("response specialistsSchedules", response);
      setSpecialistSchedule(response);
    } catch (error) {
      console.error("Error fetching specialist schedules:", error);
    }
  };
  useEffect(() => {
    fetchSpecialistsSchedules();
  }, []);

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setAdditionalSelectedDates([]);
    const schedule = specialistSchedule.find(s => s.id === person.id);
    if (schedule) {
      const datesWithTimes = {};
      schedule.horarios.forEach(horario => {
        horario.fechas.forEach(fecha => {
          if (!datesWithTimes[fecha]) {
            datesWithTimes[fecha] = [];
          }
          datesWithTimes[fecha].push({
            horaInicio: formatTime(horario.horaInicio),
            horaFinal: formatTime(horario.horaFinal)
          });
        });
      });
      const datesWithTimesArray = Object.entries(datesWithTimes).map(([fecha, horarios]) => ({
        fecha,
        horarios
      }));
      console.log('Fechas y horarios del especialista seleccionado:', datesWithTimesArray);
      setAllDatesWithTimes(datesWithTimesArray);
      setSelectedProgramming({
        id: person.id,
        fechas: datesWithTimesArray.map(item => item.fecha)
      });
    } else {
      console.log('No se encontró la programación para el especialista seleccionado.');
      setSelectedProgramming({
        id: person.id,
        fechas: []
      });
      setAllDatesWithTimes([]);
    }
  };

  const handleDayClick = (date) => {
    const formattedDate = formatDate(date);
    const isAlreadySelected = additionalSelectedDates.includes(formattedDate);
    let updatedDates;
    if (isAlreadySelected) {
      updatedDates = additionalSelectedDates.filter(selectedDate => selectedDate !== formattedDate);
    } else {
      updatedDates = [...additionalSelectedDates, formattedDate];
    }
    setAdditionalSelectedDates(updatedDates);
    console.log('Fechas adicionales seleccionadas:', updatedDates);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const isSpecialistSelected = selectedProgramming.fechas.includes(formattedDate);
      const isAdditionalSelected = additionalSelectedDates.includes(formattedDate);
      if (isSpecialistSelected && isAdditionalSelected) {
        return 'bg-green-500 text-black-900 rounded-full';
      } else if (isSpecialistSelected) {
        return 'bg-blue-50 text-black-900 rounded-full specialist-date'; // Aplicamos clase personalizada
      } else if (isAdditionalSelected) {
        return 'bg-green-200 text-black-900 rounded-full';
      } else {
        return '';
      }
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const dateWithTime = allDatesWithTimes.find(item => item.fecha === formattedDate);
      if (dateWithTime) {
        return (
          <div className="flex flex-col justify-center items-center h-full">
            {dateWithTime.horarios.map((horario, index) => (
              <span key={index} className="text-xs text-gray-500 font-bold">
                {horario.horaInicio}-{horario.horaFinal}
              </span>
            ))}
          </div>
        );
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen max-w-screen-lg mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-900">Programacion de dias y horarios de atencion por Expecialista</h2>
      <div className="flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-xl p-6 mr-0 lg:mr-1 mb-4 lg:mb-0 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
          <Button
            style={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            type="primary"
            className="w-full"
            onClick={showModal}
          >
            + Programar Horario
          </Button>
          <SpecialistTableSearch
            onSelectSpecialist={handleSelectPerson}
          />
        </div>
        <div className=" bg-white shadow-lg rounded-xl p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
          <CustomCalendar
            value={value}
            onChange={setValue}
            tileClassName={tileClassName}
            tileContent={tileContent}
            onClickDay={handleDayClick}
          />
        </div>
      </div>
      <ProgramacionModal
        isVisible={isModalVisible}
        onCancel={handleCancel}
        selectedPerson={selectedPerson}
        additionalSelectedDates={additionalSelectedDates}
      />
    </div>
  );
};

export default ProgrammingCalendar;
