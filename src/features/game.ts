import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as sounds from "../sounds";

interface GameInitialState {
  first: boolean;
  selected: HTMLDivElement[];
  flip: number;
  paused: boolean;
  cardCount: number;
  rightChoice: number;
  gameOver: {
    state: boolean;
    message: string;
  };
  restart: Record<string, unknown>;
}

const initialState: GameInitialState = {
  first: true,
  selected: [],
  flip: 0,
  paused: true,
  cardCount: 3,
  rightChoice: 0,
  gameOver: { state: false, message: "" },
  restart: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectCard(state, action: PayloadAction<HTMLDivElement>) {
      if (state.selected.length >= 2 || state.selected.includes(action.payload)) return;

      // Play flip sound and add flip class
      sounds.flipSound.play();
      action.payload.classList.add("flip");
      state.selected.push(action.payload);

      // Check if two cards are selected
      if (state.selected.length < 2) return;

      const [firstCard, secondCard] = state.selected;

      // Check if the selected cards match
      if (firstCard.dataset.img === secondCard.dataset.img) {
        sounds.clapSound.play();
        state.selected = [];
        state.flip++;
        state.rightChoice++;

        // Check if all cards are matched
        if (state.cardCount === state.rightChoice) {
          state.paused = true;
          state.gameOver = { state: true, message: "You win" };
        }
      } else {
        sounds.failSound.run();
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          state.selected = [];
          state.flip++;
        }, 1000);
      }
    },
    startGame(state) {
      state.first = false;
    },
    pauseGame(state, action: PayloadAction<boolean>) {
      state.paused = action.payload;
    },
    incrementCards(state) {
      state.cardCount += 2;
      state.selected = [];
      state.gameOver = { state: false, message: "" };
      state.paused = false;
      state.flip = 0;
      state.rightChoice = 0;
      state.restart = {};
    },
    restartGame(state) {
      state.selected = [];
      state.gameOver = { state: false, message: "" };
      state.paused = false;
      state.flip = 0;
      state.rightChoice = 0;
      state.restart = {};
    },
    finishGame(state, action: PayloadAction<{ state: boolean; message: string }>) {
      state.paused = action.payload.state;
      state.gameOver = action.payload;
    },
  },
});

export const { selectCard, pauseGame, incrementCards, finishGame, restartGame, startGame } = gameSlice.actions;

export default gameSlice.reducer;
