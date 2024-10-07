import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/*Crear el contexto de autenticación ya que manejar este estado en multiples componentes
puede volverse complicado con el Context API de React creamos una fuente central de 
información que puede ser accedida por cualquier componente en la jerarquía de la aplicación.
*/
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Definir el tiempo de inactividad permitido (ejemplo: 15 minutos)
  const SESSION_TIMEOUT = 300 * 60 * 1000; // 15 minutos en milisegundos
  let timeoutId;

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Guardar estado de sesión
    startInactivityTimer(); // Iniciar temporizador de inactividad
};

  const logout = () => {
    localStorage.clear(); 
    setIsLoggedIn(false);
    navigate('/'); // Redirigir al login al cerrar sesión
  };
  // Función para iniciar el temporizador de inactividad
  const startInactivityTimer = () => {
    clearTimeout(timeoutId); // Limpiar cualquier temporizador anterior
    timeoutId = setTimeout(() => {
      console.log('Tu sesión ha expirado por inactividad.');
      logout(); // Cerrar sesión cuando expire el tiempo
    }, SESSION_TIMEOUT);
  };

  // Escuchar eventos de actividad del usuario
  const resetInactivityTimer = () => {
    clearTimeout(timeoutId);
    startInactivityTimer();
  };
  useEffect(() => {
    // Agregar listeners para detectar actividad del usuario
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('touchstart', resetInactivityTimer);
    window.addEventListener('touchend', resetInactivityTimer);
    window.addEventListener('touchmove', resetInactivityTimer);
    // Iniciar temporizador cuando el componente se monta
    if (isLoggedIn) {
      startInactivityTimer();
    }

    // Limpiar eventos y timeout al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      window.removeEventListener('touchstart', resetInactivityTimer);
      window.removeEventListener('touchend', resetInactivityTimer);
      window.removeEventListener('touchmove', resetInactivityTimer);
      clearTimeout(timeoutId);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, sidebarOpen, setSidebarOpen, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth->Hook que permite acceder al contexto de autenticación fácilmente desde cualquier componente.
export const useAuth = () => useContext(AuthContext);
