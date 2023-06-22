import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrPageFormat({ img, title, text }) {
  const navigate = useNavigate();
  return (
    <div className="container full-height d-flex align-items-center justify-content-center position-relative ">
      <div
        onClick={() => navigate(-1)}
        className="py-1 ms-2 button twelve position-absolute start-0 top-0"
      >
        &laquo; Back
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-items-center">
        <img src={img} className="err-pet" alt="not found" />
        <div className="title h1 mt-4 fw-bold">{title}</div>
        <div className="mt-4 h2 text-center">{text}</div>
      </div>
    </div>
  );
}
