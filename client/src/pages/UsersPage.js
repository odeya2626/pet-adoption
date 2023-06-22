import React from "react";
import TableContainer from "../components/TableContainer";
import { useUsersContext } from "../contexts/UsersContext";

export default function UsersPage() {
  const { getAllUsers } = useUsersContext();
  return (
    <div>
      <TableContainer getAll={getAllUsers} title={"Users"} />
    </div>
  );
}
