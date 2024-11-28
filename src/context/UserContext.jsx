import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userCi, setUserCi] = useState(null);
    const [userRol, setUserRol] = useState(null);
    const [userPermisos, setUserPermisos] = useState([]);
    const [userSubId, setUserSubId] = useState(null); // Estado para id_sub

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtener token del localStorage
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decodificar el token
                console.log(decodedToken);

                const ci = decodedToken.ci || null; // Obtener ci del token decodificado
                const subId = decodedToken.id_sub || null; // Obtener id_sub del token decodificado

                setUserCi(ci);
                setUserRol(decodedToken.rol?.nombre || null);
                setUserPermisos(decodedToken.permisos?.map(permiso => permiso.nombre) || []);
                setUserSubId(subId); // Guardar el id_sub

                // Guardar los valores en localStorage
                if (ci) {
                    localStorage.setItem('userId', ci); // Almacenar userId (CI) en localStorage
                }
                if (subId) {
                    console.log('userSubId en el userContext', subId);
                    localStorage.setItem('userSubId', subId); // Almacenar id_sub en localStorage
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
            userSubId, // Proveer id_sub en el contexto
            setUserCi,
            setUserRol,
            setUserPermisos,
            setUserSubId // También proveer setUserSubId
        }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
