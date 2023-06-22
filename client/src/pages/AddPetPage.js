import React from "react";
import PetForm from "../components/PetForm";

export default function AddPetPage() {
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3 className="title">Add a Pet</h3>
      <PetForm isEdit={false} />
    </div>
  );
}
