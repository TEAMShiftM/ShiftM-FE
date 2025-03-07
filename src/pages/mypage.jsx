import React, { useState } from "react";
import styled from "styled-components";

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
`;

const Input = styled.input`
  width: 494px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 10px;
  background-color: #f2f2f7;
  font-size: 24px;
  padding-left: 20px;
`;

const Button = styled.button`
  width: 494px;
  height: 60px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #ffffff;
  color: ${({ primary }) => (primary ? "#ffffff" : "#2563eb")};
  border: 1px solid #0075ff;
  cursor: pointer;
  margin-top: 10px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MyPage = () => {
  const [profile, setProfile] = useState({
    username: "shiftm",
    password: "",
    email: "shiftm@gmail.com",
    name: "홍길동",
    birthdate: "2000-01-01",
    gender: "male",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, " - ")
      .replace(/ /g, "");
  };

  return (
    <Container>
      <Card>
        <Title>나의 프로필</Title>
        <form>
          <Label>아이디 *</Label>
          <Input type="text" name="username" value={profile.username} />

          <Label>비밀번호 *</Label>
          <Input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
          <Button>비밀번호 변경</Button>

          <Label>이메일 *</Label>
          <Input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
          <Button>이메일 변경</Button>

          <Label>이름 *</Label>
          <Input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <Label>생년월일 *</Label>
          <Input
            type="date"
            name="birthdate"
            value={profile.birthdate}
            onChange={handleChange}
          />

          <Label>성별 *</Label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={profile.gender === "male"}
                onChange={handleChange}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={profile.gender === "female"}
                onChange={handleChange}
              />
              여성
            </label>
          </RadioGroup>

          <Button primary>완료</Button>
        </form>
      </Card>
    </Container>
  );
};

export default MyPage;
