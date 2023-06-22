import React from "react";
import TableContainer from "../components/TableContainer";
import { usePetsContext } from "../contexts/PetsContext";

export default function PetsPage() {
  const { getPets } = usePetsContext();

  return <TableContainer getAll={getPets} title={"Pets"} />;
}
