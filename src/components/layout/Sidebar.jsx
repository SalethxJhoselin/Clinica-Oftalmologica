import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { LeftOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import SidebarLinks from './SidebarLinks';

const { Sider } = Layout;

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAuth();
  const [openKeys, setOpenKeys] = useState([]);
  const { userRol, userPermisos, userSubId } = useUser(); // Obtener id_sub del contexto
  const linksArray = SidebarLinks(userRol, userPermisos);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  // Map the `linksArray` to the new `items` structure
  const menuItems = linksArray.map(({ icon, label, to, subMenu }) =>
    subMenu
      ? {
          key: label,
          icon,
          label,
          children: subMenu.map(({ label, to }) => ({
            key: to,
            label: <NavLink to={to}>{label}</NavLink>,
          })),
          expandIcon: ({ isOpen }) => (isOpen ? <DownOutlined /> : <RightOutlined />),
        }
      : {
          key: to,
          icon,
          label: <NavLink to={to}>{label}</NavLink>,
        }
  );

  // Verificar si id_sub es diferente de null para mostrar el Sidebar
  useEffect(() => {
    console.log("vamos a veerrr el sidebar!!!!:", userSubId);
    if (userSubId) {
      console.log("Sidebar renderizado - id_sub disponible:", userSubId);
    }
  }, [userSubId]); // Dependemos de la actualización de userSubId

  // Mostrar en consola cada vez que el Sidebar se renderice
  useEffect(() => {
    console.log("Sidebar renderizado");
  }, [sidebarOpen, userSubId]);

  // No mostrar Sidebar si idSub es null
  if (userSubId === null) {
    return <div>Loading...</div>; // Mostrar mensaje de carga hasta que idSub esté disponible
  }

  return (
    <Sider
      width={256}
      className={`bg-white border-r rounded-3xl shadow-lg mt-16`}
      collapsedWidth={80}
      collapsible
      collapsed={!sidebarOpen}
      trigger={null}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col items-center justify-center space-y-2 mt-8">
            {sidebarOpen && <h2 className="text-gray-700">Bienvenido</h2>}
          </div>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={menuItems} // Use the `items` prop here
          />
          <div
            className="w-8 h-8 rounded-full bg-gray-50 shadow-lg flex items-center justify-center cursor-pointer transform transition-transform duration-300 mt-3 ml-auto mr-5"
            onClick={toggleSidebar}
            style={{ transform: sidebarOpen ? 'rotate(0)' : 'rotate(180deg)' }}
          >
            <LeftOutlined />
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
