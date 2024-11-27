import React, { useEffect, useState } from 'react';
import { Table, Button, notification } from 'antd';

const Diagnosticos = () => {
  const [diagnosticos, setDiagnosticos] = useState([]);

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      try {
        const response = await fetch('https://clinica-oftalmologica.onrender.com/diagnosticos/usuario/1');
        const data = await response.json();
        setDiagnosticos(data);
      } catch (error) {
        notification.error({ message: 'Error al cargar los diagnósticos', description: error.message });
      }
    };

    fetchDiagnosticos();
  }, []);

  const columns = [
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Tipo de Diagnóstico',
      dataIndex: 'tipo_diagnostico',
      key: 'tipo_diagnostico',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button type="primary" onClick={() => alert(`Ver detalle de Diagnóstico ID: ${record.id}`)}>
          Ver Detalle
        </Button>
      ),
    },
  ];

  return <Table dataSource={diagnosticos} columns={columns} rowKey="id" />;
};

export default Diagnosticos;
