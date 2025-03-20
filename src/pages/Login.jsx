import React, { useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';
import Toggle from '../components/Toggle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Login.css';


const Login = () => {
  const [remember, setRemember] = useState(false);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
    <div className='login-container'>
      <div className='login-header'>
        <Header />
      </div>
      <p className='login-title'>로그인</p>
      <div className='login-form'>
        <div className='login-inputs'>
          <div className='login-input'>
            <Input type="id" placeholder="아이디를 입력해주세요" value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                        />
          </div>
          <div className='login-input'>
            <Input type="password" placeholder="비밀번호를 입력해주세요"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className='remember'>
          <Toggle onToggle={setRemember} checked={remember} />
        </div>
        <div className='login-buttons'>
          <Button onClick={() => navigate('/')} width='494px' height='73px' fontSize='24px' text="로그인" />
          <Button onClick={() => navigate('/signup/agreement')} width='494px' height='73px' fontSize='24px' color="white" text="회원가입"  />
        </div>
        <div className='find'>
          <button onClick={() => navigate('/findid/form')}>아이디 찾기</button>
          <p>|</p>
          <button onClick={() => navigate('/findpw/form')}>비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
}; 


export default Login;

