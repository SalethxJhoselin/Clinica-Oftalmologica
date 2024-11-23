// ReportePagos.jsx
import React, { useState } from 'react';
import { Button, Checkbox, Row, Col, message, Select, DatePicker, Input, Form } from 'antd';
import { generarReportePagos } from '../../../api/apiService';

const { Option } = Select;
const { RangePicker } = DatePicker;

// Columnas disponibles para el reporte de pagos
const columnasDisponibles = [
  { label: 'ID', value: 'id' },
  { label: 'Fecha', value: 'fecha' },
  { label: 'Monto', value: 'monto' },
  { label: 'Nombre Usuario', value: 'usuario_nombre' },
  { label: 'Apellido Paterno Usuario', value: 'usuario_apellido_paterno' },
  { label: 'Nombre Servicio', value: 'servicio_nombre' },
];

const ReportePagos = () => {
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [orden, setOrden] = useState({ columna: 'id', direccion: 'asc' });
  const [formato, setFormato] = useState('pdf');

  const onChangeColumnas = (checkedValues) => {
    setColumnasSeleccionadas(checkedValues);
  };

  // Función para actualizar los filtros
  const handleFiltroChange = (newFiltros) => {
    setFiltros((prevFiltros) => {
      const filtrosActualizados = { ...prevFiltros, ...newFiltros };
      // Eliminamos los filtros con valores vacíos
      Object.keys(filtrosActualizados).forEach((key) => {
        const value = filtrosActualizados[key];
        if (value === undefined || value === null || value === '') {
          delete filtrosActualizados[key];
        }
      });
      return filtrosActualizados;
    });
  };

  // Función para generar el reporte
  const handleGenerarReporte = async () => {
    if (columnasSeleccionadas.length === 0) {
      message.error('Selecciona al menos una columna para el reporte.');
      return;
    }

    try {
      const data = {
        columnas: columnasSeleccionadas,
        filtros: filtros,
        orden: orden,
        formato: formato,
      };

      console.log('Datos enviados al backend:', data);

      const response = await generarReportePagos(data);

      if (response) {
        const blobType =
          formato === 'pdf'
            ? 'application/pdf'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const blob = new Blob([response], { type: blobType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `reporte_pagos.${formato === 'pdf' ? 'pdf' : 'xlsx'}`;
        link.click();
        message.success('Reporte generado con éxito');
      }
    } catch (error) {
      message.error('Error al generar el reporte.');
      console.error('Error al generar el reporte:', error);
    }
  };

  // Actualizar orden
  const handleOrdenChange = (field, value) => {
    setOrden({
      ...orden,
      [field]: value,
    });
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
          <Col span={12}>
            <Form.Item label="Fecha Desde - Hasta">
              <RangePicker
                format="YYYY-MM-DD"
                onChange={(dates, dateStrings) => {
                  handleFiltroChange({
                    fecha_desde: dateStrings[0] || null,
                    fecha_hasta: dateStrings[1] || null,
                  });
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CI Usuario">
              <Input
                placeholder="CI del Usuario"
                onChange={(e) => handleFiltroChange({ usuario_ci: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Monto Mínimo">
              <Input
                type="number"
                placeholder="Monto Mínimo"
                onChange={(e) => handleFiltroChange({ monto_min: e.target.value })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Monto Máximo">
              <Input
                type="number"
                placeholder="Monto Máximo"
                onChange={(e) => handleFiltroChange({ monto_max: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <h3 className="mt-4">Orden</h3>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Columna para ordenar">
            <Select defaultValue="id" onChange={(value) => handleOrdenChange('columna', value)}>
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
            <Select defaultValue="asc" onChange={(value) => handleOrdenChange('direccion', value)}>
              <Option value="asc">Ascendente</Option>
              <Option value="desc">Descendente</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <h3 className="mt-4">Formato</h3>
      <Form.Item>
        <Select
          defaultValue="pdf"
          onChange={(value) => setFormato(value)}
          style={{ width: 200 }}
        >
          <Option value="pdf">PDF</Option>
          <Option value="excel">Excel</Option>
        </Select>
      </Form.Item>

      <Button type="primary" className="mt-4" onClick={handleGenerarReporte}>
        Generar Reporte
      </Button>
    </div>
  );
};

export default ReportePagos;