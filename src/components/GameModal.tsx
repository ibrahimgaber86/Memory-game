import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Button, { ButtonGroup } from "./Button";
import FlexCenter from "./styled/FlexCenter";
import TextClip from "./styled/TextClip";
import { useAppDispatch, useAppSelector } from "../store/store";
import { incrementCards, pauseGame, restartGame } from "../features/game";
import { motion } from "framer-motion";
const Modal = styled(motion.div)`
  ${FlexCenter};
  flex-direction: column;
  position: fixed;
  color: #fff;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  h1 {
    text-align: center;
    font-size: calc(4rem + 5vw);
    ${FlexCenter}
    ${TextClip}
  }
`;

const GameModal = () => {
  const dispatch = useAppDispatch();
  const paused = useAppSelector((s) => s.game.paused);
  const gameOver = useAppSelector((s) => s.game.gameOver);

  return createPortal(
    <Modal
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      {paused && !gameOver && (
        <>
          <h1>Paused</h1>
          <Button
            handler={() => {
              dispatch(pauseGame(false));
            }}
          >
            play
          </Button>
        </>
      )}
      {gameOver && (
        <>
          <h1>Game Over</h1>
          <ButtonGroup>
            <Button
              handler={() => {
                dispatch(restartGame());
              }}
            >
              restart
            </Button>
            <Button
              handler={() => {
                dispatch(incrementCards());
              }}
            >
              next level
            </Button>
          </ButtonGroup>
        </>
      )}
    </Modal>,
    document.getElementById("modal")!
  );
};
export default GameModal;
