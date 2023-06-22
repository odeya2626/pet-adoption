import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../css/Form.css";
import Login from "./Register/Login";
import SignUp from "./Register/SignUp";
import { useUsersContext } from "../contexts/UsersContext";
import PetForm from "./PetForm";

export default function SiteModal(props) {
  const { show, onHide, showModal } = props;
  const { currentUser, setMessage } = useUsersContext();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const admin = currentUser.isAdmin ? true : false;
  const title = admin ? "Edit Pet" : isLoginPage ? "Login" : "Sign Up";

  const handleisLogin = () => {
    setIsLoginPage(!isLoginPage);
    setMessage("");
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="py-2" closeButton>
        <div className="red h3 mb-0">{title}</div>
      </Modal.Header>
      <Modal.Body className="pt-0">
        {admin ? (
          <PetForm isEdit={true} />
        ) : isLoginPage ? (
          <Login {...{ handleisLogin, showModal }} />
        ) : (
          <SignUp {...{ handleisLogin }} />
        )}
      </Modal.Body>
    </Modal>
  );
}
