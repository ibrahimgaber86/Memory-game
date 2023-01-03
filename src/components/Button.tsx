import React from "react";
import styled from "styled-components";
import FlexCenter from "./styled/FlexCenter";
import TextClip from "./styled/TextClip";

const ButtonBase = styled.button`
  background-color: #222;
  font-family: inherit;
  color: inherit;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5em 1.5em;
  margin: 0.3em 1em;
  border-radius: 5px;
  min-width: 10em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  box-shadow: 0 0 10px #fff;
  text-transform: uppercase;
  :hover {
    cursor: pointer;
    box-shadow: 0 0 20px #fff;
  }
`;
const ButtonText = styled.span`
  ${TextClip}
`;
export const ButtonGroup = styled.div`
  ${FlexCenter}
  flex-wrap:wrap;
`;

type buttonProps = {
  children: React.ReactNode;
  handler?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
const Button = ({ children, handler }: buttonProps) => {
  return (
    <ButtonBase onClick={handler}>
      <ButtonText>{children}</ButtonText>
    </ButtonBase>
  );
};

export default Button;
