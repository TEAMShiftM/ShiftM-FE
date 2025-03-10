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
  width: 494px;
  margin-left: -40px;
`;

const Input = styled.input`
  display: flex;
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

const Input2 = styled.input`
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
  margin-left: -35px;
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

const MyPage = () => {
  const [profile, setProfile] = useState({
    username: "shiftm",
    password: "",
    email: "shiftm@gmail.com",
    name: "홍길동",
    birthdate: "2000-01-01",
    gender: "male",
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);

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

  const handlePasswordChangeToggle = () => {
    setShowPasswordChange(!showPasswordChange);
  };

  const handleEmailChangeToggle = () => {
    setShowEmailChange(!showEmailChange);
  };

  return (
    <Container>
      <Card>
        <Title>나의 프로필</Title>
        <form>
          <Label>아이디 *</Label>
          <Input type="text" name="username" value={profile.username} />

          {showPasswordChange ? (
            <>
              <Label>현재 비밀번호 *</Label>
              <Input2
                type="password"
                name="currentPassword"
                placeholder="현재 비밀번호를 입력해주세요"
                onChange={handleChange}
              />

              <Label>새 비밀번호 *</Label>
              <Input2
                type="password"
                name="newPassword"
                placeholder="새 비밀번호를 입력해주세요"
                value={profile.newPassword}
                onChange={handleChange}
              />

              <Label>새 비밀번호 확인 *</Label>
              <Input2
                type="password"
                name="confirmNewPassword"
                placeholder="새 비밀번호를 다시 입력해주세요"
                value={profile.confirmNewPassword}
                onChange={handleChange}
              />
              <Button2 onClick={handlePasswordChangeToggle}>
                비밀번호 변경
              </Button2>
            </>
          ) : (
            <>
              <Label>비밀번호 *</Label>
              <Input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
              />
              <Button onClick={handlePasswordChangeToggle}>
                비밀번호 변경
              </Button>
            </>
          )}

          {showEmailChange ? (
            <>
              <Label>이메일 *</Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
              <Button>이메일 변경</Button>

              <Label>인증번호 *</Label>
              <Input
                type="code"
                name="code"
                value={profile.code}
                onChange={handleChange}
              />
              <Button2 onClick={handleEmailChangeToggle}>확인</Button2>
            </>
          ) : (
            <>
              <Label>이메일 *</Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
              <Button onClick={handleEmailChangeToggle}>이메일 변경</Button>
            </>
          )}

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
          <Button3>탈퇴하기</Button3>

          <Button2>완료</Button2>
        </form>
      </Card>
    </Container>
  );
};

export default MyPage;
