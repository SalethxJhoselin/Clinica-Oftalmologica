import React from 'react';
import { useUser } from '../../context/UserContext'; // Importar el contexto de usuario
import axios from 'axios'; // Importar Axios
import { jwtDecode } from 'jwt-decode'; // Importar jwt-decode
import { useNavigate } from 'react-router-dom';

const Planes = () => {
  const navigate = useNavigate();
  const { setUserSubId } = useUser(); // Obtener el setter para id_sub desde el contexto

  const planes = [
    {
      id: 1,
      nombre: 'Plan Básico',
      descripcion: 'Acceso a gestión básica de pacientes y citas.',
      funcionalidades: [
        'Visualización de pacientes',
        'Creación de citas',
        'Consulta de historial médico'
      ]
    },
    {
      id: 2,
      nombre: 'Plan Avanzado',
      descripcion: 'Acceso a gestión de pacientes, citas y cirugías.',
      funcionalidades: [
        'Visualización de pacientes',
        'Creación de citas',
        'Consulta de historial médico',
        'Gestión de cirugías',
        'Visualización de resultados de exámenes'
      ]
    },
    {
      id: 3,
      nombre: 'Plan Profesional',
      descripcion: 'Acceso completo a todas las funcionalidades del sistema.',
      funcionalidades: [
        'Visualización de pacientes',
        'Creación de citas',
        'Consulta de historial médico',
        'Gestión de cirugías',
        'Visualización de resultados de exámenes',
        'Acceso a reportes avanzados'
      ]
    },
    {
      id: 4,
      nombre: 'Plan Institucional',
      descripcion: 'Plan exclusivo para clínicas con múltiples especialistas.',
      funcionalidades: [
        'Visualización de pacientes',
        'Creación de citas',
        'Consulta de historial médico',
        'Gestión de cirugías',
        'Visualización de resultados de exámenes',
        'Acceso a reportes avanzados',
        'Gestión de especialistas'
      ]
    }
  ];

  // Función para manejar la selección del plan y enviar la solicitud
  const handlePlanSelection = async (planId) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se encontró el token en el localStorage');
      return;
    }

    try {
      // Decodificar el token para obtener el usuario_id
      const decodedToken = jwtDecode(token);
      const usuarioId = decodedToken.id; // Suponiendo que el 'usuario_id' esté en el payload del token

      console.log(`ID del plan seleccionado: ${planId}`);
      console.log(`ID del usuario desde el token: ${usuarioId}`); // Mostrar el ID del usuario

      // Datos a enviar en el cuerpo de la solicitud POST
      const subscriptionData = {
        usuario_id: usuarioId, // ID del usuario obtenido del token
        plan_id: planId,       // ID del plan seleccionado
        fecha_inicio: "2024-11-01", // Fecha de inicio
        fecha_fin: "2025-11-01",    // Fecha de fin
        estado: "activa"           // Estado de la suscripción
      };

      console.log('Datos enviados:', subscriptionData); // Verifica los datos que se están enviando

      try {
        // Enviar la solicitud POST a la API con Axios
        const response = await axios.post('https://clinica-oftalmologica.onrender.com/suscripcion', subscriptionData, {
          headers: {
            'Content-Type': 'application/json', // Asegúrate de enviar los datos como JSON
          }
        });

        // Manejar la respuesta de la API
        console.log('Respuesta del servidor:', response.data);
        const newToken = response.data.token; // Asumiendo que el token está en response.data.token

        if (newToken) {
          // Guardar el nuevo token en el localStorage
          localStorage.setItem('token', newToken);

          console.log('Token actualizado en el localStorage');

          // Actualizar el id_sub en el UserContext
          const decodedNewToken = jwtDecode(newToken); // Decodificar el nuevo token
          const newSubId = decodedNewToken.id_sub; // Obtener el nuevo id_sub
          setUserSubId(newSubId); // Actualizar el id_sub en el contexto
          console.log('id_sub actualizado en el UserContext:', newSubId);

          // Redirigir a la página de inicio
          navigate('/home');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error.response ? error.response.data : error.message);
      }

    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-semibold mb-6">Planes de Suscripción</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-medium text-blue-500">{plan.nombre}</h3>
            <p className="text-gray-600 mt-2">{plan.descripcion}</p>
            <ul className="text-gray-600 mt-4">
              {plan.funcionalidades.map((func, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✔️</span>{func}
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handlePlanSelection(plan.id)} // Llamada al hacer clic
              >
                Obtener Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planes;
