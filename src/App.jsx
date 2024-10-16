import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MyRoutes from './routes/Routes';
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { registrarVisita } from './api/apiService';

const AppContent = () => {
  const { isLoggedIn, sidebarOpen, setSidebarOpen } = useAuth();
  const location = useLocation(); // Hook para obtener la ruta actual

  // Función para determinar la tabla afectada de manera automatizada
  const getTablaAfectada = (pathname) => {
    const segments = pathname.split('/').filter(Boolean); // Dividimos la ruta y filtramos los segmentos vacíos
    return segments.length > 0 ? segments[segments.length - 1] : 'otra_tabla'; // Tomamos el último segmento como la tabla afectada
  };

  // Efecto para registrar la visita cada vez que cambie la ruta
  useEffect(() => {
    if (isLoggedIn) { // Verifica que el usuario esté logueado
      const pagina = location.pathname; // Página actual
      const accion = `Accion en la ruta ${pagina}`; // Definir la acción realizada
      const tablaAfectada = getTablaAfectada(pagina); // Determina la tabla afectada de manera automática

      // Llama a la función para registrar la visita en la bitácora
      //registrarVisita(pagina, accion, tablaAfectada); // Enviamos la tabla afectada
    }
  }, [location.pathname, isLoggedIn]); // Ejecuta el efecto cada vez que cambie la ruta o el estado de sesión

  return (
    <UserProvider>
      <div className="flex h-screen bg-white-100 transition-all duration-300">
        {isLoggedIn && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <Navbar />
          <div className="pt-16">
            <MyRoutes />
          </div>
        </div>
      </div>
    </UserProvider >
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;