import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { finishGame } from "../features/game";
import { tickSound } from "../sounds";
import { useAppSelector, useAppDispatch } from "../store/store";
import FlexCenter from "./styled/FlexCenter";
import MaxWidth from "./styled/MaxWidth";
import TextClip from "./styled/TextClip";

const Head = styled.div`
  ${FlexCenter}
  ${MaxWidth}
  font-size: calc(1rem + 3vw);
  justify-content: space-between;
  span {
    ${TextClip}
  }
`;
const GameData = () => {
  const timerId = useRef(0);

  const paused = useAppSelector((s) => s.game.paused);
  const restart = useAppSelector((s) => s.game.restart);
  const gameOver = useAppSelector((s) => s.game.gameOver);
  const flip = useAppSelector((s) => s.game.flip);
  const cardCount = useAppSelector((s) => s.game.cardCount);

  const dispatch = useAppDispatch();

  const [timer, setTimer] = useState(cardCount * 10);

  useEffect(() => {
    setTimer(cardCount * 10);
  }, [cardCount, restart]);

  useEffect(() => {
    if (paused || gameOver.state) {
      clearInterval(timerId.current);
    } else {
      timerId.current = window.setInterval(() => setTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(timerId.current);
  }, [paused, cardCount, gameOver]);
  useEffect(() => {
    if (timer <= 10) {
      tickSound.run();
    }
    if (timer <= 0) {
      dispatch(finishGame({ state: true, message: "Time Over" }));
    }
  }, [timer, dispatch]);
  return (
    <>
      <Head>
        <span>Timer:{timer}</span>
        <span>Flip:{flip}</span>
      </Head>
    </>
  );
};

export default GameData;
