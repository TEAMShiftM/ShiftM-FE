import React from "react";

const Button = ({ text, onClick, width="120px", height="60px", fontSize="20px", color = "blue" }) => {

  const colorStyles = {
    blue: { backgroundColor: "#0075ff", color: "white", border: "none", opacity: "0.7" },
    bblue: { backgroundColor: "#0075ff", color: "white", border: "none" }, // 진파랑
    white: { backgroundColor: "white", color: "#000000", border: "1px solid #007bff",opacity: "0.7" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        width,
        height,
        fontSize,
        borderRadius: "15px",
        cursor: "pointer",
        ...colorStyles[color], 
      }}
    >
      {text}
    </button>
  );
};

export default Button;
