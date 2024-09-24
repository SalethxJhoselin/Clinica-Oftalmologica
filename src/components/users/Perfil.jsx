import React, { useState, useEffect } from 'react'; 
import { useUser } from '../../context/UserContext';
import { getUserByCI } from '../../api/apiService';

import './Perfil.css';

const Perfil = () => {
    const { userCi } = useUser();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null); 

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
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

    // Efecto para obtener los datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            if (userCi) {
                try {
                    const user = await getUserByCI(userCi);
                    setUserData(user);
                    setNombre(user.nombre || ''); // Ajusta según la estructura de tu respuesta
                    setEmail(user.email || '');
                    setTelefono(user.telefono || '');
                    setDireccion(user.direccion || '');
                    setFechaNacimiento(user.fechaNacimiento || '');
                } catch (error) {
                    setError('Error al obtener los datos del usuario');
                    console.error(error);
                }
            }
        };

        fetchUserData();
    }, [userCi]); // Dependencia en userCi para volver a cargar si cambia

    return (
        <div className="perfil-container">
            <h2>Perfil de Usuario</h2>
            <div>
                <p>El CI del usuario es: {userCi}</p>
            </div>
            {error && <p className="error">{error}</p>}
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

export default Perfil;
