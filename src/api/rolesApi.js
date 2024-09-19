import axios from 'axios'

const API_BASE_URL = 'https://clinica-oftalmologica.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL,
});

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
export const fetchPermissions = async () => {
    try {
        const response = await api.get('/permisos/listar');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener permisos');
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
export const updateRolePermissions = async (roleId, permissionsData) => {
    const response = await api.put(`/roles/${roleId}/permissions`, permissionsData);
    return response.data;
};
