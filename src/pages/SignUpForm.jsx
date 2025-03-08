import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import '../styles/pages/SignUpForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioButton from "../components/GenderRadio";
import ProgressBar from "../components/ProgressBar";


const SignUp2 = () => {
    const [gender, setGender] = useState("")

    const navigate = useNavigate();

    return (
        <div className="info-container">
            <Header className="info-header"/>
            <p className="info-title">회원가입</p>
            <div className="bar"><ProgressBar className='bar' currentStep={2} /></div>
            <div className="info-form">
                <div className="info-inputs">
                    <div className="info-input">
                        <label className="info-label">아이디 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="id" placeholder="아이디를 입력해주세요" />
                        <Button className='info-button' text="중복 확인" />
                    </div>
                    <div className="info-input">
                        <label className="info-label">비밀번호 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="password" placeholder="비밀번호를 입력해주세요" />
                    </div>
                    <div className="info-input">
                        <label className="info-label">비밀번호 확인 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="password" />
                    </div>
                    <div className="info-input">
                        <label className="info-label">회사 ID <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="id" placeholder="회사 ID를 입력해주세요" />
                    </div>
                    <div className="info-input">
                        <label className="info-label">이메일 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="email" placeholder="이메일을 입력해주세요" />
                        <Button className='info-button' text="인증" />
                    </div>
                    <div className="info-input">
                        <label className="info-label">인증번호 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="phone" placeholder="인증번호를 입력해주세요" />
                        <Button className='info-button' text="확인" size="verysmall" />
                    </div>
                    <div className="info-input">
                        <label className="info-label">이름 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <Input className='info-input-field' height="60px" fontSize="20px" type="text" placeholder="이름을 입력해주세요" />
                    </div>

                    <div className="info-input">
                        <label className="info-label">생년월일 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <div className="info-birth">
                            <Input className='info-input-field' width="130px" height="60px" fontSize="20px" type="number" placeholder="년" />
                            <Input className='info-input-field' width="130px" height="60px" fontSize="20px" type="number" placeholder="월" />
                            <Input className='info-input-field' width="130px" height="60px" fontSize="20px" type="number" placeholder="일" />
                        </div>
                    </div>
                    <div className="info-input">
                        <label className="info-label">성별 <span style={{ color: "#0075FFB2" }}>*</span></label>
                        <div className="radio"> 
                            <RadioButton id="male" name="gender" value="M" label="남성" 
                                        checked={gender === "M"} onChange={() => setGender("M")} />
                            <RadioButton id="female" name="gender" value="F" label="여성"
                                        checked={gender === "F"} onChange={() => setGender("F")} />
                        </div>
                    </div>
                </div>
                <div className="info-buttons">
                    <Button onClick={() => navigate("/signup/agree")} width="166px" height="60px" fontSize="20px" text="이전" color="white" />   
                    <Button onClick={() => navigate("/signup/success")} width="166px" height="60px" fontSize="20px" text="회원가입" size="sign" />
                </div>

            </div>
        </div>

)}

export default SignUp2;