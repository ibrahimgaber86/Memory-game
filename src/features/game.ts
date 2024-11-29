import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import * as sounds from "../sounds";

type GameInitialState = {
  first: boolean;
  selected: HTMLDivElement[];
  flip: number;
  paused: boolean;
  cardCount: number;
  rightChoice: number;
  gameOver: { state: boolean; message: string };
  restart: {};
};
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
      console.log("select invoked");

      if (
        state.selected.length >= 2 ||
        state.selected.includes(action.payload as any)
      )
        return;
      sounds.flipSound.play();
      action.payload.classList.add("flip");
      state.selected.push(action.payload as any);

      if (state.selected.length <= 1) return;
      if (state.selected[0].dataset.img === state.selected[1].dataset.img) {
        sounds.clapSound.run();
        state.selected = [];
        state.flip++;
        state.rightChoice++;
        if (state.cardCount === state.rightChoice) {
          state.paused = true;
          state.gameOver.state = true;
          state.gameOver.message = "You win";
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
    startGame(state) {
      state.first = false;
    },
    pauseGame(state, action: PayloadAction<boolean>) {
      console.log("pause invoked");

      state.paused = action.payload;
    },
    incrementCards(state) {
      console.log("incrementCards invoked");

      state.cardCount += 2;
      state.selected = [];
      state.gameOver.state = false;
      state.gameOver.message = "";
      state.paused = false;
      state.flip = 0;
      state.rightChoice = 0;
      state.restart = {};
    },
    restartGame(state) {
      state.selected = [];
      state.gameOver.state = false;
      state.paused = false;
      state.flip = 0;
      state.rightChoice = 0;
      state.restart = {};
    },
    finishGame(
      state,
      action: PayloadAction<{ state: boolean; message: string }>
    ) {
      state.paused = action.payload.state;
      state.gameOver.state = action.payload.state;
      state.gameOver.message = action.payload.message;
    },
  },
});

export const {
  selectCard,
  pauseGame,
  incrementCards,
  finishGame,
  restartGame,
  startGame,
} = gameSlice.actions;
export default gameSlice.reducer;
