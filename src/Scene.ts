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

  private lotteryPool: number[];
  private chosenNumbers: number[];
  private winningNumbers: number[];

  private ballContainer: Container;
  private playerBalls: Ball[];
  private dealerBalls: Ball[];

  constructor() {
    super(); // Mandatory! This calls the superclass constructor.

    gsap.registerPlugin(PixiPlugin, CSSPlugin);

    this.baseContainer = new Container();
    this.ballContainer = new Container();

    this.playerBalls = [];
    this.dealerBalls = [];

    this.lotteryPool = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59,
    ];
    //this.balls = [1, 2, 3, 4, 5, 6, 7];
    this.chosenNumbers = [];
    this.winningNumbers = [];

    for (let i = 0; i < 6; i++) {
      const playerBall = new Ball(69);
      playerBall.x = i * 50;
      playerBall.y = -25;
      this.playerBalls.push(playerBall);
      this.ballContainer.addChild(playerBall);

      const dealerBall = new Ball(this.randomBall(this.winningNumbers));
      dealerBall.x = i * 50;
      dealerBall.y = 25;
      dealerBall.alpha = 0;
      this.dealerBalls.push(dealerBall);
      this.ballContainer.addChild(dealerBall);
    }

    this.ballContainer.x = -this.ballContainer.width / 2 - 50;
    this.ballContainer.y = 80;

    this.animatedPyg = Sprite.from("pyg.png");
    this.animatedPyg.anchor.set(0.5);
    this.animatedPyg.scale = { x: 0.05, y: 0.05 };
    this.animatedPyg.x = -20;
    this.animatedPyg.y = -80;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(this.animatedPyg, {
      duration: 5,
      rotation: 60,
    });
    tl.play();

    // BUTTON TES
    this.gameConsole = new buttonConsole(50);
    this.gameConsole.createButton("Lucky Numbers", 125, 30, () => {
      this.luckyDip();
    });
    this.gameConsole.createButton("Start", 75, 30, () => {
      this.runGame();
    });
    this.gameConsole.createButton("Reset", 75, 30, () => {
      this.resetGame();
    });

    this.baseContainer.addChild(this.gameConsole);

    this.baseContainer.addChild(this.ballContainer);

    this.baseContainer.addChild(this.animatedPyg);

    this.addChild(this.baseContainer);
  }

  private randomBall(array: number[]): number {
    // get a random ball from the array
    const randomBall = Math.floor(Math.random() * this.lotteryPool.length) + 1;

    for (let i = 0; i < this.lotteryPool.length; i++) {
      //console.log(this.balls[i], randomBall);
      if (
        this.lotteryPool[i] === randomBall &&
        !array.includes(this.lotteryPool[i])
      ) {
        array.push(randomBall);
        return randomBall;
      }
    }
    this.randomBall(array);
    return randomBall;
  }

  private luckyDip(): void {
    this.chosenNumbers = [];
    console.log(this.chosenNumbers);
    console.log(this.lotteryPool);
    for (let i = 0; i < 6; i++) {
      const value = this.randomBall(this.chosenNumbers);
      this.playerBalls[i].setNumber(value);
    }
  }

  private runGame(): void {
    const tl = gsap.timeline();

    for (let i = 0; i < this.dealerBalls.length; i++) {
      console.log("BALS: ", this.dealerBalls[i]);
      tl.to(this.dealerBalls[i], { alpha: 1, duration: 0.5 });
    }
    tl.play();
  }

  resetGame(): void {
    const tl = gsap.timeline();
    for (let i = 0; i < this.dealerBalls.length; i++) {
      tl.to(this.dealerBalls[i], { alpha: 0, duration: 0.5 });
    }
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
