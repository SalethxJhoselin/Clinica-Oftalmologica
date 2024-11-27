import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const SeleccionarPagoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Mostrar el modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Cerrar el modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Lógica para manejar la selección de pago
  const handlePago = (metodo) => {
    if (metodo === 'stripe') {
      navigate('/pago-stripe');
    } else if (metodo === 'qr') {
      navigate('/pago-qr');
    }
    setIsModalVisible(false); // Cierra el modal después de seleccionar el método
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button type="primary" onClick={showModal}>
        Seleccionar Método de Pago
      </Button>

      {/* Modal de selección de pago */}
      <Modal
        title="Selecciona un Método de Pago"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Sin botones por defecto
      >
        <p>Elige cómo quieres pagar:</p>
        <Button onClick={() => handlePago('stripe')} type="primary" style={{ margin: '5px' }}>
          Pago por Stripe
        </Button>
        <Button onClick={() => handlePago('qr')} type="primary" style={{ margin: '5px' }}>
          Pago por QR
        </Button>
      </Modal>
    </>
  );
};

export default SeleccionarPagoModal;