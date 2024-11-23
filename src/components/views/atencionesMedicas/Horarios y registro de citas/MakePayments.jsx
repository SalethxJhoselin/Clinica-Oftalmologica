import React from 'react';
import { Button, message } from 'antd';
import { makePayment, createPaymentRecord } from '../../../../api/apiService';
import dayjs from 'dayjs';

const MakePayments = ({ user, selectedSpecialist, comentario, onPaymentSuccess }) => {

    const handlePayment = async () => {
        if (!user || !comentario) {
            message.error("Faltan datos para completar el pago.");
            return;
        }

        const payData = {
            amount: selectedSpecialist.precio * 100, 
            currency: "bob",
            nombre_servicio: selectedSpecialist.servicio,
        };

        const payDataRecord = {
            monto: selectedSpecialist.precio, 
            fecha: dayjs().format('YYYY-MM-DD'), 
            ci_usuario: user.ci,
            id_servicio: selectedSpecialist.servicioId, 
        };

        try {
            console.log("Datos de pago a enviar:", payDataRecord);
            
            const response = await makePayment(payData);
            const response2 = await createPaymentRecord(payDataRecord);
            console.log("response2 es de registro de pago",response2)
            if (response.data && response.data.url) {
                window.open(response.data.url, '_blank');
                message.success("Pago realizado con éxito.");
                onPaymentSuccess(); 
            } else {
                message.error("Error al procesar el pago.");
            }
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
