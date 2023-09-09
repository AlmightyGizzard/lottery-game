import { gsap } from "gsap";
import { PixiPlugin, CSSPlugin } from "gsap/all";
import { Container, Sprite } from "pixi.js";
// import { buttonElement } from "./buttonElement";
import { buttonConsole } from "./buttonConsole";
import { IScene } from "./SceneManager";
import { Ball } from "./Ball";

export class Scene extends Container implements IScene {
  // We promoted clampy to a member of the class
  private animatedPyg: Sprite;

  private baseContainer: Container;

  private gameConsole: buttonConsole;

  private balls: number[];
  private chosenNumbers: number[];

  constructor() {
    super(); // Mandatory! This calls the superclass constructor.

    gsap.registerPlugin(PixiPlugin, CSSPlugin);

    this.baseContainer = new Container();

    this.balls = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59,
    ];
    //this.balls = [1, 2, 3, 4, 5, 6, 7];
    this.chosenNumbers = [];

    this.randomBall();
    this.randomBall();
    this.randomBall();
    this.randomBall();
    this.randomBall();
    this.randomBall();
    console.log(this.chosenNumbers);
    console.log(this.balls);

    const offset = -200;
    for (let i = 0; i < this.chosenNumbers.length; i++) {
      const ballRender = new Ball(this.chosenNumbers[i], 0xff00ff);
      ballRender.x = i * 70 + offset;
      ballRender.y = -50;
      this.baseContainer.addChild(ballRender);
    }

    this.animatedPyg = Sprite.from("pyg.png");
    this.animatedPyg.anchor.set(0.5);
    this.animatedPyg.scale = { x: 0.05, y: 0.05 };
    this.animatedPyg.x = -200;
    this.animatedPyg.y = 100;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(this.animatedPyg, {
      duration: 5,
      rotation: 60,
    });
    tl.play();

    // BUTTON TES
    this.gameConsole = new buttonConsole(50);
    this.gameConsole.createButton("Lucky Numbers", 125, 30);
    this.gameConsole.createButton("Start", 75, 30);
    this.gameConsole.createButton("Reset", 75, 30);

    this.baseContainer.addChild(this.gameConsole);

    this.baseContainer.addChild(this.animatedPyg);

    this.addChild(this.baseContainer);
  }

  private randomBall(): number {
    // get a random ball from the array
    const randomBall = Math.floor(Math.random() * this.balls.length) + 1;

    for (let i = 0; i < this.balls.length; i++) {
      //console.log(this.balls[i], randomBall);
      if (
        this.balls[i] === randomBall &&
        !this.chosenNumbers.includes(this.balls[i])
      ) {
        this.chosenNumbers.push(randomBall);
        return randomBall;
      }
    }
    this.randomBall();
    return randomBall;
  }

  //   private resetBalls(): void {}

  public update(_framesPassed: number): void {}

  public resize(screenWidth: number, screenHeight: number): void {
    console.log(screenWidth, screenHeight);
    // const centreX = this.width / 2;
    // const centreY = this.height / 2;

    this.baseContainer.width = screenWidth;
    this.baseContainer.height = screenHeight;
    const scaleValue = Math.min(
      this.baseContainer.scale.x,
      this.baseContainer.scale.y
    );
    this.baseContainer.setTransform(
      screenWidth / 2,
      screenHeight / 2,
      scaleValue,
      scaleValue
    );

    this.gameConsole.x = 170;
    this.gameConsole.y = 30;
  }
}
