import React from 'react';
import { Modal, Button, message } from 'antd';
import moment from 'moment';
import { editBookingAppointment } from '../../../../api/apiService';

const ViewDetailsModal = ({ appointment, visible, onCancel, onConfirmCancel }) => {
  const handleCancelAppointment = async () => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas cancelar esta cita?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, cancelar',
      cancelText: 'No',
      async onOk() {
        try {
          const updatedAppointment = {
            id: appointment.id,
            especialista_id: appointment.especialista_id,
            servicio_id: appointment.servicio_id,
            fecha: appointment.fecha,
            hora: appointment.hora,
            comentario: appointment.comentario,
            estado: 'cancelado',
          };
          console.log(updatedAppointment);
          const response = await editBookingAppointment(updatedAppointment);
          console.log("response a ver que sale", response);
          if (response && response.success) {
            message.success('La cita ha sido cancelada exitosamente.');
            onConfirmCancel();
          } else {
            message.error('Hubo un error al cancelar la cita.');
          }
          onCancel();
        } catch (error) {
          console.error('Error al cancelar la cita:', error);
          message.error('Error al procesar la cancelación.');
        }
      },
      onCancel() {
        console.log('Cancelación de cita abortada');
      },
    });
  };

  return (
    <Modal
      title="Detalles de la Cita"
      visible={visible}
      onCancel={onCancel}
      footer={[
        // Solo muestra el botón si el estado no es 'cancelado'
        appointment.estado !== 'cancelado' && (
          <Button key="cancel" type="danger" onClick={handleCancelAppointment}>
            Cancelar Cita
          </Button>
        ),
        <Button key="close" onClick={onCancel}>
          Cerrar
        </Button>,
      ]}
    >
      <p><strong>Paciente:</strong> {appointment.paciente}</p>
      <p><strong>Especialista:</strong> {appointment.especialista}</p>
      <p><strong>Servicio:</strong> {appointment.servicio}</p>
      <p><strong>Fecha:</strong> {moment(appointment.fecha).format('YYYY-MM-DD')}</p>
      <p><strong>Hora:</strong> {appointment.hora}</p>
      <p><strong>Estado:</strong> {appointment.estado}</p>
      <p><strong>Comentario:</strong> {appointment.comentario}</p>
      <p><strong>Tipo de Cita:</strong> {appointment.tipo_cita}</p>
    </Modal>
  );
};

export default ViewDetailsModal;
