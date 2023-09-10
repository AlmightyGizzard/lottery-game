import { Container, Graphics, TextStyle, Text } from "pixi.js";
import { ButtonConsole } from "./UI/ButtonConsole";

export class Ball extends Container {
  private readonly _textElement: Text;
  private _number: number;
  private _colour: number;
  private _graphic: Graphics;

  constructor(number: number, buttons = false, style?: TextStyle) {
    super();

    this._colour = 0xff0000;
    this._number = number;

    const textStyle =
      style ??
      new TextStyle({
        align: "center",
        fill: "#000000",
        fontSize: 16,
      });
    this._textElement = new Text(number, textStyle);

    this._graphic = new Graphics();
    this.setNumber(number);

    if (buttons) {
      const textStyle = new TextStyle({
        align: "center",
        fill: "#ffffff",
        fontSize: 8,
      });

      const arrowConsole = new ButtonConsole(25);
      arrowConsole.createButton(
        "Up",
        20,
        20,
        () => {
          const addedNum = this._number + 1;
          const newValue = addedNum > 59 ? 1 : addedNum;
          this.setNumber(newValue);
        },
        textStyle
      );
      arrowConsole.createButton(
        "Down",
        20,
        20,
        () => {
          const subtractedNum = this._number - 1;
          const newValue = subtractedNum < 1 ? 59 : subtractedNum;
          this.setNumber(newValue);
        },
        textStyle
      );
      arrowConsole.y = -50;
      this.addChild(arrowConsole);
    }

    this.addChild(this._graphic);
    this._graphic.addChild(this._textElement);
  }

  public draw(): void {
    this._graphic.clear();
    const radius = 20;

    this._graphic.beginFill(this._colour);
    this._graphic.drawCircle(0, 0, radius);
    this._graphic.endFill();
    this._graphic.beginFill(0xffffff);
    this._graphic.drawCircle(0, 0, radius * 0.6);
    this._graphic.endFill();
  }

  public setNumber(value: number): void {
    this._number = value;
    this._textElement.text = this._number;

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

      this._textElement.x = -this._textElement.width / 2;
      this._textElement.y = -this._textElement.height / 2;
    }

    this.draw();
  }

  public getNumber(): number {
    return this._number;
  }
}
