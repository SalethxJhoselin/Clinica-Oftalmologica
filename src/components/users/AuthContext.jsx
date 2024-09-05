import React, { createContext, useState, useContext, useEffect } from 'react';

/*Crear el contexto de autenticación ya que manejar este estado en multiples componentes
puede volverse complicado con el Context API de React creamos una fuente central de 
información que puede ser accedida por cualquier componente en la jerarquía de la aplicación.
*/
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('authToken');
  };

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
