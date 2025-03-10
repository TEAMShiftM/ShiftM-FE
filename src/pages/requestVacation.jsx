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
  width: 494px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  margin-left: -35px;
`;

const Input = styled.input`
  width: 494px;
  height: 60px;
  font-size: 20px;
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
  width: 180px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
`;

const Box1 = styled.div`
  width: 180px;
  height: 60px;
  border: 1px solid #0075ff;
  background-color: #f2f2f7;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  margin-right: 5px;
  margin-left: 10px;
  text-align: left;
  align-items: center;
  padding-left: 10px;
`;

const Box2 = styled.div`
  width: 102px;
  height: 60px;
  border: 1px solid #0075ff;
  background-color: #f2f2f7;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  padding-left: 10px;
`;

const SmallInput2 = styled.input`
  width: 102px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  color: #0075ff;
  font-size: 40px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: -40px;
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
  margin-left: -430px;
`;

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leavePeriods, setLeavePeriods] = useState([{ start: "", end: "" }]);
  const [inputType, setInputType] = useState("text");

  const handlePeriodChange = (index, field, value) => {
    const newPeriods = [...leavePeriods];
    newPeriods[index][field] = value;
    setLeavePeriods(newPeriods);
  };

  const enableLastPeriod = (index) => {
    const newPeriods = [...leavePeriods];
    newPeriods[index].enabled = true;
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
              type={inputType}
              value={period.start}
              onFocus={() => setInputType("date")}
              onBlur={() => !period.start && setInputType("text")}
              placeholder="연차 시작 기간"
              onChange={(e) =>
                handlePeriodChange(index, "start", e.target.value)
              }
            />
            <SmallInput
              type={inputType}
              value={period.end}
              onFocus={() => setInputType("date")}
              onBlur={() => !period.end && setInputType("text")}
              placeholder="연차 종료 기간"
              onChange={(e) => handlePeriodChange(index, "end", e.target.value)}
            />
            <SmallInput2 type="text" placeholder="시간" readOnly />
          </PeriodContainer>
        ))}
        <AddButton onClick={addPeriod}>
          +<Box1>연차 시작 기간</Box1>
          <Box1>연차 종료 기간</Box1>
          <Box2>시간</Box2>
        </AddButton>
      </FormGroup>

      <TotalDays>총 {calculateTotalDays()}일</TotalDays>
      <SubmitButton>신청</SubmitButton>
    </Container>
  );
};

export default LeaveRequest;
