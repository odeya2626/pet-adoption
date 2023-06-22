import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../../contexts/UsersContext";

import { InputText, InputPassword } from "../Inputs";

const Login = ({ handleisLogin, showModal }) => {
  const navigate = useNavigate();
  const { handleLogin, message, setMessage } = useUsersContext();
  const userInfo = useRef({});

  const handleChange = (e) => {
    userInfo.current[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await handleLogin(userInfo.current);
    if (login) {
      navigate("/");
      showModal(false);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <InputText
        name={"email"}
        placeholder={"Email"}
        handleChange={handleChange}
      />
      <InputPassword
        name={"password"}
        placeholder={"Password"}
        handleChange={handleChange}
      />
      <div className="d-flex justify-content-between align-items-center gap-3 mt-2">
        <div
          className="pb-0 green fw-bold pointer"
          onClick={() => {
            handleisLogin();
          }}
        >
          Not a member? Sign up
        </div>
        <button type="submit" className="btn button">
          Login
        </button>
      </div>
      <span
        className={
          message && message.includes("success")
            ? "text-success"
            : "text-danger"
        }
      >
        {message}
      </span>
    </form>
  );
};
export default Login;
