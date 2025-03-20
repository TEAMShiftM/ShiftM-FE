import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import '../styles/pages/Success.css';

const IDSuccess = () => {
    const navigate = useNavigate();

    const handlePWFindClick = () => {
        navigate('/findpw/form');
            };

    return (
        <div className="complete">
            <Header showLogin="true"/>
            <div className="complete-container">
                <img src="/sign_completed.png" alt="로고" />
                <span>회원님의 아이디가 이메일로 전송되었습니다.</span>
                <div className="pwfind-button">
                    <Button onClick={handlePWFindClick} width="494px" height="73px" fontSize="24px" text="비밀번호 찾기"/>
                </div>
            </div>
        </div>
      

    )}  


export default IDSuccess;