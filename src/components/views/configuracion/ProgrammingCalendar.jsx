import React, { useEffect, useState } from 'react';
import { Table, Input, Button } from 'antd';
import ProgramacionModal from './ProgramacionModal';
import { getAllSpecialists } from '../../../api/apiService';
import CustomCalendar from './CustomCalemdar';
import { specialistsSchedule } from '../../../utils/test';


const ProgrammingCalendar = () => {
  const [specialists, setSpecialists] = useState([]);
  const [specialistSchedule, setSpecialistSchedule] = useState(specialistsSchedule );
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [programacion, setProgramacion] = useState([]);
  const [selectedProgramming, setSelectedProgramming] = useState({ id: null, fechas: [] });
  const [value, setValue] = useState(new Date());
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchSpecialists = async () => {
    try {
      const response = await getAllSpecialists();
      setSpecialists(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
  
    // Encuentra las fechas del especialista seleccionado
    const schedule = specialistSchedule.find(s => s.id === person.id);
  
    // Si se encuentran las fechas, las asignamos, si no, las dejamos vacías
    setSelectedProgramming({
      id: person.id,
      fechas: schedule ? schedule.fechas.map(f => new Date(f)) : []
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isSelected = selectedProgramming.fechas.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      );
      return isSelected
        ? 'bg-blue-50  text-black-900 rounded-full' // Clases de Tailwind para el estilo seleccionado
        : '';
    }
  };

  const handleDayClick = (date) => {
    const isAlreadySelected = selectedProgramming.fechas.find(
      (selectedDate) => selectedDate.toDateString() === date.toDateString()
    );

    let updatedFechas;
    if (isAlreadySelected) {
      updatedFechas = selectedProgramming.fechas.filter(
        (selectedDate) => selectedDate.toDateString() !== date.toDateString()
      );
    } else {
      updatedFechas = [...selectedProgramming.fechas, date];
    }

    setSelectedProgramming({ ...selectedProgramming, fechas: updatedFechas });

    const updatedProgramacion = programacion.filter(
      (p) => p.id !== selectedProgramming.id
    );
    setProgramacion([...updatedProgramacion, { id: selectedProgramming.id, fechas: updatedFechas }]);

    console.log('Programación Seleccionada:', { id: selectedProgramming.id, fechas: updatedFechas });
  };

  const filteredEspecialistas = specialists.filter((especialista) =>
    especialista.usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
    especialista.usuario.apellido_paterno.toLowerCase().includes(search.toLowerCase()) ||
    especialista.usuario.apellido_materno.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Nombre Completo',
      dataIndex: 'nombreCompleto',
      key: 'nombreCompleto',
      render: (text, record) => `${record.usuario.nombre} ${record.usuario.apellido_paterno} ${record.usuario.apellido_materno}`,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen max-w-screen-lg mx-auto">
      <div className="flex flex-row w-full">
        <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 mr-4">
          <Button
            type="primary"
            className="w-full mb-3"
            onClick={showModal}
          >
            + Agregar Programación
          </Button>
          <Input
            placeholder="Buscar especialista"
            className="mb-3 mt-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table
            dataSource={filteredEspecialistas}
            columns={columns}
            pagination={false}
            rowClassName={(record) =>
              selectedPerson?.id === record.id ? 'bg-green' : ''
            }
            onRow={(record) => ({
              onClick: () => handleSelectPerson(record),
            })}
            rowKey="especialista_id"
          />
        </div>

        {/* Componente de calendario */}
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-4">
          <CustomCalendar
            value={value}
            onChange={setValue}
            tileClassName={tileClassName}
            onClickDay={handleDayClick}
          />
        </div>
      </div>

      {/* Modal para Confirmar Programación */}
      <ProgramacionModal
        isVisible={isModalVisible}
        onCancel={handleCancel}
        selectedPerson={selectedPerson}
        selectedProgramming={selectedProgramming}
      />
    </div>
  );
};

export default ProgrammingCalendar;
