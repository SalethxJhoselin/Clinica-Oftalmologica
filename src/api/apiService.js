import axios from 'axios'
//import * as jwt_decode from 'jwt-decode'; 

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
        console.log({ ci: ciUser });
        const response = await api.get(`/usuarios/obtenerUsuario`, {
            params: { ci: ciUser },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw error;
    }
};
export const getAllUsers = async () => {
    try {
        const response = await api.get(`/usuarios/obtenerUsuarios`);
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
export const createRole = async (roleName) => {
    try {
        const dataToSend = { nombre: roleName };
        await api.post('/roles/crear', dataToSend);
        console.log('Rol creado exitosamente');
    } catch (error) {
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

//////no quiere hacer put :( 
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
}; export const createProfession = (professionData) => {
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
        console.error('Error al obtener lista de empleados:', error);
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

        const data={
                id:professionId,
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
                profesiones_id:updatedData.profesion

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
// Obtener todas las especialidades
export const getAllSpecialties = async () => {
    try {
        const response = await api.get('/especialidades/listar');
        return response.data;
    } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        throw error;
    }
};

// Crear una nueva especialidad
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