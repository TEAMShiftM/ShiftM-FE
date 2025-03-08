import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import "../styles/pages/FindPWForm.css";
import { useNavigate } from "react-router-dom";

const FindPWForm = () => {
    const navigate = useNavigate();

    return (
        <div className="find-pw">
            <Header showLogin={true} />
            <h1>비밀번호 찾기</h1>
            <div className="findpw-form">
                <Input placeholder="아이디를 입력해주세요" />
                <Input placeholder="이메일을 입력해주세요" />
                <Button onClick={() => navigate("/findpw/success")} className="pw" width="494px" height="73px" fontSize="24px" color="blue" text="비밀번호 찾기" />
                <button onClick={() => navigate("/findid/form")}>아이디 찾기</button>
            </div>
        </div>
    )
}

export default FindPWForm;