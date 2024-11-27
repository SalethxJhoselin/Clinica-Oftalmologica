import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PagoStripe = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simular apertura de Stripe en una nueva pestaña
    window.open('https://buy.stripe.com/test_00g8Af2Imh0p7q8288', '_blank');

    // Simular un retraso para redirigir al usuario después del pago
    const timeout = setTimeout(() => {
      // Redirigir a la página de confirmación después de completar el pago
      navigate('/confirmacion-pago');
    }, 3000); // Simula que la transacción tarda 3 segundos en completarse

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Redirigiendo a Stripe para completar el pago...</h2>
      <p style={styles.instructions}>
        Por favor, espera mientras te redirigimos a la página de Stripe para completar tu pago.
      </p>
    </div>
  );
};

// Estilos en el mismo componente
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  instructions: {
    marginTop: '20px',
    color: '#555',
  },
};

export default PagoStripe;