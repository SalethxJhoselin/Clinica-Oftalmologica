import React, { useState, useEffect } from 'react';
import { Form, Select, Button, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ManageGrupoCirugia = ({ cirugiaId }) => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar los especialistas al montar el componente
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await axios.get('https://clinica-oftalmologica.onrender.com/especialistas/listar');
        setSpecialists(response.data); // Suponiendo que la respuesta tiene la lista de especialistas
      } catch (error) {
        console.error('Error al obtener los especialistas:', error);
        notification.error({
          message: 'Error al cargar los especialistas',
          description: error.message,
        });
      }
    };

    fetchSpecialists();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (values) => {
    const { id_especialista } = values;

    // Estructura de los datos que se enviarán al backend
    const crearGrupo = {
      id_personal: id_especialista,
      id_cirugia: cirugiaId,
    };

    setLoading(true);

    try {
      // Realizamos la solicitud POST para agregar el especialista al grupo
      console.log(crearGrupo);
      const response = await axios.post(
        'https://clinica-oftalmologica.onrender.com/grupos/crear',
        crearGrupo
      );

      if (response.status === 200) {
        notification.success({
          message: 'Grupo Agregado',
          description: 'El especialista ha sido agregado al grupo de cirugía.',
        });
      }
    } catch (error) {
      console.error('Error al agregar especialista al grupo:', error);
      notification.error({
        message: 'Error al agregar especialista',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Agregar Grupo para la Cirugía ID: {cirugiaId}</h2>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ id_especialista: undefined }}
      >
        {/* Select de Especialistas */}
        <Form.Item
          name="id_especialista"
          label="Seleccionar Especialista"
          rules={[{ required: true, message: 'Por favor selecciona un especialista' }]}
        >
          <Select
            placeholder="Selecciona un especialista"
            loading={specialists.length === 0}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {specialists.map((specialist) => (
              <Option key={specialist.id} value={specialist.id}>
                {`${specialist.usuario.nombre} ${specialist.usuario.apellido_paterno} ${specialist.usuario.apellido_materno}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Botón de Enviar */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Agregar Especialista al Grupo
        </Button>
      </Form>
    </div>
  );
};

export default ManageGrupoCirugia;
