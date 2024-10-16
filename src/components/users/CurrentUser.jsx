import { useEffect } from 'react';
import { Popover, Button } from 'antd';
import CustomAvatar from './CustomAvatar';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const CurrentUser = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Usuario cargado:", user);
    } else {
      console.log("Usuario NO cargado:");
    }
  }, [user]);
  if (!user) {
    return null;
  }
  return (
    <>
      <Popover
        placement='bottomRight'
        trigger="click"
        overlayInnerStyle={{ padding: 10 }}
        overlayStyle={{ zIndex: 9999 }}
        content={
          <div>
            <p><strong>{user.nombre} {user.apellido_paterno}</strong></p>
            <p>{user.email}</p>
            <p>Rol: {user.rol?.nombre || "Sin rol"}</p>
            <Button type="primary" onClick={() => navigate('/perfil')}>Ver Perfil</Button>
          </div>
        }
      >
        <CustomAvatar
          name={`${user.nombre} ${user.apellido_paterno}`}
          size="default"
          style={{ cursor: 'pointer' }}
        />
      </Popover>
    </>
  );
};

export default CurrentUser;
