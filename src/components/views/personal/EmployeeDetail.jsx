import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const EmployeeDetail = ({ visible, onClose, user }) => {
    user = {
        "empleado_id": 9,
        "ci": "124",
        "nombre": "saleth",
        "apellido_paterno": "mamani",
        "apellido_materno": "huanca",
        "fecha_nacimiento": "2024-09-07T00:00:00.000Z",
        "email": "saleth@gmail.com",
        "telefono": null,
        "estado": true,
        "genero": null,
        "direccion": "adc",
        "fecha_contratacion": "2024-09-18T00:00:00.000Z",
        "profesion": "Optometrista",
        "estadoo": true
    }
    const [isEditing, setIsEditing] = useState(false);
    const [ci, setCi] = useState(user ? user.ci : '');
    const [nombre, setNombre] = useState(user ? user.nombre : '');
    const [apellidoPaterno, setApellidoPaterno] = useState(user ? user.apellido_paterno : '');
    const [apellidoMaterno, setApellidoMaterno] = useState(user ? user.apellido_materno : '');
    const [fechaNacimiento, setFechaNacimiento] = useState(user ? dayjs(user.fecha_nacimiento) : null);
    const [email, setEmail] = useState(user ? user.email : '');
    const [telefono, setTelefono] = useState(user ? user.telefono : '');
    const [direccion, setDireccion] = useState(user ? user.direccion : '');
    const [fechaContratacion, setFechaContratacion] = useState(user ? dayjs(user.fecha_contratacion) : null);
    const [profesion, setProfesion] = useState(user ? user.profesion : '');

    useEffect(() => {
        if (user) {
            setCi(user.ci);
            setNombre(user.nombre);
            setApellidoPaterno(user.apellido_paterno);
            setApellidoMaterno(user.apellido_materno);
            setFechaNacimiento(dayjs(user.fecha_nacimiento));
            setEmail(user.email);
            setTelefono(user.telefono);
            setDireccion(user.direccion);
            setFechaContratacion(dayjs(user.fecha_contratacion));
            setProfesion(user.profesion);
        }
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const formattedFechaNacimiento = dayjs(fechaNacimiento).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const formattedFechaContratacion = dayjs(fechaContratacion).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const updatedEmployee = {
            empleado_id: user.empleado_id,
            ci,
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            fecha_nacimiento: formattedFechaNacimiento,
            email,
            telefono,
            direccion,
            fecha_contratacion: formattedFechaContratacion,
            profesion,
        };
        console.log("Datos guardados:", updatedEmployee);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        if (user) {
            setCi(user.ci);
            setNombre(user.nombre);
            setApellidoPaterno(user.apellido_paterno);
            setApellidoMaterno(user.apellido_materno);
            setFechaNacimiento(dayjs(user.fecha_nacimiento));
            setEmail(user.email);
            setTelefono(user.telefono);
            setDireccion(user.direccion);
            setFechaContratacion(dayjs(user.fecha_contratacion));
            setProfesion(user.profesion);
        }
    };

    return (
        <Modal
            title="Detalle del Empleado"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
        >
            {!isEditing ? (
                <>
                    <p><strong>ID:</strong> {user.empleado_id}</p>
                    <p><strong>CI:</strong> {user.ci}</p>
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                    <p><strong>Apellido Paterno:</strong> {user.apellido_paterno}</p>
                    <p><strong>Apellido Materno:</strong> {user.apellido_materno}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {dayjs(user.fecha_nacimiento).format('YYYY-MM-DD')}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Teléfono:</strong> {user.telefono || 'N/A'}</p>
                    <p><strong>Dirección:</strong> {user.direccion}</p>
                    <p><strong>Fecha de Contratación:</strong> {dayjs(user.fecha_contratacion).format('YYYY-MM-DD')}</p>
                    <p><strong>Profesión:</strong> {user.profesion}</p>
                    <Button type="primary" onClick={handleEditClick}>Editar</Button>
                </>
            ) : (
                <>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>CI:</strong></p>
                        <Input value={ci} onChange={(e) => setCi(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Nombre:</strong></p>
                        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Apellido Paterno:</strong></p>
                        <Input value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Apellido Materno:</strong></p>
                        <Input value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Fecha de Nacimiento:</strong></p>
                        <DatePicker value={fechaNacimiento} onChange={setFechaNacimiento} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Email:</strong></p>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Teléfono:</strong></p>
                        <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Dirección:</strong></p>
                        <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Fecha de Contratación:</strong></p>
                        <DatePicker value={fechaContratacion} onChange={setFechaContratacion} />
                    </div>
                    <div className="flex items-center mb-1">
                        <p className="mr-3"><strong>Profesión:</strong></p>
                        <Input value={profesion} onChange={(e) => setProfesion(e.target.value)} />
                    </div>
                    <Space className="flex justify-end">
                        <Button type="primary" onClick={handleSaveClick}>Guardar</Button>
                        <Button onClick={handleCancelClick}>Cancelar</Button>
                    </Space>
                </>
            )}
        </Modal>
    );
};

export default EmployeeDetail;
