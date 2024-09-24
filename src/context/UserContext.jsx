import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userCi, setUserCi] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserCi(decodedToken.ci); // Almacena solo el CI en el estado
        }
    }, []);

    return (
        <UserContext.Provider value={{ userCi }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
