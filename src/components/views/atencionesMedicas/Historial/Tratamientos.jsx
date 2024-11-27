import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';

const Tratamientos = () => {
  const [tratamientos, setTratamientos] = useState([]);
  const [selectedTratamiento, setSelectedTratamiento] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <Button
          type="primary"
          onClick={() => {
            setSelectedTratamiento(record);
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
      <Table dataSource={tratamientos} columns={columns} rowKey="id" />

      <Modal
        title="Detalle del Tratamiento"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedTratamiento && (
          <div>
            <p><strong>Medicación:</strong> {selectedTratamiento.medicacion}</p>
            <p><strong>Duración Estimada:</strong> {selectedTratamiento.duracion_estimada}</p>
            <p><strong>Fecha de Inicio:</strong> {selectedTratamiento.fecha_inicio}</p>
            <p><strong>Fecha de Fin:</strong> {selectedTratamiento.fecha_fin}</p>
            <p><strong>Observaciones:</strong> {selectedTratamiento.observaciones}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Tratamientos;
