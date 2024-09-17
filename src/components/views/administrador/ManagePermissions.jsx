import React, { useEffect, useState } from 'react';
import { Select, Checkbox, Button, Typography } from 'antd';

// Datos simulados
const simulatedRoles = [
    { id: 1, name: 'Administrador', permissions: [{ id: 1, name: 'Crear usuario' }, { id: 2, name: 'Eliminar usuario' }] },
    { id: 2, name: 'Usuario', permissions: [{ id: 3, name: 'Ver contenido' }] }
];

const simulatedPermissions = [
    { id: 1, name: 'Crear usuario' },
    { id: 2, name: 'Eliminar usuario' },
    { id: 3, name: 'Ver contenido' },
    { id: 4, name: 'Editar contenido' }
];

const { Title } = Typography;

const ManagePermissions = () => {
    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        // Simulación de la obtención de datos
        setRoles(simulatedRoles);
        setPermissions(simulatedPermissions);
    }, []);

    const handleRoleChange = (value) => {
        setSelectedRoleId(value);
        const selectedRole = roles.find(role => role.id === value);
        setRolePermissions(selectedRole ? selectedRole.permissions.map(permission => permission.id) : []);
    };

    const handlePermissionChange = (permissionId) => {
        setRolePermissions(prevPermissions =>
            prevPermissions.includes(permissionId)
                ? prevPermissions.filter(id => id !== permissionId)
                : [...prevPermissions, permissionId]
        );
    };

    const handleSavePermissions = () => {
        const updatedRolePermissions = {
            permissions: rolePermissions.map(id => ({ id }))
        };
        console.log(`Simulación de envío de permisos para el rol con ID ${selectedRoleId}:`, updatedRolePermissions);
        setTimeout(() => {
            // Simula un retraso en la respuesta
        }, 1000);
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
                                {role.name}
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
                                    {permission.name}
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
