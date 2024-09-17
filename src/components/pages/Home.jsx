import React from 'react';
import assets from '../../utils';

const Home = () => {
  return (
    <>
      {/* Sección del banner principal */}
      <section className="bg-cover bg-center h-screen text-black flex items-center justify-center" style={{ backgroundImage: ` url(${assets.img2})` }}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a Clínica Oftalmológica “OPTIVISION”</h1>
          <p className="text-xl mb-6">Cuidamos tu salud visual con la mejor tecnología y especialistas</p>
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition">
            Reserva tu cita
          </button>
        </div>
      </section>

      {/* Sección de servicios */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="service">
            <img src={assets.img4} alt="Servicio 1" className="w-full rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Cirugía LASIK</h3>
            <p className="text-gray-600">Corrección visual mediante cirugía láser avanzada.</p>
          </div>
          <div className="service">
            <img src={assets.img1} alt="Servicio 2" className="w-full rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Diagnóstico completo</h3>
            <p className="text-gray-600">Exámenes de visión precisos y personalizados para ti.</p>
          </div>
          <div className="service">
            <img src={assets.img6} alt="Servicio 3" className="w-full rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Tratamiento de cataratas</h3>
            <p className="text-gray-600">Recupera tu visión con nuestras técnicas quirúrgicas.</p>
          </div>
        </div>
      </section>

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
