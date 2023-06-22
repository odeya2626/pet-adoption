import React, { useState } from "react";
import PetsList from "../components/PetsList";
import { usePetsContext } from "../contexts/PetsContext";

export default function MyPets() {
  const { userPets, userSavedPets } = usePetsContext();
  const [isSavedPets, setIsSavedPets] = useState(false);

  return (
    <div className="container position-relative d-flex flex-column align-items-center justify-content-center mt-5">
      <h3 className="title">{isSavedPets ? "My Wishlist" : "My Pets"}</h3>
      <button
        className="btn position-absolute top-0 end-0"
        onClick={() => setIsSavedPets(!isSavedPets)}
      >
        {isSavedPets ? "My Pets" : "My Wishlist"}
      </button>
      {isSavedPets ? (
        <PetsList petsList={userSavedPets} isSavedPets={isSavedPets} />
      ) : (
        <PetsList petsList={userPets} />
      )}
    </div>
  );
}
