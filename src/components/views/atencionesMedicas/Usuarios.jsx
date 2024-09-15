import React, { useState } from 'react';
import '../estilos/Usuario.css';

const Usuarios = () => {
    const [nombre, setNombre] = useState('Juan Pérez');
    const [email, setEmail] = useState('juan.perez@example.com');
    const [telefono, setTelefono] = useState('789456123');
    const [direccion, setDireccion] = useState('Av. Principal #123');
    const [fechaNacimiento, setFechaNacimiento] = useState('1990-05-15');
    const [historialCitas] = useState([
        'Consulta general - 2023-01-15',
        'Consulta especializada - 2023-03-22',
        'Control de lentes - 2023-07-10',
    ]);

    const [tempNombre, setTempNombre] = useState(nombre);
    const [tempEmail, setTempEmail] = useState(email);
    const [tempTelefono, setTempTelefono] = useState(telefono);
    const [tempDireccion, setTempDireccion] = useState(direccion);
    const [tempFechaNacimiento, setTempFechaNacimiento] = useState(fechaNacimiento);

    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => setEditMode(true);

    const handleSave = (e) => {
        e.preventDefault();
        setNombre(tempNombre);
        setEmail(tempEmail);
        setTelefono(tempTelefono);
        setDireccion(tempDireccion);
        setFechaNacimiento(tempFechaNacimiento);
        setEditMode(false);
    };

    const handleCancel = () => {
        setTempNombre(nombre);
        setTempEmail(email);
        setTempTelefono(telefono);
        setTempDireccion(direccion);
        setTempFechaNacimiento(fechaNacimiento);
        setEditMode(false);
    };

    return (
        <div className="perfil-container">
            <h2>Perfil de Usuario</h2>
            <form className="perfil-info">
                <div className="perfil-item">
                    <label htmlFor="nombre">Nombre:</label>
                    {editMode ? (
                        <input 
                            type="text" 
                            id="nombre" 
                            value={tempNombre} 
                            onChange={(e) => setTempNombre(e.target.value)} 
                        />
                    ) : (
                        <p>{nombre}</p>
                    )}
                </div>
                <div className="perfil-item">
                    <label htmlFor="email">Email:</label>
                    {editMode ? (
                        <input 
                            type="email" 
                            id="email" 
                            value={tempEmail} 
                            onChange={(e) => setTempEmail(e.target.value)} 
                        />
                    ) : (
                        <p>{email}</p>
                    )}
                </div>
                <div className="perfil-item">
                    <label htmlFor="telefono">Teléfono:</label>
                    {editMode ? (
                        <input 
                            type="text" 
                            id="telefono" 
                            value={tempTelefono} 
                            onChange={(e) => setTempTelefono(e.target.value)} 
                        />
                    ) : (
                        <p>{telefono}</p>
                    )}
                </div>
                <div className="perfil-item">
                    <label htmlFor="direccion">Dirección:</label>
                    {editMode ? (
                        <input 
                            type="text" 
                            id="direccion" 
                            value={tempDireccion} 
                            onChange={(e) => setTempDireccion(e.target.value)} 
                        />
                    ) : (
                        <p>{direccion}</p>
                    )}
                </div>
                <div className="perfil-item">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                    {editMode ? (
                        <input 
                            type="date" 
                            id="fechaNacimiento" 
                            value={tempFechaNacimiento} 
                            onChange={(e) => setTempFechaNacimiento(e.target.value)} 
                        />
                    ) : (
                        <p>{fechaNacimiento}</p>
                    )}
                </div>
                <div className="perfil-item">
                    <label>Historial de Citas:</label>
                    <ul>
                        {historialCitas.map((cita, index) => (
                            <li key={index}>{cita}</li>
                        ))}
                    </ul>
                </div>
                {editMode ? (
                    <div>
                        <button className="guardar-btn" onClick={handleSave}>
                            Guardar Cambios
                        </button>
                        <button className="cancelar-btn" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button className="modificar-btn" onClick={handleEdit}>
                        Modificar
                    </button>
                )}
            </form>
        </div>
    );
};
export default Usuarios;