import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';

const Tratamientos = () => {
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    const fetchTratamientos = async () => {
      try {
        const response = await fetch('https://clinica-oftalmologica.onrender.com/tratamientos/usuario/1');
        const data = await response.json();
        setTratamientos(data);
      } catch (error) {
        notification.error({ message: 'Error al cargar los tratamientos', description: error.message });
      }
    };

    fetchTratamientos();
  }, []);

  const columns = [
    {
      title: 'Tipo de Tratamiento',
      dataIndex: 'tipo_tratamiento',
      key: 'tipo_tratamiento',
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
        <Button type="primary" onClick={() => alert(`Ver detalle de Tratamiento ID: ${record.id}`)}>
          Ver Detalle
        </Button>
      ),
    },
  ];

  return <Table dataSource={tratamientos} columns={columns} rowKey="id" />;
};

export default Tratamientos;
