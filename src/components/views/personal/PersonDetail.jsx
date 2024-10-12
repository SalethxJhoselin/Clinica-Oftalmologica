import React, { useReducer, useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import dayjs from 'dayjs';
import AddSpecialties from './AddSpecialties';

const PersonDetail = ({ visible, onClose, user, type }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
        onClose();
    }

    return (
        <>
            <Modal
                title={`Detalle del ${type === 'specialist' ? 'Especialista' : 'Empleado'}`}  // Título dinámico basado en `type`
                visible={visible}
                onCancel={onClose}
                footer={null}
                centered
                width={800}  // Modal más ancho
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>ID:</strong> {user.id}</div>
                    <div><strong>CI:</strong> {user.usuario.ci}</div>
                    <div><strong>Nombre:</strong> {user.usuario.nombre}</div>
                    <div><strong>Apellido Paterno:</strong> {user.usuario.apellido_paterno}</div>
                    <div><strong>Apellido Materno:</strong> {user.usuario.apellido_materno}</div>
                    <div><strong>Email:</strong> {user.usuario.email}</div>
                    <div><strong>Fecha de Nacimiento:</strong> {dayjs(user.usuario.fecha_nacimiento).format('YYYY-MM-DD')}</div>
                    <div><strong>Fecha de Contratación:</strong> {dayjs(user.fecha_contratacion).format('YYYY-MM-DD')}</div>
                    {/* Mostrar nombre de la profesión */}
                    <div><strong>Profesión:</strong> {user.profesion ? `${user.profesion.nombre} (ID: ${user.profesion.id})` : 'N/A'}</div>
                    {/* Mostrar nombre del rol */}
                    <div><strong>Rol:</strong> {user.usuario.rol ? `${user.usuario.rol.nombre}` : 'N/A'}</div>
                    <div><strong>Estado:</strong> {user.estadoo ? 'Activo' : 'Inactivo'}</div>
                    <div><strong>Teléfono:</strong> {user.usuario.telefono || 'N/A'}</div>
                    <div><strong>Género:</strong> {user.usuario.genero}</div>
                    {/* Mostrar especialidades como nombres */}
                    <div><strong>Especialidades:</strong>
                        {user.especialidades && user.especialidades.length > 0 ? (
                            <ul>
                                {user.especialidades.map((especialidad, index) => (
                                    <li key={index}>{`${especialidad.nombre}`}</li>
                                ))}
                            </ul>
                        ) : 'N/A'}
                    </div>
                </div>
                <div className="mt-5">
                    <Button type="primary" onClick={handleEditClick}>Editar</Button>
                </div>
            </Modal>
            <AddSpecialties
                visible={isEditing}
                onClose={handleCancel}
                type="edit"
                initialData={user}
            />
        </>
    );
};

export default PersonDetail;
