import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { Modal, Button, Input, DatePicker, Space, Select, Row, Col, Form, message } from 'antd';
import dayjs from 'dayjs';
import { updatePatient } from '../../../api/apiService';

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
        apellido_paterno: '', 
        apellido_materno: '',
        fecha_nacimiento: null,
        email: '',
        telefono: '',
        direccion: '',
        tipo_sangre: '',
        genero: '',
        estado: true,
    };

    const [patientState, dispatch] = useReducer(patientReducer, initialState);
    const [isEditing, setIsEditing] = useState(false);

    // Inicializa el estado del paciente
    useEffect(() => {
        if (patient && !isEditing) {
            dispatch({
                type: 'SET_PATIENT',
                payload: {
                    ci: patient.ci || '',
                    nombre: patient.nombre?.trim() || '',
                    apellido_paterno: patient.apellido_paterno || '', // Validamos que no sean nulos
                    apellido_materno: patient.apellido_materno || '',
                    fecha_nacimiento: dayjs(patient.fecha_nacimiento),
                    email: patient.email || '',
                    telefono: patient.telefono || '',
                    direccion: patient.direccion || '',
                    tipo_sangre: patient.tipo_sangre || '',
                    genero: patient.genero || '',
                    estado: patient.estado != null ? patient.estado : true,
                }
            });
        }
    }, [patient, isEditing]);

    // Función para manejar la actualización de campos individuales
    const handleFieldChange = useCallback((field, value) => {
        dispatch({ type: 'UPDATE_FIELD', field, value });
    }, []);

    // Guardar cambios
    const handleSaveClick = useCallback(async () => {
        const formattedFechaNacimiento = patientState.fecha_nacimiento
            ? patientState.fecha_nacimiento.format('YYYY-MM-DD')
            : null;

        const updatedPatientData = {
            paciente_id: patient.paciente_id, 
            ci: patientState.ci,
            nombre: patientState.nombre,
            apellido_paterno: patientState.apellido_paterno, // Usamos los valores actualizados
            apellido_materno: patientState.apellido_materno, // Usamos los valores actualizados
            fecha_nacimiento: formattedFechaNacimiento,
            email: patientState.email,
            telefono: patientState.telefono,
            direccion: patientState.direccion,
            tipo_sangre: patientState.tipo_sangre,
            genero: patientState.genero,
            estado: patientState.estado,
        };

        try {
            await updatePatient(patient.paciente_id, updatedPatientData);
            message.success('Paciente actualizado con éxito');
            setIsEditing(false);
        } catch (error) {
            message.error('Error al actualizar paciente');
            console.error("Error al actualizar paciente:", error);
        }
    }, [patientState, patient.paciente_id]);

    // Cancelar edición
    const handleCancelClick = useCallback(() => {
        setIsEditing(false);
        if (patient) {
            dispatch({
                type: 'SET_PATIENT',
                payload: {
                    ci: patient.ci || '',
                    nombre: patient.nombre?.trim() || '',
                    apellido_paterno: patient.apellido_paterno || '',
                    apellido_materno: patient.apellido_materno || '',
                    fecha_nacimiento: dayjs(patient.fecha_nacimiento),
                    email: patient.email || '',
                    telefono: patient.telefono || '',
                    direccion: patient.direccion || '',
                    tipo_sangre: patient.tipo_sangre || '',
                    genero: patient.genero || '',
                    estado: patient.estado != null ? patient.estado : true,
                }
            });
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
                    <p><strong>ID:</strong> {patient.paciente_id}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><strong>CI:</strong> {patient.ci}</div>
                        <div><strong>Nombre:</strong> {patient.nombre}</div>
                        <div><strong>Apellido Paterno:</strong> {patient.apellido_paterno}</div>
                        <div><strong>Apellido Materno:</strong> {patient.apellido_materno}</div>
                        <div><strong>Dirección:</strong> {patient.direccion}</div>
                        <div><strong>Email:</strong> {patient.email}</div>
                        <div><strong>Fecha de Nacimiento:</strong> {dayjs(patient.fecha_nacimiento).format('YYYY-MM-DD')}</div>
                        {/* <div><strong>Tipo de Sangre:</strong> {patient.tipo_sangre}</div> */}
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
                    <p><strong>ID:</strong> {patient.paciente_id}</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="CI">
                                <Input value={patientState.ci} onChange={(e) => handleFieldChange('ci', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Nombre">
                                <Input value={patientState.nombre} onChange={(e) => handleFieldChange('nombre', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Apellido Paterno">
                                <Input value={patientState.apellido_paterno} onChange={(e) => handleFieldChange('apellido_paterno', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Apellido Materno">
                                <Input value={patientState.apellido_materno} onChange={(e) => handleFieldChange('apellido_materno', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Dirección">
                                <Input value={patientState.direccion} onChange={(e) => handleFieldChange('direccion', e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email">
                                <Input value={patientState.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Fecha de Nacimiento">
                                <DatePicker value={patientState.fecha_nacimiento} onChange={(date) => handleFieldChange('fecha_nacimiento', date)} />
                            </Form.Item>
                        </Col>
                        {/* <Col span={12}>
                            <Form.Item label="Tipo de Sangre">
                                <Input value={patientState.tipo_sangre} onChange={(e) => handleFieldChange('tipo_sangre', e.target.value)} />
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Estado">
                                <Select value={patientState.estado ? 'Activo' : 'Inactivo'} onChange={(value) => handleFieldChange('estado', value === 'Activo')}>
                                    <Option value="Activo">Activo</Option>
                                    <Option value="Inactivo">Inactivo</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Teléfono">
                                <Input value={patientState.telefono} onChange={(e) => handleFieldChange('telefono', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Género">
                                <Input value={patientState.genero} onChange={(e) => handleFieldChange('genero', e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="primary" onClick={handleSaveClick}>Guardar</Button>
                        <Button onClick={handleCancelClick}>Cancelar</Button>
                    </Space>
                </Form>
            )}
        </Modal>
    );
});

PatientDetail.displayName = "PatientDetail";
export default PatientDetail;