import { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, List, message, Typography, Card, Tag, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllComments, createComment, getCommentsByUser } from '../../../api/apiService'; // APIs relacionadas

const { TextArea } = Input;

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4); // Número de comentarios por página
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm();

    // Obtener todos los comentarios al cargar el componente
    useEffect(() => {
        fetchAllComments();
    }, []);

    const fetchAllComments = async () => {
        try {
            const commentsData = await getAllComments();
            setComments(commentsData);
        } catch (error) {
            message.error('Error al cargar los comentarios');
        }
    };

    const fetchCommentsByUser = async (values) => {
        try {
            const { userId } = values;
            const userComments = await getCommentsByUser(userId);
            setComments(userComments);
            setCurrentPage(1); // Reiniciar a la primera página al filtrar
        } catch (error) {
            message.error('Error al obtener comentarios del usuario');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        try {
            const commentData = {
                comentario: values.comentario,
                valoracion: values.valoracion,
                usuario: values.usuario,
                id_usuario: values.id_usuario,
            };

            const response = await createComment(commentData); // Enviar datos al backend
            console.log('API Response:', response); // Verifica qué devuelve la API

            message.success('Comentario registrado exitosamente');
            form.resetFields();
            setIsModalOpen(false);

            // Actualizar la lista de comentarios
            fetchAllComments();
        } catch (error) {
            console.error('Error al registrar el comentario:', error);
            message.error('Error al registrar el comentario');
        }
    };

    // Función para asignar etiquetas y colores según la valoración
    const getTagByValoracion = (valoracion) => {
        switch (valoracion) {
            case 1:
                return <Tag color="red">1 Estrella</Tag>;
            case 2:
                return <Tag color="orange">2 Estrellas</Tag>;
            case 3:
                return <Tag color="gold">3 Estrellas</Tag>;
            case 4:
                return <Tag color="green">4 Estrellas</Tag>;
            case 5:
                return <Tag color="blue">5 Estrellas</Tag>;
            default:
                return <Tag color="default">Sin Valoración</Tag>;
        }
    };

    // Manejar cambio de página
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    // Calcular los comentarios visibles según la página actual
    const paginatedComments = comments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div style={{ padding: '20px' }}>
            <Typography.Title level={3}>Comentarios</Typography.Title>

            {/* Formulario para filtrar por ID de usuario */}
            <Form
                form={filterForm}
                layout="inline"
                onFinish={fetchCommentsByUser}
                style={{ marginBottom: '20px' }}
            >
                <Form.Item
                    name="userId"
                    label="Filtrar por ID de Usuario"
                    rules={[{ required: true, message: 'El ID del usuario es obligatorio' }]}
                >
                    <Input placeholder="Ingrese el ID del usuario" type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Filtrar
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={fetchAllComments}>
                        Ver todos
                    </Button>
                </Form.Item>
            </Form>

            {/* Lista de comentarios */}
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={paginatedComments}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            title={<Typography.Text strong>{item.usuario}</Typography.Text>}
                            bordered
                            hoverable
                        >
                            <Typography.Paragraph>{item.comentario}</Typography.Paragraph>
                            <Typography.Text strong>Valoración:</Typography.Text> {getTagByValoracion(item.valoracion)}
                        </Card>
                    </List.Item>
                )}
            />

            {/* Paginación */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={comments.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />

            {/* Botón para abrir el modal de nuevo comentario */}
            <Button
                style={{
                    marginTop: '20px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    borderRadius: '15px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={showModal}
            >
                <PlusOutlined />
                <span>Nuevo Comentario</span>
            </Button>

            {/* Modal para registrar un nuevo comentario */}
            <Modal
                title="Registrar Comentario"
                visible={isModalOpen}
                onOk={form.submit}
                onCancel={handleCancel}
                okText="Registrar"
                cancelText="Cancelar"
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="comentario"
                        label="Comentario"
                        rules={[{ required: true, message: 'El comentario es obligatorio' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="valoracion"
                        label="Valoración"
                        rules={[
                            { required: true, message: 'La valoración es obligatoria' },
                            { type: 'number', min: 1, max: 5, message: 'Debe ser un valor entre 1 y 5' },
                        ]}
                    >
                        <Input
                            type="number"
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                if (!isNaN(value)) {
                                    form.setFieldsValue({ valoracion: value });
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="usuario"
                        label="Usuario"
                        rules={[{ required: true, message: 'El usuario es obligatorio' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id_usuario"
                        label="ID del Usuario"
                        rules={[{ required: true, message: 'El ID del usuario es obligatorio' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CommentsSection;