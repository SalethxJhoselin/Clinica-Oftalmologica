import React, { useState } from 'react';
import { Button, Checkbox, Row, Col, message, Select, DatePicker, Form } from 'antd';
import { generarReporte } from '../../../api/apiService';

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
  { label: 'Estado', value: 'estadoo' },
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const ReporteEmpleados = () => {
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [ordenColumna, setOrdenColumna] = useState('id');
  const [ordenDireccion, setOrdenDireccion] = useState('asc');
  const [formato, setFormato] = useState('pdf');

  const onChangeColumnas = (checkedValues) => {
    setColumnasSeleccionadas(checkedValues);
  };

  // Función para actualizar los filtros
  const handleFiltroChange = (newFiltros) => {
    setFiltros((prevFiltros) => {
      // Eliminamos los filtros con valores vacíos
      const filtrosActualizados = { ...prevFiltros, ...newFiltros };
      Object.keys(filtrosActualizados).forEach((key) => {
        const value = filtrosActualizados[key];
        if (
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          delete filtrosActualizados[key];
        }
      });
      return filtrosActualizados;
    });
  };

  const handleGenerarReporte = async () => {
    if (columnasSeleccionadas.length === 0) {
      message.error('Selecciona al menos una columna para el reporte.');
      return;
    }

    try {
      const data = {
        columnas: columnasSeleccionadas,
        filtros: filtros,
        orden: {
          columna: ordenColumna,
          direccion: ordenDireccion,
        },
        formato: formato,
      };

      console.log('Datos enviados al backend:', data);

      const response = await generarReporte(data);

      if (response) {
        const blobType =
          formato === 'pdf'
            ? 'application/pdf'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const blob = new Blob([response], { type: blobType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `reporte_empleados.${formato === 'pdf' ? 'pdf' : 'xlsx'}`;
        link.click();
        message.success('Reporte generado con éxito');
      }
    } catch (error) {
      message.error('Error al generar el reporte.');
      console.error('Error al generar el reporte:', error);
    }
  };

  return (
    <div>
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
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Estado">
              <Select
                placeholder="Seleccionar estado"
                onChange={(value) => handleFiltroChange({ estadoo: value })}
                allowClear
              >
                <Option value={true}>Activo</Option>
                <Option value={false}>Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Género">
              <Select
                placeholder="Seleccionar género"
                onChange={(value) => handleFiltroChange({ genero: value })}
                allowClear
              >
                <Option value="Masculino">Masculino</Option>
                <Option value="Femenino">Femenino</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Fecha de Contratación">
              <RangePicker
                format="YYYY-MM-DD"
                onChange={(dates, dateStrings) => {
                  handleFiltroChange({
                    fecha_contratacion_desde: dateStrings[0] || null,
                    fecha_contratacion_hasta: dateStrings[1] || null,
                  });
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Fecha de Nacimiento">
              <RangePicker
                format="YYYY-MM-DD"
                onChange={(dates, dateStrings) => {
                  handleFiltroChange({
                    fecha_nacimiento_desde: dateStrings[0] || null,
                    fecha_nacimiento_hasta: dateStrings[1] || null,
                  });
                }}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>

        <h3 className="mt-4">Ordenar por</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Columna">
              <Select defaultValue="id" onChange={(value) => setOrdenColumna(value)}>
                {columnasDisponibles.map((col) => (
                  <Option key={col.value} value={col.value}>
                    {col.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Dirección">
              <Select defaultValue="asc" onChange={(value) => setOrdenDireccion(value)}>
                <Option value="asc">Ascendente</Option>
                <Option value="desc">Descendente</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <h3 className="mt-4">Formato de salida</h3>
        <Form.Item>
          <Select defaultValue="pdf" onChange={(value) => setFormato(value)} style={{ width: 200 }}>
            <Option value="pdf">PDF</Option>
            <Option value="excel">Excel</Option>
          </Select>
        </Form.Item>

        <Button type="primary" className="mt-4" onClick={handleGenerarReporte}>
          Generar Reporte
        </Button>
      </Form>
    </div>
  );
};

export default ReporteEmpleados;