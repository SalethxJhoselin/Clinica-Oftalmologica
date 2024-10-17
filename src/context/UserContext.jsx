import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrige el import de jwtDecode

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userCi, setUserCi] = useState(null);
    const [userRol, setUserRol] = useState(null);
    const [userPermisos, setUserPermisos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decodifica el token
                console.log(decodedToken);
    
                const ci = decodedToken.ci || null; // Obtén el ci del token decodificado
                setUserCi(ci);
                setUserRol(decodedToken.rol?.nombre || null);
                setUserPermisos(decodedToken.permisos?.map(permiso => permiso.nombre) || []);

                // Guarda el userId (ci) en el localStorage
                if (ci) {
                    localStorage.setItem('userId', ci); // Almacena el userId (CI) en localStorage
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ userCi, userRol, userPermisos, setUserCi, setUserRol, setUserPermisos }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
