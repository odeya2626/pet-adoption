import React, { useRef } from "react";
import { useUsersContext } from "../../contexts/UsersContext";
import { InputText, InputEmail, InputTel, InputPassword } from "../Inputs";

export default function SignUp({ handleisLogin }) {
  const { handleSignUp, message, setMessage } = useUsersContext();
  const userInfo = useRef({});
  const handleChange = (e) => {
    userInfo.current[e.target.name] = e.target.value;
  };
  return (
    <form
      onSubmit={(e) => {
        handleSignUp(e, userInfo.current, handleisLogin);
      }}
      onChange={() => {
        setMessage("");
      }}
      className="d-flex flex-column "
    >
      <InputText
        name={"firstName"}
        placeholder={"First Name"}
        handleChange={handleChange}
      />
      <InputText
        name={"lastName"}
        placeholder={"Last Name"}
        handleChange={handleChange}
      />
      <InputTel handleChange={handleChange} />

      <InputEmail
        name={"email"}
        placeholder={userInfo?.current.email || "Email"}
        handleChange={handleChange}
      />
      <InputPassword
        name={"password"}
        placeholder={"Password"}
        handleChange={handleChange}
      />

      <InputPassword
        name={"confirmPassword"}
        placeholder={"Confirm password"}
        handleChange={handleChange}
      />
      <div className="d-flex justify-content-between align-items-center gap-3 mt-2">
        <div
          className="pb-0 green fw-bold pointer"
          onClick={() => {
            handleisLogin();
          }}
        >
          Signed up already? Login
        </div>
        <button type="submit" className="btn button">
          Sign up
        </button>
      </div>
      <span className={message && "text-danger py-2"}>{message}</span>
    </form>
  );
}
