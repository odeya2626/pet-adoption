import React from "react";
import Form from "react-bootstrap/Form";

export default function StatusCheckbox({ handleCheckboxes }) {
  return (
    <div className="mb-2">
      <h6>Adoption Status:</h6>
      <div className="d-flex to-column-s">
        {["Available", "Adopted", "Fostered"].map((type) => (
          <Form.Check
            key={`default-${type}`}
            type="checkbox"
            name={type}
            value={type}
            id={type}
            htmlFor={type}
            label={type}
            onChange={(e) => {
              handleCheckboxes(e);
            }}
            className="me-3"
          />
        ))}
      </div>
    </div>
  );
}
