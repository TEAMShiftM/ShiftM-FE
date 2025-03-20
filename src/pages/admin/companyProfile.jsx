import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f7faff;
  width: 100%;
  height: 110vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 32px;
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
  margin-bottom: 11px;
  margin-left: -35px;
`;

const Input = styled.input`
  width: 494px;
  height: 60px;
  font-size: 20px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  color: black; /* 입력 시 검정색 */
  text-align: flex-start;
  margin-bottom: 50px;
  ::placeholder {
    color: #0075ff; /* 플레이스홀더 색상 유지 */
  }
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 34px;
  align-items: center;
  width: 100%;
`;

const SmallInput = styled.input`
  width: 230px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: black; /* 입력 시 검정색 */
  margin-bottom: 50px;
  ::placeholder {
    color: #0075ff; /* 플레이스홀더 색상 유지 */
  }
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

const CreateCompany = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leaveWorks, setLeaveWorks] = useState([{ start: "", end: "" }]);
  const [leaveBreaks, setLeaveBreaks] = useState([{ start: "", end: "" }]);
  const [inputType, setInputType] = useState("text");

  const handleWorkChange = (index, field, value) => {
    const newWorks = [...leaveWorks];
    newWorks[index][field] = value;
    setLeaveWorks(newWorks);
  };

  const handleBreakChange = (index, field, value) => {
    const newBreaks = [...leaveBreaks];
    newBreaks[index][field] = value;
    setLeaveBreaks(newBreaks);
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
  };

  return (
    <Container>
      <Title>회사 프로필</Title>
      <FormGroup>
        <Label>
          회사 번호 <span style={{ color: "#0075FFB2" }}>*</span>
        </Label>
        <Input
          type="number"
          placeholder="회사 번호를 입력해주세요"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          근무 시간 <span style={{ color: "#0075FFB2" }}>*</span>
        </Label>
        {leaveWorks.map((work, index) => (
          <PeriodContainer key={index}>
            <SmallInput
              type="time" // 항상 24시간 형식 유지
              value={work.start}
              placeholder="출근 시간"
              onChange={(e) => handleWorkChange(index, "start", e.target.value)}
            />
            <SmallInput
              type="time" // 항상 24시간 형식 유지
              value={work.end}
              placeholder="퇴근 시간"
              onChange={(e) => handleWorkChange(index, "end", e.target.value)}
            />
          </PeriodContainer>
        ))}
      </FormGroup>
      <FormGroup>
        <Label>
          휴게 시간 <span style={{ color: "#0075FFB2" }}>*</span>
        </Label>
        {leaveBreaks.map((breakTime, index) => (
          <PeriodContainer key={index}>
            <SmallInput
              type={inputType}
              value={breakTime.start}
              onFocus={() => setInputType("time")}
              onBlur={() => !breakTime.start && setInputType("time")}
              placeholder="시작 시간"
              onChange={(e) =>
                handleBreakChange(index, "start", e.target.value)
              }
            />
            <SmallInput
              type={inputType}
              value={breakTime.end}
              onFocus={() => setInputType("time")}
              onBlur={() => !breakTime.end && setInputType("time")}
              placeholder="종료 시간"
              onChange={(e) => handleBreakChange(index, "end", e.target.value)}
            />
          </PeriodContainer>
        ))}
      </FormGroup>
      <SubmitButton>완료</SubmitButton>
    </Container>
  );
};

export default CreateCompany;
