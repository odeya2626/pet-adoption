import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminPages.css";

export default function PetAvatar({ pet }) {
  const { name, img, id } = pet;
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center">
      <img
        className="avatar pointer"
        alt="pet avatar"
        src={img}
        onClick={() => navigate(`/pet?id=${id}`)}
      />
      <div className="fw-bold">{name}</div>
    </div>
  );
}
