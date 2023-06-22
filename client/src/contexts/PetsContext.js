import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUsersContext } from "./UsersContext";
import {
  clearCurrentUser,
  handleAuthErr,
  userErrMessage,
} from "../utils/handleErr";
import { statusMessages } from "../utils/Messages";

export const PetsContext = createContext();
export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const { currentUser, setCurrentUser, showModal, setMessage } =
    useUsersContext();
  const baseURL = process.env.REACT_APP_SERVER_URL;
  const petsRoute = `${baseURL}/pets`;
  const [searchResults, setSearchResults] = useState([]);
  const [userPets, setUserPets] = useState([]);
  const [userSavedPets, setUserSavedPets] = useState([]);
  const [petById, setPetById] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    currentUser.id && fetchUserPets(currentUser.id);
  }, [currentUser]);

  const updateList = () => {
    Object.keys(searchQuery).length && searchPets(searchQuery);
    fetchUserPets(currentUser.id);
  };
  const handleErrors = (err) => {
    handleAuthErr(err, () => clearCurrentUser(setCurrentUser), showModal);
    err.response.status === 401
      ? userErrMessage(err, setMessage)
      : alert(`Error ${err.response.status}: ${err.response.data}`);
  };

  const handleStatus = (e, petId) => {
    const status = e.target.name;
    status === "Available"
      ? handleReturn(petId, status)
      : handleAdopt(petId, status);
  };

  const handleAdopt = async (petId, status) => {
    try {
      const res = await axios.post(
        `${petsRoute}/${petId}/adopt`,
        { status: status },
        {
          withCredentials: true,
        }
      );
      setPetById(res.data[0]);
      updateList();
      setStatusMessage(statusMessages[res.data[0].status]);
    } catch (err) {
      handleErrors(err);
    }
  };
  const handleReturn = async (petId, status) => {
    try {
      const res = await axios.post(
        `${petsRoute}/${petId}/return`,
        { status: status },
        {
          withCredentials: true,
        }
      );
      setPetById(res.data[0]);
      updateList();
      setStatusMessage(statusMessages[res.data[0].status]);
    } catch (err) {
      handleErrors(err);
    }
  };
  const handleSave = async (e, id, isSaved) => {
    try {
      e.stopPropagation(e);
      const res = !isSaved
        ? await axios.post(
            `${petsRoute}/${id}/save`,
            {},
            {
              withCredentials: true,
            }
          )
        : await axios.delete(`${petsRoute}/${id}/save`, {
            withCredentials: true,
          });
      updateList();
      return res.data;
    } catch (err) {
      handleErrors(err);
    }
  };

  const addPet = async (addPetInfo) => {
    try {
      const res = await axios.post(`${petsRoute}`, addPetInfo, {
        withCredentials: true,
      });
      return res;
    } catch (err) {
      handleAuthErr(err, () => clearCurrentUser(setCurrentUser), showModal);
      err.response.status === 401 && userErrMessage(err, setMessage);
      return err;
    }
  };
  const editPet = async (id, editPetInfo) => {
    try {
      const res = await axios.put(`${petsRoute}/${id}`, editPetInfo, {
        withCredentials: true,
      });
      updateList();
      setPetById(res.data);
      return res;
    } catch (err) {
      handleAuthErr(err, () => clearCurrentUser(setCurrentUser), showModal);
      err.response.status === 401 && userErrMessage(err, setMessage);
      return err;
    }
  };

  const searchPets = async (searchCriteria) => {
    try {
      setSearchQuery(searchCriteria);
      const res = await axios.get(`${petsRoute}`, {
        params: searchCriteria,
      });
      res.data.length
        ? setSearchResults(res.data)
        : setSearchResults(["notFound"]);
    } catch (err) {
      alert(`Error ${err.response.status}: ${err.response.data}`);
    }
  };
  const fetchUserPets = async (id) => {
    try {
      const res = await axios.get(`${petsRoute}/user/${id}`, {
        withCredentials: true,
      });
      res.data.userPets.length
        ? setUserPets(res.data.userPets)
        : setUserPets(["notFound"]);
      res.data.savedPets.length
        ? setUserSavedPets(res.data.savedPets)
        : setUserSavedPets(["notFound"]);
    } catch (err) {
      handleErrors(err);
    }
  };

  const fetchPetById = async (id) => {
    try {
      const res = await axios.get(`${petsRoute}/${id}`);
      setPetById(res.data[0]);
    } catch (err) {
      alert(`Error ${err.response.status}: ${err.response.data}`);
    }
  };

  const getPets = async (offset) => {
    try {
      const res = await axios.get(`${petsRoute}/all/${offset}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      handleErrors(err);
    }
  };

  return (
    <PetsContext.Provider
      value={{
        addPet,
        editPet,
        searchResults,
        fetchPetById,
        petById,
        searchPets,
        handleSave,
        handleStatus,
        fetchUserPets,
        userPets,
        userSavedPets,
        statusMessage,
        setStatusMessage,
        getPets,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
