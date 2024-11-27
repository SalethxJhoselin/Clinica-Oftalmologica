import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [selectedConsulta, setSelectedConsulta] = useState(null); // Estado para la consulta seleccionada
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await fetch('https://clinica-oftalmologica.onrender.com/consultas/usuario/1');
        const data = await response.json();
        setConsultas(data);
      } catch (error) {
        notification.error({ message: 'Error al cargar las consultas', description: error.message });
      }
    };

    fetchConsultas();
  }, []);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Hora',
      key: 'hora',
      render: (_, record) => `${record.hora_inicio} - ${record.hora_fin}`,
    },
    {
      title: 'Motivo',
      dataIndex: 'motivo_consulta',
      key: 'motivo_consulta',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedConsulta(record);
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
      <Table dataSource={consultas} columns={columns} rowKey="id" />

      {/* Modal para mostrar detalles */}
      <Modal
        title="Detalle de la Consulta"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedConsulta && (
          <div>
            <p><strong>Fecha:</strong> {selectedConsulta.fecha}</p>
            <p><strong>Hora:</strong> {selectedConsulta.hora_inicio} - {selectedConsulta.hora_fin}</p>
            <p><strong>Motivo de la Consulta:</strong> {selectedConsulta.motivo_consulta}</p>
            <p><strong>Tipo de Consulta:</strong> {selectedConsulta.tipo_de_consulta}</p>
            <p><strong>Diagnóstico Principal:</strong> {selectedConsulta.diagnostico_principal}</p>
            <p><strong>Diagnóstico Secundario:</strong> {selectedConsulta.diagnostico_secundario}</p>
            <p><strong>Refracción:</strong> {selectedConsulta.refraccion}</p>
            <p><strong>Tonometría:</strong> {selectedConsulta.tonometria}</p>
            <p><strong>Biomicroscopía:</strong> {selectedConsulta.biomicroscopia}</p>
            <p><strong>Fondo de Ojo:</strong> {selectedConsulta.fondo_de_ojo}</p>
            <p><strong>Campo Visual:</strong> {selectedConsulta.campo_visual}</p>
            <p><strong>Test Lagrimal:</strong> {selectedConsulta.test_lagrimal}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Consultas;
