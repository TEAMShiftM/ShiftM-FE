import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import "../styles/pages/FindPWForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MemberAPI } from "../api/user/mypage";

const FindPWForm = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    const handleFindPw = async () => {
        if (!id || !email) return alert("아이디와 이메일을 모두 입력해주세요.");

        const res = await MemberAPI.FindPassword(id, email);
        if (res.isSuccess === false) {
            alert(res.message);
        } else {
            alert("비밀번호 재설정 메일이 전송되었습니다.");
            navigate("/findpw/success");
        }
    };

    return (
        <div className="find-pw">
            <Header showLogin={true} />
            <h1>비밀번호 찾기</h1>
            <div className="findpw-form">
                <Input placeholder="아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)} />
                <Input placeholder="이메일을 입력해주세요" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button onClick={handleFindPw} className="pw" width="494px" height="73px" fontSize="24px" color="blue" text="비밀번호 찾기" />
                <button onClick={() => navigate("/findid/form")}>아이디 찾기</button>
            </div>
        </div>
    )
}

export default FindPWForm;
