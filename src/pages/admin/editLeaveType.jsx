import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LeaveTypeAPI } from "../../api/admin/leave-type";

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

const EditLeaveType = () => {
  const { id } = useParams();
  const [leaveType, setLeaveType] = useState("");

  useEffect(() => {
   
  }, [id]);

  const handleSubmit = async () => {
    if (!leaveType) {
      alert("연차 유형 이름을 입력해주세요.");
      return;
    }

    const res = await LeaveTypeAPI.editType(id, leaveType);
    if (res.isSuccess === false) {
      alert(res.message);
    } else {
      alert("연차 유형이 수정되었습니다.");
    }
  };

  return (
    <Container>
      <Title>연차 유형</Title>
      <FormGroup>
        <Label>이름 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Input
          placeholder="특별 휴가"
          type="text"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        />
      </FormGroup>
      <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
    </Container>
  );
};

export default EditLeaveType;
