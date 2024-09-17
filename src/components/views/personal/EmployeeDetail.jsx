import { Modal } from "antd";


const EmployeeDetail = ({ visible, onClose, employee }) => (
    <Modal title="Detalles del Empleado" visible={visible} onOk={onClose} onCancel={onClose}>
      <p><b>Nombre:</b> {employee.name}</p>
      <p><b>Puesto:</b> {employee.position}</p>
      <p><b>Fecha de Contratación:</b> {employee.hireDate}</p>
    </Modal>
  );
  export default EmployeeDetail;