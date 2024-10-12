import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Modal, Typography, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PersonDetail from './PersonDetail';
import { PlusOutlined } from '@ant-design/icons';
import { getAllSpecialists, deleteSpecialist } from '../../../api/apiService';
import AddSpecialties from './AddSpecialties';

const { Title } = Typography;
const { Search } = Input;

const ManageSpecialists = () => {
    const [specialists, setSpecialists] = useState([]);
    const [filteredSpecialists, setFilteredSpecialists] = useState([]); // Para mostrar los resultados filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Para el valor de búsqueda
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isAddSpecialtiesModalVisible, setIsAddSpecialtiesModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [specialistToDelete, setSpecialistToDelete] = useState(null);
    const [modalType, setModalType] = useState('add');

    const fetchSpecialists = async () => {
        try {
            const response = await getAllSpecialists();
            setSpecialists(response);
            setFilteredSpecialists(response); // Inicializar con todos los especialistas
        } catch (error) {
            console.error("Error al obtener especialistas", error);
        }
    };

    useEffect(() => {
        fetchSpecialists();
    }, []);

    // Función para manejar la búsqueda
    const handleSearch = (value) => {
        setSearchTerm(value); // Actualizar el valor de búsqueda
        if (value === "") {
            setFilteredSpecialists(specialists); // Si no hay búsqueda, mostrar todos los especialistas
        } else {
            const filtered = specialists.filter((specialist) => {
                const fullName = `${specialist.usuario.nombre} ${specialist.usuario.apellido_paterno} ${specialist.usuario.apellido_materno}`.toLowerCase();
                const specialties = specialist.especialidades.map(e => e.nombre).join(", ").toLowerCase();
                const state = specialist.estadoo ? "activo" : "inactivo";
                return (
                    fullName.includes(value.toLowerCase()) ||
                    specialties.includes(value.toLowerCase()) ||
                    specialist.id.toString().includes(value) ||
                    state.includes(value.toLowerCase())
                );
            });
            setFilteredSpecialists(filtered); // Actualizar la lista filtrada
        }
    };

    const handleShowDetail = (record) => {
        setSelectedSpecialist(record);
        setIsDetailModalVisible(true);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalVisible(false);
        setSelectedSpecialist(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteSpecialist(specialistToDelete.id);
            await fetchSpecialists();
            setDeleteModalVisible(false);
            setSpecialistToDelete(null);
        } catch (error) {
            console.error("Error al eliminar especialista", error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const handleAddSpecialtiesModalClose = async () => {
        setIsAddSpecialtiesModalVisible(false);
        await fetchSpecialists();
    };

    const showModal = () => {
        setIsAddSpecialtiesModalVisible(true);
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
            render: (text, record) => `${record.usuario.nombre} ${record.usuario.apellido_paterno} ${record.usuario.apellido_materno}`,
        },
        {
            title: 'Especialidades',
            dataIndex: 'especialidades',
            key: 'especialidades',
            render: (especialidades) => (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {especialidades.map(especialidad => (
                        <li key={especialidad.id}>{especialidad.nombre}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'estadoo',
            key: 'estadoo',
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
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => { setSpecialistToDelete(record); setDeleteModalVisible(true); }}
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
            
            {/* Buscador */}
            <div className="mb-4">
                <Search
                    placeholder="Buscar por ID, nombre, apellidos, especialidades o estado"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)} // Para búsqueda en tiempo real
                    style={{ width: 300 }}
                />
            </div>

            <div className="flex justify-end mb-6">
                <Button
                    style={{
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={showModal}
                >
                    <PlusOutlined />
                    <span>Registrar Especialista</span>
                </Button>
                <AddSpecialties
                    visible={isAddSpecialtiesModalVisible}
                    onClose={handleAddSpecialtiesModalClose}
                    type={"create"}
                    initialData={selectedSpecialist}
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredSpecialists} // Usar los datos filtrados
                rowKey="especialista_id"
                pagination={{ pageSize: 4, size: 'small' }}
            />
            <Modal
                title="Eliminar Especialista"
                visible={deleteModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            >
                <p>¿Está seguro que desea eliminar a este especialista?</p>
            </Modal>
            {isDetailModalVisible && selectedSpecialist && (
                <PersonDetail
                    visible={isDetailModalVisible}
                    onClose={handleDetailModalClose}
                    user={selectedSpecialist}
                    type={'specialist'}
                />
            )}
        </div>
    );
};

export default ManageSpecialists;
