import React from "react";
import { matchRoutes, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button"; 
import styled from "styled-components";


const Header = ({ showLogin=false, showProfile=false }) => {
  const navigate = useNavigate();

  return (
    <HeaderS>
      <LogoS>
        <Logo onClick={() => navigate("/")}/></LogoS>
       {/* 로그인 버튼 or 프로필 버튼 표시 */}
       {(showLogin || showProfile) && (
        <ButtonS>
          {showLogin && <Button onClick={() => navigate("/")} color="bblue" text="로그인" />}
          {showProfile && <Button onClick={() => navigate("#")} />}
        </ButtonS>
      )}
    </HeaderS>
  );
};

const HeaderS = styled.header`
  width: 100%, 
  height: 100px, 
  backgroundColor: white,
  display: flex,
  alignItems: center,
  justifyContent: space-between,
  top: 0,
  left: 0,
  `

const LogoS = styled.div`
  marginLeft: 45px,
  `

const ButtonS = styled.div`
  marginRight: 45px,
  position: relative,
  `

export default Header;