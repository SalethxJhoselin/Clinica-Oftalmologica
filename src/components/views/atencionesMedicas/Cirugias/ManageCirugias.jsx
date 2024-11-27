import React, { useState, useEffect } from 'react';
import ModalRegCirugia from './ModalRegCirugia';
import { Table, Button, Modal, message } from 'antd';
import axios from 'axios';
import ManageReqCirugia from './ManageReqCirugia';
import ManageGrupoCirugia from './ManageGrupoCirugia';

const ManageCirugias = () => {
    const [cirugias, setCirugias] = useState([]); // Estado para almacenar las cirugías
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedCirugia, setSelectedCirugia] = useState(null);
    const [isReqModalVisible, setIsReqModalVisible] = useState(false); // Modal para requerimiento
    const [isGrupoModalVisible, setIsGrupoModalVisible] = useState(false); // Modal para grupo
    const [currentCirugiaId, setCurrentCirugiaId] = useState(null); // Guardar el ID de la cirugía seleccionada

    // Cargar las cirugías al montar el componente
    useEffect(() => {
        const fetchCirugias = async () => {
            try {
                const response = await axios.get('https://clinica-oftalmologica.onrender.com/cirugias/listar');
                setCirugias(response.data); // Almacenar los datos obtenidos
            } catch (error) {
                console.error('Error al cargar las cirugías:', error);
                message.error('Error al cargar las cirugías');
            }
        };

        fetchCirugias();
    }, []);

    // Manejar la apertura del modal de detalles
    const handleViewDetail = (record) => {
        setSelectedCirugia(record);
        setIsDetailModalVisible(true);
    };

    // Manejar el cierre del modal de detalles
    const handleCloseDetailModal = () => {
        setIsDetailModalVisible(false);
        setSelectedCirugia(null);
    };

    // Manejar la apertura del modal para agregar requerimiento
    const handleAddRequerimiento = (cirugiaId) => {
        setCurrentCirugiaId(cirugiaId); // Guardar el ID de la cirugía
        setIsReqModalVisible(true); // Abrir el modal de requerimiento
    };

    // Manejar la apertura del modal para agregar grupo
    const handleAddGrupo = (cirugiaId) => {
        setCurrentCirugiaId(cirugiaId); // Guardar el ID de la cirugía
        setIsGrupoModalVisible(true); // Abrir el modal de grupo
    };

    // Columnas de la tabla
    const columns = [
        {
            title: 'ID Paciente',
            dataIndex: 'id_paciente',
            key: 'id_paciente',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
            render: (text) => new Date(text).toLocaleDateString('es-ES'),
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            key: 'hora',
        },
        {
            title: 'Tipo de Cirugía',
            dataIndex: 'tipo_cirugia',
            key: 'tipo_cirugia',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <Button type="primary" onClick={() => handleViewDetail(record)}>
                        Ver Detalle
                    </Button>
                    <Button type="default" onClick={() => handleAddRequerimiento(record.id)}>
                        Agregar Requerimiento
                    </Button>
                    <Button type="default" onClick={() => handleAddGrupo(record.id)}>
                        Agregar Grupo
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-5 bg-white rounded shadow-lg">
            <ModalRegCirugia />
            
            {/* Tabla de cirugías */}
            <Table
                className="mt-5"
                dataSource={cirugias}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            {/* Modal de detalle de cirugía */}
            <Modal
                title="Detalle de la Cirugía"
                visible={isDetailModalVisible}
                onCancel={handleCloseDetailModal}
                footer={null}
            >
                {selectedCirugia && (
                    <div>
                        <h3>Información de la Cirugía</h3>
                        <Table
                            dataSource={[
                                {
                                    key: '1',
                                    atributo: 'ID Paciente',
                                    valor: selectedCirugia.id_paciente,
                                },
                                {
                                    key: '2',
                                    atributo: 'ID Especialista',
                                    valor: selectedCirugia.id_especialista,
                                },
                                {
                                    key: '3',
                                    atributo: 'Fecha',
                                    valor: new Date(selectedCirugia.fecha).toLocaleDateString('es-ES'),
                                },
                                {
                                    key: '4',
                                    atributo: 'Hora',
                                    valor: selectedCirugia.hora,
                                },
                                {
                                    key: '5',
                                    atributo: 'Tipo de Cirugía',
                                    valor: selectedCirugia.tipo_cirugia,
                                },
                                {
                                    key: '6',
                                    atributo: 'Estado',
                                    valor: selectedCirugia.estado,
                                },
                                {
                                    key: '7',
                                    atributo: 'Observaciones',
                                    valor: selectedCirugia.observaciones,
                                },
                            ]}
                            columns={[
                                {
                                    title: 'Atributo',
                                    dataIndex: 'atributo',
                                    key: 'atributo',
                                },
                                {
                                    title: 'Valor',
                                    dataIndex: 'valor',
                                    key: 'valor',
                                },
                            ]}
                            pagination={false}
                        />

                        <h3 className="mt-4">Requerimientos</h3>
                        <Table
                            dataSource={selectedCirugia.requerimientos}
                            columns={[
                                {
                                    title: 'Requerimiento',
                                    dataIndex: 'requerimiento',
                                    key: 'requerimiento',
                                },
                                {
                                    title: 'Estado',
                                    dataIndex: 'estado',
                                    key: 'estado',
                                },
                            ]}
                            rowKey="id"
                            pagination={false}
                        />

                        <h3 className="mt-4">Personal Asignado</h3>
                        <Table
                            dataSource={selectedCirugia.personal}
                            columns={[
                                {
                                    title: 'ID Personal',
                                    dataIndex: 'id_personal',
                                    key: 'id_personal',
                                },
                            ]}
                            rowKey="id"
                            pagination={false}
                        />
                    </div>
                )}
            </Modal>

            {/* Modal para agregar requerimiento */}
            <Modal
                title="Agregar Requerimiento"
                visible={isReqModalVisible}
                onCancel={() => setIsReqModalVisible(false)}
                footer={null}
            >
                <ManageReqCirugia cirugiaId={currentCirugiaId} />
            </Modal>

            {/* Modal para agregar grupo */}
            <Modal
                title="Agregar Grupo"
                visible={isGrupoModalVisible}
                onCancel={() => setIsGrupoModalVisible(false)}
                footer={null}
            >
                <ManageGrupoCirugia cirugiaId={currentCirugiaId} />
            </Modal>
        </div>
    );
};

export default ManageCirugias;
