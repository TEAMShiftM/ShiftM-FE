import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import '../styles/pages/SignUpSuccess.css';
import ProgressBar from "../components/ProgressBar";

const SignUp3 = () => {
    const navigate = useNavigate();

    return (
        <div className="success-container">
            <Header />
            <div className="success">
                <p className="title">회원가입</p>
                <div className="bar"><ProgressBar className='bar' currentStep={3} /></div>
                <div className="logo">
                    <img src="/sign_completed.png" alt="로고" />
                </div>
                <span>회원가입이 완료되었습니다.</span>
                <div className="login-button">
                    <Button onClick={() => navigate("/login")} width="356px" height="60px" fontSize="24px" text="로그인"/>
                </div>
            </div>
            
        </div>
      

    )}  


export default SignUp3;