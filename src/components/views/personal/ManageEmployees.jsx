import { useState } from 'react';
import { Space, Table, Button, Modal, message, Typography } from 'antd';
import EmployeeDetail from './EmployeeDetail';
import RegisterEmploye from './RegisterEmployee';
import { employeeData } from '../../../utils/test';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const ManageEmployees = () => {
    const [employees, setEmployees] = useState(employeeData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const handleShowDetail = (record) => {
        setSelectedEmployee(record);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedEmployee(null);
    };

    const handleDeleteConfirm = () => {
        setEmployees(employees.filter((employee) => employee.id !== employeeToDelete.id));
        setDeleteModalVisible(false);
        message.success('Empleado eliminado exitosamente');
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre Completo',
            key: 'nombre_completo',
            render: (text, record) => `${record.nombres} ${record.apellido_paterno} ${record.apellido_materno}`,
        },
        {
            title: 'Profesión',
            dataIndex: ['profesion', 'nombre'],
            key: 'profesion',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleShowDetail(record)}><EditOutlined /></Button>
                    <Button style={{
                        backgroundColor: '#F44336',
                        color: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                        onClick={() => { setEmployeeToDelete(record); setDeleteModalVisible(true); }}><DeleteOutlined /></Button>
                </Space>
            ),
        }
    ];
    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
            <Title level={3} className="text-center">Administrar Empleados</Title>
            <div className="flex justify-end mb-6">
                <RegisterEmploye />
            </div>
            <Table
                columns={columns}
                dataSource={employees}
                rowKey="id"
                pagination={{ pageSize: 4, size: 'small' }}
            />
            <Modal
                title="Eliminar Empleado"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            >
                <p>¿Está seguro que desea eliminar a este empleado?</p>
            </Modal>
            {selectedEmployee && (
                <EmployeeDetail
                    visible={isDetailModalVisible}
                    onClose={handleDetailModalClose}
                    employee={selectedEmployee}
                />
            )}
        </div>
    );
};
export default ManageEmployees;