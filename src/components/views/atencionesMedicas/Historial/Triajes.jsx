import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';

const Triajes = () => {
  const [triajes, setTriajes] = useState([]);
  const [selectedTriaje, setSelectedTriaje] = useState(null); // Estado para el triaje seleccionado
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

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
        <Button
          type="primary"
          onClick={() => {
            setSelectedTriaje(record);
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
      <Table dataSource={triajes} columns={columns} rowKey="id" />

      {/* Modal para mostrar detalles */}
      <Modal
        title="Detalle del Triaje"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedTriaje && (
          <div>
            <p><strong>Frecuencia Cardiaca:</strong> {selectedTriaje.frecuencia_cardiaca}</p>
            <p><strong>Frecuencia Respiratoria:</strong> {selectedTriaje.frecuencia_respiratoria}</p>
            <p><strong>Temperatura:</strong> {selectedTriaje.temperatura}</p>
            <p><strong>Saturación de Oxígeno:</strong> {selectedTriaje.saturacion_oxigeno}</p>
            <p><strong>Presión Arterial:</strong> {selectedTriaje.presion_arterial}</p>
            <p><strong>Visión Inicial OD:</strong> {selectedTriaje.vision_inicial_od}</p>
            <p><strong>Visión Inicial OI:</strong> {selectedTriaje.vision_inicial_oi}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Triajes;
