import { useState } from "react";
import styled from "styled-components";
import { AdminCompanyAPI } from "../../api/admin/company";

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
  color: black;
  text-align: flex-start;
  margin-bottom: 50px;
  ::placeholder {
    color: #0075ff;
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
  color: black;
  margin-bottom: 50px;
  ::placeholder {
    color: #0075ff;
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

const StatusMessage = styled.div`
  margin-top: 20px;
  color: ${(props) => (props.isError ? "red" : "green")};
  font-size: 16px;
`;

const CreateCompany = () => {
  const [companyNumber, setCompanyNumber] = useState("");
  const [leaveWorks, setLeaveWorks] = useState([{ start: "", end: "" }]);
  const [leaveBreaks, setLeaveBreaks] = useState([{ start: "", end: "" }]);
  const [inputType, setInputType] = useState("time");
  const [status, setStatus] = useState({ message: "", isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    // Form validation
    if (!companyNumber) {
      setStatus({ message: "회사 번호를 입력해주세요", isError: true });
      return;
    }

    if (!leaveWorks[0].start || !leaveWorks[0].end) {
      setStatus({ message: "근무 시간을 입력해주세요", isError: true });
      return;
    }

    if (!leaveBreaks[0].start || !leaveBreaks[0].end) {
      setStatus({ message: "휴게 시간을 입력해주세요", isError: true });
      return;
    }

    // Prepare data for API
    const companyData = {
      companyNumber,
      workHours: leaveWorks.map((work) => ({
        start: work.start,
        end: work.end,
      })),
      breakHours: leaveBreaks.map((breakTime) => ({
        start: breakTime.start,
        end: breakTime.end,
      })),
    };

    setIsSubmitting(true);
    setStatus({ message: "", isError: false });

    try {
      const response = await AdminCompanyAPI.Company(companyData);
      setStatus({
        message: "회사 정보가 성공적으로 등록되었습니다",
        isError: false,
      });
      // Optional: Reset form after successful submission
      // setCompanyNumber("");
      // setLeaveWorks([{ start: "", end: "" }]);
      // setLeaveBreaks([{ start: "", end: "" }]);
    } catch (error) {
      setStatus({
        message:
          error.message || "회사 정보 등록에 실패했습니다. 다시 시도해주세요",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
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
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          근무 시간 <span style={{ color: "#0075FFB2" }}>*</span>
        </Label>
        {leaveWorks.map((work, index) => (
          <PeriodContainer key={index}>
            <SmallInput
              type="time"
              value={work.start}
              placeholder="출근 시간"
              onChange={(e) => handleWorkChange(index, "start", e.target.value)}
            />
            <SmallInput
              type="time"
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
              type="time"
              value={breakTime.start}
              placeholder="시작 시간"
              onChange={(e) =>
                handleBreakChange(index, "start", e.target.value)
              }
            />
            <SmallInput
              type="time"
              value={breakTime.end}
              placeholder="종료 시간"
              onChange={(e) => handleBreakChange(index, "end", e.target.value)}
            />
          </PeriodContainer>
        ))}
      </FormGroup>

      {status.message && (
        <StatusMessage isError={status.isError}>{status.message}</StatusMessage>
      )}

      <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "처리 중..." : "완료"}
      </SubmitButton>
    </Container>
  );
};

export default CreateCompany;
