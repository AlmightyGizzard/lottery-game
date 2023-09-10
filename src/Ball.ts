import { Container, Graphics, TextStyle, Text } from "pixi.js";

export class Ball extends Container {
  private readonly _number: Text;
  private _colour: number;
  private _graphic: Graphics;

  constructor(number: number) {
    super();

    this._colour = 0xff0000;

    const style = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 16,
    });
    this._number = new Text(number, style);
    this._number.x = -this._number.width / 2;
    this._number.y = -this._number.height / 2;

    this._graphic = new Graphics();
    this.setNumber(number);

    this.addChild(this._graphic);
    this._graphic.addChild(this._number);
  }

  public draw(): void {
    this._graphic.clear();
    const radius = 20;

    console.log(this._colour);
    this._graphic.beginFill(this._colour);
    this._graphic.drawCircle(0, 0, radius);
    this._graphic.endFill();
    this._graphic.beginFill(0xffffff);
    this._graphic.drawCircle(0, 0, radius * 0.6);
    this._graphic.endFill();
  }

  public setNumber(value: number): void {
    this._number.text = value;
    console.log("VALUE", value);
    if (1 <= value && value <= 59) {
      if (value <= 9) {
        // Colour for 1-9 balls = white
        this._colour = 0xdddddd;
      } else if (value <= 19) {
        // Colour for 10-19 balls = Blue
        this._colour = 0x323fdf;
      } else if (value <= 29) {
        // Colour for 20-29 balls = Pink
        this._colour = 0xff00ff;
      } else if (value <= 39) {
        // Colour for 30-39 balls = green
        this._colour = 0x00ff00;
      } else if (value <= 49) {
        // Colour for 40-49 balls = yellow
        this._colour = 0xddff00;
      } else if (value <= 59) {
        // Colour for 50-59 balls = purple
        this._colour = 0xa007a0;
      }
    }

    this.draw();
  }
}
