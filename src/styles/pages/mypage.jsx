import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eff6ff;
  padding-top: 100px;
`;
export const Card = styled.div`
  width: 494px;
  margin-top: 65px;
`;
export const Title = styled.div`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 66px;
`;
export const Label = styled.label`
  display: block;
  font-size: 20px;
  margin-bottom: 11px;
  font-weight: 500;
  margin-top: 50px;
  width: 494px;
  margin-left: -40px;
`;
export const Input = styled.input`
  display: flex;
  width: 494px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 10px;
  background-color: #f2f2f7;
  font-size: 24px;
  padding-left: 20px;
`;
export const Button = styled.button`
  width: 494px;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #ffffff;
  color: ${({ primary }) => (primary ? "#ffffff" : "#2563eb")};
  border: 1px solid #0075ff;
  cursor: pointer;
  margin-top: 10px;
`;
export const Button2 = styled.button`
  width: 494px;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #0075ff;
  color: ${({ primary }) => (primary ? "#2563eb" : "#ffffff")};
  border: 1px solid #0075ff;
  cursor: pointer;
  margin-top: 10px;
`;
export const Input2 = styled.input`
  width: 494px;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #ffffff;
  color: ${({ primary }) => (primary ? "#ffffff" : "#2563eb")};
  border: 1px solid #0075ff;
  cursor: pointer;
  margin-top: 10px;
`;
export const RadioGroup = styled.div`
  display: flex;
  margin-left: -35px;
`;
export const Button3 = styled.button`
  width: 494px;
  height: 60px;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  border: none;
  background-color: #eff6ff;
  cursor: pointer;
  margin-top: 85px;
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
export const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 5px;
`;
