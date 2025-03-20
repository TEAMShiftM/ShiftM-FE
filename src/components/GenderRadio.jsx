import React from "react";
import "../styles/components/GenderRadio.css";

const RadioButton = ({ id, name, value, label, checked, onChange, size = "20px", color = "#0075FF" }) => {
  return (
    <div className="radio-container">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="custom-radio"
        style={{
          width: size,
          height: size,
          borderColor: color,
        }}
      />
      <label htmlFor={id} className="radio-label">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
