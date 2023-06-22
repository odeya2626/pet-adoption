import React from "react";
import SearchForm from "../components/SearchForm";
import PetsList from "../components/PetsList";
import { usePetsContext } from "../contexts/PetsContext";

export default function Search() {
  const { searchResults } = usePetsContext();
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <SearchForm />
      <PetsList petsList={searchResults} />
    </div>
  );
}
