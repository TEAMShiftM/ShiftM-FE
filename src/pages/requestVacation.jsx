import { useState } from "react";
import {
  Container,
  Title,
  FormGroup,
  Label,
  PeriodContainer,
  SmallInput,
  Box1,
  Box2,
  SmallInput2,
  Add,
  AddButton,
  TotalDays,
  Select,
  SubmitButton,
} from "../styles/pages/requesVaction";
import { LeaveAPI } from "../api/user/requestleave";

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leavePeriods, setLeavePeriods] = useState([{ start: "", end: "" }]);
  const [inputType, setInputType] = useState("text");
  const [loading, setLoading] = useState(false);
  const [memberId, setMemberId] = useState(null);

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
  const isSingleDay = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) === 0; // 시작일과 종료일이 같은 경우
  };

  const handleSubmit = async () => {
    if (
      !leaveType ||
      leavePeriods.some((period) => !period.start || !period.end)
    ) {
      alert("연차 유형과 기간을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await LeaveAPI.requestLeave(memberId);
      if (response.isuccess) {
        alert("연차 신청이 완료되었습니다.");
      } else {
        alert(`신청 실패: ${response.message}`);
      }
    } catch (error) {
      alert("연차 신청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>휴가 신청</Title>
      <FormGroup>
        <Label>연차 유형 *</Label>
        <Select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="" disabled>
            연차 유형을 선택해주세요
          </option>
          <option value="연차">연차</option>
          <option value="반차">반차</option>
          <option value="반반차">반반차</option>
        </Select>
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

            <SmallInput2 type="number" placeholder="시간" />
          </PeriodContainer>
        ))}
        <AddButton onClick={addPeriod}>
          <Add>+</Add>
          <Box1>연차 시작 기간</Box1>
          <Box1>연차 종료 기간</Box1>
          <Box2>시간</Box2>
        </AddButton>
      </FormGroup>

      <TotalDays>총 {calculateTotalDays()}일</TotalDays>
      <SubmitButton onClick={handleSubmit} disabled={loading}>
        {loading ? <p>신청 중 ... </p> : <p>신청 완료</p>}
      </SubmitButton>
    </Container>
  );
};

export default LeaveRequest;
