import React, { useState } from 'react';
import Antecedentes from './Antecedentes';
import Cirugias from './Cirugias';
import Consultas from './Consultas';
import Diagnosticos from './Diagnosticos';
import Medidas from './Medidas';
import Tratamientos from './Tratamientos';
import Triajes from './Triajes';

const ManageHistorial = () => {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState('triaje');

  // Función para cambiar de pestaña
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Gestionar Historial</h2>

      {/* Navegación de pestañas */}
      <div className="flex flex-wrap justify-around border-b mb-4">
        {[
          { key: 'triaje', label: 'Triaje' },
          { key: 'antecedente', label: 'Antecedente' },
          { key: 'tratamientos', label: 'Tratamientos' },
          { key: 'diagnostico', label: 'Diagnóstico' },
          { key: 'consulta', label: 'Consulta' },
          { key: 'cirugia', label: 'Cirugía' },
          { key: 'medidas', label: 'Medidas' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`py-2 px-4 ${activeTab === tab.key
              ? 'border-b-2 border-blue-500 font-semibold'
              : ''
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      <div className="mt-4">
        {activeTab === 'triaje' && <Triajes />}
        {activeTab === 'antecedente' && <Antecedentes />}
        {activeTab === 'tratamientos' && <Tratamientos />}
        {activeTab === 'diagnostico' && <Diagnosticos />}
        {activeTab === 'consulta' && <Consultas />}
        {activeTab === 'cirugia' && <Cirugias />}
        {activeTab === 'medidas' && <Medidas />}
      </div>
    </div>
  );
};

export default ManageHistorial;
