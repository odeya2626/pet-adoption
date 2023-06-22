import React from "react";

export function InputText(props) {
  const { name, placeholder, handleChange, value, isRequired = true } = props;
  return (
    <div className="form-floating">
      <input
        type="text"
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        value={value !== "undefined" ? value : ""}
        required={isRequired}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}
export function InputEmail(props) {
  const { name, placeholder, handleChange, value } = props;
  return (
    <div className="form-floating">
      <input
        type="email"
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        value={value !== "undefined" ? value : ""}
        required
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}
export function InputTel(props) {
  const { handleChange, value } = props;
  return (
    <div className="form-floating">
      <input
        type="tel"
        className="form-control"
        id="phoneNumber"
        placeholder="Phone Number"
        name="phoneNumber"
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        title="Please provide a valid phone number with 10 digits"
        value={value !== "undefined" ? value : ""}
        required
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="phoneNumber">Phone Number</label>
    </div>
  );
}
export function InputPassword(props) {
  const { name, placeholder, handleChange, isRequired = true } = props;
  return (
    <div className="form-floating">
      <input
        type="password"
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        required={isRequired}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}
export function InputNumber(props) {
  const { name, placeholder, handleChange, value } = props;
  return (
    <div className="form-floating">
      <input
        type="number"
        className="form-control"
        id={name}
        placeholder={placeholder}
        name={name}
        min="0"
        max="100"
        value={value !== "undefined" ? value : ""}
        required
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}
export function Textarea({ name, placeholder, handleChange, value }) {
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder}
        rows={3}
        cols={3}
        value={value !== "undefined" ? value : ""}
        onChange={(e) => handleChange(e)}
      ></textarea>
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}
