import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "../css/NavBar.css";

export default function AdminNavBar() {
  return (
    <div className="adminNav container d-flex align-items-center justify-content-start mt-1 py-2">
      <div>
        <NavLink
          activeclassname="active"
          className="adminNavItem h4 px-2 ms-3"
          to="/Users"
        >
          Users
        </NavLink>
        <NavLink
          activeclassname="active"
          className="adminNavItem h4 px-2 ms-3"
          to="/Pets"
        >
          Pets
        </NavLink>

        <NavLink
          activeclassname="active"
          className="adminNavItem h4 px-2 ms-3"
          to="/AddPet"
        >
          +Add a Pet
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
