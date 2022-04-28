import Level from "./Levels.js";
import Level1 from "./Levels/Level1.js";
import AnimatedObject from "./AnimatedObject.js";
import NinjaSprites from "./Sprites/NinjaSprites.js";
import RawObject from "./RawObject.js";

export default class GameArea {
  constructor() {
    this.ninja = new AnimatedObject(NinjaSprites.running, 60, 60, 30, 500);
    this.level = new Level(
      20,
      20,
      32,
      32,
      Level1.path,
      Level1.obstacles,
      Level1.details,
      "https://opengameart.org/sites/default/files/Castle2_4.png",
      512,
      512
    );

    this.canvas = document.getElementById("gameArea");
    this.canvas.width = 640;
    this.canvas.height = 640;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(this.updateGameArea, 20); //ogni 20 ms chiamo il metodo updateGameArea

    document.addEventListener("keydown", this.move);
    document.addEventListener("keyup", this.clearmove);
  }

  clear = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  updateGameArea = () => {
    this.clear();
    this.level.draw(this.context);
    this.obstaclesVector = this.level.obstaclesVector;
    this.ninja.update(this.obstaclesVector);
    this.ninja.draw(this.context);
  };

  move = e => {
    switch (e.key) {
      case "ArrowUp":
        this.ninja.speedY = -2;
        break;
      case "ArrowDown":
        this.ninja.speedY = 2;
        break;
      case "ArrowLeft":
        this.ninja.speedX = -2;
        break;
      case "ArrowRight":
        this.ninja.speedX = 2;
        break;
    }
  };

  clearmove = () => {
    this.ninja.speedX = 0;
    this.ninja.speedY = 0;
  };
}
