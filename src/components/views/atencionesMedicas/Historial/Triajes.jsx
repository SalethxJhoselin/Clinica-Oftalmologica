import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';

const Triajes = () => {
  const [triajes, setTriajes] = useState([]);

  useEffect(() => {
    const fetchTriajes = async () => {
      try {
        const response = await fetch('https://clinica-oftalmologica.onrender.com/triaje/usuario/1');
        const data = await response.json();
        setTriajes(data);
      } catch (error) {
        notification.error({ message: 'Error al cargar los triajes', description: error.message });
      }
    };

    fetchTriajes();
  }, []);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      key: 'hora',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button type="primary" onClick={() => alert(`Ver detalle de Triaje ID: ${record.id}`)}>
          Ver Detalle
        </Button>
      ),
    },
  ];

  return <Table dataSource={triajes} columns={columns} rowKey="id" />;
};

export default Triajes;
