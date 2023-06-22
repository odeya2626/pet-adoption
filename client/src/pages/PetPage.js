import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ChangeStatusBtn, SaveBtn } from "../components/ActionBtn";
import { usePetsContext } from "../contexts/PetsContext";
import { useUsersContext } from "../contexts/UsersContext";
import "../css/PetPage.css";
import ToastMessage from "../components/Toast";

export default function PetPage() {
  const navigate = useNavigate();
  const { fetchPetById, petById, statusMessage, setStatusMessage } =
    usePetsContext();
  const { currentUser, showModal } = useUsersContext();
  const [options, setOptions] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const petId = searchParams.get("id");
  const admin = currentUser.isAdmin ? true : false;
  useEffect(() => {
    fetchPetById(petId);
    setStatusMessage("");
  }, []);

  const {
    type,
    name,
    status,
    img,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietary,
    breed,
    ownerId,
  } = petById;
  const owner = ownerId === currentUser.id ? true : false;
  const btnOptions = () => {
    const arr = [];
    if (currentUser.id === petById.ownerId) {
      petById.status === "Adopted"
        ? arr.push("Available", "Fostered")
        : arr.push("Available", "Adopted");
    } else {
      petById.status === "Available" && arr.push("Adopted", "Fostered");
      petById.status === "Fostered" && arr.push("Adopted");
    }
    return arr;
  };
  useEffect(() => {
    const arr = btnOptions();
    setOptions(arr);
  }, [petById]);

  return (
    <div className="container pet-page d-flex align-items-center justify-content-center position-relative mt-4">
      <ToastMessage
        message={statusMessage}
        className={statusMessage ? "fade-in pointer" : "fade-out"}
      />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="py-2 px-3 back ms-2 btn"
        >
          &laquo; Back
        </button>
        <div className="pet-main">
          <div className="d-flex align-items-center mb-2">
            {currentUser.id && <SaveBtn id={petId} size={"big-icon"} />}
            <span className="ps-2 title fw-bold display-4">Meet {name}</span>
          </div>
          <div className="d-flex pb-3 flex-column align-items-center justify-content-center">
            <img src={img} alt="pet" className="petImg" />
            {owner && (
              <div className="red fw-bold h4 mt-3">
                {name} is part of your family!
              </div>
            )}
          </div>
        </div>
        <div className=" gap-4 d-flex align-items-center justify-content-center to-column">
          <div className="ps-2 pt-2 d-flex flex-wrap align-items-center justify-content-start pet-details-container">
            <span className="h3 pet-details">
              <span className="fw-bold pe-2 ">Status:</span>
              <span className="black">{status}</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Type:</span>
              <span className="black">{type}</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Breed:</span>
              <span className="black">{breed}</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Color:</span>
              <span className="black">{color}</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Height:</span>
              <span className="black">{height} cm</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Weight:</span>
              <span className="black">{weight} kg</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Hypoallergenic:</span>
              <span className="black">
                {hypoallergenic === 1 ? "Yes" : "No"}
              </span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Dietary:</span>
              <span className="black">{dietary}</span>
            </span>
            <span className="pet-details h3">
              <span className="fw-bold pe-2">Bio:</span>
              <span className="black">{bio}</span>
            </span>
          </div>
        </div>
      </div>

      {currentUser.id && (
        <div className="d-flex flex-column justify-content-around m-2 gap-1 position-absolute top-0 end-0">
          {admin && (
            <button
              className="button  h5 py-2 px-3  w-100"
              onClick={() => showModal(true)}
            >
              <FontAwesomeIcon icon={faPen} className="me-3" />
              <span className="">Edit</span>
            </button>
          )}
          {options.map((option) => (
            <ChangeStatusBtn key={option} petId={petId} name={option} />
          ))}
        </div>
      )}
    </div>
  );
}
