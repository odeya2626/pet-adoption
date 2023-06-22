import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { usePetsContext } from "../contexts/PetsContext";

export function SaveBtn({ id, size = "" }) {
  const { handleSave, userSavedPets } = usePetsContext();
  const isSaved = userSavedPets.some(
    (savedPet) => savedPet.petId === Number(id)
  );
  return (
    <FontAwesomeIcon
      icon={isSaved ? faHeart : faRegularHeart}
      className={`pointer ${size}`}
      onClick={(e) => {
        handleSave(e, id, isSaved);
      }}
    />
  );
}
export function ChangeStatusBtn({ petId, name }) {
  const { handleStatus } = usePetsContext();
  const text = {
    Adopted: "Adopt",
    Fostered: "Foster",
    Available: "Return",
  };
  return (
    <button
      className="button w-100 h5 py-2 px-3"
      name={name}
      onClick={(e) => handleStatus(e, petId)}
    >
      {text[name]}
    </button>
  );
}
