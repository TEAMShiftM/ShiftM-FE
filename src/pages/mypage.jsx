import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Title,
  Label,
  Input,
  Button,
  Button2,
  Input2,
  RadioGroup,
  Button3,
  ErrorMessage,
  SuccessMessage,
} from "../styles/pages/mypage";
import { MemberAPI } from "../api/user/mypage";
import { tokenStorage } from "../utils/token";

const MyPage = () => {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    name: "",
    birthdate: "",
    gender: "",
    code: "",
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [emailChangeState, setEmailChangeState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  // 프로필 정보 로드
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const token = tokenStorage.getAccessToken();
        if (!token) {
          setError("로그인이 필요합니다.");
          return;
        }

        const response = await MemberAPI.ViewProfile();
        if (response.isSuccess) {
          setProfile({
            username: response.data.username || "",
            password: "",
            email: response.data.email || "",
            name: response.data.name || "",
            birthdate: response.data.birthdate || "",
            gender: response.data.gender || "male",
          });
        } else {
          setError(
            response.message || "프로필 정보를 불러오는데 실패했습니다."
          );
        }
      } catch (err) {
        setError("프로필 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  const handlePasswordChangeToggle = (e) => {
    if (e) e.preventDefault();
    setShowPasswordChange(!showPasswordChange);
    setError("");
    setSuccess("");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // 패스워드 유효성 검사
    if (profile.newPassword !== profile.confirmNewPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await MemberAPI.ChangePassword({
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword,
      });

      if (response.isSuccess) {
        setSuccess("비밀번호가 성공적으로 변경되었습니다.");
        setShowPasswordChange(false);
        setProfile({
          ...profile,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        setError(response.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      setError("비밀번호 변경에 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChangeClick = (e) => {
    if (e) e.preventDefault();
    if (emailChangeState === 0) {
      setEmailChangeState(1);
    } else {
      setEmailChangeState(0);
    }
    setError("");
    setSuccess("");
    setEmailVerified(false);
  };

  const handleEmailVerificationClick = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await MemberAPI.CheckEmail(profile.email);

      if (response.isSuccess) {
        setSuccess("인증 이메일이 전송되었습니다. 인증번호를 입력해주세요.");
        setEmailChangeState(2);
      } else {
        setError(response.message || "이메일 인증 요청에 실패했습니다.");
      }
    } catch (err) {
      setError("이메일 인증 요청에 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCodeVerification = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await MemberAPI.CheckEmailCode(
        profile.email,
        profile.code
      );

      if (response.isSuccess) {
        setSuccess("이메일 인증이 완료되었습니다.");
        setEmailVerified(true);
      } else {
        setError(response.message || "인증번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setError("인증번호 확인에 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await MemberAPI.ChangeProfile({
        email: profile.email,
        name: profile.name,
        birthdate: profile.birthdate,
        gender: profile.gender,
      });

      if (response.isSuccess) {
        setSuccess("프로필이 성공적으로 업데이트되었습니다.");
        setEmailChangeState(0);
      } else {
        setError(response.message || "프로필 업데이트에 실패했습니다.");
      }
    } catch (err) {
      setError("프로필 업데이트에 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>나의 프로필</Title>
        <form onSubmit={handleProfileUpdate}>
          <Label>아이디 *</Label>
          <Input
            type="text"
            name="username"
            value={profile.username}
            readOnly
          />

          {showPasswordChange ? (
            <>
              <Label>현재 비밀번호 *</Label>
              <Input2
                type="password"
                name="currentPassword"
                placeholder="현재 비밀번호를 입력해주세요"
                value={profile.currentPassword}
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
              <Button2
                type="button"
                onClick={handlePasswordChange}
                disabled={isLoading}
              >
                {isLoading ? "처리 중..." : "비밀번호 변경"}
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
                readOnly
                placeholder="••••••••"
              />
              <Button type="button" onClick={handlePasswordChangeToggle}>
                비밀번호 변경
              </Button>
            </>
          )}

          {/* 이메일 섹션: 상태에 따라 다른 UI 표시 */}
          <Label>이메일 *</Label>
          {emailChangeState === 0 && (
            <>
              <Input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly
              />
              <Button type="button" onClick={handleEmailChangeClick}>
                이메일 변경
              </Button>
            </>
          )}

          {emailChangeState === 1 && (
            <>
              <Input2
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                autoFocus
              />
              <Button2
                type="button"
                onClick={handleEmailVerificationClick}
                disabled={isLoading}
              >
                {isLoading ? "처리 중..." : "이메일 인증"}
              </Button2>
            </>
          )}

          {emailChangeState === 2 && (
            <>
              <Input2
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly
              />
              <Button2 type="button" onClick={handleEmailChangeClick}>
                이메일 변경
              </Button2>

              <Label>인증번호 *</Label>
              <Input2
                type="text"
                name="code"
                placeholder="인증번호를 입력해주세요"
                value={profile.code}
                onChange={handleChange}
                autoFocus
              />
              <Button2
                type="button"
                onClick={handleEmailCodeVerification}
                disabled={isLoading || emailVerified}
              >
                {isLoading
                  ? "처리 중..."
                  : emailVerified
                  ? "인증 완료"
                  : "확인"}
              </Button2>
            </>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

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
          <Button3 type="button">탈퇴하기</Button3>

          <Button2 type="submit" disabled={isLoading}>
            {isLoading ? "저장 중..." : "완료"}
          </Button2>
        </form>
      </Card>
    </Container>
  );
};

export default MyPage;
