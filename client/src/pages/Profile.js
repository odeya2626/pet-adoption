import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../css/Form.css";
import {
  InputText,
  InputTel,
  Textarea,
  InputPassword,
} from "../components/Inputs";
import { useUsersContext } from "../contexts/UsersContext";
import { Accordion } from "react-bootstrap";

export default function Profile() {
  const { handleEditUser, currentUser, message, setMessage } =
    useUsersContext();
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    phoneNumber: currentUser.phoneNumber,
    email: currentUser.email,
    bio: currentUser.bio,
  });
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const CheckChangedInfo = (e, userInfo) => {
    e.preventDefault();
    if (isUpdatePassword) {
      if (userInfo.password === "" || userInfo.confirmPassword === "") {
        setMessage(
          "Please fill in the password fields or close the password section"
        );
        return;
      }
      if (userInfo.password !== userInfo.confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }
    }
    const changedInfo = {};
    for (const key in userInfo) {
      if (key === "password" && !isUpdatePassword) break;
      if (currentUser[key] !== userInfo[key]) {
        changedInfo[key] = userInfo[key];
      }
    }
    Object.keys(changedInfo).length
      ? handleEditUser(changedInfo)
      : setMessage("No changes were made");
  };
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <h3 className="title">My Profile</h3>
      <form
        onSubmit={(e) => CheckChangedInfo(e, userInfo)}
        onChange={() => {
          setMessage("");
        }}
        className="d-flex flex-column align-items-center w-100"
      >
        <div className="w-75">
          <InputText
            name={"firstName"}
            placeholder={"First Name"}
            value={userInfo.firstName}
            handleChange={handleChange}
          />
          <InputText
            name={"lastName"}
            placeholder={"Last Name"}
            value={userInfo.lastName}
            handleChange={handleChange}
          />
          <InputTel handleChange={handleChange} value={userInfo.phoneNumber} />
          <InputText
            name={"email"}
            placeholder={"Email"}
            value={userInfo.email}
            handleChange={handleChange}
          />
          <Textarea
            name={"bio"}
            placeholder={"Bio"}
            value={userInfo.bio}
            handleChange={handleChange}
          />
          <Accordion className="pt-0 mt-1">
            <Accordion.Item style={{ border: "none" }} eventKey="0">
              <Accordion.Header
                className="mt-1"
                onClick={() => {
                  setIsUpdatePassword(!isUpdatePassword);
                  setMessage("");
                }}
              >
                Would you like to change your password?
              </Accordion.Header>
              <Accordion.Body className="p-0 mb-2">
                <InputPassword
                  name={"password"}
                  placeholder={"New Password"}
                  handleChange={handleChange}
                  isRequired={false}
                />
                <InputPassword
                  name={"confirmPassword"}
                  placeholder={"Confirm password"}
                  handleChange={handleChange}
                  isRequired={false}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
            <span
              className={
                message.includes("success") ? "text-success" : "text-danger"
              }
            >
              {message}
            </span>
            <div className="d-flex align-items-center">
              {message.includes("success") && (
                <FontAwesomeIcon icon={faCheck} className="green me-3" />
              )}
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
