import { Avatar as AntAvatar } from 'antd';

const CustomAvatar = ({ name }) => {
  // Separar el nombre completo en nombre y apellido
  const [firstName, firstLastName] = name.split(' ');

  // Obtener las iniciales
  const initialFirstName = firstName?.charAt(0).toUpperCase() || '';
  const initialFirstLastName = firstLastName?.charAt(0).toUpperCase() || '';
  const initials = `${initialFirstName}${initialFirstLastName}`;  // Las iniciales a mostrar

  return (
    <AntAvatar
      alt={'Avatar'}
      size="large"
      style={{
        backgroundColor: "#1677FF",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      {initials}  {/* Mostrar las iniciales en el avatar */}
    </AntAvatar>
  );
};

export default CustomAvatar;
