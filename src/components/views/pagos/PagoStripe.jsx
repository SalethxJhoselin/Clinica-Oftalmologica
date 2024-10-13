import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PagoStripe = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simular apertura de Stripe en una nueva pestaña
    window.open('https://buy.stripe.com/test_00g8Af2Imh0p7q8288', '_blank');

    // Simular un retraso para redirigir al usuario después del pago (en producción se manejaría de manera distinta)
    const timeout = setTimeout(() => {
      // Redirigir a la página de confirmación después de completar el pago
      navigate('/confirmacion-pago');
    }, 3000); // Simula que la transacción tarda 3 segundos en completarse

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, [navigate]);

  return (
    <div className="pago-container">
      <h2>Redirigiendo a Stripe para el pago...</h2>
    </div>
  );
};

export default PagoStripe;