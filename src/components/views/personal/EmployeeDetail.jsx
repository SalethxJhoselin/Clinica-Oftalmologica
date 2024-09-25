import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import { Modal, Button, Input, DatePicker, Space, Select, Row, Col, Form } from 'antd';
import dayjs from 'dayjs';
import { getProfessions, fetchRoles, updateEmployee } from '../../../api/apiService';

const { Option } = Select;

const employeeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE':
            return { ...state, ...action.payload };
        case 'UPDATE_FIELD':
            console.log(`Updating field: ${action.field} with value: ${action.value}`);
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return action.payload;
        default:
            return state;
    }
};

const EmployeeDetail = React.memo(({ visible, onClose, user }) => {
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
        rol: ''
    };

    const [employeeState, dispatch] = useReducer(employeeReducer, initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [professions, setProfessions] = useState([]);
    const [roles, setRoles] = useState([]);

    // Inicializa el estado del empleado
    useEffect(() => {
        if (user && !isEditing) {
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
                    rol: user.rol || ''
                }
            });
        }
    }, [user, isEditing]);

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

    // Memoriza las opciones de profesiones y roles
    const professionOptions = useMemo(() => professions.map(profession => (
        <Option key={profession.id} value={profession.id}>
            {profession.nombre}
        </Option>
    )), [professions]);

    const roleOptions = useMemo(() => roles.map(role => (
        <Option key={role.id} value={role.id}>
            {role.nombre}
        </Option>
    )), [roles]);

    // Función para manejar la actualización de campos individuales
    const handleFieldChange = useCallback((field, value) => {
        console.log("vamos a ver que muestra",value)
        dispatch({ type: 'UPDATE_FIELD', field, value });
    }, []);

    // Guardar cambios
    const handleSaveClick = useCallback(async () => {
        const formattedFechaNacimiento = employeeState.fechaNacimiento ? employeeState.fechaNacimiento.format('YYYY-MM-DD') : null;
        const formattedFechaContratacion = employeeState.fechaContratacion ? employeeState.fechaContratacion.format('YYYY-MM-DD') : null;
        const updatedEmployeeData = {
            empleado_id: user.empleado_id,
            ...employeeState,
            fecha_nacimiento: formattedFechaNacimiento,
            fecha_contratacion: formattedFechaContratacion,
            profesion: employeeState.profesion || user.profesion, // Verifica si no ha cambiado
            estado: employeeState.estado != null ? employeeState.estado : user.estado // Asegura que el estado no sea nulo
        };

            console.log("user.empleado_id, updatedEmployeeData no se ve ni esto como es posible!!!!!",updatedEmployeeData);
        try {
            await updateEmployee(user.empleado_id, updatedEmployeeData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar empleado:", error);
        }
    }, [employeeState, user.empleado_id, user.profesion, user.estado]);

    const handleCancelClick = useCallback(() => {
        setIsEditing(false);
        if (user) {
            dispatch({ type: 'RESET', payload: initialState });
        }
    }, [user]);

    return (
        <Modal
            title="Detalle del Empleado"
            visible={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={800}  // Modal más ancho
        >
            {!isEditing ? (
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
                        <div><strong>Genero:</strong> {user.genero}</div>
                    </div>
                    <div className="mt-5">
                        <Button type="primary" onClick={() => setIsEditing(true)}>Editar</Button>
                    </div>
                </>
            ) : (
                <Form layout="vertical">
                    <p><strong>ID:</strong> {user.empleado_id}</p>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="CI">
                            <Input value={employeeState.ci} onChange={(e) => handleFieldChange('ci', e.target.value)} /></Form.Item>
                        </Col>
                        <Col span={12}><Form.Item label="Nombre">
                            <Input value={employeeState.nombre} onChange={(e) => handleFieldChange('nombre', e.target.value)} /></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Apellido Paterno">
                            <Input value={employeeState.apellidoPaterno} onChange={(e) => handleFieldChange('apellidoPaterno', e.target.value)} /></Form.Item>
                        </Col>
                        <Col span={12}> <Form.Item label="Apellido Materno">
                            <Input value={employeeState.apellidoMaterno} onChange={(e) => handleFieldChange('apellidoMaterno', e.target.value)} /></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Dirección">
                            <Input value={employeeState.direccion} onChange={(e) => handleFieldChange('direccion', e.target.value)} /></Form.Item>
                        </Col>
                        <Col span={12}><Form.Item label="Email">
                            <Input value={employeeState.email} onChange={(e) => handleFieldChange('email', e.target.value)} /></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}> <Form.Item label="Fecha de Nacimiento">
                            <DatePicker value={employeeState.fechaNacimiento} onChange={(date) => handleFieldChange('fechaNacimiento', date)} /> </Form.Item>
                        </Col>
                        <Col span={12}> <Form.Item label="Fecha de Contratación">
                            <DatePicker value={employeeState.fechaContratacion} onChange={(date) => handleFieldChange('fechaContratacion', date)} /></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}> <Form.Item label="Profesión">
                            <Select value={employeeState.profesion} onChange={(value) => handleFieldChange('profesion', value)}>
                                {professionOptions}
                            </Select></Form.Item>
                        </Col>
                        <Col span={12}> <Form.Item label="Rol">
                            <Select value={employeeState.rol} onChange={(value) => handleFieldChange('rol', value)}>
                                {roleOptions}
                            </Select> </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}> <Form.Item label="Estado">
                            <Select value={employeeState.estado ? 'Activo' : 'Inactivo'} onChange={(value) => handleFieldChange('estado', value === 'Activo')}>
                                <Option value="Activo">Activo</Option>
                                <Option value="Inactivo">Inactivo</Option> </Select>
                        </Form.Item>
                        </Col>
                        <Col span={8}> <Form.Item label="Teléfono">
                            <Input value={employeeState.telefono} onChange={(e) => handleFieldChange('telefono', e.target.value)} /> </Form.Item>
                        </Col>
                        <Col span={8}> <Form.Item label="Genero">
                            <Input value={employeeState.genero} onChange={(e) => handleFieldChange('genero', e.target.value)} /> </Form.Item>
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

export default EmployeeDetail;
