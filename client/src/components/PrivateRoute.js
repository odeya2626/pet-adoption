import React from "react";
import { Navigate } from "react-router-dom";
import { useUsersContext } from "../contexts/UsersContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useUsersContext();
  return currentUser.id ? children : <Navigate to="/" />;
}
export function AdminRoute({ children }) {
  const { currentUser } = useUsersContext();
  return currentUser.isAdmin ? children : <Navigate to="access-denied" />;
}
