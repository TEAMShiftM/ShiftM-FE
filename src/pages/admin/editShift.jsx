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

const DropDownMenu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #0075ff;
  border-radius: 8px;
  width: 180px;
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 10;
`;

const DropDownItem = styled.div`
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const EditShift = () => {
  const [editType, setEditType] = useState([{ action: "" }]);
  const [leavePeriods, setLeavePeriods] = useState([{ start: "", hour: "", minute: "", action: "" }]);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleSelect = (index, action) => {
    const newEditType = [...editType];
    newEditType[index] = { action };
    setEditType(newEditType);

    // leavePeriods에도 action 필드 추가
    const newPeriods = [...leavePeriods];
    newPeriods[index].action = action;
    setLeavePeriods(newPeriods);

    setDropdownIndex(null);
  };

  const handlePeriodChange = (index, field, value) => {
    const newPeriods = [...leavePeriods];
    newPeriods[index][field] = value;
    setLeavePeriods(newPeriods);

    let newValue = value.replace(/\D/g, "");

    if (field === "hour") {
      newValue = Math.min(23, Math.max(0, Number(newValue))); // 0~23 범위 제한
    } else if (field === "minute") {
      newValue = Math.min(59, Math.max(0, Number(newValue))); // 0~59 범위 제한
    }
  };

  return (
    <Container>
      <Title>근무 기록 수정</Title>
      <FormGroup>
        <Label>수정 대상 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        <Input placeholder="김사원의 2025년 3월 1일 출근 기록" readOnly />
      </FormGroup>

      <FormGroup>
        <Label>수정 시간 <span style={{ color: "#0075FFB2" }}>*</span></Label>
        {leavePeriods.map((period, index) => (
          <PeriodContainer key={index}>
            <SmallInput2
              type="text"
              readOnly
              placeholder="수정/삭제"
              value={period.action}  // leavePeriods에서 값 가져오기
              onClick={() => setDropdownIndex(index)}
            />
            <DropDownMenu open={dropdownIndex === index}>
              <DropDownItem onClick={() => handleSelect(index, "수정")}>
                수정
              </DropDownItem>
              <DropDownItem onClick={() => handleSelect(index, "삭제")}>
                삭제
              </DropDownItem>
            </DropDownMenu>
            <SmallInput
              type="number"
              value={period.hour}
              placeholder="시"
              min="0"
              max="23"
              onChange={(e) => handlePeriodChange(index, "hour", e.target.value)}
            />
            <SmallInput
              type="number"
              value={period.minute}
              placeholder="분"
              min="0"
              max="59"
              onChange={(e) => handlePeriodChange(index, "minute", e.target.value)}
            />
          </PeriodContainer>
        ))}
      </FormGroup>
      <SubmitButton>수정</SubmitButton>
    </Container>
  );
};

export default EditShift;