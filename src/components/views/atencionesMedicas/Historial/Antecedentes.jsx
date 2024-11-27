import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';

const Antecedentes = () => {
  const [antecedentes, setAntecedentes] = useState([]);

  useEffect(() => {
    const fetchAntecedentes = async () => {
      try {
        const response = await fetch('https://clinica-oftalmologica.onrender.com/antecedentes/obtener/1');
        const data = await response.json();
        setAntecedentes(data.antecedentes);
      } catch (error) {
        notification.error({ message: 'Error al cargar los antecedentes', description: error.message });
      }
    };

    fetchAntecedentes();
  }, []);

  const columns = [
    {
      title: 'Tipo de Antecedente',
      dataIndex: 'tipo_antecedente',
      key: 'tipo_antecedente',
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
        <Button type="primary" onClick={() => alert(`Ver detalle de Antecedente ID: ${record.antecedente_id}`)}>
          Ver Detalle
        </Button>
      ),
    },
  ];

  return <Table dataSource={antecedentes} columns={columns} rowKey="antecedente_id" />;
};

export default Antecedentes;
