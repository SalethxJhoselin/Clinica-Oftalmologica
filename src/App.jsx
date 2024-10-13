import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import MyRoutes from './routes/Routes'; //modifique esto a Routes de routes
import Sidebar from './components/layout/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { registrarVisita } from './api/apiService'; // Importa la función de registrar visita

const AppContent = () => {
  const { isLoggedIn, sidebarOpen, setSidebarOpen } = useAuth();
  const location = useLocation(); // Hook para obtener la ruta actual

  // Efecto para registrar la visita cada vez que cambie la ruta
  useEffect(() => {
    if (isLoggedIn) { // Verifica que el usuario esté logueado
      const usuarioId = localStorage.getItem('userId'); // Obtén el ID del usuario (ajusta según tu lógica)
      const rol = localStorage.getItem('userRol'); // Obtén el rol del usuario
      const pagina = location.pathname; // Página actual
      const accion = `Accedió a la página ${pagina}`; // Definir la acción realizada

      // Llama a la función para registrar la visita en la bitácora
      registrarVisita(usuarioId, pagina, accion, rol); // Enviamos la acción y el rol
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
