import React, { useState } from 'react';
import { Modal, Button, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';

const EmployeeDetail = ({ visible, onClose, user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [ci, setCi] = useState(user ? user.ci : '');
    const [nombre, setNombre] = useState(user ? user.nombre : '');
    const [apellidoPaterno, setApellidoPaterno] = useState(user ? user.apellido_paterno : '');
    const [apellidoMaterno, setApellidoMaterno] = useState(user ? user.apellido_materno : '');
    const [fechaNacimiento, setFechaNacimiento] = useState(user ? dayjs(user.fecha_nacimiento) : null);
    const [email, setEmail] = useState(user ? user.email : '');
    const [telefono, setTelefono] = useState(user ? user.telefono : '');
    const [genero, setGenero] = useState(user ? user.genero : '');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const formattedDate = dayjs(fechaNacimiento).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const updatedUser = {
            id: user.id,
            ci,
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: formattedDate,
            email,
            telefono,
            genero
        };
        console.log("Datos guardados:", updatedUser);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setCi(user.ci);
        setNombre(user.nombre);
        setApellidoPaterno(user.apellido_paterno);
        setApellidoMaterno(user.apellido_materno);
        setFechaNacimiento(dayjs(user.fecha_nacimiento));
        setEmail(user.email);
        setTelefono(user.telefono);
        setGenero(user.genero);
    };

    const handleChangeCi = (e) => {
        setCi(e.target.value);
    };

    const handleChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const handleChangeApellidoPaterno = (e) => {
        setApellidoPaterno(e.target.value);
    };

    const handleChangeApellidoMaterno = (e) => {
        setApellidoMaterno(e.target.value);
    };

    const handleChangeFechaNacimiento = (value) => {
        setFechaNacimiento(value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeTelefono = (e) => {
        setTelefono(e.target.value);
    };

    const handleChangeGenero = (e) => {
        setGenero(e.target.value);
    };

    return (
        <Modal
            title="Detalle del Usuario"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            {user ? (
                <>
                    {!isEditing ? (
                        <>
                            <p className="flex items-center mb-3"><strong className="mr-3">ID:</strong> {user.id} </p>
                            <p className="flex items-center mb-3"><strong className="mr-3">CI:</strong> {user.ci}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Nombre:</strong> {user.nombre}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Apellido Paterno:</strong> {user.apellido_paterno}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Apellido Materno:</strong> {user.apellido_materno}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Fecha de Nacimiento:</strong> {dayjs(user.fecha_nacimiento).format('YYYY-MM-DD')}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Email:</strong> {user.email}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Teléfono:</strong> {user.telefono || 'N/A'}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Género:</strong> {user.genero || 'N/A'}</p>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>CI:</strong></p>
                                <Input
                                    placeholder="CI"
                                    value={ci}
                                    onChange={handleChangeCi}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Nombre:</strong></p>
                                <Input
                                    placeholder="Nombre"
                                    value={nombre}
                                    onChange={handleChangeNombre}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Apellido Paterno:</strong></p>
                                <Input
                                    placeholder="Apellido Paterno"
                                    value={apellidoPaterno}
                                    onChange={handleChangeApellidoPaterno}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Apellido Materno:</strong></p>
                                <Input
                                    placeholder="Apellido Materno"
                                    value={apellidoMaterno}
                                    onChange={handleChangeApellidoMaterno}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Fecha de Nacimiento:</strong></p>
                                <DatePicker
                                    placeholder="Fecha de Nacimiento"
                                    className="w-full"
                                    onChange={handleChangeFechaNacimiento}
                                    value={fechaNacimiento}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Email:</strong></p>
                                <Input
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Teléfono:</strong></p>
                                <Input
                                    placeholder="Teléfono"
                                    value={telefono}
                                    onChange={handleChangeTelefono}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Género:</strong></p>
                                <Input
                                    placeholder="Género"
                                    value={genero}
                                    onChange={handleChangeGenero}
                                />
                            </div>
                            <Space className="flex justify-end">
                                <Button type="primary" onClick={handleSaveClick}>Guardar</Button>
                                <Button onClick={handleCancelClick}>Cancelar</Button>
                            </Space>
                        </>
                    )}
                </>
            ) : (
                <p>No se encontraron detalles</p>
            )}
        </Modal>
    );
};

export default EmployeeDetail;
