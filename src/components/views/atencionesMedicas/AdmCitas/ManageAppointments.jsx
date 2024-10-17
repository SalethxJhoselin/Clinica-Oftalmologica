import React, { useState, useEffect } from 'react';
import { Table, Input, DatePicker, Button, Typography, Space, message } from 'antd';
import moment from 'moment';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllBookingAppointments } from '../../../../api/apiService';
import ViewDetailsModal from './ViewDetail';
import dayjs from 'dayjs';

const { Title } = Typography;

const ManageAppointments = () => {
  const [bookAppointments, setBookAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState(null); // El estado comienza como null
  const [filterSpecialist, setFilterSpecialist] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Estado para la cita seleccionada
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para el modal

  // Función para obtener citas desde el backend
  const fetchAppointments = async () => {
    try {
      const response = await getAllBookingAppointments();
      console.log("response", response);
      setBookAppointments(response);
      setFilteredAppointments(response);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filtrar citas por fecha y especialista
  const handleFilter = () => {
    let filteredData = [...bookAppointments];

    // Filtrar por fecha seleccionada
    if (filterDate) {
      const selectedDate = dayjs(filterDate).format('YYYY-MM-DD');
      console.log("selectedDate", selectedDate);

      filteredData = filteredData.filter(appointment => {
        const appointmentDate = dayjs(appointment.fecha).format('YYYY-MM-DD');
        console.log("appointment.fecha", appointmentDate);

        return appointmentDate === selectedDate;
      });
    }

    // Filtrar por especialista
    if (filterSpecialist) {
      filteredData = filteredData.filter(appointment =>
        appointment.especialista.toLowerCase().includes(filterSpecialist.toLowerCase())
      );
    }

    setFilteredAppointments(filteredData);
  };

  // Limpiar filtros
  const clearFilters = () => {
    setFilterDate(null);
    setFilterSpecialist('');
    setFilteredAppointments(bookAppointments);
  };

  // Función para eliminar citas
  const handleDelete = async (id) => {
    try {
      setFilteredAppointments(filteredAppointments.filter(appointment => appointment.id !== id));
      setBookAppointments(bookAppointments.filter(appointment => appointment.id !== id));
      message.success('Cita eliminada exitosamente');
    } catch (error) {
      message.error('Error al eliminar la cita');
    }
  };

  const handleConfirmCancel = async () => {
    message.success('Cita cancelada exitosamente');
    await fetchAppointments();
  };

  const showDetailsModal = (appointment) => {
    setSelectedAppointment(appointment); 
    setIsModalVisible(true); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAppointment(null); 
  };

  // Columnas para la tabla
  const columns = [
    {
      title: 'Paciente',
      dataIndex: 'paciente',
      key: 'paciente',
    },
    {
      title: 'Especialista',
      dataIndex: 'especialista',
      key: 'especialista',
    },
    {
      title: 'Estado',
      dataIndex: 'estado', // Cambiar 'servicio' por 'estado'
      key: 'estado',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EyeOutlined />} onClick={() => showDetailsModal(record)}>
            Ver detalle
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <Title level={3} className="text-center">Administrar Citas</Title>
      <div className="flex justify-end mb-6">
        <DatePicker
          value={filterDate}
          onChange={(date) => setFilterDate(date)}
          format="YYYY-MM-DD"
          placeholder="Seleccionar fecha"
        />
        <Input
          placeholder="Filtrar por especialista"
          value={filterSpecialist}
          onChange={e => setFilterSpecialist(e.target.value)}
          style={{ width: 200, marginLeft: 10 }}
        />
        <Button type="primary" onClick={handleFilter} style={{ marginLeft: 10 }}>
          Filtrar
        </Button>
        <Button onClick={clearFilters} style={{ marginLeft: 10 }}>
          Limpiar filtros
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {selectedAppointment && (
        <ViewDetailsModal
          appointment={selectedAppointment}
          visible={isModalVisible}
          onCancel={handleCancel}
          onConfirmCancel={handleConfirmCancel} 
        />
      )}
    </div>
  );
};

export default ManageAppointments;
