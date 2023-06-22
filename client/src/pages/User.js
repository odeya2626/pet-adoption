import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetAvatar from "../components/PetAvatar";
import { useUsersContext } from "../contexts/UsersContext";

export default function User() {
  const navigate = useNavigate();
  const { getUserByIdFull, userInfoFull = "" } = useUsersContext();
  const userId = Number(new URLSearchParams(window.location.search).get("id"));
  useEffect(() => {
    getUserByIdFull(userId);
  }, []);

  const { firstName, lastName, email, phoneNumber, bio, pets } = userInfoFull;

  return (
    <div className="container d-flex align-items-center justify-content-center position-relative ">
      <div
        onClick={() => navigate(`/users`)}
        className="py-1 ms-2 button position-absolute start-0 top-0"
      >
        &laquo; Back
      </div>
      <div className="container d-flex flex-column justify-content-around w-75">
        {userInfoFull && (
          <>
            <div className="title h1 text-center mb-4">
              {firstName} {lastName}
            </div>
            <div className="d-flex flex-column align-items-start h3 gap-3">
              <div>
                <span className="green pe-2">Email:</span>
                <span>{email}</span>
              </div>
              <div>
                <span className="green pe-2">Phone:</span>
                <span>{phoneNumber}</span>
              </div>
              <div>
                <span className="green pe-2">Bio:</span>
                <span>{bio}</span>
              </div>
              <div className="green pe-2">User's Pets:</div>
              <div className="d-flex gap-3 flex-wrap">
                {pets.length === 0
                  ? "This user didn't adopt/foster any pets."
                  : pets.map((pet) => <PetAvatar key={pet.id} pet={pet} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
