import React, { useEffect, useState } from 'react';
import { Table, Typography, Input, DatePicker, Button, Modal } from 'antd';
import { getAllPagos } from '../../../api/apiService';
import ReportePagos from '../reportes/ReportePagos'; // Importa el componente de reporte

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ManagePagos = () => {
  const [pagos, setPagos] = useState([]);
  const [searchCI, setSearchCI] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [filteredPagos, setFilteredPagos] = useState([]);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false); // Estado para controlar el modal del reporte

  const obtenerPagos = async () => {
    try {
      const response = await getAllPagos();
      setPagos(response.data || []);
      setFilteredPagos(response.data || []);
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
    }
  };

  useEffect(() => {
    obtenerPagos();
  }, []);

  const handleSearchCI = (e) => {
    const value = e.target.value;
    setSearchCI(value);

    // Filtrar pagos por CI
    const filtered = pagos.filter((pago) => pago.ci_usuario.includes(value));
    setFilteredPagos(filtered);
  };

  const handleSearchDate = (dates) => {
    if (!dates) {
      setSearchDate(null);
      setFilteredPagos(pagos);
    } else {
      setSearchDate(dates);
      const [start, end] = dates;
      const filtered = pagos.filter((pago) => {
        const fechaPago = new Date(pago.fecha);
        return fechaPago >= start.toDate() && fechaPago <= end.toDate();
      });
      setFilteredPagos(filtered);
    }
  };

  const handleOpenReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleReportModalClose = () => {
    setIsReportModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Monto',
      dataIndex: 'monto',
      key: 'monto',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'CI Usuario',
      dataIndex: 'ci_usuario',
      key: 'ci_usuario',
    },
    {
      title: 'ID Servicio',
      dataIndex: 'id_servicio',
      key: 'id_servicio',
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Administrar Pagos</Title>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex' }}>
          <Input
            placeholder="Buscar por CI"
            value={searchCI}
            onChange={handleSearchCI}
            style={{ marginRight: 20 }}
          />
          <RangePicker onChange={handleSearchDate} />
        </div>
        <Button type="primary" onClick={handleOpenReportModal}>
          Generar Reporte
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredPagos}
        rowKey="id"
        pagination={{ pageSize: 5, size: 'small' }}
        bordered
      />
      {/* Modal para generar reporte */}
      <Modal
        title="Generar Reporte de Pagos"
        visible={isReportModalVisible}
        onCancel={handleReportModalClose}
        footer={null}
      >
        <ReportePagos />
      </Modal>
    </div>
  );
};

export default ManagePagos;