import { gsap } from "gsap";
import { PixiPlugin, CSSPlugin } from "gsap/all";
import { Container, Sprite, Text, TextStyle, Ticker } from "pixi.js";

export class Scene extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;

  // We promoted clampy to a member of the class
  private pyg: Sprite;
  private animatedPyg: Sprite;

  private clampy: Sprite;
  private baseContainer: Container;

  private textTest: Text;
  constructor(screenWidth: number, screenHeight: number) {
    super(); // Mandatory! This calls the superclass constructor.

    gsap.registerPlugin(PixiPlugin, CSSPlugin);
    // see how members of the class need `this.`?
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    this.baseContainer = new Container();
    this.baseContainer.x = 0;
    this.baseContainer.y = 0;

    Ticker.shared.add(this.update, this);

    console.log(gsap);

    const style = new TextStyle({
      align: "center",
      fill: "#ff00ff",
      fontSize: 42,
    });
    this.textTest = new Text("Wassup", style);

    this.clampy = Sprite.from("clampy.png");
    this.clampy.anchor.set(0.5);
    this.clampy.x = this.screenWidth / 2;
    this.clampy.y = this.screenHeight / 2;

    this.pyg = Sprite.from("pyg.png");
    this.pyg.anchor.set(0.5);
    this.pyg.scale = { x: 0.11, y: 0.1 };
    this.pyg.x = 200;

    this.animatedPyg = Sprite.from("pyg.png");
    this.animatedPyg.anchor.set(0.5);
    this.animatedPyg.scale = { x: 0.11, y: 0.1 };
    this.animatedPyg.x = -200;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(this.animatedPyg, {
      duration: 5,
      x: 200,
      rotation: 60,
    });
    tl.play();

    console.log("PYG: ", tl);

    this.baseContainer.addChild(this.clampy);
    this.clampy.addChild(this.animatedPyg);
    this.clampy.addChild(this.pyg);

    this.baseContainer.addChild(this.textTest);

    this.addChild(this.baseContainer);
  }

  private update(): void {}
}
