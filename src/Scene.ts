import { gsap } from "gsap";
import { PixiPlugin, CSSPlugin } from "gsap/all";
import { Container, TextStyle, Text } from "pixi.js";
// import { buttonElement } from "./buttonElement";
import { ButtonConsole } from "./UI/ButtonConsole";
import { IScene } from "./SceneManager";
import { Ball } from "./Ball";
import { ButtonElement } from "./UI/ButtonElement";
import { WinBanner } from "./UI/WinBanner";
import { DrawBowl } from "./DrawBowl";

export class Scene extends Container implements IScene {
  private readonly _lotteryPool: number[];
  private readonly _winAmounts: number[];

  private readonly _baseContainer: Container;

  private readonly _winBanner: WinBanner;
  private readonly _drawBowl: DrawBowl;
  private readonly _explainText: Text;

  private readonly _gameConsole: ButtonConsole;
  private readonly _luckyDipButton: ButtonElement;

  private readonly _ballContainer: Container;
  private readonly _playerBalls: Ball[];
  private readonly _dealerBalls: Ball[];

  private chosenNumbers: number[];
  private winningNumbers: number[];

  constructor() {
    super(); // Mandatory! This calls the superclass constructor.

    gsap.registerPlugin(PixiPlugin, CSSPlugin);

    this._baseContainer = new Container();
    this._ballContainer = new Container();

    this._playerBalls = [];
    this._dealerBalls = [];

    // This could absolutely be stored in a better fashion, such as in a json file etc
    this._lotteryPool = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59,
    ];
    this._winAmounts = [50, 100, 200, 500];

    this.chosenNumbers = [];
    this.winningNumbers = [];

    // Create 6 bowls for the player, and 6 balls to be later revealed.
    for (let i = 0; i < 6; i++) {
      const playerBall = new Ball(69, true);
      playerBall.x = i * 50;
      playerBall.y = -25;
      this._playerBalls.push(playerBall);
      this._ballContainer.addChild(playerBall);

      const dealerBall = new Ball(this.randomBall(this.winningNumbers));
      dealerBall.x = i * 50;
      dealerBall.y = 25;
      dealerBall.alpha = 0;
      this._dealerBalls.push(dealerBall);
      this._ballContainer.addChild(dealerBall);
    }

    this.luckyDip();

    this._winBanner = new WinBanner(200, 100);
    this._winBanner.visible = false;

    this._drawBowl = new DrawBowl();

    const explainStyle = new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: 12,
    });
    const style = new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: 16,
    });

    this._explainText = new Text(
      "I am sadly not an artist. \n As such, replacing a well-animated bowl \nof lottery balls is Tim here. Tim is happy.",
      explainStyle
    );

    // GAME CONSOLE SETUP
    this._gameConsole = new ButtonConsole(50);
    const luckyDipButton: ButtonElement = this._gameConsole.createButton(
      "Lucky Numbers",
      125,
      30,
      () => {
        this.luckyDip();
      },
      style
    );
    this._gameConsole.createButton(
      "Start",
      75,
      30,
      () => {
        this.runGame();
      },
      style
    );
    this._gameConsole.createButton(
      "Reset",
      75,
      30,
      () => {
        this.resetGame();
      },
      style
    );

    this._luckyDipButton = luckyDipButton;

    this._baseContainer.addChild(this._winBanner);

    this._baseContainer.addChild(this._drawBowl);

    this._drawBowl.addChild(this._explainText);

    this._baseContainer.addChild(this._gameConsole);

    this._baseContainer.addChild(this._ballContainer);

    this.addChild(this._baseContainer);
  }

  private randomBall(array: number[]): number {
    // get a random ball from the array
    const randomBall = Math.floor(Math.random() * this._lotteryPool.length) + 1;

    for (let i = 0; i < this._lotteryPool.length; i++) {
      if (this._lotteryPool[i] === randomBall && !array.includes(randomBall)) {
        array.push(randomBall);
        return randomBall;
      }
    }
    return this.randomBall(array);
  }

  private luckyDip(): void {
    this.chosenNumbers = [];

    // Run through all six balls and assign each a random number.
    for (let i = 0; i < 6; i++) {
      const value = this.randomBall(this.chosenNumbers);
      this._playerBalls[i].setNumber(value);
    }
  }

  private runGame(): void {
    this._drawBowl.spin();

    const matchingNumbers = [];
    const tl = gsap.timeline();

    // Make the lucky dip button invisible - we don't want to be changing
    // numbers once the game has started.
    this._luckyDipButton.hide();

    // TODO DC: If you have time, put fancier animation in here,
    // TODO DC: maybe a roll-in from the side?
    // Reveal the dealer balls one by one.
    for (let i = 0; i < this._dealerBalls.length; i++) {
      if (this._playerBalls[i].getNumber() !== this.chosenNumbers[i]) {
        this.chosenNumbers[i] = this._playerBalls[i].getNumber();
      }
      tl.to(this._dealerBalls[i], { alpha: 1, duration: 0.4 });
      if (this.winningNumbers.includes(this.chosenNumbers[i])) {
        matchingNumbers.push(this.chosenNumbers[i]);
      }
    }
    tl.play();

    if (matchingNumbers.length >= 3) {
      const winAmount = this._winAmounts[matchingNumbers.length - 3];
      this._winBanner.show(winAmount);
    }
  }

  private resetGame(): void {
    this.winningNumbers = [];
    const tl = gsap.timeline();

    this._winBanner.hide();
    this._drawBowl.resetSpin();

    // Make the lucky dip button visible again.
    this._luckyDipButton.show();

    // Run through the dealer balls, making them invisible and generating
    // a new batch of values for the next game.
    for (let i = 0; i < this._dealerBalls.length; i++) {
      tl.to(this._dealerBalls[i], {
        alpha: 0,
        duration: 0.2,
        onComplete: () => {
          this._dealerBalls[i].setNumber(this.randomBall(this.winningNumbers));
        },
      });
    }
  }

  public update(_framesPassed: number): void {}

  public resize(screenWidth: number, screenHeight: number): void {
    const isLandscape = screenHeight < screenWidth;
    // const centreX = screenWidth / 2;
    // const centreY = screenHeight / 2;

    this._baseContainer.width = screenWidth;
    this._baseContainer.height = screenHeight;

    const scaleValue = Math.min(
      this._baseContainer.scale.x,
      this._baseContainer.scale.y
    );
    this._baseContainer.setTransform(0, 0, scaleValue, scaleValue);

    // A rudimentary set of positions to account for landscape and mobile
    // - with a proper parenting setup this could be handled more accurately.

    // Comment No.2 - I have MANUALLY positioned these elements. Never again.
    if (isLandscape) {
      this._drawBowl.scale = { x: 1, y: 1 };
      this._drawBowl.x = 90;
      this._drawBowl.y = 0 + this._drawBowl.height / 2;

      this._ballContainer.scale = { x: 1, y: 1 };
      this._ballContainer.x = this._drawBowl.x - 20;
      this._ballContainer.y = this._drawBowl.y + this._drawBowl.height + 20;

      this._gameConsole.scale = { x: 1, y: 1 };
      this._gameConsole.x =
        this._ballContainer.x + this._ballContainer.width + 50;
      this._gameConsole.y = this._ballContainer.y - 70;

      this._winBanner.scale = { x: 1, y: 1 };
      this._winBanner.x = this._drawBowl.x + 200;
      this._winBanner.y = this._drawBowl.y;

      this._explainText.x = 100;
      this._explainText.y = -this._explainText.height / 2;
    } else {
      this._drawBowl.scale = { x: 2, y: 2 };
      this._drawBowl.x = 160;
      this._drawBowl.y = 0 + this._drawBowl.height / 2;

      this._ballContainer.scale = { x: 2, y: 2 };
      this._ballContainer.x = this._drawBowl.x;
      this._ballContainer.y = this._drawBowl.y + this._drawBowl.height + 90;

      this._gameConsole.scale = { x: 3, y: 3 };
      this._gameConsole.x =
        this._ballContainer.x + this._ballContainer.width / 2 - 30;
      this._gameConsole.y = this._ballContainer.y + this._ballContainer.height;

      this._winBanner.scale = { x: 2, y: 2 };
      this._winBanner.x = this._drawBowl.x + 400;
      this._winBanner.y = this._drawBowl.y;

      this._explainText.x = 100;
      this._explainText.y = -this._explainText.height / 2;
    }
  }
}
