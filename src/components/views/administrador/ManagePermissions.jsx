import React, { useEffect, useState } from 'react';
import { Select, Checkbox, Button, Typography } from 'antd';
import { fetchRolePermissions, fetchPermissions, updateRolePermissions } from '../../../api/rolesApi';

const { Title } = Typography;

const ManagePermissions = () => {
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    const loadRolesAndPermissions = async () => {
        try {
            const rolesData = await fetchRolePermissions();
            console.log("roles y permisos")
            console.log(rolesData)
            const permissionsData = await fetchPermissions(); // Obtener permisos desde la API
            console.log("permissionsData")
            console.log(permissionsData)
            setRoles(rolesData);
            setPermissions(permissionsData);
        } catch (error) {
            notification.error({ message: 'Error al obtener roles o permisos', description: error.message });
        }
    };
    useEffect(() => {
        loadRolesAndPermissions();
    }, []);

    const handleRoleChange = (value) => {
        setSelectedRoleId(value);
        const selectedRole = roles.find(role => role.id === value);
        if (selectedRole) {
            setRolePermissions(selectedRole.permisos.map(permission => permission.id));
        } else {
            setRolePermissions([]);
        }
    };

    const handlePermissionChange = (permissionId) => {
        setRolePermissions(prevPermissions =>
            prevPermissions.includes(permissionId)
                ? prevPermissions.filter(id => id !== permissionId)
                : [...prevPermissions, permissionId]
        );
    };

    const handleSavePermissions = async () => {
        const updatedRolePermissions = {
            permissions: rolePermissions
        };
        try {
            console.log('updatedRolePermissions')
            console.log(updatedRolePermissions)
            await updateRolePermissions(selectedRoleId, updatedRolePermissions);
            notification.success({ message: 'Permisos actualizados correctamente' });
        } catch (error) {
            notification.error({ message: 'Error al actualizar permisos', description: error.message });
        }
    };

    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
            <Title level={3} className="text-center">Gestionar Permisos</Title>
            {/*<div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto mt-2 p-8 rounded-2xl shadow-md">*/}
            <div className="mb-6">
                <h3 className="text-lg">Rol:</h3>
                <Select
                    style={{ width: '100%' }} s
                    onChange={handleRoleChange}
                    value={selectedRoleId}
                    placeholder="Seleccionar Rol"
                >
                    {roles.length > 0 ? (
                        roles.map(role => (
                            <Select.Option key={role.id} value={role.id}>
                                {role.nombre}
                            </Select.Option>
                        ))
                    ) : (
                        <Select.Option>No data found</Select.Option>
                    )}
                </Select>
            </div>
            <div className="mb-6">
                <h3 className="text-lg">Permisos:</h3>
                <div className="flex flex-col items-start">
                    {permissions.length > 0 ? (
                        permissions.map(permission => (
                            <div key={permission.id} className="mb-2">
                                <Checkbox
                                    disabled={!selectedRoleId}
                                    checked={rolePermissions.includes(permission.id)}
                                    onChange={() => handlePermissionChange(permission.id)}
                                >
                                    {permission.nombre}
                                </Checkbox>
                            </div>
                        ))
                    ) : (
                        <span>No data found</span>
                    )}
                </div>
            </div>
            <div>
                <Button
                    className="w-full"
                    disabled={!selectedRoleId}
                    onClick={handleSavePermissions}
                >
                    Guardar
                </Button>
            </div>
            {/*</div>*/}
        </div>
    );
};

export default ManagePermissions;
