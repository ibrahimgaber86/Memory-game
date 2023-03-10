import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { selectCard } from "../features/game";
import bgImg from "../imgs/back.jpeg";
import { useAppDispatch } from "../store/store";

const Side = styled.div<{ img?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  backface-visibility: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const Face = styled(Side)`
  background-image: ${({ img }) => (img ? `url(${img}),` : "")}
    linear-gradient(to bottom, #000, brown);
  transform: rotateY(180deg);
  background-size: contain;
`;
const Back = styled(Side)`
  background-image: url(${({ img }) => img}),
    linear-gradient(to bottom, #000, brown);
`;
const GameCard = styled.div`
  box-shadow: 0 0 10px #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  transform-style: preserve-3d;
  transform-origin: right;
  transition: 1s;
  width: calc(4rem + 5vw);
  height: calc(5rem + 6vw); ;
`;
const CardContainer = styled(motion.div)`
  perspective: 800px;
  margin: 10px;
  .flip {
    transform: rotateY(180deg) translate(100%);
  }
`;

type cardPropType = {
  img?: string;
  delay?: number;
};
const Card = ({ img, delay }: cardPropType) => {
  const card = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  return (
    <CardContainer
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 * (delay || 0) }}
    >
      <GameCard ref={card} data-img={img}>
        <Face img={img}></Face>
        <Back
          img={bgImg}
          onClick={() => {
            if (card.current?.classList.contains("flip ")) return;
            dispatch(selectCard(card.current!));
          }}
        ></Back>
      </GameCard>
    </CardContainer>
  );
};

export default Card;
