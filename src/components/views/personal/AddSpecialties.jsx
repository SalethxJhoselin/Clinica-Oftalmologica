import { useEffect, useState } from 'react'
import { createSpecialist, getAllEmployees, getAllSpecialties } from '../../../api/apiService'
import { Modal, Form, Select } from 'antd'

const { Option } = Select;
const AddSpecialties = ({ visible, onClose, type, initialData }) => {
    const [form] = Form.useForm();
    const [employees, setEmployees] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            try {
                const employees = await getAllEmployees();
                const specialties = await getAllSpecialties();
                setSpecialties(specialties);
                setEmployees(employees.data);
            } catch (error) {
                console.error("Error al obtener datos", error)
            }
        };
        getAll();
    }, []);
    useEffect(() => {
        if (type === 'edit' && initialData) {
            form.setFieldsValue({
                empleado_id: initialData.id,
                especialidades: initialData.especialidades.map((especialidad) => especialidad.id),
            });
        } else {
            form.resetFields();
        }
    }, [type, initialData, form]);
    const onFinish = async (value) => {
        try {
            await createSpecialist(value);
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("No se pudo registrar:", error);
        }
    }
    return (
        <Modal
            title={type === 'edit' ? "Editar Especialidades" : "Agregar Especialidades"}
            visible={visible}
            onOk={form.submit}
            onCancel={onClose}
            okText={type === 'edit' ? "Actualizar" : "Registrar"}
        >
            <Form form={form} onFinish={onFinish} >
                <Form.Item name='empleado_id' label="profesional" rules={[{ required: true, message: 'seleccione un empleado' }]} style={{ width: '100%' }} >
                {type !== 'edit' ? (
                        <Select placeholder="Seleccione un empleado" style={{ width: '100%' }}>
                            {employees.map((employee) => (
                                <Option key={employee.empleado_id} value={employee.empleado_id}>
                                    {`${employee.nombre} ${employee.apellido_paterno} ${employee.apellido_materno}`}
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <span>
                            {initialData?.usuario
                                ? `${initialData.usuario.nombre} ${initialData.usuario.apellido_paterno} ${initialData.usuario.apellido_materno}`
                                : 'Datos no disponibles'}
                        </span>
                    )}
                </Form.Item>
                <Form.Item name='especialidades' label="especialidades" rules={[{ required: true, message: 'seleccione al menos una especialidad' }]} style={{ width: '100%' }} >
                    <Select
                        mode="multiple"
                        placeholder={"seleccione las especialidades"}
                        style={{ width: '100%' }}
                    >
                        {specialties.map((specialty) => (
                            <Option key={specialty.id} value={specialty.id}>
                                {specialty.nombre}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default AddSpecialties