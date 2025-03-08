import React from "react";
import '../styles/components/Input.css';

const Input = ({type="text", placeholder="", value, onChange, width="494px", height="73px", fontSize="24px", color="white",
    }) => {

    // 색상별 스타일
    const colorStyle = {
        white: {backgroundColor: "white", color: "#0075FFB2"},
        gray: {backgroundColor: "#F2F2F7", color: "white"},
    };

    return (
        <div>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                width,
                height,
                fontSize,
                border: "1px solid #0075FFB2",
                borderRadius: "15px",
                ...colorStyle[color],
            }}
        />
        </div>
    );
};

export default Input;