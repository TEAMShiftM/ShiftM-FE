import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import '../styles/pages/Success.css';

const PWSuccess = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
            };

    return (
        <div className="complete">
            <Header showLogin="true"/>
            <div className="complete-container">
                <img src="/sign_completed.png" alt="로고" />
                <span>회원님의 임시 비밀번호가 이메일로 전송되었습니다.</span>
                <Button onClick={handleLoginClick} width="494px" height="73px" fontSize="24px" text="로그인"/>
            </div>
        </div>
      

    )}  


export default PWSuccess;