import React, { createContext, useContext, useState } from "react";
import axios from "axios";

import {
  userErrMessage,
  handleAuthErr,
  clearCurrentUser,
} from "../utils/handleErr";
export const UsersContext = createContext();
export function useUsersContext() {
  return useContext(UsersContext);
}
export default function UsersContextProvider({ children, showModal }) {
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const usersRoute = `${baseURL}/users`;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const [userInfoFull, setUserInfoFull] = useState();
  const [message, setMessage] = useState("");

  const handleErrors = (err) => {
    handleAuthErr(err, () => clearCurrentUser(setCurrentUser), showModal);
    err.response.status === 401
      ? userErrMessage(err, setMessage)
      : alert(`Error ${err.response.status}: ${err.response.data}`);
  };

  const handleSignUp = async (e, userInfo, handleisLogin) => {
    setMessage("");
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setMessage("Passwords Do Not Match");
      return;
    }
    try {
      const res = await axios.post(`${usersRoute}/signup`, userInfo);
      handleisLogin(true);
      setMessage("You have signed up successfully. Please login");
    } catch (err) {
      userErrMessage(err, setMessage);
    }
  };

  const handleLogin = async (userInfo) => {
    try {
      const res = await axios.post(`${usersRoute}/login`, userInfo, {
        withCredentials: true,
      });
      if (res.data.user) {
        setCurrentUser(res.data.user);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      }
      return true;
    } catch (err) {
      userErrMessage(err, setMessage);
    }
  };

  const handleSignOut = () => {
    try {
      const res = axios.delete(`${usersRoute}/signout`, {
        withCredentials: true,
      });
      clearCurrentUser(setCurrentUser);
      return true;
    } catch (err) {
      alert(`Error ${err.response.status}: ${err.response.data}`);
    }
  };

  const handleEditUser = async (changedInfo) => {
    try {
      const res = await axios.put(
        `${usersRoute}/${currentUser.id}`,
        changedInfo,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setMessage("Changes were saved successfully");
    } catch (err) {
      handleAuthErr(err, () => clearCurrentUser(setCurrentUser), showModal);
      userErrMessage(err, setMessage);
    }
  };
  const getAllUsers = async (offset = "") => {
    try {
      const res = await axios.get(`${usersRoute}?offset=${offset}`, {
        withCredentials: true,
      });
      setUsers(res.data.list);
      return res.data;
    } catch (err) {
      handleErrors(err);
    }
  };
  const getUserByIdFull = async (id) => {
    try {
      const res = await axios.get(`${usersRoute}/${id}/full`, {
        withCredentials: true,
      });
      setUserInfoFull(res.data);
    } catch (err) {
      handleErrors(err);
    }
  };
  const handleMakeAdmin = async (e, id) => {
    try {
      e.stopPropagation();
      const res = await axios.put(
        `${usersRoute}/${id}/admin`,
        { isAdmin: 1 },
        {
          withCredentials: true,
        }
      );
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return { ...user, ...res.data };
        }
        return user;
      });
      setUsers(updatedUsers);
      return;
    } catch (err) {
      handleErrors(err);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        showModal,
        handleSignUp,
        handleLogin,
        setCurrentUser,
        handleEditUser,
        currentUser,
        message,
        setMessage,
        handleSignOut,
        getAllUsers,
        users,
        getUserByIdFull,
        userInfoFull,
        handleMakeAdmin,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
