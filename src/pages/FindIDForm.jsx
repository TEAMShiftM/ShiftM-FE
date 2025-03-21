import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import "../styles/pages/FindIDForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MemberAPI } from "../api/user/mypage";

const FindIDForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleFindId = async () => {
        if (!email) return alert("이메일을 입력해주세요.");
        const res = await MemberAPI.FindId(email);
        if (res.isSuccess === false) {
            alert(res.message);
        } else {
            alert(`회원님의 아이디는 ${res.id}입니다.`);
            navigate("/findid/success");
        }
    };

    return (
        <div className="find-id">
            <Header showLogin={true} />
            <h1>아이디 찾기</h1>
            <div className="find-form">
                <Input placeholder="이메일을 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button onClick={handleFindId} width="494px" height="73px" fontSize="24px" color="blue" text="아이디 찾기" />
                <button onClick={() => navigate('/findpw/form')}>비밀번호 찾기</button>
            </div>
        </div>
    )
}

export default FindIDForm;
