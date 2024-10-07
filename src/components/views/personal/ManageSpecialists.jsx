import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, message, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import PersonDetail from './PersonDetail';
import RegisterEmployee from './RegisterStaff';
import { getAllEmployees } from '../../../api/apiService'; // solo para prueba hasta que este lo de especialitas
const { Title } = Typography;

const ManageSpecialists = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    // Función para manejar la apertura del modal
    const handleOpenModal = () => setIsModalVisible(true);

    // Función para manejar el cierre del modal
    const handleCloseModal = () => setIsModalVisible(false);

    // Función para recibir los datos del formulario
    const handleSaveEmployee = (employeeData) => {
        console.log("Datos del empleado:", employeeData);
        // Aquí puedes hacer alguna acción con los datos, como enviarlos a una API o almacenarlos en el estado global
        setIsModalVisible(false); // Cerrar el modal después de guardar
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                message.error('Error al obtener empleados');
            }
        };

        fetchEmployees();
    }, []);

    const handleShowDetail = (record) => {
        console.log("desde afuera una vez mas tratando de ver los datos", record)
        setSelectedEmployee(record);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedEmployee(null);
    };

    const handleDeleteConfirm = async () => {
        try {

            setDeleteModalVisible(false);
            message.success('Empleado eliminado exitosamente');
        } catch (error) {

        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'empleado_id',
            key: 'empleado_id',
        },
        {
            title: 'Nombre Completo',
            key: 'nombre_completo',
            render: (text, record) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
        },
        {
            title: 'Profesión',
            dataIndex: 'profesion',
            key: 'profesion',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (text) => (text ? 'Activo' : 'Inactivo'),
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleShowDetail(record)}><EditOutlined /></Button>
                    <Button
                        style={{
                            backgroundColor: '#F44336',
                            color: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => { setEmployeeToDelete(record); setDeleteModalVisible(true); }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        }
    ];

    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
            <Title level={3} className="text-center">Administrar Especialistas</Title>
            <div>
                <div className="flex justify-end mb-6">
                    <Button
                        style={{
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            borderRadius: '15px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }} onClick={handleOpenModal}>
                        <PlusOutlined />
                        <span>Registrar Especialista</span>
                    </Button>
                </div>
                <RegisterEmployee
                    visible={isModalVisible}
                    onClose={handleCloseModal}
                    onSave={handleSaveEmployee}  // Enviar datos al padre al guardar
                    name={"specialists"}
                />
            </div>
            <Table
                columns={columns}
                dataSource={employees}
                rowKey="empleado_id"
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
            {isDetailModalVisible && selectedEmployee && (
                <PersonDetail
                    visible={isDetailModalVisible}
                    onClose={handleDetailModalClose}
                    user={selectedEmployee}
                />
            )}
        </div>
    );
};

export default ManageSpecialists;
