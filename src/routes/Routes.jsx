import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import FormLogin from '../components/users/FormLogin';
import FormRegister from '../components/users/FormRegister';
import ForgotPassword from '../components/users/ForgotPassword';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import Perfil from '../components/users/Perfil';
import ManageEmployees from '../components/views/personal/ManageEmployees';
import ManageRoles from '../components/views/administrador/ManageRoles';
import ManagePermissions from '../components/views/administrador/ManagePermissions';
import ManageProfession from '../components/views/personal/ManageProfession';
import ManageUsuarios from '../components/views/administrador/ManageUsuarios';
import Home from '../components/pages/Home';
import ManageEspeciality from '../components/views/registro/ManageEspeciality';
import ManagePatients from '../components/views/atencionesMedicas/ManagePatients';
import ManageSpecialists from '../components/views/personal/ManageSpecialists';
import ProgrammingCalendar from '../components/views/configuracion/ProgrammingCalendar';
import BookAppointmentsAdm from '../components/views/atencionesMedicas/Horarios y registro de citas/BookAppointmentsAdm';
import ManageAppointments from '../components/views/atencionesMedicas/AdmCitas/ManageAppointments';
import ManageBitacoraData from '../components/views/administrador/ManageBitacoraData';
import ManagePagos from '../components/views/registro/ManagePagos';
import ManageDepartments from '../components/views/registro/ManageDepartments';
import ManageServices from '../components/views/registro/ManageServices';
import MedicalConsultation from '../components/views/atencionesMedicas/MedicalConsultation';
import TriageRecord from '../components/views/atencionesMedicas/TriageRecord';
import ManageTriaje from '../components/views/atencionesMedicas/ManageTriaje';
import ManagePatologia from '../components/views/atencionesMedicas/ManagePatologia';
import Antecedentes from '../components/views/atencionesMedicas/Antecedentes/Antecedentes';
import ConsultaMedica from '../components/views/atencionesMedicas/consultaMedica/ConsultaMedica';
import ManageTreatments from '../components/views/atencionesMedicas/ManageTreatments';
import ManageDiagnostics from '../components/views/atencionesMedicas/ManageDiagnostics';
import ManageHistorial from '../components/views/atencionesMedicas/Historial/ManageHistorial';
import ManageCirugias from '../components/views/atencionesMedicas/Cirugias/ManageCirugias';
import ManageLensMeasures from '../components/views/atencionesMedicas/ManageLensMeasures';
import ManageRecipes from '../components/views/atencionesMedicas/ManageRecipes';
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
                    <Route path="/register" element={<Navigate to="/home" />} />-
                    <Route path="/forgotPassword" element={<Navigate to="/home" />} />
                </>
            )}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            {/*Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/perfil" element={<Perfil />} />

                <Route path="/admin/roles" element={<ManageRoles />} />
                <Route path="/admin/permissions" element={<ManagePermissions />} />
                <Route path="/admin/users" element={<ManageUsuarios />} />

                <Route path="/personnel/professions-registry" element={<ManageProfession />} />
                <Route path="/personnel/manageEmployees" element={<ManageEmployees />} />
                <Route path="/admin/specialties" element={<ManageEspeciality />} />
                <Route path="/medical-care/patient-registry" element={<ManagePatients />} />
                <Route path="/personnel/manageSpecialists" element={<ManageSpecialists />} />
                <Route path="/settings/programmingCalendar" element={<ProgrammingCalendar />} />
                <Route path="/medical-care/bookAppointmentsAdm" element={<BookAppointmentsAdm />} />
                <Route path="/medical-care/manageAppointments" element={<ManageAppointments />} />
                <Route path="/admin/pagosrealizados" element={<ManagePagos />} />


                <Route path="/admin/departments" element={<ManageDepartments />} />
                <Route path="/admin/services" element={<ManageServices />} />
                <Route path="/medical-care/consultations" element={<MedicalConsultation />} />
                {/* <Route path="/medical-care/triage" element={<TriageRecord />} /> */}
                <Route path="/admin/pagosrealizados" element={<TriageRecord />} />
                <Route path="/admin/pagosrealizados" element={<TriageRecord />} />

                <Route path="/admin/pagosrealizados" element={<ManageTriaje />} />

                <Route path="/medical-care/triage" element={<ManageTriaje />} />
                <Route path="/medical-care/patologias" element={<ManagePatologia />} />
                <Route path="/admin/access-log" element={<ManageBitacoraData />} />
                <Route path="/medical-care/triage" element={<ManageTriaje />} />
                <Route path="/medical-care/patologias" element={<ManagePatologia />} />
                

                <Route path="/historialMedico" element={<ManageHistorial />} />
                <Route path="/cirugia" element={<ManageCirugias />} />

                <Route path="/antecedentes" element={<Antecedentes />} />
                <Route path="/consulta" element={<ConsultaMedica />} />
                <Route path="/medical-care/Tratamiento" element={<ManageTreatments />} />
                <Route path="/medical-care/Diagnostico" element={<ManageDiagnostics />} />
                <Route path="/medical-care/Medidas" element={<ManageLensMeasures />} />
                <Route path="/medical-care/Medicamentos" element={<ManageRecipes />} />
                
            </Route>
            {/* Ruta por defecto para redirigir a login si no coincide ninguna ruta */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
    )
}

export default MyRoutes