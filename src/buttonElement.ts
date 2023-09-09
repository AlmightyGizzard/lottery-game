import {
  Container,
  Graphics,
  TextStyle,
  Text,
  FederatedPointerEvent,
} from "pixi.js";

export class buttonElement extends Container {
  private readonly _buttonText: Text;
  private readonly _colour: number;
  private readonly _outlineColour: number;

  constructor(
    text: string,
    width: number,
    height: number,
    colour: number,
    outlineColour: number
  ) {
    super();

    this._colour = colour ?? 0xff00ff;
    this._outlineColour = outlineColour ?? 0x000000;

    // Sort out the main shape of the button.
    const buttonArea = new Graphics();
    buttonArea.beginFill(this._colour);
    buttonArea.lineStyle(3, this._outlineColour);
    buttonArea.drawRoundedRect(-width / 2, -height / 2, width, height, 20);

    buttonArea.on("pointertap", this.onClick, this);
    buttonArea.eventMode = "dynamic";

    // Sort out the text overlaid atop the button.
    const style = new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 42,
    });
    this._buttonText = new Text(text, style);
    this._buttonText.x = -this._buttonText.width / 2;
    this._buttonText.y = -this._buttonText.height / 2;

    this.addChild(buttonArea);
    buttonArea.addChild(this._buttonText);
  }

  private onClick(e: FederatedPointerEvent): void {
    console.log("You interacted with ", this._buttonText.text);
    console.log("Button Data: ", e);
  }
}