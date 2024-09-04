import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import FormLogin from '../components/users/FormLogin';
import FormRegister from '../components/users/FormRegister';
import ForgotPassword from '../components/users/ForgotPassword';
import Home from '../components/layout/Home';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Pagos from '../components/views/atencionesMedicas/Pagos';

const MyRoutes = ({ isLoggedIn, userType }) => {
    return (
        <Routes>
            {/* no logged*/}
            {!isLoggedIn && (
                <>
                    {/*<Route path="/" element={<Layout />} />*/}
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/register" element={<FormRegister />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                </>
            )}
            {/*Protected Routes */}
            <Route element={<ProtectedRoute />} >
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
                <Route path="/homess" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/estadisticas" element={<Pagos />} />

            </Route>
            {/* Ruta de redirección si la página no existe */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default MyRoutes