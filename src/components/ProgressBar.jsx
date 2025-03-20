import React from "react";

const ProgressBar = ({ currentStep }) => {
  return (
    <div style={styles.container}>
      {/* 파란색 Active Bar */}
      <div
        style={{
          ...styles.activeBar,
          left: `${(currentStep - 1) * 33.3}%`, // 단계별 이동
        }}
      ></div>

      {/* 텍스트 고정 */}
      <span style={{ ...styles.text, ...(currentStep === 1 ? styles.activeText : {}) }}>
        이용약관 동의
      </span>
      <span style={{ ...styles.text, ...(currentStep === 2 ? styles.activeText : {}) }}>
        회원정보 입력
      </span>
      <span style={{ ...styles.text, ...(currentStep === 3 ? styles.activeText : {}) }}>
        회원가입 완료
      </span>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "1116px",
    height: "43px",
    backgroundColor: "#e5e5ea",
    borderRadius: "30px",
    overflow: "hidden", 
  },
  text: {
    flex: 1, 
    textAlign: "center",
    fontSize: "20px",
    color: "#000000B2",
    zIndex: 2, 
    position: "relative",
  },

  activeText: {
    color: "#ffffff",
  },

  activeBar: {
    position: "absolute",
    width: "33.3%", 
    height: "100%",
    color: "#ffffff",
    backgroundColor: "#0075ff",
    opacity: 0.7,
    borderRadius: "30px",
    transition: "left 0.3s ease-in-out", 
    zIndex: 1, 
  },
};

export default ProgressBar;
