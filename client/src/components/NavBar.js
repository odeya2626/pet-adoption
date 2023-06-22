import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUsersContext } from "../contexts/UsersContext";

import "../css/NavBar.css";
import AdminNavBar from "./AdminNavBar";
import NavBarCollapse from "./NavBarCollapse";

export default function NavBar() {
  const navigate = useNavigate();
  const { currentUser, handleSignOut, showModal } = useUsersContext();
  const admin = currentUser.isAdmin ? true : false;
  const handleClick = (e) => {
    e.preventDefault();
    const signedOut = handleSignOut();
    if (signedOut) {
      navigate("/");
    }
  };

  return (
    <div className="mb-2 user-select-none">
      <div className="navBar d-flex align-items-center justify-content-between py-2">
        <div className="siteName ms-3 logo">Petsie</div>
        <div>
          <NavLink activeclassname="active" className="navItem ms-3" to="/">
            Home
          </NavLink>
          <NavLink
            activeclassname="active"
            className="navItem ms-3"
            to="/Search"
          >
            Search
          </NavLink>

          {currentUser.id && (
            <>
              <NavLink
                activeclassname="active"
                className="navItem ms-3"
                to="/Profile"
              >
                Profile
              </NavLink>
              <NavLink
                activeclassname="active"
                className="navItem ms-3"
                to="/MyPets"
              >
                My Pets
              </NavLink>
            </>
          )}
        </div>
        {currentUser.id ? (
          <div className="button btn-register ms-3 me-2" onClick={handleClick}>
            Sign Out
          </div>
        ) : (
          <div
            className="button btn-register ms-3 me-2"
            onClick={() => showModal(true)}
          >
            Login/Signup
          </div>
        )}
        <NavBarCollapse {...{ currentUser, handleClick, showModal }} />
      </div>
      {admin && <AdminNavBar />}
      <Outlet />
    </div>
  );
}
