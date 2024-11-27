import { AimOutlined, SolutionOutlined, SettingOutlined, FileAddOutlined, TeamOutlined } from '@ant-design/icons';

// Función que verifica si el usuario tiene un permiso específico
const hasPermission = (userPermisos, permissionLabel) => {
  return userPermisos.includes(permissionLabel);
};

const SidebarLinks = (userRol, userPermisos) => [
  userRol === 'Administrador' && {
    label: "Administrador",
    icon: <AimOutlined />,
    subMenu: [
      {
        label: "Gestionar Roles",
        to: "/admin/roles",
      },
      {
        label: "Gestionar Permisos",
        to: "/admin/permissions",
      },
      {
        label: "Administrar Usuarios",
        to: "/admin/users",
      },
      {
        label: "Administrar Accesos (Bitácora)",
        to: "/admin/access-log",
      }
    ],
  },
  {
    label: "Registros",
    icon: <FileAddOutlined />,
    subMenu: [
      hasPermission(userPermisos, "Departamentos") && {
        label: "Departamentos",
        to: "/admin/departments",
      },
      hasPermission(userPermisos, "Especialidades") && {
        label: "Especialidades",
        to: "/admin/specialties",
      },
      hasPermission(userPermisos, "Servicios") && {
        label: "Servicios",
        to: "/admin/services",
      },
      hasPermission(userPermisos, "Pagos") && {
        label: "Pagos",
        to: "/admin/pagosrealizados",
      }
    ].filter(Boolean), // Filtra elementos falsos
  },
  {
    label: "Personal",
    icon: <TeamOutlined />,
    subMenu: [
      hasPermission(userPermisos, "Administrar Empleados") && {
        label: "Administrar Empleados",
        to: "/personnel/manageEmployees",
      },
      hasPermission(userPermisos, "Registro de Profesiones") && {
        label: "Registro de Profesiones",
        to: "/personnel/professions-registry",
      },
      hasPermission(userPermisos, "Registro de Profesionales de la Salud") && {
        label: "Registro de Profesionales de la Salud",
        to: "/personnel/manageSpecialists",
      }
    ].filter(Boolean), // Filtra elementos falsos
  },
  {
    label: "Configuración",
    icon: <SettingOutlined />,
    subMenu: [
      hasPermission(userPermisos, "Programación de Médicos") && {
        label: "Programación de Médicos",
        to: "/settings/programmingCalendar",
      }
    ],
  },
  {
    label: "Atenciones Médicas",
    icon: <SolutionOutlined />,
    subMenu: [
      hasPermission(userPermisos, "Registro de Pacientes") && {
        label: "Registro de Pacientes",
        to: "/medical-care/patient-registry",
      },
      {
        label: "Horarios y Reg. de Citas",
        to: "/medical-care/bookAppointmentsAdm",
      },
      hasPermission(userPermisos, "Administrar Citas Medicas") && {
        label: "Administrar Citas Medicas",
        to: "/medical-care/manageAppointments",
      },

      {
        label: "Antecedentes de Paciente",
        to: "/antecedentes",
      },

      {
        label: "Consultas Médicas",
        to: "/consulta",
      },

      {
        label: "Gestionar Triaje",
        to: "/medical-care/triage",
      },
      {
        label: " Gestionar Patologias",
        to: "/medical-care/patologias",
      },
      {
        label: " Historia Clinica",
        to: "/historialMedico",
      }
    ],
  }
];

export default SidebarLinks;
