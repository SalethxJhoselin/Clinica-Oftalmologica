import React, { useState } from 'react';
import { Button, Checkbox, Row, Col, message, Select, DatePicker } from 'antd';
import { generarReporte } from '../../../api/apiService';
import moment from 'moment';

const columnasDisponibles = [
  { label: 'ID', value: 'id' },
  { label: 'CI', value: 'ci' },
  { label: 'Nombre', value: 'nombre' },
  { label: 'Apellido Paterno', value: 'apellido_paterno' },
  { label: 'Apellido Materno', value: 'apellido_materno' },
  { label: 'Fecha de Nacimiento', value: 'fecha_nacimiento' },
  { label: 'Email', value: 'email' },
  { label: 'Dirección', value: 'direccion' },
  { label: 'Teléfono', value: 'telefono' },
  { label: 'Género', value: 'genero' },
  { label: 'Especialidades', value: 'especialidades' },
  { label: 'Profesión', value: 'profesion' },
  { label: 'Estado', value: 'estado' }
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const ReporteEmpleados = () => {
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState([]);
  const [estado, setEstado] = useState(null);
  const [genero, setGenero] = useState(null);
  const [ordenColumna, setOrdenColumna] = useState('id');
  const [ordenDireccion, setOrdenDireccion] = useState('asc');
  const [formato, setFormato] = useState('pdf');
  const [fechaContratacion, setFechaContratacion] = useState([]);
  const [fechaNacimiento, setFechaNacimiento] = useState([]);

  const onChangeColumnas = (checkedValues) => {
    setColumnasSeleccionadas(checkedValues);
  };

  const handleGenerarReporte = async () => {
    if (columnasSeleccionadas.length === 0) {
      message.error('Selecciona al menos una columna para el reporte.');
      return;
    }

    try {
      const filtros = {
        estadoo: estado,
        genero: genero,
        fecha_contratacion_desde: fechaContratacion.length > 0 ? fechaContratacion[0].format('YYYY-MM-DD') : null,
        fecha_contratacion_hasta: fechaContratacion.length > 0 ? fechaContratacion[1].format('YYYY-MM-DD') : null,
        fecha_nacimiento_desde: fechaNacimiento.length > 0 ? fechaNacimiento[0].format('YYYY-MM-DD') : null,
        fecha_nacimiento_hasta: fechaNacimiento.length > 0 ? fechaNacimiento[1].format('YYYY-MM-DD') : null
      };

      const response = await generarReporte({
        columnas: columnasSeleccionadas,
        filtros: filtros,
        orden: {
          columna: ordenColumna,
          direccion: ordenDireccion
        },
        formato: formato
      });

      if (response) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([response], { type: `application/${formato}` }));
        link.download = `reporte_empleados.${formato}`;
        link.click();
        message.success('Reporte generado con éxito');
      }
    } catch (error) {
      message.error('Error al generar el reporte.');
      console.error(error);
    }
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-lg mt-2 ml-2 mr-2">
      <h3>Selecciona las columnas para el reporte</h3>
      <Checkbox.Group style={{ width: '100%' }} onChange={onChangeColumnas}>
        <Row>
          {columnasDisponibles.map((col) => (
            <Col span={8} key={col.value}>
              <Checkbox value={col.value}>{col.label}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>

      <h3 className="mt-4">Filtros</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Estado:</label>
          <Select placeholder="Seleccionar estado" onChange={(value) => setEstado(value)}>
            <Option value={true}>Activo</Option>
            <Option value={false}>Inactivo</Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Género:</label>
          <Select placeholder="Seleccionar género" onChange={(value) => setGenero(value)}>
            <Option value="Masculino">Masculino</Option>
            <Option value="Femenino">Femenino</Option>
          </Select>
        </Col>
      </Row>

      <h3 className="mt-4">Fecha de Contratación</h3>
      <RangePicker onChange={(dates) => setFechaContratacion(dates)} />

      <h3 className="mt-4">Fecha de Nacimiento</h3>
      <RangePicker onChange={(dates) => setFechaNacimiento(dates)} />

      <h3 className="mt-4">Ordenar por</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Columna:</label>
          <Select defaultValue="id" onChange={(value) => setOrdenColumna(value)}>
            {columnasSeleccionadas.map((col) => (
              <Option key={col} value={col}>{col}</Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <label>Dirección:</label>
          <Select defaultValue="asc" onChange={(value) => setOrdenDireccion(value)}>
            <Option value="asc">Ascendente</Option>
            <Option value="desc">Descendente</Option>
          </Select>
        </Col>
      </Row>

      <h3 className="mt-4">Formato de salida</h3>
      <Select defaultValue="pdf" onChange={(value) => setFormato(value)}>
        <Option value="pdf">PDF</Option>
        <Option value="excel">Excel</Option>
      </Select>

      <Button type="primary" className="mt-4" onClick={handleGenerarReporte}>
        Generar Reporte
      </Button>
    </div>
  );
};

export default ReporteEmpleados;