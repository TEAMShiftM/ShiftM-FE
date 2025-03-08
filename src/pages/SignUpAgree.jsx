import { useState } from "react";
import Header from "../components/Header";
import "../styles/pages/SignUpAgree.css";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";


const TermsAgreement = () => {
  const [checkedItems, setCheckedItems] = useState({
    terms: false,
    privacy: false,
    location: false,
  });

  // 모든 체크박스가 체크되었는지 확인
  const allChecked = Object.values(checkedItems).every(Boolean);
  // 하나라도 체크되어 있는지 확인 (전체 선택 해제 시 비활성화 방지)
  const isAnyChecked = Object.values(checkedItems).some(Boolean);

  // 개별 체크박스 변경 핸들러
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  // 전체 동의 체크박스 변경 핸들러
  const handleAllCheckedChange = (event) => {
    const checked = event.target.checked;
    const newCheckedItems = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = checked;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/signup2');
  };

  return (
    <div className="signup-container">
      <div className="signupheader">
        <Header />
      </div>
      <p className='signuptitle'>회원가입</p>
      <div className="signupform">
      <div className="bar"><ProgressBar className='bar' currentStep={1} /></div>
      <div className="terms-detail">
        <ul>
          <li>
          <div className="check">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheckedChange}
              id = "a"
              class="screen-reader"
            />
            <div className="label-box">
              <span className="check-icon" aria-hidden="true"></span>
              <label for="a">전체 동의하기</label>
            </div>
          </div>
          <p className="text">전체 동의하기에 대한 설명입니다.</p>
          </li>
          <li>
            <div className="check">
              <input
                type="checkbox"
                name="terms"
                checked={checkedItems.terms}
                onChange={handleCheckboxChange}
                id = "b"
                class="screen-reader"
              />
              <div className="label-box">
                <span className="check-icon" aria-hidden="true"></span>
                <label for="b">[필수] ShiftM 이용약관</label>
              </div>
            </div>
            <div className="box"></div>
          </li>
          <li>
            <div className="check">
              <input
                type="checkbox"
                name="privacy"
                checked={checkedItems.privacy}
                onChange={handleCheckboxChange}
                id = "c"
                class="screen-reader"
              />
              <div className="label-box">
                <span className="check-icon" aria-hidden="true"></span>
                <label for="c">[필수] 개인정보 수집 및 이용</label>
              </div>
            </div >
            <div className="box"></div>
          </li>
          <li>
            <div className="check">
              <input
                type="checkbox"
                name="location"
                checked={checkedItems.location}
                onChange={handleCheckboxChange}
                id = "d"
                class="screen-reader"
              />
              <div className="label-box">
                <span className="check-icon" aria-hidden="true"></span>
                <label for="d">[필수] 위치기반서비스 이용약관</label>
              </div>
            </div>
            <div className="box"></div>
          </li>
        </ul>
      </div>
      <div className="next-button">
        <Button width="356px" height="60px" fontSize="24px" onClick={() => navigate("/signup/form")} text="다음" size="next" className="next-button"/>
      </div>
    </div>
    </div>
  );
};

export default TermsAgreement;
