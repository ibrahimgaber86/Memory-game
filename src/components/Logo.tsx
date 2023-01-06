import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../imgs/logo.png";

const rotate = keyframes`
 0%{
  transform:rotateY(0);
 }
 50%{
  transform:rotateY(-90deg);
 }
 100%{
  transform:rotateY(0);
 }
`;
const LogoContainer = styled.div`
  perspective: 800px;
  /* perspective-origin: bottom left; */
  position: fixed;
  z-index: 1000;
  bottom: 10px;
  left: 10px;
`;
const MyLogo = styled.div`
  width: Calc(50px + 10vw);
  height: Calc(50px + 10vw);
  border-radius: 50%;
  background-image: url(${logo});
  background-size: contain;
  animation: ${rotate} 5s linear infinite;
`;
const Logo = () => {
  return (
    <LogoContainer>
      <MyLogo />
    </LogoContainer>
  );
};

export default Logo;
