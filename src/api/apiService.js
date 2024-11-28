import axios from 'axios'
import { message } from 'antd';

const API_BASE_URL = 'https://clinica-oftalmologica.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});
export default api;
//==========LOGIN====================================
export const loginRequest = async (ci, password) => {
  try {
    const response = await api.post(`/usuarios/login`, {
      ci,
      password,
    });
    return response.data; // Aquí puedes devolver el token u otros datos si es necesario
  } catch (error) {
    throw new Error('Error al ingresar');
  }
};
//==========REGISTER====================================
export const registerRequest = async (userData) => {
  try {
    const formattedUserData = {
      ...userData,
      fecha_nacimiento: userData.fecha_nacimiento.format('YYYY-MM-DD'), // Asegúrate de usar el formato correcto
    };
    console.log("usuaformattedUserDatario")
    console.log(formattedUserData)
    const response = await api.post('/usuarios/registrarse', formattedUserData);
    console.log("response registro")
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error('Error al ingresar');
  }
};
//==========USERS====================================//AYUDA!!!!!
export const getUserByCI = async (ciUser) => {
  try {
    const response = await api.get(`/usuarios/obtenerUsuario`, {
      params: { ci: ciUser },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    throw error;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await api.get(`/usuarios/obtenerUsuarios/1`);
    return response;
  } catch (error) {
    console.error('Error al obtener los datos de usaurios:', error);
    throw error;
  }
};
//==========ROLES====================================
export const fetchRoles = async () => {
  try {
    const response = await api.get('/roles/obtenerRoles');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener roles');
  }
};

export const updateRole = async (roleId, updatedData) => {
  try {
    const dataToSend = { id: roleId, nombre: updatedData.nombre }
    console.log('dataToSend')
    console.log(dataToSend)
    await api.put(`/roles/editar`, dataToSend);
  } catch (error) {
    throw new Error('Error al guardar el rol');
  }
};

export const deleteRole = async (roleName) => {
  try {
    await api.delete('/roles/eliminar', {
      data: { nombre: roleName } // Axios requiere que el cuerpo se pase bajo la propiedad 'data' para métodos DELETE, por eso no me salia!! perdi mucho tiempo en esto xd
    });
    console.log('Rol eliminado con éxito');
  } catch (error) {
    throw new Error('Error al eliminar el rol');
  }
};
export const createRole = async (roleName, userSubId) => {
  try {
    console.log("userSubIddddd", userSubId)
    const dataToSend = { nombre: roleName, id_sub: userSubId }; // Incluir id_sub en los datos
    await api.post('/roles/crear', dataToSend);
    console.log('Rol creado exitosamente');
  } catch (error) {
    console.error('Error al crear el rol', error);
    throw new Error('Error al crear el rol');
  }
};
export const fetchRolePermissions = async () => {
  try {
    const response = await api.get(`/roles/permisos`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener roles con permisos');
  }
};
//==========PERMISSIONS====================================
export const fetchPermissions = async () => {
  try {
    const response = await api.get('/permisos/listar');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener permisos');
  }
};

export const updateRolePermissions = async (roleId, permissionsData) => {
  try {
    const payload = {
      idRol: String(roleId),
      permisos: permissionsData.permissions.map(permission => ({ id: Number(permission) }))
    };
    console.log("payload");
    console.log(payload);
    const response = await api.post(`/roles/agregar-permisos`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener permisos');
  }
};
//==========PROFESSIONS====================================
export const getProfessions = async () => {
  try {
    const response = await api.get('/profesiones');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las profesiones:', error);
    throw error;
  }
};
export const editProfession = async (professionId, updatedData) => {
  try {
    const response = await api.post(`/profesiones/editar`, { id: professionId, ...updatedData });
    return response.data;
  } catch (error) {
    console.error('Error al editar la profesión:', error);
    throw error;
  }
};
export const deleteProfession = async (professionId) => {
  try {
    const response = await api.delete(`/profesiones/eliminar`, { data: { id: professionId } });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la profesión:', error);
    throw error;
  }
};
export const createProfession = (professionData) => {
  try {
    return api.post(`/profesiones/crear`, professionData);
  } catch (error) {
    console.error('Error al crear la profesión:', error);
    throw error;
  }
};
//==========EMPLOYEES====================================
export const getAllEmployees = async () => {
  try {
    const response = await api.get('/empleado/listar');
    return response;
  } catch (error) {
    message.error('Error al obtener lista de empleados:');
    throw error;
  }
};
export const createEmployee = (employeeData) => {
  try {
    console.log("employeeData")
    console.log(employeeData)
    return api.post(`/empleado/crear`, employeeData);
  } catch (error) {
    console.error('Error al registrar al empleado:', error);
    throw error;
  }
};
export const updateEmployee = async (professionId, updatedData) => {
  try {
    console.log("data prueba dentro")
    console.log(updatedData)

    const data = {
      id: professionId,
      direccion: updatedData.direccion,
      fecha_contratacion: updatedData.fecha_contratacion,
      estadoo: updatedData.estado,
      ci: updatedData.ci,
      nombre: updatedData.nombre,
      apellido_paterno: updatedData.apellidoPaterno,
      apellido_materno: updatedData.apellidoMaterno,
      fecha_nacimiento: updatedData.fecha_nacimiento,
      email: updatedData.email,
      telefono: updatedData.telefono,//que se actualice
      roles_id: updatedData.rol,//que se actualice
      genero: updatedData.genero,//que se actualice
      profesiones_id: updatedData.profesion

    }
    console.log("data Dentrooooo")
    console.log(data)
    const response = await api.post(`/empledo/editar`, data);
    console.log("response se edito pero sigue dentro")
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error al editar empleado:', error);
    throw error;
  }
};

//==========PACIENTES====================================
export const getAllPatients = async () => {
  try {
    const response = await api.get('/paciente/listar');
    return response;
  } catch (error) {
    console.error('Error al obtener lista de pacientes:', error);
    throw error;
  }
};

export const createPatient = (patientData) => {
  try {
    console.log("patientData")
    console.log(patientData)
    return api.post(`/paciente/crear`, patientData);
  } catch (error) {
    console.error('Error al registrar al paciente:', error);
    throw error;
  }
};

export const updatePatient = async (patientId, updatedData) => {
  try {
    const data = {
      id: patientId,
      direccion: updatedData.direccion,
      fecha_ingreso: updatedData.fecha_ingreso, // Cambiado de fecha_contratacion a fecha_ingreso
      estado: updatedData.estado, // Cambiado de estadoo a estado
      ci: updatedData.ci,
      nombre: updatedData.nombre,
      apellido_paterno: updatedData.apellido_paterno,
      apellido_materno: updatedData.apellido_materno,
      fecha_nacimiento: updatedData.fecha_nacimiento,
      email: updatedData.email,
      telefono: updatedData.telefono,
      rol_id: updatedData.rol,
      genero: updatedData.genero,
      profesiones_id: updatedData.profesiones_id // Este campo puede que no sea necesario para pacientes
    };
    console.log("data dentro")
    console.log(data)
    const response = await api.post(`/paciente/editar`, data);
    return response.data;
  } catch (error) {
    console.error('Error al editar paciente:', error);
    throw error;
  }
};

//==========ESPECIALIDADES====================================
export const getAllSpecialties = async () => {
  try {
    const response = await api.get('/especialidades/listar');
    return response.data;
  } catch (error) {

    console.error('Error al obtener las especialidades:', error);
    throw error;
  }
};
export const createSpecialty = async (specialtyData) => {
  try {
    const response = await api.post('/especialidades/crear', specialtyData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la especialidad:', error);
    throw error;
  }
};
// Editar una especialidad existente
export const editSpecialty = async (specialtyId, updatedData) => {
  try {
    const data = { id: specialtyId, ...updatedData };
    const response = await api.post('/especialidades/editar', data);
    return response.data;
  } catch (error) {
    console.error('Error al editar la especialidad:', error);
    throw error;
  }
};

// Eliminar una especialidad
export const deleteSpecialty = async (specialtyId) => {
  try {
    console.log("ID enviado para eliminar:", specialtyId);  // Confirmar el ID enviado
    const response = await api.delete('/especialidades/eliminar', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id: specialtyId }  // Asegurarte de pasar el id dentro de data
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la especialidad:', error);
    throw error;
  }
};//const response = await api.delete(`/profesiones/eliminar`, { data: { id: professionId } });
// Función para obtener la IP del cliente
// Función para obtener el userId desde el token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');  // Obtiene el token del localStorage
  if (token) {
    const decodedToken = jwt_decode(token);  // Decodifica el token
    return decodedToken.userId || decodedToken.id;  // Ajusta según el nombre de tu campo userId o id en el token
  }
  return null;  // Devuelve null si no hay token
};

// Función para obtener la IP del cliente
const obtenerIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');  // Usa un servicio público de IP
    const data = await response.json();
    return data.ip;  // Retorna la IP obtenida
  } catch (error) {
    console.error('Error al obtener la IP:', error);
    return '255.255.255.255';  // Retorna una IP por defecto si no se puede obtener la real
  }
};

// Función para registrar una visita en la bitácora


// Función para registrar una visita en la bitácora
export const registrarVisita = async (pagina, accion, tablaAfectada) => {
  try {
    const ip = await obtenerIP();  // Obtener la IP del cliente
    const fecha = new Date().toISOString().split('T')[0];  // Formato YYYY-MM-DD
    const hora = new Date().toLocaleTimeString('en-GB');   // Obtener la hora actual en formato HH:MM:SS
    const userId = localStorage.getItem('userId');  // Obtiene el userId almacenado en localStorage

    const bitacoraEntry = {
      ip,               // IP obtenida
      ci: userId,       // CI del usuario (utiliza el userId como CI)
      fecha,            // Fecha en formato YYYY-MM-DD
      hora,             // Hora actual
      accion,           // Acción realizada (ejemplo: "Accedió a la página /home")
      tabla_afectada: tablaAfectada,  // Tabla afectada
    };

    console.log('Datos enviados a la bitácora:', bitacoraEntry);

    // Envía la solicitud POST para registrar la visita en la bitácora
    const response = await api.post('/bitacora/insertar', bitacoraEntry);
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    console.error('Error al registrar la visita en la bitácora:', error);
  }
};

// Función para obtener los datos de la bitácora
export const getBitacoraData = async () => {
  try {
    const response = await api.get('/bitacora/listar'); // Llama a la API de listar
    return response.data;  // Devuelve los datos de la bitácora
  } catch (error) {
    console.error('Error al obtener los datos de la bitácora:', error);
    throw error;
  }
};

// Obtener todos los pagos
export const getAllPagos = async () => {
  try {
    const response = await api.get('/pagos/listar'); // Asegúrate de que la URL sea correcta
    console.log("Respuesta del servidor:", response); // Verifica si los datos llegan correctamente
    return response; // Retorna la respuesta para ser usada en el frontend
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
    throw error;
  }
};

export const generarReporte = async (data) => {
  try {
    const response = await api.post('/reporte/empleado', data, {
      responseType: 'blob' // Esto es importante para recibir el archivo generado
    });
    return response.data;
  } catch (error) {
    console.error('Error al generar reporte:', error);
    throw error;
  }
};

export const generarReportePagos = async (data) => {
  try {
    const response = await api.post('/reporte/pagos', data, {
      responseType: 'blob', // Importante para recibir el archivo generado
    });
    return response.data;
  } catch (error) {
    console.error('Error al generar reporte de pagos:', error);
    throw error;
  }
};

//==========GESTIONAR SERVICIOS====================================
export const getAllServices = async () => {
  try {
    const response = await api.get('/servicios/listar');
    return response.data;
  } catch (error) {
    message.error('Error al obtener lista de servicios:');
    throw error;
  }
};
//==========GESTIONAR PROGRAMACION DE DIAS Y HORARIOS DE ATENCION POR MEDICO====================================
export const createSpecialistProgramming = (specialistData) => {
  try {
    const response = api.post(`/programaciones_medical/crear`, specialistData);
    message.success("Programacion de medico gistrado exitosamente");
    return response;
  } catch (error) {
    message.error('Error al registrar la programacion');
    throw error;
  }
};
export const getAllSpecialistProgramming = async () => {
  try {
    const response = await api.get('/programaciones_medical/listar');
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener lista de programaciones:', error);

    throw error;
  }
};

//==========ESPECIALISTAS====================================
export const getAllSpecialists = async () => {
  try {
    const response = await api.get('/especialistas/listar');
    console.log("response.data");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener lista de empleados:', error);
    throw error;
  }
};
export const createSpecialist = (specialistData) => {
  try {
    const response = api.post(`especialistas/crear`, specialistData);
    message.success("especialista gistrado exitosamente");
    return response;
  } catch (error) {
    message.error('Error al registrar especialista:');
    throw error;
  }
};
export const deleteSpecialist = async (id) => {
  try {
    console.log("id");
    console.log(id);
    api.delete('/especialistas/eliminar', {
      data: { empleado_id: id }
    });
    message.success("especialista eliminado exitosamente");
  } catch (error) {
    message.error('Error al eliminar especialista:');
    throw error;
  }
};

//==========GESTIONAR CITAS====================================
export const getAllBookingAppointments = async () => {
  try {
    const response = await api.get('/citas/listar');
    return response.data;
  } catch (error) {
    message.error('Error al obtener datos');
    console.error('Error al obtener lista de los registros de citas:', error);
    throw error;
  }
};
export const createBookingAppointment = (specialistData) => {
  try {
    console.log("specialistData vamos aver si funca, sino efe", specialistData);
    const response = api.post(`citas/crear`, specialistData);
    message.success("especialista gistrado exitosamente");
    return response;
  } catch (error) {
    message.error('Error al registrar especialista:');
    throw error;
  }
};
export const editBookingAppointment = async (data) => {
  try {
    const response = api.put('/citas/editar', data);
    console.log("dataresponse");
    console.log(response);
    message.success("cita cancelada exitosamente");
  } catch (error) {
    message.error('Error al cancelar la cita:');
    throw error;
  }
};
//==========REALIZAR PAGOS====================================
export const makePayment = (date) => {
  try {
    const response = api.post(`/create_payment_web`, date);
    console.log("respuesta despues de pago", response);
    return response;
  } catch (error) {
    message.error('Error al realizar pago:');
    throw error;
  }
};
export const createPaymentRecord = (payData) => {
  try {
    console.log("specialistData vamos aver si funca, sino efe", payData);
    const response = api.post(`pagos/insertar`, payData);
    message.success("pago gistrado exitosamente");
    return response;
  } catch (error) {
    message.error('Error al registrar pago:');
    throw error;
  }
};

// /----------------------TRIAJES-------------------------------
export const getAllTriajes = async () => {
  try {
    const response = await api.get('/triaje/listar');
    return response.data; // Devuelve los triajes obtenidos
  } catch (error) {
    console.error('Error al obtener lista de triajes:', error);
    message.error('Error al obtener lista de triajes');
    throw error;
  }
};
export const createTriaje = async (triajeData) => {
  try {
    // Hacer la solicitud POST para crear el triaje, pasando directamente el objeto triajeData
    const response = await api.post('/triaje/crear', triajeData);

    // Mostrar mensaje de éxito
    message.success("Triaje creado exitosamente");

    // Retornar los datos de la respuesta
    return response.data;

  } catch (error) {
    // Mostrar mensaje de error si algo falla
    message.error('Error al crear el triaje');
    throw error; // Lanza el error para que se pueda manejar en el lugar donde se invoque
  }
};
export const deleteTriaje = async (id) => {
  try {
    // Hacer la solicitud DELETE para eliminar el triaje por ID
    const response = await api.delete('/triaje/eliminar', {
      data: { id }, // Pasar el ID del triaje como cuerpo de la solicitud
    });

    // Mostrar mensaje de éxito
    message.success('Triaje eliminado exitosamente');

    // Retornar la respuesta completa (o solo los datos si es necesario)
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error('Error al eliminar el triaje:', error);
    message.error('Error al eliminar el triaje');
    throw error;
  }
};
// ---------DEPARTAMENTO------------------

// Crear un departamento
export const createDepartamento = async (nombre) => {
  try {
    const response = await api.post('/departamentos/crear', nombre );
    message.success('Departamento creado exitosamente');
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error('Error al crear el departamento:', error);
    message.error('Error al crear el departamento');
    throw error;
  }
};

// Editar un departamento
export const editDepartamento = async (id, nombre) => {
  try {
    const response = await api.put('/departamentos/editar', { id, nombre });
    message.success('Departamento editado exitosamente');
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error('Error al editar el departamento:', error);
    message.error('Error al editar el departamento');
    throw error;
  }
};

// Eliminar un departamento
export const deleteDepartamento = async (id) => {
  try {
    const response = await api.delete('/departamentos/eliminar', {
      data: { id }, // Enviar el ID del departamento en el cuerpo de la solicitud
    });
    message.success('Departamento eliminado exitosamente');
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error('Error al eliminar el departamento:', error);
    message.error('Error al eliminar el departamento');
    throw error;
  }
};

// Listar departamentos
export const getAllDepartamentos = async () => {
  try {
    const response = await api.get('/departamentos/listar');
    return response.data; // Retorna la lista de departamentos
  } catch (error) {
    console.error('Error al obtener la lista de departamentos:', error);
    message.error('Error al obtener la lista de departamentos');
    throw error;
  }
};

// -------------------------Function para subir imagenes---------------
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Clinica'); // Cambia esto si usas otro preset en Cloudinary

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/drugalhsm/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }

    const data = await response.json();
    return data.secure_url; // URL pública de la imagen subida
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};
// --------------------Servicios------------------

// Crear una patología
export const createPatologia = async (nombre, descripcion, file) => {
  try {
    let imagenUrl = null;

    // Subir imagen si se proporciona
    if (file) {
      imagenUrl = await uploadImage(file); // Utiliza tu función de subida de imágenes
    }

    const response = await api.post('/patologias/crear', {
      nombre,
      descripcion,
      imagen: imagenUrl,
    });

    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al crear la patología:', error);
    throw error;
  }
};

// Editar una patología
export const editPatologia = async (id, nombre, descripcion, file) => {
  try {
    if (file) {
      imagenUrl = await uploadImage(file); // Sube la nueva imagen
    }

    // Construir el cuerpo de la solicitud dinámicamente
    const requestBody = {
      id,
      nombre,
      descripcion,
    };




    const response = await api.put('/patologias/editar', requestBody);

    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al editar la patología:', error);
    throw error;
  }
};

//   export const editPatologia = async (id, nombre, descripcion, file) => {
//     try {
//       let imagenUrl = null;

//       // Obtener los datos actuales de la patología
//       const currentPatologia = await getPatologiaById(id);

//       // Si se proporciona un archivo, subir la nueva imagen
//       if (file) {
//         imagenUrl = await uploadImage(file); // Subir la nueva imagen
//       } else {
//         // Si no se proporciona un archivo, mantener la imagen actual
//         imagenUrl = currentPatologia.imagen;
//       }

//       // Construir el cuerpo de la solicitud
//       const requestBody = {
//         id,
//         nombre,
//         descripcion,
//         imagen: imagenUrl, // Usar la imagen actual o la nueva
//       };

//       const response = await api.put('/patologias/editar', requestBody);

//       return response.data; // Devuelve la respuesta del servidor
//     } catch (error) {
//       console.error('Error al editar la patología:', error);
//       throw error;
//     }
//   };

// Obtener una patología por ID
export const getPatologiaById = async (id) => {
  try {
    const response = await api.post(`/patologias/obtener/${id}`);
    return response.data; // Devuelve los datos de la patología
  } catch (error) {
    console.error('Error al obtener la patología:', error);
    throw error;
  }
};

// Listar todas las patologías
export const getAllPatologias = async () => {
  try {
    const response = await api.get('/patologias/listar');
    return response.data; // Devuelve la lista de patologías
  } catch (error) {
    console.error('Error al listar las patologías:', error);
    throw error;
  }
};

// Eliminar una patología
export const deletePatologia = async (id) => {
  try {
    const response = await api.delete('/patologias/eliminar', {
      data: { id }, // Enviar el ID en el cuerpo
    });

    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al eliminar la patología:', error);
    throw error;
  }
};


//   -------------------Servicios---------------------------------

// Crear un servicio
export const createServicio = async (nombre, descripcion, idDepartamento, idEspecialidad, precio, file) => {
  try {
    let imagenUrl = null;

    // Subir imagen si se proporciona
    if (file) {
      imagenUrl = await uploadImage(file); // Subir la imagen a Cloudinary
    }

    const response = await api.post('/servicios/crear', {
      nombre,
      descripcion,
      id_departamento: idDepartamento,
      id_especialidad: idEspecialidad,
      precio,
      imagen_url: imagenUrl, // URL de la imagen subida
    });

    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    throw error;
  }
};

// Editar un servicio
export const editServicio = async (id, nombre, descripcion) => {
  try {
    const response = await api.put('/servicios/editar', { id, nombre, descripcion });
    return response.data; // Respuesta del backend
  } catch (error) {
    console.error('Error al actualizar el servicio:', error);
    throw error;
  }
};
// Eliminar un servicio
export const deleteServicio = async (id) => {
  try {
    const response = await api.delete('/servicios/delete', {
      data: { id }, // Enviar el ID en el cuerpo
    });

    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);
    throw error;
  }
};

// Listar todos los servicios
export const getAllServicios = async () => {
  try {
    const response = await api.get('/servicios/listar');
    return response.data; // Devuelve la lista de servicios
  } catch (error) {
    console.error('Error al listar los servicios:', error);
    throw error;
  }
}; 

export const createBackup = async () => {
  try {
    const response = await api.get('/backup?format=sql'); // Realiza la solicitud GET al endpoint /backup
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error('Error al crear el backup:', error);
    throw error;
  }
};


// Crear un tratamiento
export const createTreatment = async (treatmentData) => {
  try {
    const response = await api.post('/tratamientos/crear', treatmentData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el tratamiento:', error);
    throw error;
  }
};

// Editar un tratamiento
export const updateTreatment = async (treatmentId, updatedData) => {
  try {
    const dataToSend = { id: treatmentId, ...updatedData };
    const response = await api.put('/tratamientos/editar', dataToSend);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el tratamiento:', error);
    throw error;
  }
};

// Obtener todos los tratamientos
export const getAllTreatments = async () => {
  try {
    const response = await api.get('/tratamientos/listar');
    return response.data;
  } catch (error) {
    console.error('Error al listar los tratamientos:', error);
    throw error;
  }
};

// Obtener tratamientos por consulta
export const getTreatmentsByConsultaId = async (consultaId) => {
  try {
    const response = await api.get(`/tratamientos/consulta/${consultaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los tratamientos por consulta:', error);
    throw error;
  }
};

//========== DIAGNÓSTICOS ====================================

// Crear un diagnóstico
export const createDiagnostic = async (diagnosticData) => {
  try {
    const response = await api.post('/diagnosticos/crear', diagnosticData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el diagnóstico:', error);
    throw error;
  }
};

// Editar un diagnóstico
export const updateDiagnostic = async (diagnosticId, updatedData) => {
  try {
    const dataToSend = { id: diagnosticId, ...updatedData };
    const response = await api.put('/diagnosticos/editar', dataToSend);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el diagnóstico:', error);
    throw error;
  }
};

// Listar todos los diagnósticos
export const getAllDiagnostics = async () => {
  try {
    const response = await api.get('/diagnosticos/listar');
    return response.data;
  } catch (error) {
    console.error('Error al listar los diagnósticos:', error);
    throw error;
  }
};

// Obtener diagnóstico por consulta
export const getDiagnosticByConsultaId = async (consultaId) => {
  try {
    const response = await api.get(`/diagnosticos/consulta/${consultaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el diagnóstico por consulta:', error);
    throw error;
  }
};



// API para crear medida de lentes
export const createLensMeasure = async (measureData) => {
  try {
    const response = await api.post('/medidas-lentes/crear', measureData);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    throw new Error('Error al crear la medida de lentes');
  }
};

// API para editar medida de lentes
export const editLensMeasure = async (measureId, measureData) => {
  try {
    const dataToSend = { id: measureId, ...measureData }; // Asegúrate de incluir el 'id'
    const response = await api.put('/medidas-lentes/editar', dataToSend);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    throw new Error('Error al editar la medida de lentes');
  }
};

// API para listar medidas de lentes
export const getLensMeasures = async () => {
  try {
    const response = await api.get('/medidas-lentes/listar');
    return response.data; // Devuelve los datos de las medidas de lentes
  } catch (error) {
    throw new Error('Error al listar las medidas de lentes');
  }
};
// API para obtener las medidas de lentes por ID
export const getLensMeasureById = async (id) => {
  try {
    const response = await api.get(`/medidas-lentes/${id}`);
    return response.data; // Devuelve los datos de la medida de lentes por ID
  } catch (error) {
    throw new Error('Error al obtener la medida de lentes');
  }
};

// API para crear receta
export const createRecipe = async (recipeData) => {
  try {
    const response = await api.post('/recetas/crear', recipeData);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    throw new Error('Error al crear la receta');
  }
};

// API para listar recetas
export const getRecipes = async () => {
  try {
    const response = await api.get('/recetas/listar');
    return response.data; // Devuelve las recetas listadas
  } catch (error) {
    throw new Error('Error al obtener las recetas');
  }
};

// API para editar receta
// API para editar receta
export const editRecipe = async (recipeId, recipeData) => {
  try {
    // Usamos `recipeId` en la URL para la edición de la receta
    const response = await api.put(`/recetas/editar/${recipeId}`, recipeData);
    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    throw new Error('Error al editar la receta');
  }
};