import React, { useEffect, useState } from 'react';
import { Table, Input, message } from 'antd';
import { getAllSpecialists } from '../../../api/apiService';

const SpecialistTableSearch = ({ onSelectSpecialist }) => {
  const [specialists, setSpecialists] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSpecialistId, setSelectedSpecialistId] = useState(null); 

  const fetchSpecialists = async () => {
    try {
      const response = await getAllSpecialists();
      setSpecialists(response); 
    } catch (error) {
      console.error('Error al obtener los especialistas:', error);
      message.error('Error al cargar los especialistas');
    }
  };

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const filteredEspecialistas = specialists.filter((especialista) =>
    especialista.usuario.nombre.toLowerCase().includes(search.toLowerCase()) ||
    especialista.usuario.apellido_paterno.toLowerCase().includes(search.toLowerCase()) ||
    especialista.usuario.apellido_materno.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (record) => {
    setSelectedSpecialistId(record.id); 
    onSelectSpecialist(record); 
  };

  const columns = [
    {
      title: 'Nombre Completo',
      dataIndex: 'nombreCompleto',
      key: 'nombreCompleto',
      render: (text, record) => `${record.usuario.nombre} ${record.usuario.apellido_paterno} ${record.usuario.apellido_materno}`,
    },
  ];

  return (
    <div>
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
          record.id === selectedSpecialistId ? 'bg-green-200' : '' 
        }
        onRow={(record) => ({
          onClick: () => handleRowClick(record), 
        })}
        rowKey="especialista_id"
        scroll={{ x: 1 }}
      />
    </div>
  );
};

export default SpecialistTableSearch;
