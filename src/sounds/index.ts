import clap from "./clap.mp3";
import fail from "./fail.mp3";
import flip from "./flip.mp3";

class Sounds extends Audio {
  run() {
    this.pause();
    this.currentTime = 0;
    this.play();
  }
}

export const flipSound = new Sounds(flip);
export const clapSound = new Sounds(clap);
export const failSound = new Sounds(fail);
