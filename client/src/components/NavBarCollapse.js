import React from "react";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavBarCollapse({
  currentUser,
  handleClick,
  showModal,
}) {
  return (
    <NavDropdown
      title={currentUser.firstName || "Login"}
      className="mx-3 navbar-collapse lg"
      id="collasible-nav-dropdown"
    >
      <NavLink to="/" className="dropdown-item">
        Home
      </NavLink>
      <NavLink to="/Search" className="dropdown-item">
        Search
      </NavLink>
      {currentUser.id && (
        <>
          <NavLink to="/Profile" className="dropdown-item">
            Profile
          </NavLink>
          <NavLink to="/MyPets" className="dropdown-item">
            My Pets
          </NavLink>
        </>
      )}
      <NavDropdown.Divider />
      {currentUser.id ? (
        <NavDropdown.Item onClick={handleClick} className="red">
          Sign Out
        </NavDropdown.Item>
      ) : (
        <NavDropdown.Item onClick={() => showModal(true)}>
          Login/Signup
        </NavDropdown.Item>
      )}
    </NavDropdown>
  );
}
