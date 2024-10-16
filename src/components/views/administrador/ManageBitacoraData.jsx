import React, { useEffect, useState } from 'react';
import { Table, Input, Typography } from 'antd';
import { getBitacoraData } from '../../../api/apiService'; 

const { Title } = Typography;

const ManageBitacoraData = () => {
  const [bitacoraData, setBitacoraData] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Función para cargar los datos de la bitácora
  const fetchBitacoraData = async () => {
    try {
      const data = await getBitacoraData(); // Llama a la API para obtener los datos de la bitácora
      setBitacoraData(data); // Guarda los datos en el estado
    } catch (error) {
      console.error('Error al obtener los datos de la bitácora:', error);
    }
  };

  useEffect(() => {
    fetchBitacoraData();
  }, []);

  // Columnas de la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'CI',
      dataIndex: 'ci',
      key: 'ci',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha) => new Date(fecha).toLocaleDateString(), // Formato de fecha legible
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      key: 'hora',
      render: (hora) => hora, // Puedes modificarlo según el formato de la hora en la base de datos
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      key: 'accion',
    },
    {
      title: 'Tabla Afectada',
      dataIndex: 'tabla_afectada',
      key: 'tabla_afectada',
    },
  ];

  // Filtrar los registros según el texto de búsqueda
  const filteredData = bitacoraData.filter(item => 
    item.ci.toString().includes(searchText) || 
    item.accion.toLowerCase().includes(searchText.toLowerCase()) ||
    item.ip.includes(searchText) ||
    item.tabla_afectada.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Administrar Bitácora</Title>
      <Input 
        placeholder="Buscar por CI, IP, Acción, Tabla Afectada..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="mb-4"
      />
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageBitacoraData;