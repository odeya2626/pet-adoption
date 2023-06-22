import React from "react";
import Form from "react-bootstrap/Form";

export default function SelectInput({
  handleSelect,
  name = "select",
  title,
  options,
  selected = "",
}) {
  return (
    <div>
      <Form.Select
        className="pointer form-select"
        name={name}
        onChange={(e) => {
          handleSelect(e);
        }}
        defaultValue={selected}
      >
        <option value="">{title}</option>
        {options.map((option) => (
          <option
            key={option.id ? option.id : option}
            value={option.id ? option.id : option}
          >
            {option.email ? option.email : option}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
