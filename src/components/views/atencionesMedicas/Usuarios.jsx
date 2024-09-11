import React from 'react';
import '../estilos/Usuario.css';

function Usuarios() {
  return (
    <form className="user-form">
      <table className="form-table">
        <tbody>
          <tr>
            <td>
              <label htmlFor="nombre">S:</label>
            </td>
            <td>
              <input type="text" id="nombre" name="nombre" required />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="direccion">Dirección:</label>
            </td>
            <td>
              <input type="text" id="direccion" name="direccion" required />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="correo">Correo Electrónico:</label>
            </td>
            <td>
              <input type="email" id="correo" name="correo" required />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="telefono">Teléfono:</label>
            </td>
            <td>
              <input type="tel" id="telefono" name="telefono" required />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="submit-cell">
              <button type="submit">Enviar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default Usuarios
