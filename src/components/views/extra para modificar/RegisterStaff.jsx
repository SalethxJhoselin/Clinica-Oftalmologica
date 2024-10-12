import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import { Modal, Button, Input, DatePicker, Space, Select, Row, Col, Form } from 'antd';
import dayjs from 'dayjs';
import { getProfessions, fetchRoles } from '../../../api/apiService';
import { getAllEspecialidades } from '../../../utils/test';

const { Option } = Select;

// Reducer para manejar el estado del empleado
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

const RegisterEmployee = ({ visible, onClose, onSave, name, initialData }) => {
    const initialState = {
        ci: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_nacimiento: null,
        email: '',
        telefono: '',
        direccion: '',
        fecha_contratacion: null,
        profesion: { id: '', nombre: '' }, // Estructura para manejar id y nombre
        genero: null,
        estado: true,
        rol: { id: '', nombre: '' }, // Estructura para manejar id y nombre
        especialidades: [] // Array para manejar múltiples especialidades con id y nombre
    };

    const [employeeState, dispatch] = useReducer(employeeReducer, initialState);
    const [professions, setProfessions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [especialidades, setEspecialidades] = useState([]); // Usar estado para especialidades
    const [professionMap, setProfessionMap] = useState({}); // Diccionario para mapear nombres a IDs de profesiones
    const [roleMap, setRoleMap] = useState({}); // Diccionario para mapear nombres a IDs de roles
    const [specialtyMap, setSpecialtyMap] = useState({}); // Diccionario para mapear nombres a IDs de especialidades

    // Convertir fechas de `initialData` a dayjs si están presentes
    const convertToDayjs = (data) => ({
        ...data,
        fecha_nacimiento: data.fecha_nacimiento ? dayjs(data.fecha_nacimiento) : null,
        fecha_contratacion: data.fecha_contratacion ? dayjs(data.fecha_contratacion) : null,
    });

    // Rellenar los campos si `name` es "editSpecialists" y `initialData` cambia
    useEffect(() => {
        if (name === 'editSpecialists' && initialData) {
            const updatedData = convertToDayjs(initialData);
            dispatch({ type: 'SET_EMPLOYEE', payload: updatedData });
            console.log('Datos iniciales cargados para edición:', updatedData);
        }
    }, [initialData, name]);

    // Fetch de profesiones y roles y asignar especialidades del archivo importado
    useEffect(() => {
        const fetchProfessionsAndRoles = async () => {
            try {
                const [professionsData, rolesData] = await Promise.all([getProfessions(), fetchRoles()]);

                // Crear los diccionarios de mapeo
                const professionMap = {};
                professionsData.forEach((profession) => {
                    professionMap[profession.nombre] = profession.id;
                });

                const roleMap = {};
                rolesData.forEach((role) => {
                    roleMap[role.nombre] = role.id;
                });

                setProfessions(professionsData);
                setRoles(rolesData);
                setProfessionMap(professionMap);
                setRoleMap(roleMap);
            } catch (error) {
                console.error('Error al obtener profesiones o roles:', error);
            }
        };
        fetchProfessionsAndRoles();

        // Asignar especialidades desde el archivo importado
        setEspecialidades(getAllEspecialidades); // Asignar especialidades desde el JSON importado

        // Crear diccionario de mapeo para especialidades
        const specialtyMap = {};
        getAllEspecialidades.forEach((specialty) => {
            specialtyMap[specialty.nombre] = specialty.id;
        });
        setSpecialtyMap(specialtyMap);
    }, [name]);

    // Opciones de selección para profesiones y roles
    const professionOptions = useMemo(() => professions.map(profession => (
        <Option key={profession.id} value={profession.nombre}>
            {profession.nombre}
        </Option>
    )), [professions]);

    const roleOptions = useMemo(() => roles.map(role => (
        <Option key={role.id} value={role.nombre}>
            {role.nombre}
        </Option>
    )), [roles]);

    // Opciones de selección para especialidades desde el JSON importado
    const specialtyOptions = useMemo(() => especialidades.map(specialty => (
        <Option key={specialty.id} value={specialty.nombre}>
            {specialty.nombre} ({specialty.tiempo_estimado} min)
        </Option>
    )), [especialidades]);

    // Maneja la actualización de campos individuales
    const handleFieldChange = useCallback((field, value) => {
        if (field === 'profesion') {
            const selectedProfession = professions.find(profession => profession.nombre === value);
            dispatch({ type: 'UPDATE_FIELD', field, value: { id: selectedProfession.id, nombre: value } });
        } else if (field === 'rol') {
            const selectedRole = roles.find(role => role.nombre === value);
            dispatch({ type: 'UPDATE_FIELD', field, value: { id: selectedRole.id, nombre: value } });
        } else if (field === 'especialidades') {
            const selectedSpecialties = value.map(name => {
                const specialty = especialidades.find(s => s.nombre === name);
                return { id: specialty.id, nombre: name };
            });
            dispatch({ type: 'UPDATE_FIELD', field, value: selectedSpecialties });
        } else {
            dispatch({ type: 'UPDATE_FIELD', field, value });
        }
    }, [professions, roles, especialidades]);

    // Guardar cambios y enviar datos al componente padre
    const handleSaveClick = () => {
        // Formatear fechas si es necesario
        const formattedFecha_nacimiento = employeeState.fecha_nacimiento ? employeeState.fecha_nacimiento.format('YYYY-MM-DD') : null;
        const formattedFecha_contratacion = employeeState.fecha_contratacion ? employeeState.fecha_contratacion.format('YYYY-MM-DD') : null;

        // Crear el nuevo objeto con la estructura adecuada
        const newEmployeeData = {
            ...employeeState,
            fecha_nacimiento: formattedFecha_nacimiento,
            fecha_contratacion: formattedFecha_contratacion,
            profesion: { id: professionMap[employeeState.profesion.nombre], nombre: employeeState.profesion.nombre },
            rol: { id: roleMap[employeeState.rol.nombre], nombre: employeeState.rol.nombre },
            especialidades: employeeState.especialidades.map(specialty => ({ id: specialtyMap[specialty.nombre], nombre: specialty.nombre }))
        };

        // Incluir el ID si es "editSpecialists" y initialData tiene un ID
        if (name === 'editSpecialists' && initialData?.especialista_id) {
            newEmployeeData.especialista_id = initialData.especialista_id; // Agregar el ID recibido en los datos enviados
        }

        // Enviar datos al componente padre
        if (onSave) {
            onSave(newEmployeeData);
        }

        // Restablecer el formulario y cerrar el modal
        dispatch({ type: 'RESET', payload: initialState });
        onClose();
    };

    // Restablecer el formulario al cerrar el modal
    const handleCancelClick = () => {
        dispatch({ type: 'RESET', payload: initialState });
        onClose();
    };

    return (
        <Modal
            title={name === 'editSpecialists' ? 'Editar Especialista' : 'Registrar Empleado'}
            visible={visible} // Usar "visible" para controlar el modal
            onCancel={handleCancelClick} // Cerrar modal con botón "Cancelar"
            footer={null}
            centered
            width={800}  // Modal más ancho
        >
            <Form layout="vertical">
                {/* Formulario con campos */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="CI">
                            <Input value={employeeState.ci} onChange={(e) => handleFieldChange('ci', e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Nombre">
                            <Input value={employeeState.nombre} onChange={(e) => handleFieldChange('nombre', e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Apellido Paterno">
                            <Input value={employeeState.apellido_paterno} onChange={(e) => handleFieldChange('apellido_paterno', e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Apellido Materno">
                            <Input value={employeeState.apellido_materno} onChange={(e) => handleFieldChange('apellido_materno', e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Dirección">
                            <Input value={employeeState.direccion} onChange={(e) => handleFieldChange('direccion', e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email">
                            <Input value={employeeState.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Fecha de Nacimiento">
                            <DatePicker value={employeeState.fecha_nacimiento} onChange={(date) => handleFieldChange('fecha_nacimiento', date)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Fecha de Contratación">
                            <DatePicker value={employeeState.fecha_contratacion} onChange={(date) => handleFieldChange('fecha_contratacion', date)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Profesión">
                            <Select value={employeeState.profesion.nombre} onChange={(value) => handleFieldChange('profesion', value)}>
                                {professionOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Rol">
                            <Select value={employeeState.rol.nombre} onChange={(value) => handleFieldChange('rol', value)}>
                                {roleOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {/* Mostrar el Select de Especialidades solo si name es "specialists" o "editSpecialists" */}
                {(name === 'specialists' || name === 'editSpecialists') && (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Especialidades">
                                <Select
                                    mode="multiple"
                                    value={employeeState.especialidades.map(s => s.nombre)} // Array de nombres de especialidades
                                    onChange={(value) => handleFieldChange('especialidades', value)} // Actualizar el array de especialidades
                                >
                                    {specialtyOptions}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                )}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Estado">
                            <Select value={employeeState.estado ? 'Activo' : 'Inactivo'} onChange={(value) => handleFieldChange('estado', value === 'Activo')}>
                                <Option value="Activo">Activo</Option>
                                <Option value="Inactivo">Inactivo</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Teléfono">
                            <Input value={employeeState.telefono} onChange={(e) => handleFieldChange('telefono', e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Género">
                            <Input value={employeeState.genero} onChange={(e) => handleFieldChange('genero', e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" onClick={handleSaveClick}>Guardar</Button>
                    <Button onClick={handleCancelClick}>Cancelar</Button>
                </Space>
            </Form>
        </Modal>
    );
};

export default RegisterEmployee;
