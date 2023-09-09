import { Container, Sprite, Text, TextStyle } from "pixi.js";

export class Scene extends Container {
  private readonly screenWidth: number;
  private readonly screenHeight: number;

  // We promoted clampy to a member of the class
  private clampy: Sprite;
  private baseContainer: Container;
  private pyg: Sprite;
  private textTest: Text;
  constructor(screenWidth: number, screenHeight: number) {
    super(); // Mandatory! This calls the superclass constructor.

    // see how members of the class need `this.`?
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;

    // Now clampy is a class member, we will be able to use it in another methods!
    this.clampy = Sprite.from("clampy.png");

    this.clampy.anchor.set(0.5);
    this.clampy.x = this.screenWidth / 2;
    this.clampy.y = this.screenHeight / 2;
    this.addChild(this.clampy);

    this.baseContainer = new Container();
    this.baseContainer.x = 200;
    this.baseContainer.y = 0;
    this.addChild(this.baseContainer);

    const style = new TextStyle({
      align: "center",
      fill: "#ff00ff",
      fontSize: 42,
    });
    this.textTest = new Text("Wassup", style);

    this.pyg = Sprite.from("pyg.png");
    this.pyg.scale = { x: 0.1, y: 0.1 };

    this.clampy = Sprite.from("clampy.png");
    this.clampy.anchor.set(0.5);
    this.clampy.x = this.screenWidth / 2;
    this.clampy.y = this.screenHeight / 2;

    this.baseContainer.addChild(this.clampy);
    this.clampy.addChild(this.pyg);

    this.baseContainer.addChild(this.textTest);
  }
}
