import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';

const Antecedentes = () => {
  const [antecedentes, setAntecedentes] = useState([]);
  const [selectedAntecedente, setSelectedAntecedente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <Button
          type="primary"
          onClick={() => {
            setSelectedAntecedente(record);
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
      <Table dataSource={antecedentes} columns={columns} rowKey="antecedente_id" />

      <Modal
        title="Detalle del Antecedente"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedAntecedente && (
          <div>
            <p><strong>Tipo de Antecedente:</strong> {selectedAntecedente.tipo_antecedente}</p>
            <p><strong>Especifico 1:</strong> {selectedAntecedente.especifico1}</p>
            <p><strong>Especifico 2:</strong> {selectedAntecedente.especifico2}</p>
            <p><strong>Fecha del Evento:</strong> {selectedAntecedente.fecha_evento}</p>
            <p><strong>Importante:</strong> {selectedAntecedente.es_importante ? 'Sí' : 'No'}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Antecedentes;
