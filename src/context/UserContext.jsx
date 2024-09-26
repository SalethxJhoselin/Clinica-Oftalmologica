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
            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
    
                setUserCi(decodedToken.ci);
                setUserRol(decodedToken.rol?.nombre || null);
                setUserPermisos(decodedToken.permisos?.map(permiso => permiso.nombre) || []);
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
