import React from 'react';
import { useAuth } from '../users/AuthContext';
import { MenuOutlined, AimOutlined, LeftOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import CurrentUser from './NavbarComponents/CurrentUser';
const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`bg-white sticky top-0 h-screen pt-5 transition-all duration-300 border-r border-gray-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <button
        className="absolute top-12 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer transform transition-transform duration-300"
        onClick={toggleSidebar}
        style={{ transform: sidebarOpen ? 'rotate(0)' : 'rotate(180deg)' }}
      >
        <LeftOutlined />
      </button>
      <div className="flex flex-col items-center space-y-4 pb-6">
        <div className="userContent">
          <CurrentUser />
        </div>
        {sidebarOpen && <h2 className="text-gray-700">Administrador</h2>}
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="mb-4" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `
              flex items-center text-white-700 p-2 hover:bg-gray-200 rounded-lg transition-all duration-300
              ${isActive ? 'bg-gray-300' : ''}
            `}
          >
            <div className="mr-2">
              {icon}
            </div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const linksArray = [
  {
    label: "home",
    icon: <AimOutlined />,
    to: "/home"
  },
  {
    label: "estadisticas",
    icon: <MenuOutlined />,
    to: "/estadisticas"
  },
];

export default Sidebar;
