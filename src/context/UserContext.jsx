import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [userCi, setUserCi] = useState(null);
    const [userRol, setUserRol] = useState(null);
    const [userPermisos, setUserPermisos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);

            // Almacena solo el CI en el estado
            setUserCi(decodedToken.ci);

            // Extrae el nombre del rol del objeto 'rol'
            if (decodedToken.rol && decodedToken.rol.nombre) {
                setUserRol(decodedToken.rol.nombre);
            }

            // Extrae los nombres de los permisos del array 'permisos'
            if (decodedToken.permisos && Array.isArray(decodedToken.permisos)) {
                const permisosNombres = decodedToken.permisos.map(permiso => permiso.nombre);
                setUserPermisos(permisosNombres);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ userCi, userRol, userPermisos }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
