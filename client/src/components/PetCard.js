import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";
import "../css/PetCard.css";
import { useUsersContext } from "../contexts/UsersContext";
import { SaveBtn } from "./ActionBtn";

export default function PetCard(pet) {
  const { currentUser } = useUsersContext();
  const [isLoading, setIsLoading] = useState(true);
  const { id, name, status, img, ownerId } = pet.pet;
  const owner = ownerId === currentUser.id ? true : false;
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <Card
      onClick={() => navigate(`/pet?id=${id}`)}
      className="petCard bg-light-pink d-flex flex-column mb-3 position-relative pointer"
      style={{ maxWidth: "16rem", minWidth: "11rem" }}
    >
      <div className="status-label bg-light-brown position-absolute ps-2 pe-1 mt-2 twelve rounded-end">
        {status}
      </div>
      <img
        className={isLoading ? "hide rounded-top" : "rounded-top cardImg"}
        src={img}
        onLoad={() => setIsLoading(false)}
      />
      <Spinner className="red spinner position-absolute" hidden={!isLoading} />

      <Card.Body className="bg-light-brown rounded-bottom">
        <Card.Title className="d-flex align-items-center justify-content-between">
          <span>{name}</span>
          {owner && <span className="red fourteen">Yours!</span>}
        </Card.Title>
        <div>
          <div className="d-flex justify-content-end align-items-center gap-3 mt-2">
            {currentUser.id && <SaveBtn id={id} />}
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/pet?id=${id}`);
              }}
              className="py-1 btn"
            >
              Read More
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
