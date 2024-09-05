import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import FormLogin from '../components/users/FormLogin';
import FormRegister from '../components/users/FormRegister';
import ForgotPassword from '../components/users/ForgotPassword';
import Home from '../components/layout/Home';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Pagos from '../components/views/atencionesMedicas/Pagos';
import { useAuth } from '../components/users/AuthContext';

const MyRoutes = () => {
    const { isLoggedIn } = useAuth();
    return (
        <Routes>
            {/* no logged*/}
            {!isLoggedIn ? (
                <>
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/register" element={<FormRegister />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                </>
            ) : (
                <>
                    {/* Si el usuario está logueado, redirigir cualquier intento de acceder a las rutas públicas al home */}
                    <Route path="/login" element={<Navigate to="/home" />} />
                    <Route path="/register" element={<Navigate to="/home" />} />
                    <Route path="/forgotPassword" element={<Navigate to="/home" />} />
                </>
            )}
            {/*Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/estadisticas" element={<Pagos />} />
            </Route>

            {/* Ruta por defecto para redirigir a login si no coincide ninguna ruta */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
    )
}

export default MyRoutes