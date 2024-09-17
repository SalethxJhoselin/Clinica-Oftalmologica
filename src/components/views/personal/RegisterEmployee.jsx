import { useState } from "react";
import { Button, Modal, Input, DatePicker } from "antd";
import { PlusOutlined } from '@ant-design/icons';
const employeeData = [
    { id: 1, name: 'John Doe', position: 'Developer', hireDate: '2021-05-10' },
    { id: 2, name: 'Jane Smith', position: 'Designer', hireDate: '2020-07-15' },
    { id: 3, name: 'Mike Johnson', position: 'Manager', hireDate: '2019-03-20' },
];
const RegisterEmploye = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [hireDate, setHireDate] = useState(null);
    const [employees, setEmployees] = useState(employeeData);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (!name || !position || !hireDate) {
            message.error('Todos los campos son obligatorios');
            return;
        }
        const newEmployee = {
            id: employees.length + 1,
            name,
            position,
            hireDate: dayjs(hireDate).format('YYYY-MM-DD'),
        };
        setEmployees([...employees, newEmployee]);
        setIsModalOpen(false);
        setName('');
        setPosition('');
        setHireDate(null);
        message.success('Empleado registrado exitosamente');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setName('');
        setPosition('');
        setHireDate(null);
    };

    return (
        <>
            <Button
                style={{
                    backgroundColor: '#4CAF50', // Color de fondo
                    color: '#fff', // Color del texto
                    borderRadius: '15px', // Bordes redondeados
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Sombra
                }}
                onClick={showModal}
            >
            <PlusOutlined />
            <span>Nuevo</span>
            </Button>
            <Modal title="Registrar Empleado" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Registrar" cancelText="Cancelar">
                <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Puesto" value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginTop: 10 }} />
                <DatePicker placeholder="Fecha de Contratación" style={{ marginTop: 10, width: '100%' }} onChange={(date) => setHireDate(date)} />
            </Modal>
        </>
    );
};
export default RegisterEmploye;