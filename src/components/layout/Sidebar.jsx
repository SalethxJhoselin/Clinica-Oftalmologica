import React, { useState} from 'react';
import { Layout, Menu } from 'antd';
import { LeftOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CurrentUser from '../users/CurrentUser';
import SidebarLinks from './SidebarLinks';
import { useUser } from '../../context/UserContext';

const { Sider } = Layout;

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen} = useAuth();
  const [openKeys, setOpenKeys] = useState([]);
  const {userRol, userPermisos} = useUser()
  const linksArray = SidebarLinks(userRol, userPermisos);
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  // Map the `linksArray` to the new `items` structure
  const menuItems = linksArray.map(({ icon, label, to, subMenu }) => (
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
  ));

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
            <Link to="/perfil">
              <CurrentUser />
            </Link>
            {sidebarOpen && <h2 className="text-gray-700">Bienvenido</h2>}
          </div>
          <div
            className="w-8 h-8 rounded-full bg-gray-50 shadow-lg flex items-center justify-center cursor-pointer transform transition-transform duration-300 mt-3 ml-auto mr-5"
            onClick={toggleSidebar}
            style={{ transform: sidebarOpen ? 'rotate(0)' : 'rotate(180deg)' }}
          >
            <LeftOutlined />
          </div>
        </div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={menuItems} // Use the `items` prop here
        />
      </div>
    </Sider>
  );
};

export default Sidebar;
