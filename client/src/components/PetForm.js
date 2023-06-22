import React, { useEffect, useState } from "react";
import "../css/Form.css";
import SelectInput from "./SelectInput";
import Form from "react-bootstrap/Form";
import { InputNumber, InputText, Textarea } from "./Inputs";
import { usePetsContext } from "../contexts/PetsContext";
import { useUsersContext } from "../contexts/UsersContext";
import { Spinner } from "react-bootstrap";

export default function AddPetForm({ isEdit }) {
  const { addPet, petById, editPet } = usePetsContext();
  const { users, getAllUsers } = useUsersContext();
  const { id, created_at, ...rest } = petById;
  const initialPetInfo = isEdit ? rest : {};
  const [message, setMessage] = useState("");
  const [petInfo, setPetInfo] = useState(initialPetInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "hypoallergenic") {
      setPetInfo({ ...petInfo, [e.target.name]: e.target.checked });
    } else if (e.target.id === "img") {
      setPetInfo({ ...petInfo, img: e.target.files[0] });
    } else {
      setPetInfo({ ...petInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petInfo.type) {
      setMessage("Please select a type of animal");
      return;
    }
    if (!petInfo.status) {
      setMessage("Please select the status of the animal");
      return;
    }
    setIsLoading(true);
    petInfo.status === "Available" && (petInfo.ownerId = null);
    const addPetInfo = new FormData();
    for (const key in petInfo) {
      addPetInfo.append(key, petInfo[key]);
    }
    if (isEdit) {
      const petEdited = await editPet(petById.id, addPetInfo);
      setIsLoading(false);
      if (petEdited.status !== 200) {
        setMessage(petEdited.response.data);
        return;
      }
      setMessage("Pet was edited successfully");
    } else {
      const petAdded = await addPet(addPetInfo);
      setIsLoading(false);
      if (petAdded.status !== 200) {
        console.log(petAdded);
        setMessage(petAdded.response.data);
        return;
      }
      setMessage("Pet was added successfully");
      setPetInfo({
        type: "",
        name: "",
        status: "Available",
        img: "",
        height: "",
        weight: "",
        color: "",
        hypoallergenic: false,
        dietary: "",
        breed: "",
        bio: "",
        img: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setMessage("")}
      className="d-flex flex-column align-items-center w-100"
    >
      <div className="w-75">
        <div className="form-floating  mb-3 mt-3">
          <InputText
            name={"name"}
            placeholder={"Pet's Name"}
            handleChange={handleChange}
            value={petInfo.name}
          />
          <SelectInput
            handleSelect={handleChange}
            name={"type"}
            title={"Animal Type"}
            options={["Dog", "Cat", "Other"]}
            selected={petInfo.type}
          />
          <InputText
            name={"color"}
            placeholder={"Color"}
            handleChange={handleChange}
            value={petInfo.color}
          />
          <InputText
            name={"dietary"}
            placeholder={"Dietary"}
            handleChange={handleChange}
            value={petInfo.dietary}
          />
          <InputText
            name={"breed"}
            placeholder={"Breed"}
            handleChange={handleChange}
            value={petInfo.breed}
          />
          <InputNumber
            name={"height"}
            placeholder={"Height (cm)"}
            handleChange={handleChange}
            value={petInfo.height}
          />
          <InputNumber
            name={"weight"}
            placeholder={"Weight (kg)"}
            handleChange={handleChange}
            value={petInfo.weight}
          />
          <Textarea
            name={"bio"}
            placeholder={"Bio"}
            handleChange={handleChange}
            value={petInfo.bio}
          />
          <SelectInput
            handleSelect={handleChange}
            name={"status"}
            title={"Adoption Status"}
            options={["Available", "Fostered", "Adopted"]}
            selected={petInfo.status}
          />
          {petInfo.status !== "Available" && (
            <SelectInput
              handleSelect={handleChange}
              name={"ownerId"}
              title={"Owner's Email"}
              options={users}
              selected={petInfo.ownerId}
            />
          )}
          <Form.Check
            type="checkbox"
            name="hypoallergenic"
            label="hypoallergenic"
            id="hypoallergenic"
            htmlFor="hypoallergenic"
            className="me-3 my-2"
            defaultChecked={petInfo.hypoallergenic}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input type="file" id="img" accept="img/*" onChange={handleChange} />
          <div className="d-flex justify-content-between align-items-center mb-3 mt-3 gap-3">
            <span
              className={
                message.includes("success") ? "text-success" : "text-danger"
              }
            >
              {message}
            </span>
            <div className="d-flex align-items-center">
              <Spinner className="red me-3" hidden={!isLoading} />
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
