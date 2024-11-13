import React, { useState } from 'react';
import { Table, Button, Card, Typography, Row, Col, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ManageServices = () => {
  const [services] = useState([
    { id: 1, nombre: 'Consulta Oftalmológica', descripcion: 'Evaluación completa de la visión y salud ocular.', imagen: 'https://via.placeholder.com/150' },
    { id: 2, nombre: 'Cirugía de Cataratas', descripcion: 'Procedimiento para eliminar la catarata del ojo.', imagen: 'https://via.placeholder.com/150' },
    { id: 3, nombre: 'Examen de Glaucoma', descripcion: 'Prueba para evaluar la presión ocular y el nervio óptico.', imagen: 'https://via.placeholder.com/150' },
  ]);

  const [pathologies] = useState([
    { id: 1, nombre: 'Cataratas', descripcion: 'Opacidad del cristalino que afecta la visión.', imagen: 'https://via.placeholder.com/150' },
    { id: 2, nombre: 'Miopía', descripcion: 'Dificultad para ver objetos lejanos con claridad.', imagen: 'https://via.placeholder.com/150' },
    { id: 3, nombre: 'Glaucoma', descripcion: 'Daño en el nervio óptico generalmente debido a alta presión ocular.', imagen: 'https://via.placeholder.com/150' },
  ]);

  const handleReserveService = (serviceName) => {
    console.log(`Reserva realizada para el servicio: ${serviceName}`);
  };

  const handleViewPathologyDetails = (pathologyName) => {
    console.log(`Mostrando detalles para la patología: ${pathologyName}`);
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      {/* Servicios - Vista de Catálogo */}
      <Title level={3} className="text-center">Servicios Disponibles</Title>
      <Row gutter={[16, 16]} className="mb-6">
        {services.map(service => (
          <Col key={service.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={service.nombre} src={service.imagen} />}
              actions={[
                <Button type="primary" onClick={() => handleReserveService(service.nombre)}>
                  Reservar Ficha
                </Button>,
              ]}
            >
              <Card.Meta title={service.nombre} description={service.descripcion} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Patologías - Vista de Catálogo */}
      <Title level={3} className="text-center mt-10">Patologías</Title>
      <Row gutter={[16, 16]} className="mb-6">
        {pathologies.map(pathology => (
          <Col key={pathology.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={pathology.nombre} src={pathology.imagen} />}
              actions={[
                <Button type="primary" onClick={() => handleViewPathologyDetails(pathology.nombre)}>
                  Ver Detalle
                </Button>,
              ]}
            >
              <Card.Meta title={pathology.nombre} description={pathology.descripcion} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Gestión de Servicios - Tabla */}
      <Title level={3} className="text-center mt-10">Gestionar Servicios</Title>
      <Table
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
          { title: 'Acción', key: 'action', render: (_, record) => (
              <Space size="small">
                <Button type="primary" icon={<EditOutlined />} />
                <Button danger icon={<DeleteOutlined />} />
              </Space>
            ),
          },
        ]}
        dataSource={services}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
        className="mb-6"
      />

      {/* Gestión de Patologías - Tabla */}
      <Title level={3} className="text-center mt-10">Gestionar Patologías</Title>
      <Table
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
          { title: 'Acción', key: 'action', render: (_, record) => (
              <Space size="small">
                <Button type="primary" icon={<EditOutlined />} />
                <Button danger icon={<DeleteOutlined />} />
              </Space>
            ),
          },
        ]}
        dataSource={pathologies}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
    </div>
  );
};

export default ManageServices;
