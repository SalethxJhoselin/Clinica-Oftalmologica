import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importación necesaria para el calendario
import { Table, Input, Button } from 'antd'; // Importaciones necesarias de Ant Design
import { especialistas } from '../../../utils/test'; // Importación de la lista de especialistas
import ProgramacionModal from './ProgramacionModal'; // Importar el componente de modal

const ProgrammingCalendar = () => {
  const [selectedPerson, setSelectedPerson] = useState(null); // Guarda el especialista seleccionado
  const [programacion, setProgramacion] = useState([]); // Programación de fechas con ids de especialista
  const [selectedProgramming, setSelectedProgramming] = useState({ id: null, fechas: [] }); // ID y fechas seleccionadas del especialista actual
  const [value, setValue] = useState(new Date());
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  // Maneja la selección de un especialista.
  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setSelectedProgramming({ id: person.especialista_id, fechas: [] }); // Reinicia las fechas seleccionadas al cambiar de especialista
  };

  // Clase personalizada para resaltar las fechas con eventos programados.
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isSelected = selectedProgramming.fechas.find(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      );

      return isSelected ? 'highlight-selected' : ''; // Resaltar las fechas seleccionadas
    }
  };

  // Manejador para seleccionar múltiples días.
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

  // Filtros para la búsqueda en la lista de especialistas.
  const filteredEspecialistas = especialistas.filter((especialista) =>
    especialista.nombre.toLowerCase().includes(search.toLowerCase()) ||
    especialista.apellido_paterno.toLowerCase().includes(search.toLowerCase()) ||
    especialista.apellido_materno.toLowerCase().includes(search.toLowerCase())
  );

  // Configuración de columnas para la tabla de especialistas.
  const columns = [
    {
      title: 'Nombre Completo',
      dataIndex: 'nombreCompleto',
      key: 'nombreCompleto',
      render: (text, record) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
    },
  ];

  // Manejador para mostrar el modal.
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Manejador para ocultar el modal.
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen max-w-screen-lg mx-auto">
      <div className="flex flex-row w-full">
        {/* Barra lateral izquierda con lista de especialistas */}
        <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 mr-4">
          <Button
            type="primary"
            className="w-full mb-3"
            onClick={showModal} // Muestra el modal cuando se hace clic en el botón
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
              selectedPerson?.especialista_id === record.especialista_id ? 'bg-green-100' : ''
            }
            onRow={(record) => ({
              onClick: () => handleSelectPerson(record),
            })}
            rowKey="especialista_id"
          />
        </div>

        {/* Calendario */}
        <div className="w-3/4 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-center mb-4 text-xl font-bold">{`${value.toLocaleString('default', {
            month: 'long',
          })} de ${value.getFullYear()}`}</h3>
          <Calendar
            onChange={setValue}
            value={value}
            tileClassName={tileClassName}
            onClickDay={handleDayClick} // Manejador del clic en un día.
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
