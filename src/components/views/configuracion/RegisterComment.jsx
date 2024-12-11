import { useState } from 'react';
import { Button, Modal, Input, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createComment } from '../../../api/apiService'; // Cambiamos la API

const RegisterComment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const onFinish = async (values) => {
        try {
            // Mapear valores del formulario al formato esperado por el backend
            const commentData = {
                comentario: values.comentario,
                valoracion: values.valoracion,
                usuario: values.usuario,
                id_usuario: values.id_usuario,
            };

            await createComment(commentData); // Enviar datos al backend
            message.success('Comentario registrado exitosamente');
            form.resetFields();
            setIsModalOpen(false);
        } catch (error) {
            message.error('Error al registrar el comentario');
        }
    };

    return (
        <>
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
                <span>Registrar Comentario</span>
            </Button>
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
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="valoracion"
                        label="Valoración"
                        rules={[
                            { required: true, message: 'La valoración es obligatoria' },
                            { type: 'number', min: 1, max: 5, message: 'Debe ser un valor entre 1 y 5' },
                        ]}
                    >
                        <Input type="number" />
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
        </>
    );
};

export default RegisterComment;