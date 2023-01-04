import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Board from "./components/Board";
import GameData from "./components/GameData";
import GameOver from "./components/GameModal";
import TextClip from "./components/styled/TextClip";

import "./App.css";

import imgs from "./imgs";

import { useAppSelector } from "./store/store";
import { AnimatePresence } from "framer-motion";

const Title = styled.h1`
  font-size: calc(2rem + 2vw);
  ${TextClip}
`;

function App() {
  const [showGameModal, setShowGameModal] = useState(false);

  const gameOver = useAppSelector((s) => s.game.gameOver);
  const cardCount = useAppSelector((s) => s.game.cardCount);
  const paused = useAppSelector((s) => s.game.paused);
  const restart = useAppSelector((s) => s.game.restart);
  const cardImgs = useMemo(
    () =>
      [...imgs.slice(0, cardCount), ...imgs.slice(0, cardCount)].sort(
        () => Math.random() - 0.5
      ),
    [cardCount, restart]
  );
  useEffect(() => {
    if (gameOver) {
      setTimeout(() => setShowGameModal(true), 1000);
    } else {
      setShowGameModal(false);
    }
  }, [gameOver]);
  useEffect(() => {
    if (paused) {
      setShowGameModal(true);
    } else {
      setShowGameModal(false);
    }
  }, [paused]);

  return (
    <>
      <div className='App'>
        <Title>Memory Game</Title>
        <GameData />
        <Board imgs={cardImgs} />
        <AnimatePresence>{showGameModal && <GameOver />}</AnimatePresence>
      </div>
    </>
  );
}

export default App;
