import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import '../styles/pages/SignUpForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioButton from "../components/GenderRadio";
import ProgressBar from "../components/ProgressBar";
import { SignAPI } from '../api/user/signup.js';
import { MemberAPI } from "../api/user/mypage.js";

const SignUp2 = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [gender, setGender] = useState("");
    const [idCheckResult, setIdCheckResult] = useState(null);

    const navigate = useNavigate();

    const handleIdCheck = async () => {
        const res = await SignAPI.CheckId(id);
        if (res.isSuccess === false) {
            alert(res.message);
        } else if (res === true) {
            alert("사용 가능한 아이디입니다.");
            setIdCheckResult(true);
        } else {
            alert("이미 사용 중인 아이디입니다.");
            setIdCheckResult(false);
        }
    };

    const handleSignUp = async () => {
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const userData = {
            id,
            password,
            companyId,
            email,
            name,
            birthDate: `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`,
            gender,
        };

        const res = await SignAPI.Signup(userData);

        if (res.isSuccess === false) {
            alert(res.message);
        } else {
            navigate("/signup/success");
        }
    };

    return (
        <div className="info-container">
            <Header className="info-header" />
            <p className="info-title">회원가입</p>
            <div className="bar"><ProgressBar className='bar' currentStep={2} /></div>
            <div className="info-form">
                <div className="info-inputs">
                    <div className="info-input">
                        <label className="info-label">아이디 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="id" placeholder="아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)} />
                        <Button className='info-button' text="중복 확인" onClick={handleIdCheck} />
                    </div>
                    <div className="info-input">
                        <label className="info-label">비밀번호 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="info-input">
                        <label className="info-label">비밀번호 확인 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                    <div className="info-input">
                        <label className="info-label">회사 ID <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="id" placeholder="회사 ID를 입력해주세요" value={companyId} onChange={(e) => setCompanyId(e.target.value)} />
                    </div>
                    <div className="info-input">
                        <label className="info-label">이메일 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="email" placeholder="이메일을 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Button className='info-button' text="인증" 
                                onClick={async () => {
                                    const res = await MemberAPI.CheckEmail(email);
                                    if (res.isSuccess === false) {
                                        alert(res.message);
                                    } else {
                                        alert("인증번호가 전송되었습니다.");
                                    }
                                }}/>
                    </div>
                    <div className="info-input">
                        <label className="info-label">인증번호 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="phone" placeholder="인증번호를 입력해주세요" />
                        <Button className='info-button' text="확인" size="verysmall"
                                onClick={async () => {
                                    const res = await MemberAPI.CheckEmailCode(email, code);
                                    if (res.isSuccess === false) {
                                        alert(res.message);
                                    } else {
                                        alert("인증되었습니다.");
                                    }
                                }} />
                    </div>
                    <div className="info-input">
                        <label className="info-label">이름 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="text" placeholder="이름을 입력해주세요" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="info-input">
                        <label className="info-label">생년월일 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <div className="info-birth">
                            <Input className='info-input-field' width="130px" height="60px" fontSize="20px" type="number" placeholder="년" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
                            <Input className='info-input-field' width="130px" height="60px" fontSize="20px" type="number" placeholder="월" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} />
                            <Input className='info-input-field' width="130px" height="60px" fontSize="20px" type="number" placeholder="일" value={birthDay} onChange={(e) => setBirthDay(e.target.value)} />
                        </div>
                    </div>
                    <div className="info-input">
                        <label className="info-label">성별 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <div className="radio"> 
                            <RadioButton id="male" name="gender" value="M" label="남성" checked={gender === "M"} onChange={() => setGender("M")} />
                            <RadioButton id="female" name="gender" value="F" label="여성" checked={gender === "F"} onChange={() => setGender("F")} />
                        </div>
                    </div>
                </div>
                <div className="info-buttons">
                    <Button onClick={() => navigate("/signup/agree")} width="166px" height="60px" fontSize="20px" text="이전" color="white" />   
                    <Button onClick={handleSignUp} width="166px" height="60px" fontSize="20px" text="회원가입" size="sign" />
                </div>
            </div>
        </div>
    );
};

export default SignUp2;