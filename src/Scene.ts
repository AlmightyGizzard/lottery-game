import { gsap } from "gsap";
import { PixiPlugin, CSSPlugin } from "gsap/all";
import { Container, Sprite } from "pixi.js";
// import { buttonElement } from "./buttonElement";
import { buttonConsole } from "./buttonConsole";
import { IScene } from "./SceneManager";

export class Scene extends Container implements IScene {
  // We promoted clampy to a member of the class
  private pyg: Sprite;
  private animatedPyg: Sprite;

  private baseContainer: Container;

  private gameConsole: buttonConsole;
  //   private buttonTestA: buttonElement;
  //   private buttonTestB: buttonElement;
  constructor() {
    super(); // Mandatory! This calls the superclass constructor.

    gsap.registerPlugin(PixiPlugin, CSSPlugin);

    this.baseContainer = new Container();

    this.pyg = Sprite.from("pyg.png");
    this.pyg.anchor.set(0.5);
    this.pyg.scale = { x: 0.05, y: 0.05 };
    this.pyg.x = -200;
    this.pyg.y = 100;

    this.animatedPyg = Sprite.from("pyg.png");
    this.animatedPyg.anchor.set(0.5);
    this.animatedPyg.scale = { x: 0.05, y: 0.05 };
    this.animatedPyg.x = -200;
    this.animatedPyg.y = -100;

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
    this.baseContainer.addChild(this.pyg);

    this.addChild(this.baseContainer);
  }

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
