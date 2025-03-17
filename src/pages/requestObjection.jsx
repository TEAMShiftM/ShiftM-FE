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
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  width: 100%;
`;

const SmallInput = styled.input`
  width: 102px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  cursor: pointer;
`;

const DateTimeInput = styled.input`
  width: 377px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  color: #0075ff;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 25px;
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

const Objection = () => {
  const [objType, setObjType] = useState("");
  const [objDate, setObjDate] = useState([{ action: "", datetime: "" }]);
  const [dropdownIndex, setDropdownIndex] = useState(null);


  const handleSelect = (index, action) => {
    const newDate = [...objDate];
    newDate[index].action = action;
    setObjDate(newDate);
    setDropdownIndex(null); 
  };


  const handleDateChange = (index, value) => {
    const newDate = [...objDate];
    newDate[index].datetime = value;
    setObjDate(newDate);
  };

  return (
    <Container>
      <Title>이의 신청</Title>
      <FormGroup>
        <Label>
          이의 신청 유형 <span style={{ color: "#0075FFB2" }}>*</span>
        </Label>
        <Input
          type="text"
          placeholder="이의 신청 대상을 선택해주세요"
          value={objType}
          onChange={(e) => setObjType(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          이의 신청 내용 <span style={{ color: "#0075FFB2" }}>*</span>
        </Label>
        {objDate.map((period, index) => (
          <PeriodContainer key={index}>
            <div style={{ position: "relative" }}>
              <SmallInput
                type="text"
                readOnly
                placeholder="추가/수정"
                value={period.action}
                onClick={() => setDropdownIndex(index)}
              />
              <DropDownMenu open={dropdownIndex === index}>
                <DropDownItem onClick={() => handleSelect(index, "추가")}>
                  추가
                </DropDownItem>
                <DropDownItem onClick={() => handleSelect(index, "수정")}>
                  수정
                </DropDownItem>
              </DropDownMenu>
            </div>

            {/* 날짜 및 시간 입력 필드 */}
            <DateTimeInput
              type="datetime-local"
              value={period.datetime}
              onChange={(e) => handleDateChange(index, e.target.value)}
            />
          </PeriodContainer>
        ))}
      </FormGroup>

      <SubmitButton>신청</SubmitButton>
    </Container>
  );
};

export default Objection;
