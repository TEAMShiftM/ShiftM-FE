import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f7faff;
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 38px;
  margin-bottom: 40px;
  margin-top: 150px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 494px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: -43px;
`;

const Input = styled.input`
  width: 494px;
  height: 60px;
  font-size: 20px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  color: #0075ff;
  text-align: flex-start;
  margin-bottom: 50px;
  background-color: #F2F2F7;
`;

const SubmitButton = styled.button`
  width: 500px;
  height: 50px;
  background: #0075ff;
  color: white;
  font-size: 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
`;

const leaveData = [
  { id: 1, name: "연차 휴가" },
  { id: 2, name: "출산 휴가" },
  { id: 3, name: "특별 휴가" },
]

const EditLeaveType = () => {
  const { id } = useParams();
  const [leaveType, setLeaveType] = useState("");

  useEffect(() => {
    const foundLeaveType = leaveData.find((leave) => leave.id === Number(id));
    if (foundLeaveType) {
      setLeaveType(foundLeaveType.name);
    }
  }
  , [id]);

  return (
    <Container>
      <Title>연차 유형</Title>
        <FormGroup>
        <Label>이름 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Input
          placeholder="특별 휴가"
          type="text"
        />
        </FormGroup>
      <SubmitButton>완료</SubmitButton>
    </Container>
  );
};

export default EditLeaveType;