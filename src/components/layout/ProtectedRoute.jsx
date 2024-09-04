import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isLoggedIn =window.localStorage.getItem("loggedIn");//solo para prueba, modificar
  return isLoggedIn ==="true" ?<Outlet/>: <Navigate to="login"/>;
}

export default ProtectedRoute