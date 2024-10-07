import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import { Modal, Button, Input, DatePicker, Space, Select, Row, Col, Form } from 'antd';
import dayjs from 'dayjs';
import { getProfessions, fetchRoles } from '../../../api/apiService';
import RegisterEmployee from './RegisterStaff';

const { Option } = Select;

const employeeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return action.payload;
        default:
            return state;
    }
};

const PersonDetail = ({ visible, onClose, user }) => {
    const initialState = {
        ci: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: null,
        email: '',
        telefono: '',
        direccion: '',
        fechaContratacion: null,
        profesion: '',
        genero: null,
        estado: true,
        rol: '',
    };

    const [employeeState, dispatch] = useReducer(employeeReducer, initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Controla la visibilidad del modal de edición
    const [professions, setProfessions] = useState([]);
    const [roles, setRoles] = useState([]);

    // Inicializa el estado del empleado
    useEffect(() => {
        if (user) {
            dispatch({
                type: 'SET_EMPLOYEE',
                payload: {
                    ci: user.ci,
                    nombre: user.nombre,
                    apellidoPaterno: user.apellido_paterno,
                    apellidoMaterno: user.apellido_materno,
                    fechaNacimiento: dayjs(user.fecha_nacimiento),
                    email: user.email,
                    telefono: user.telefono,
                    direccion: user.direccion,
                    fechaContratacion: dayjs(user.fecha_contratacion),
                    profesion: user.profesion || '',
                    genero: user.genero || '',
                    estado: user.estado != null ? user.estado : true,
                    rol: user.rol || '',
                }
            });
        }
    }, [user]);

    // Fetch de profesiones y roles
    useEffect(() => {
        const fetchProfessionsAndRoles = async () => {
            try {
                const [professionsData, rolesData] = await Promise.all([getProfessions(), fetchRoles()]);
                setProfessions(professionsData);
                setRoles(rolesData);
            } catch (error) {
                console.error('Error al obtener profesiones o roles:', error);
            }
        };
        fetchProfessionsAndRoles();
    }, []);

    // Mostrar el modal de edición y cerrar el modal de detalles
    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditModalVisible(true);
    };

    // Cerrar el modal de edición
    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
        setIsEditing(false);
    };
    const handleSave = (savedData) => {
        console.log("Datos guardados:", savedData); // Mostrar en consola los datos guardados
        setIsEditModalVisible(false); // Cerrar el modal después de guardar
    };

    return (
        <>
            <Modal
                title="Detalle del Empleado"
                visible={visible}
                onCancel={onClose}
                footer={null}
                centered
                width={800}  // Modal más ancho
            >
                <>
                    <p><strong>ID:</strong> {user.empleado_id}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>CI:</strong> {user.ci}</div>
                        <div><strong>Nombre:</strong> {user.nombre}</div>
                        <div><strong>Apellido Paterno:</strong> {user.apellido_paterno}</div>
                        <div><strong>Apellido Materno:</strong> {user.apellido_materno}</div>
                        <div><strong>Dirección:</strong> {user.direccion}</div>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Fecha de Nacimiento:</strong> {dayjs(user.fecha_nacimiento).format('YYYY-MM-DD')}</div>
                        <div><strong>Fecha de Contratación:</strong> {dayjs(user.fecha_contratacion).format('YYYY-MM-DD')}</div>
                        <div><strong>Profesión:</strong> {user.profesion}</div>
                        <div><strong>Rol:</strong> {user.rol}</div>
                        <div><strong>Estado:</strong> {user.estado ? 'Activo' : 'Inactivo'}</div>
                        <div><strong>Teléfono:</strong> {user.telefono || 'N/A'}</div>
                        <div><strong>Género:</strong> {user.genero}</div>
                    </div>
                    <div className="mt-5">
                        <Button type="primary" onClick={handleEditClick}>Editar</Button>
                    </div>
                </>
            </Modal>

            {/* Modal para la edición del empleado */}
            {isEditModalVisible && (
                <RegisterEmployee
                    visible={isEditModalVisible}
                    onClose={handleCloseEditModal}  // Cierra el modal de edición
                    onSave={handleSave}  // Puedes definir aquí la lógica de guardado
                    name="editSpecialists"  // Prop `name` establecida como "editSpecialists"
                    initialData={user}  // Enviar los datos actuales del usuario para edición
                />
            )}
        </>
    );
};

export default PersonDetail;
