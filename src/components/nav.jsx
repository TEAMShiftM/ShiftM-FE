import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(false);
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} alt="Logo" />
      </Link>
      <List>
        {user ? (
          <ProfileButton onClick={() => setIsModalOpen(!isModalOpen)}>
            ⚪
          </ProfileButton>
        ) : (
          <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
        )}
        {isModalOpen && (
          <Modal>
            <ModalItem onClick={() => navigate("/")}>메인페이지</ModalItem>
            <ModalItem onClick={handleLogout}>로그아웃</ModalItem>
          </Modal>
        )}
      </List>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  position: fixed;
  z-index: 100;
  width: 100vw;
  top: 0;
  justify-content: space-between;
  background-color: #ffffff;
  color: black;
  height: 100px;
  align-items: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const Logo = styled.img`
  margin-top: 25px;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 150px;
`;

const LoginButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  border: none;
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const ModalItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Navbar;
