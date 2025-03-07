import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <Nav>
      <Link to="/">
        <Logo src={logo} alt="Logo" />
      </Link>
      <List>{/* Add list content */}</List>
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
`;

const Logo = styled.img`
  margin-top: 25px;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Navbar;
