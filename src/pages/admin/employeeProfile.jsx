import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RadioButton from "../../components/GenderRadio";
import { AdminMemberAPI } from "../../api/admin/member";

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
  color: #000000;
`;

const Input2 = styled.input`
  display: flex;
  width: 494px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 10px;
  background-color: #f2f2f7;
  font-size: 24px;
  padding-left: 20px;
  color: rgb(0, 0, 0);
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
  // Default profile if API fails
  const defaultProfile = {
    username: "shiftm",
    email: "shiftm@gmail.com",
    name: "홍길동",
    birthdate: "2000-01-01",
    gender: "male",
    date: "",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [apiConnected, setApiConnected] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(true);

  useEffect(() => {
    // Fetch the current profile data on mount
    const fetchProfile = async () => {
      try {
        const response = await AdminMemberAPI.Edit();
        if (response) {
          setProfile(response);
          setApiConnected(true);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setApiConnected(false);
        // Keep default profile if API fails
        setProfile(defaultProfile);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminMemberAPI.Edit(profile);
      alert("프로필이 수정되었습니다.");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await AdminMemberAPI.Delete(profile.username); // Assuming username is the memberId
        alert("프로필이 삭제되었습니다.");
      } catch (error) {
        console.error("Failed to delete profile:", error);
      }
    }
  };

  // Display title based on API connection status
  const profileTitle = apiConnected
    ? `${profile.name}의 프로필`
    : "김사원의 프로필";

  return (
    <Container>
      <Card>
        <Title>{profileTitle}</Title>
        <form onSubmit={handleSubmit}>
          <Label>
            아이디 <span style={{ color: "#0075FFB2" }}>*</span>
          </Label>
          <Input
            type="text"
            name="username"
            value={profile.username}
            readOnly
          />

          {showEmailChange && (
            <>
              <Label>
                이메일 <span style={{ color: "#0075FFB2" }}>*</span>
              </Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly
              />
            </>
          )}

          <Label>
            이름 <span style={{ color: "#0075FFB2" }}>*</span>
          </Label>
          <Input2
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />

          <Label>
            생년월일 <span style={{ color: "#0075FFB2" }}>*</span>
          </Label>
          <Input2
            type="date"
            name="birthdate"
            value={profile.birthdate}
            onChange={handleChange}
          />

          <Label>
            성별 <span style={{ color: "#0075FFB2" }}>*</span>
          </Label>
          <RadioGroup>
            <RadioButton
              id="male"
              name="gender"
              value="M"
              label="남성"
              checked={profile.gender === "male" || profile.gender === "M"}
              onChange={() => setProfile({ ...profile, gender: "M" })}
            />
            <RadioButton
              id="female"
              name="gender"
              value="F"
              label="여성"
              checked={profile.gender === "female" || profile.gender === "F"}
              onChange={() => setProfile({ ...profile, gender: "F" })}
            />
          </RadioGroup>

          <Label>
            입사 날짜 <span style={{ color: "#0075FFB2" }}>*</span>
          </Label>
          <Input2
            type="date"
            name="date"
            value={profile.date}
            onChange={handleChange}
          />

          <Button3 type="button" onClick={handleDelete}>
            삭제하기
          </Button3>
          <Button2 type="submit">완료</Button2>
        </form>
      </Card>
    </Container>
  );
};

export default EmployeeProfile;
