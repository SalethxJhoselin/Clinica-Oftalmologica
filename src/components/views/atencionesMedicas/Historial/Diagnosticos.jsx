import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';

const Diagnosticos = () => {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <Button
          type="primary"
          onClick={() => {
            setSelectedDiagnostico(record);
            setIsModalVisible(true);
          }}
        >
          Ver Detalle
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={diagnosticos} columns={columns} rowKey="id" />

      <Modal
        title="Detalle del Diagnóstico"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedDiagnostico && (
          <div>
            <p><strong>Consulta ID:</strong> {selectedDiagnostico.consulta_id}</p>
            <p><strong>Fecha:</strong> {selectedDiagnostico.fecha}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Diagnosticos;
