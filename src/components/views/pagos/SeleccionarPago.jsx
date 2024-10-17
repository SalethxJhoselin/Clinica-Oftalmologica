import React from 'react';
import { useNavigate } from 'react-router-dom';


const SeleccionarPago = () => {
  const navigate = useNavigate();

  const handlePago = (metodo) => {
    if (metodo === 'stripe') {
      navigate('/pago-stripe'); // Redirigir a la vista de Stripe
    } else if (metodo === 'qr') {
      navigate('/pago-qr'); // Redirigir a la vista de QR
    }
  };

  return (
    <div className="seleccionar-pago-container">
      <h2>Selecciona un Método de Pago</h2>
      <div className="botones-pago">
        <button className="boton-pago" onClick={() => handlePago('qr')}>
          Pago por QR
        </button>
        <button className="boton-pago" onClick={() => handlePago('stripe')}>
          Pago por Stripe
        </button>
      </div>
    </div>
  );
};

export default SeleccionarPago;