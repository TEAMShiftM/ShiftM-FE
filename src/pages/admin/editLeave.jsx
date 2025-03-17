import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

// 연차 유형 데이터
const leaveData = [
  {
    id: 1,
    name: "연차 휴가",
    date: "2026년 3월 2일",
    count: 12,
  },
  {
    id: 2,
    name: "출산 휴가",
    date: "2026년 3월 2일",
    count: 60,
  },
  {
    id: 3,
    name: "특별 휴가",
    date: "2026년 3월 2일",
    count: 9,
  },
];

const Container = styled.div`
  background-color: #f7faff;
  width: 100%;
  height: 120vh;
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
  color: black;
  text-align: flex-start;
  margin-bottom: 50px;
  background-color: #F2F2F7;
`;

const Input2 = styled.input`
  width: 380px;
  height: 60px;
  font-size: 20px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  color: black;
  text-align: flex-start;
  margin-bottom: 50px;
  background-color: #F2F2F7;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RadioGroup = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: #0075ff;
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

const EditLeave = () => {
  const [unlimited, setUnlimited] = useState(false);
  
  const { id } = useParams();
  const foundLeave = leaveData.find((leave) => leave.id === Number(id));
  const [leaveType, setLeaveType] = useState(foundLeave ? foundLeave.name : "");
  const [leaveDate, setLeaveDate] = useState(foundLeave ? foundLeave.date : "");
  const [leaveCount, setLeaveCount] = useState(foundLeave ? foundLeave.count : "");

  return (
    <Container>
      <Title>연차 유형</Title>
        <FormGroup>
        <Label>연차 유형 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Input
          placeholder="연차 유형을 선택해주세요"
          type="text"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        />
        <Label>유효 날짜 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Group>
          <Input2
            placeholder="유효 날짜"
            type="text"
            disabled={unlimited}
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
          />
          <RadioGroup>
            <input 
              type="checkbox" 
              id="unlimited" 
              checked={unlimited} 
              onChange={() => setUnlimited(!unlimited)} 
            />
            <RadioLabel htmlFor="unlimited">무기한</RadioLabel>
          </RadioGroup>
          </Group>
        <Label>연차 개수 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Input
          placeholder="연차 개수를 입력해주세요"
          type="text"
          value={leaveCount}
          onChange={(e) => setLeaveCount(e.target.value)}
        />
        <Label>대상 직원 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Input
          placeholder="김직원"
          type="text"

        />
        </FormGroup>
      <SubmitButton>완료</SubmitButton>
    </Container>
  );
};

export default EditLeave;