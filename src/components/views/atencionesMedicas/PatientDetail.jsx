import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import { Modal, Button, Input, DatePicker, Space, Select, Row, Col, Form } from 'antd';
import dayjs from 'dayjs';
import {updatePatient } from '../../../api/apiService'; // Cambiamos las APIs

const { Option } = Select;
const patientReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PATIENT':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return action.payload;
        default:
            return state;
    }
};

const PatientDetail = React.memo(({ visible, onClose, patient }) => {
    const initialState = {
        ci: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: null,
        email: '',
        telefono: '',
        direccion: '',
        tipoSangre: '',
        genero: null,
        estado: true,
    };

    const [patientState, dispatch] = useReducer(patientReducer, initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [bloodTypes, setBloodTypes] = useState([]);

    // Inicializa el estado del paciente
    useEffect(() => {
        if (patient && !isEditing) {
            dispatch({
                type: 'SET_PATIENT',
                payload: {
                    ci: patient.ci,
                    nombre: patient.nombre,
                    apellidoPaterno: patient.apellido_paterno,
                    apellidoMaterno: patient.apellido_materno,
                    fechaNacimiento: dayjs(patient.fecha_nacimiento),
                    email: patient.email,
                    telefono: patient.telefono,
                    direccion: patient.direccion,
                    tipoSangre: patient.tipo_sangre,
                    genero: patient.genero,
                    estado: patient.estado,
                }
            });
        }
    }, [patient, isEditing]);

    // useEffect(() => {
    //     const fetchBloodTypes = async () => {
    //         try {
    //             const bloodTypesData = await getBloodTypes();
    //             setBloodTypes(bloodTypesData);
    //         } catch (error) {
    //             console.error('Error al obtener tipos de sangre:', error);
    //         }
    //     };
    //     fetchBloodTypes();
    // }, []);

    // // Memoriza las opciones de tipos de sangre
    // const bloodTypeOptions = useMemo(() => bloodTypes.map(type => (
    //     <Option key={type.id} value={type.id}>
    //         {type.tipo}
    //     </Option>
    // )), [bloodTypes]);

    // Función para manejar la actualización de campos individuales
    const handleFieldChange = useCallback((field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    }, []);

    // Guardar cambios
    const handleSaveClick = useCallback(async () => {
        const formattedFechaNacimiento = patientState.fechaNacimiento ? patientState.fechaNacimiento.format('YYYY-MM-DD') : null;

        const updatedPatientData = {
            paciente_id: patient.id,
            ...patientState,
            fecha_nacimiento: formattedFechaNacimiento,
        };
        try {
            await updatePatient(patient.id, updatedPatientData); // Llama a la función de actualización
            message.success('Paciente actualizado con éxito');
            setIsEditing(false);
        } catch (error) {
            message.error('Error al actualizar paciente');
            console.error("Error al actualizar paciente:", error);
        }
    }, [patientState, patient.id]);

    // Cancelar edición
    const handleCancelClick = useCallback(() => {
        setIsEditing(false);
        if (patient) {
            dispatch({ type: 'RESET', payload: initialState });
        }
    }, [patient]);

    return (
        <Modal
            title="Detalle del Paciente"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={800}
        >
            {!isEditing ? (
                <>
                    <p><strong>ID:</strong> {patient.id}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>CI:</strong> {patient.ci}</div>
                        <div><strong>Nombre:</strong> {patient.nombre}</div>
                        <div><strong>Apellido Paterno:</strong> {patient.apellido_paterno}</div>
                        <div><strong>Apellido Materno:</strong> {patient.apellido_materno}</div>
                        <div><strong>Dirección:</strong> {patient.direccion}</div>
                        <div><strong>Email:</strong> {patient.email}</div>
                        <div><strong>Fecha de Nacimiento:</strong> {dayjs(patient.fecha_nacimiento).format('YYYY-MM-DD')}</div>
                        <div><strong>Tipo de Sangre:</strong> {patient.tipo_sangre}</div>
                        <div><strong>Estado:</strong> {patient.estado ? 'Activo' : 'Inactivo'}</div>
                        <div><strong>Teléfono:</strong> {patient.telefono || 'N/A'}</div>
                        <div><strong>Género:</strong> {patient.genero}</div>
                    </div>
                    <div className="mt-5">
                        <Button type="primary" onClick={() => setIsEditing(true)}>Editar</Button>
                    </div>
                </>
            ) : (
                <Form layout="vertical">
                    <p><strong>ID:</strong> {patient.id}</p>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="CI">
                            <Input value={patientState.ci} onChange={(e) => handleFieldChange('ci', e.target.value)} /></Form.Item>
                        </Col>
                        <Col span={12}><Form.Item label="Nombre">
                            <Input value={patientState.nombre} onChange={(e) => handleFieldChange('nombre', e.target.value)} /></Form.Item>
                        </Col>
                    </Row>
                    {/* Continuamos con los demás campos como en el componente original */}
                </Form>
            )}
        </Modal>
    );
});

export default PatientDetail;
