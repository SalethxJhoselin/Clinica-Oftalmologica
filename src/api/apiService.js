import axios from 'axios'

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


const obtenerIP = async () => {
    try {
      const respuesta = await fetch('https://api.ipify.org?format=json');
      const data = await respuesta.json();
      return data.ip;
    } catch (error) {
      console.error("Error al obtener la IP:", error);
      return null;
    }
  };

  export const registrarVisita = async (usuarioId, pagina, accion, rol) => {
    try {
      const ip = await obtenerIP();  // Aquí obtienes la IP desde otra función
      const fecha = new Date().toISOString();  // Formato estándar de fecha
      const hora = new Date().toLocaleTimeString(); // Obtiene la hora actual en formato legible
  
      const bitacora = {
        usuarioId,     // ID del usuario actual
        pagina,        // Página visitada
        ipOrigen: ip,  // IP desde la que se hace la solicitud
        accion,        // Acción realizada por el usuario (ej. "Visitó la página de usuarios")
        rol,           // Rol del usuario (ej. "Administrador")
        fecha,         // Fecha actual
        hora           // Hora actual
      };
  
      await api.post('/bitacora/insertar', bitacora);  // Hacer la solicitud al backend para registrar la visita
      console.log('Visita registrada en la bitácora');
    } catch (error) {
      console.error('Error al registrar la visita en la bitácora:', error);
    }
  };
  
  export const getBitacoraData = async () => {
    try {
      const response = await api.get('/bitacora/listar');
      return response.data;  // Aquí debería devolver los registros con los campos adecuados
    } catch (error) {
      console.error('Error al obtener los datos de la bitácora:', error);
      throw error;
    }
  };


  