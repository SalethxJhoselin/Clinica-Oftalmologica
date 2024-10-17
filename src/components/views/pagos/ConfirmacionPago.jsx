import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmacionPago = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate('/'); // Redirigir a la página principal o cualquier otra página
  };

  return (
    <div className="confirmacion-container">
      <h2>¡Pago completado exitosamente!</h2>
      <button onClick={handleVolver}>Volver al Inicio</button>
    </div>
  );
};

export default ConfirmacionPago;