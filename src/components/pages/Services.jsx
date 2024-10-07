// components/Servicios.js
import React from 'react';
import servicios from '../../utils/test';

const Services = () => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-4xl font-bold mb-12">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="service">
            <img src={servicio.imagen} alt={servicio.titulo} className="w-full rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{servicio.titulo}</h3>
            <p className="text-gray-600">{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
