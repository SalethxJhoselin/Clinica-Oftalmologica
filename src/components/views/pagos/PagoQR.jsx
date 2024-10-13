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
    <div className="pago-container">
      <h2>Escanea el código QR para completar el pago</h2>
      {/* Aquí puedes agregar una imagen o un componente que represente el código QR */}
      <img src="ruta_del_codigo_qr.png" alt="Código QR" />
    </div>
  );
};

export default PagoQR;