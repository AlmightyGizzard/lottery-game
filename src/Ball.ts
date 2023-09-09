import { Container, Graphics, TextStyle, Text } from "pixi.js";

export class Ball extends Container {
  private readonly _number: Text;
  private readonly _colour: number;

  constructor(number: number, colour: number) {
    super();

    this._colour = colour;

    const radius = 25;

    const ballBackground = new Graphics();
    ballBackground.beginFill(this._colour);
    ballBackground.drawCircle(0, 0, radius);
    ballBackground.endFill();
    ballBackground.beginFill(0xffffff);
    ballBackground.drawCircle(0, 0, radius * 0.6);
    ballBackground.endFill();

    const style = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 16,
    });
    this._number = new Text(number, style);
    this._number.x = -this._number.width / 2;
    this._number.y = -this._number.height / 2;

    this.addChild(ballBackground);
    ballBackground.addChild(this._number);
  }
}
