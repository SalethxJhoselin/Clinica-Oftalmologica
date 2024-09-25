import { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, message, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PatientDetail from './PatientDetail'; // Cambiamos el nombre
import RegisterPatient from './RegisterPatient'; // Cambiamos el nombre
import { getAllPatients } from '../../../api/apiService'; // Cambiar la función de la API

const { Title } = Typography;

const ManagePatients = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getAllPatients(); // Cambiar a la API para obtener pacientes
                setPatients(response.data);
            } catch (error) {
                message.error('Error al obtener pacientes');
            }
        };

        fetchPatients();
    }, []);

    const handleShowDetail = (record) => {
        setSelectedPatient(record);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedPatient(null);
    };

    const handleDeleteConfirm = async () => {
        try { 
            await deletePatient(patientToDelete.id); // API de eliminación de paciente
            message.success('Paciente eliminado exitosamente');
            setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientToDelete.id));
            setDeleteModalVisible(false);
        } catch(error) {
            message.error('Error al eliminar paciente');
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'paciente_id',
            key: 'id',
        },
        {
            title: 'Nombre Completo',
            key: 'nombre_completo',
            render: (text, record) => `${record.nombre} ${record.apellido_paterno} ${record.apellido_materno}`,
        },
        // {
        //     title: 'Tipo de Sangre',
        //     dataIndex: 'tipo_sangre',
        //     key: 'tipo_sangre',
        // },
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
                    {/* <Button
                        style={{
                            backgroundColor: '#F44336',
                            color: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => { setPatientToDelete(record); setDeleteModalVisible(true); }}
                    >
                        <DeleteOutlined />
                    </Button> */}
                </Space>
            ),
        }
    ];

    return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
        <Title level={3} className="text-center">Administrar Pacientes</Title>
        <div className="flex justify-end mb-6">
            <RegisterPatient /> {/* Cambiamos a registro de pacientes */}
        </div>
        <Table
            columns={columns}
            dataSource={patients}
            rowKey="id"
            pagination={{ pageSize: 4, size: 'small' }}
        />
        <Modal
            title="Eliminar Paciente"
            visible={deleteModalVisible}
            onOk={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
        >
            <p>¿Está seguro que desea eliminar a {patientToDelete?.nombre} {patientToDelete?.apellido_paterno}?</p>
        </Modal>
        {isDetailModalVisible && selectedPatient && (
            <PatientDetail
                visible={isDetailModalVisible}
                onClose={handleDetailModalClose}
                patient={selectedPatient} // Cambiamos 'user' por 'patient'
            />
        )}
    </div>
);
};

export default ManagePatients;