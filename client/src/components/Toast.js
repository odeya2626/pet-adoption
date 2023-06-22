import Toast from "react-bootstrap/Toast";
import { usePetsContext } from "../contexts/PetsContext";

function ToastMessage({ message, className }) {
  const { setStatusMessage } = usePetsContext();
  const color = message.includes("success") ? "green" : "red";

  return (
    <Toast
      className={className}
      onClick={() => {
        setStatusMessage("");
      }}
    >
      <Toast.Header>
        <strong className={`me-auto ${color}`}>Status Change</strong>
        <small></small>
      </Toast.Header>
      <Toast.Body className="">{message}</Toast.Body>
    </Toast>
  );
}

export default ToastMessage;
