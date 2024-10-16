import React, { useEffect, useState } from 'react';
import { Table, Typography, Input, DatePicker } from 'antd';
import { getAllPagos } from '../../../api/apiService'; // Asegúrate de tener la API correcta

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ManagePagos = () => {
  const [pagos, setPagos] = useState([]);
  const [searchCI, setSearchCI] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [filteredPagos, setFilteredPagos] = useState([]);

  const obtenerPagos = async () => {
    try {
      const response = await getAllPagos(); // Llama a la API
      console.log("Respuesta del servidor:", response); // Verificar los datos recibidos
      setPagos(response.data || []); // Asignar los datos a la lista de pagos
      setFilteredPagos(response.data || []); // Inicialmente, todos los pagos están filtrados
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
    }
  };

  useEffect(() => {
    obtenerPagos();
  }, []);

  const handleSearchCI = (e) => {
    const value = e.target.value;
    setSearchCI(value);

    // Filtrar pagos por CI
    const filtered = pagos.filter(pago =>
      pago.ci_usuario.includes(value)
    );
    setFilteredPagos(filtered);
  };

  const handleSearchDate = (dates) => {
    if (!dates) {
      setSearchDate(null);
      setFilteredPagos(pagos);
    } else {
      setSearchDate(dates);
      const [start, end] = dates;
      const filtered = pagos.filter(pago => {
        const fechaPago = new Date(pago.fecha);
        return fechaPago >= start.toDate() && fechaPago <= end.toDate();
      });
      setFilteredPagos(filtered);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => new Date(text).toLocaleDateString(), // Formatear fecha
    },
    {
      title: 'CI Usuario',
      dataIndex: 'ci_usuario',
      key: 'ci_usuario',
    },
    {
      title: 'ID Servicio',
      dataIndex: 'id_servicio',
      key: 'id_servicio',
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Administrar Pagos</Title>
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <Input
          placeholder="Buscar por CI"
          value={searchCI}
          onChange={handleSearchCI}
          style={{ marginRight: 20 }}
        />
        <RangePicker onChange={handleSearchDate} />
      </div>
      <Table
        columns={columns}
        dataSource={filteredPagos} // Asegúrate de que los datos filtrados se estén mostrando
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManagePagos;