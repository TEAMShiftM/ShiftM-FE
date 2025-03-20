import { useState, useEffect } from "react";

const RememberMeToggle = ({ onToggle }) => {
  const [remember, setRemember] = useState(
    JSON.parse(localStorage.getItem("rememberMe")) || false
  );

  useEffect(() => {
    localStorage.setItem("rememberMe", JSON.stringify(remember));
    if (onToggle) {
      onToggle(remember);
    }
  }, [remember, onToggle]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        onClick={() => setRemember(!remember)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: "1px solid #0075ff",
          opacity: "0.7",
          backgroundColor: remember ? "#007bff" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
        }}
      >
      </button>
      <span style={{ fontSize: "20px", color: "#000000", opacity: "0.7" }}>로그인 상태 유지</span>
    </div>
  );
};

export default RememberMeToggle;
