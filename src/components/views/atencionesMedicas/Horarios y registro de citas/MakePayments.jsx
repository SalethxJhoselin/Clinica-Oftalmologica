import React from 'react';
import { Button, message } from 'antd';
import { makePayment } from '../../../../api/apiService';

const MakePayments = ({ user, selectedSpecialist, comentario, onPaymentSuccess }) => {
    
    const handlePayment = async () => {
        if (!user || !comentario) {
            message.error("Faltan datos para completar el pago.");
            return;
        }

        const payData = {
            amount: selectedSpecialist.precio * 100,
            currency: "bob",
            nombre_servicio: selectedSpecialist.servicio
        };

        try {
            const response = await makePayment(payData);
            window.open(response.data.url, '_blank'); 
            message.success("Pago realizado con éxito.");
            onPaymentSuccess();  
        } catch (error) {
            console.error("Error al realizar el pago:", error);
            message.error("Error al realizar el pago.");
        }
    };

    return (
        <div className="flex justify-end">
            <Button
                type="primary"
                onClick={handlePayment}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                style={{ marginRight: '10px' }}
            >
                Confirmar Cita y Pagar
            </Button>
        </div>
    );
};

export default MakePayments;
