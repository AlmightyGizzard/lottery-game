import { gsap } from "gsap";
import { PixiPlugin, CSSPlugin } from "gsap/all";
import { Container, Sprite } from "pixi.js";
// import { buttonElement } from "./buttonElement";
import { buttonConsole } from "./buttonConsole";

export class Scene extends Container {
  // We promoted clampy to a member of the class
  private pyg: Sprite;
  private animatedPyg: Sprite;

  private baseContainer: Container;

  private gameConsole: buttonConsole;
  //   private buttonTestA: buttonElement;
  //   private buttonTestB: buttonElement;
  constructor(screenWidth: number, screenHeight: number) {
    super(); // Mandatory! This calls the superclass constructor.

    gsap.registerPlugin(PixiPlugin, CSSPlugin);

    const centreX = screenWidth / 2;
    const centreY = screenHeight / 2;

    this.baseContainer = new Container();
    this.baseContainer.x = centreX;
    this.baseContainer.y = centreY;

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

    // BUTTON TEST

    this.gameConsole = new buttonConsole(150);
    this.gameConsole.createButton("Play", 200, 100);
    this.gameConsole.createButton("Quit", 200, 100);

    // this.buttonTestA = new buttonElement("Play", 200, 100);
    // this.buttonTestA.y = -200;

    // this.buttonTestB = new buttonElement("Quit", 200, 100);
    // this.buttonTestB.y = 200;

    this.baseContainer.addChild(this.gameConsole);
    // this.baseContainer.addChild(this.buttonTestB);

    this.baseContainer.addChild(this.animatedPyg);
    this.baseContainer.addChild(this.pyg);

    this.addChild(this.baseContainer);
  }
}
