import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userCi, setUserCi] = useState(null);
    const [userRol, setUserRol] = useState(null);
    const [userPermisos, setUserPermisos] = useState([]);
    const [userSubId, setUserSubId] = useState(null); // Agregar estado para id_sub

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decodifica el token
                console.log(decodedToken);

                const ci = decodedToken.ci || null; // Obtén el ci del token decodificado
                const subId = decodedToken.id_sub || null; // Obtén el id_sub del token decodificado

                setUserCi(ci);
                setUserRol(decodedToken.rol?.nombre || null);
                setUserPermisos(decodedToken.permisos?.map(permiso => permiso.nombre) || []);
                setUserSubId(subId); // Guardar el id_sub

                // Guarda el userId (ci) y el id_sub en el localStorage
                if (ci) {
                    localStorage.setItem('userId', ci); // Almacena el userId (CI) en localStorage
                }
                if (subId) {
                    localStorage.setItem('userSubId', subId); // Almacena el id_sub en localStorage
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{
            userCi, 
            userRol, 
            userPermisos, 
            userSubId, // Proveer el id_sub en el contexto
            setUserCi, 
            setUserRol, 
            setUserPermisos, 
            setUserSubId // También proveer el setUserSubId
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
