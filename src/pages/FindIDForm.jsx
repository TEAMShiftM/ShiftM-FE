import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import "../styles/pages/FindIDForm.css";
import { useNavigate } from "react-router-dom";

const FindIDForm = () => {
    const navigate = useNavigate();

    return (
        <div className="find-id">
            <Header showLogin={true} />
            <h1>아이디 찾기</h1>
            <div className="find-form">
                <Input placeholder="이메일을 입력해주세요" />
                <Button onClick= {() => navigate('/findid/success')} width="494px" height="73px" fontSize="24px" color="blue" text="아이디 찾기" />
                <button onClick={() => navigate('/findpw/form')}>비밀번호 찾기</button>
            </div>
        </div>
    )
}

export default FindIDForm;