import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../imgs/logo.png";

const rotate = keyframes`
 0%{
  transform:rotateY(0) ;
 }
 100%{
  transform:rotateY(360deg);
 }
`;
const LogoContainer = styled.div`
  position: fixed;
  perspective: 800px;
  left: 10px;
  bottom: 10px;
  z-index: 1000;
`;
const MyLogo = styled.div`
  width: Calc(50px + 10vw);
  height: Calc(50px + 10vw);
  transform-style: preserve-3d;
  animation: ${rotate} 10s linear infinite;
`;
const LogoFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-image: url(${logo});
  background-size: contain;
  backface-visibility: hidden;
`;
const LogoBack = styled(LogoFront)`
  transform: rotateY(180deg);
`;
const Logo = () => {
  return (
    <LogoContainer>
      <MyLogo>
        <LogoFront />
        <LogoBack />
      </MyLogo>
    </LogoContainer>
  );
};

export default Logo;
