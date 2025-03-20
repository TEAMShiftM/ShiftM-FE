import React, { useState } from "react";
import styled from "styled-components";
import RadioButton from "../../components/GenderRadio";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eff6ff;
  padding-top: 100px;
`;

const Card = styled.div`
  width: 494px;
  margin-top: 65px;
`;

const Title = styled.div`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 66px;
`;

const Label = styled.label`
  display: block;
  font-size: 20px;
  margin-bottom: 11px;
  font-weight: 500;
  margin-top: 50px;
  width: 494px;
  margin-left: -40px;
`;

const Input = styled.input`
  display: flex;
  width: 494px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 10px;
  background-color: #F2F2F7;
  font-size: 24px;
  padding-left: 20px;
  color: #0075ff;
`;

const Input2 = styled.input`
  display: flex;
  width: 494px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 10px;
  background-color: #F2F2F7;
  font-size: 24px;
  padding-left: 20px;
  color:rgb(0, 0, 0);
`;


const Button2 = styled.button`
  width: 494px;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #0075ff;
  color: ${({ primary }) => (primary ? "#2563eb" : "#ffffff")};
  border: 1px solid #0075ff;
  cursor: pointer;
  margin-top: 10px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 74px;
`;


const Button3 = styled.button`
  width: 494px;
  height: 60px;
  text-align: left;
  font-size: 20px;
  font-weight: 500;
  border: none;
  background-color: #eff6ff;
  cursor: pointer;
  margin-top: 85px;
`;

const EmployeeProfile = () => {
  const [profile, setProfile] = useState({
    username: "shiftm",
    email: "shiftm@gmail.com",
    name: "홍길동",
    birthdate: "2000-01-01",
    gender: "male",
    date: "",
  });

  const [showEmailChange, setShowEmailChange] = useState(true);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const [gender, setGender] = useState("")

  return (
    <Container>
      <Card>
        <Title>김사원의 프로필</Title>
        <form>
          <Label>아이디 <span style={{ color: "#0075FFB2" }}>*</span></Label>
          <Input type="text" name="username" value={profile.username} readOnly/>
          {showEmailChange ? (
            <>
            <Label>이메일 <span style={{ color: "#0075FFB2" }}>*</span></Label>
            <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly
              />
            </>
          ) : 
            <>
            </>
          }

          <Label>이름 <span style={{ color: "#0075FFB2" }}>*</span></Label>
          <Input2
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <Label>생년월일 <span style={{ color: "#0075FFB2" }}>*</span></Label>
          <Input2
            type="date"
            name="birthdate"
            value={profile.birthdate}
            onChange={handleChange}
          />

          <Label>성별 <span style={{ color: "#0075FFB2" }}>*</span></Label>
          <RadioGroup>
            <RadioButton id="male" name="gender" value="M" label="남성"
              checked={profile.gender === "male" || profile.gender === "M"}
              onChange={() => setProfile({ ...profile, gender: "M" })} 
            />
            <RadioButton id="female" name="gender" value="F" label="여성"
              checked={profile.gender === "female" || profile.gender === "F"}
              onChange={() => setProfile({ ...profile, gender: "F" })} 
            />
          </RadioGroup>
          <Label>입사 날짜 <span style={{ color: "#0075FFB2" }}>*</span></Label>
          <Input2
            type="date"
            name="employeedate"
            value={profile.date}
            onChange={handleChange}
          />
          <Button3>삭제하기</Button3>

          <Button2>완료</Button2>
        </form>
      </Card>
    </Container>
  );
};

export default EmployeeProfile;