import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PagoQR = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simular pago por QR y redirigir tras completarlo
    const timeout = setTimeout(() => {
      // Redirigir a la página de confirmación después del pago
      navigate('/confirmacion-pago');
    }, 3000); // Simula que la transacción tarda 3 segundos en completarse

    return () => clearTimeout(timeout); // Limpia el timeout si el componente se desmonta
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2>Escanea el código QR para completar el pago</h2>
      <div style={styles.qrImage}>
        <img src="ruta_del_codigo_qr.png" alt="Código QR" style={styles.image} />
      </div>
      <p style={styles.instructions}>
        Una vez que completes el pago, serás redirigido automáticamente.
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
  qrImage: {
    margin: '20px 0',
  },
  image: {
    width: '200px',
    height: '200px',
  },
  instructions: {
    marginTop: '10px',
    color: '#555',
  },
};

export default PagoQR;