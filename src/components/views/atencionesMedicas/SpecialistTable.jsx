import React from 'react';
import { Table } from 'antd';

const SpecialistTable = ({ data, onSelectSpecialist }) => {
  const columns = [
    {
      title: 'Nombre Completo',
      dataIndex: 'nombreCompleto',
      key: 'nombreCompleto'
    },
    {
      title: 'Servicio',
      dataIndex: 'servicio',
      key: 'servicio'
    },
    {
      title: 'Hora Inicio',
      dataIndex: 'horaInicio',
      key: 'horaInicio'
    },
    {
      title: 'Hora Final',
      dataIndex: 'horaFinal',
      key: 'horaFinal'
    }
  ];

  return (
    <div>
      <h3 className="text-center text-xl font-bold mb-4">Horarios de Atencion</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record) => ({
            onClick: () => onSelectSpecialist(record),
          })}
        />
      </div>
    </div>

  );
};

export default SpecialistTable;
