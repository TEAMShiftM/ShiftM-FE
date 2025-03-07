import { useState } from "react";
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
  font-size: 32px;
  margin-bottom: 40px;
  margin-top: 100px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  color: #0075ff;
  text-align: flex-start;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

const SmallInput = styled.input`
  width: 150px;
  height: 50px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 16px;
  text-align: center;
  color: #0075ff;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  color: #0075ff;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
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

const TotalDays = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leavePeriods, setLeavePeriods] = useState([{ start: "", end: "" }]);

  const handlePeriodChange = (index, field, value) => {
    const newPeriods = [...leavePeriods];
    newPeriods[index][field] = value;
    setLeavePeriods(newPeriods);
  };

  const addPeriod = () => {
    setLeavePeriods([...leavePeriods, { start: "", end: "" }]);
  };

  const calculateTotalDays = () => {
    let totalDays = 0;
    leavePeriods.forEach(({ start, end }) => {
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        totalDays += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
    });
    return totalDays;
  };

  return (
    <Container>
      <Title>휴가 신청</Title>
      <FormGroup>
        <Label>연차 유형 *</Label>
        <Input
          type="text"
          placeholder="연차 유형을 선택해주세요"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>연차 기간 *</Label>
        {leavePeriods.map((period, index) => (
          <PeriodContainer key={index}>
            <SmallInput
              type="date"
              value={period.start}
              onChange={(e) =>
                handlePeriodChange(index, "start", e.target.value)
              }
            />
            <SmallInput
              type="date"
              value={period.end}
              onChange={(e) => handlePeriodChange(index, "end", e.target.value)}
            />
            <SmallInput type="text" placeholder="시간" readOnly />
          </PeriodContainer>
        ))}
        <AddButton onClick={addPeriod}>+ </AddButton>
      </FormGroup>

      <TotalDays>총 {calculateTotalDays()}일</TotalDays>
      <SubmitButton>신청</SubmitButton>
    </Container>
  );
};

export default LeaveRequest;
