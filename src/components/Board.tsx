import React from "react";
import styled from "styled-components";
import { pauseGame } from "../features/game";
import { useAppDispatch, useAppSelector } from "../store/store";
import Button from "./Button";
import Card from "./Card";

const BoardBase = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: 80vw;
  margin: auto;
  margin-bottom: 1.5rem;
`;

type boardProps = {
  imgs: string[];
};
const Board = ({ imgs }: boardProps) => {
  const dispatch = useAppDispatch();
  const first = useAppSelector((s) => s.game.first);
  return (
    (first && <></>) || (
      <>
        <BoardBase>
          {imgs.map((img, index) => (
            <Card img={img} key={img + Math.random()} delay={index} />
          ))}
        </BoardBase>
        <Button handler={() => dispatch(pauseGame(true))}>pause</Button>
      </>
    )
  );
};

export default React.memo(Board);
