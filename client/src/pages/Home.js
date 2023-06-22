import React from "react";
import { useUsersContext } from "../contexts/UsersContext";
import homeImg from "../img/home.png";
import "../css/Home.css";

export default function Home() {
  const { currentUser, showModal } = useUsersContext();
  const userName = ` ${currentUser.firstName} ${currentUser.lastName}`;
  return (
    <div className="container user-select-none home-container d-flex justify-content-center align-items-center">
      <div className="d-flex to-column">
        <div className="home-description m-3">
          <h3 className="home-title display-5 m-0">Welcome to Petsie,</h3>
          <h3 className="display-5">{currentUser.firstName && userName}</h3>
          <h5 className="mt-4 fs-4 pt-5">
            Browse through our selection of pets, and find the perfect match for
            you.
          </h5>
          <h5 className="fs-4 fw-bold my-4">
            Change your life, change their life
          </h5>
          {!currentUser.id && (
            <button
              className="btn flex-self-end"
              onClick={() => showModal(true)}
            >
              Login/Signup
            </button>
          )}
        </div>
        <div className="container-img d-flex align-items-end">
          <img className="img-home m-2" src={homeImg} />
        </div>
      </div>
    </div>
  );
}
