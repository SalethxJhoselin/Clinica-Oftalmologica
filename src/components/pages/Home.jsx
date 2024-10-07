import React from 'react';
import Services from './Services';
import assets from '../../utils';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Sección del banner principal */}
      <section className="bg-cover bg-center h-screen text-black flex items-center justify-center" style={{ backgroundImage: ` url(${assets.img2})` }}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a la Clínica Oftalmológica “OPTIVISION”</h1>
          <p className="text-xl mb-6">Cuidamos tu salud visual con la mejor tecnología y especialistas</p>
          {/* Botón de reserva con el enlace */}
          <Link to="/reservarCita">
            <button className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition">
              Reserva tu cita
            </button>
          </Link>
        </div>
      </section>

      {/* Sección de servicios */}
      <Services />
      {/* Sección de testimonios */}
      <section className="bg-gray-100 py-16 px-4 text-center relative bg-cover bg-center" style={{ backgroundImage: `url(${assets.img3})` }}>
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className="relative">
          <h2 className="text-4xl font-bold mb-12 text-white">Lo que dicen nuestros pacientes</h2>
          <div className="testimonial mb-8">
            <p className="italic text-white">"Excelente atención, recuperé mi visión gracias a los especialistas."</p>
            <span className="block mt-4 text-gray-300">- María López</span>
          </div>
          <div className="testimonial">
            <p className="italic text-white">"La mejor clínica oftalmológica, tecnología de punta y trato humano."</p>
            <span className="block mt-4 text-gray-300">- Juan Pérez</span>
          </div>
        </div>
      </section>

      {/* Sección de contacto */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
        <p className="text-lg mb-6">Agenda tu cita o visítanos en nuestra clínica.</p>
        <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition">
          Contactar
        </button>
      </section>
    </>
  );
};

export default Home;
