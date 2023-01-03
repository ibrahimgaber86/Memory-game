import { css, keyframes } from "styled-components";

const Waves = keyframes`
 0%{
  background-position:left;
 }
 100%{
  background-position:right;
 }
`;

const TextClip = css`
  display: inline-block;
  background-image: linear-gradient(
    80deg,
    brown,
    #ffeb3b,
    brown,
    #ffeb3b,
    brown
  );
  background-size: 250%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${Waves} infinite 9s alternate;
`;

export default TextClip;
