import {AimOutlined, SolutionOutlined, SettingOutlined, FileAddOutlined, TeamOutlined } from '@ant-design/icons';


const SidebarLinks = (userRol) => [
  userRol === 'Administrador'&&{
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
      {
        label: "Tipos de Atenciones",
        to: "/admin/service-types", 
      },
      {
        label: "Departamentos",
        to: "/admin/departments",
      },
      {
        label: "Especialidades",
        to: "/admin/specialties", 
      },
      {
        label: "Servicios",
        to: "/admin/services", 
      }
    ],
  },
  {
    label: "Personal",
    icon: <TeamOutlined />,
    subMenu: [
      {
        label: "Administrar Empleados",
        to: "/personnel/manageEmployees",
      },
      {
        label: "Registro de Profesiones",
        to: "/personnel/professions-registry",
      },
      {
        label: "Registro de Profesionales de la Salud",
        to: "/personnel/healthcare-professionals-registry",
      }
    ],
  },
  {
    label: "Configuración",
    icon: <SettingOutlined />,
    subMenu: [
      {
        label: "Programación de Médicos",
        to: "/settings/doctor-scheduling",
      }
    ],
  },
  {
    label: "Atenciones Médicas",
    icon: <SolutionOutlined />,
    subMenu: [
      {
        label: "Registro de Pacientes",
        to: "/medical-care/patient-registry",
      },
      {
        label: "Citas",
        to: "/medical-care/appointments",
      },
      {
        label: "Consultas Médicas",
        to: "/medical-care/consultations",
      },
      {
        label: "Triaje",
        to: "/medical-care/triage",
      }
    ],
  }
];

export default SidebarLinks;
