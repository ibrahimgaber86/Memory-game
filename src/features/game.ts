import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import * as sounds from "../sounds";

type GameInitialState = {
  selected: HTMLDivElement[];
  flip: number;
  paused: boolean;
  cardCount: number;
  rightChoice: number;
  gameOver: boolean;
  restart: {};
};
const initialState: GameInitialState = {
  selected: [],
  flip: 0,
  paused: false,
  cardCount: 3,
  rightChoice: 0,
  gameOver: false,
  restart: {},
};
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectCard(state, action: PayloadAction<HTMLDivElement>) {
      console.log("select invoked");

      if (
        state.selected.length >= 2 ||
        state.selected.includes(action.payload as any)
      )
        return;
      sounds.flipSound.play();
      action.payload.classList.add("flip");
      state.selected.push(action.payload as any);
    },
    matchCards(state) {
      console.log("match invoked");

      if (state.selected.length <= 1) return;
      if (state.selected[0].dataset.img === state.selected[1].dataset.img) {
        sounds.clapSound.run();
        state.selected = [];
        state.flip++;
        state.rightChoice++;
        if (state.cardCount === state.rightChoice) {
          state.paused = true;
          state.gameOver = true;
        }
      } else {
        sounds.failSound.run();
        state.selected.forEach((el) => {
          setTimeout(() => el.classList.remove("flip"), 1000);
        });
        state.selected = [];
        state.flip++;
      }
    },
    pauseGame(state, action: PayloadAction<boolean>) {
      console.log("pause invoked");

      state.paused = action.payload;
    },
    incrementCards(state) {
      console.log("incrementCards invoked");

      state.cardCount += 1;
      state.selected = [];
      state.gameOver = false;
      state.paused = false;
      state.flip = 0;
      state.rightChoice = 0;
      state.restart = {};
    },
    restartGame(state) {
      state.selected = [];
      state.gameOver = false;
      state.paused = false;
      state.flip = 0;
      state.rightChoice = 0;
      state.restart = {};
    },
    finishGame(state, action: PayloadAction<boolean>) {
      state.paused = action.payload;
      state.gameOver = action.payload;
    },
  },
});

export const {
  selectCard,
  matchCards,
  pauseGame,
  incrementCards,
  finishGame,
  restartGame,
} = gameSlice.actions;
export default gameSlice.reducer;
