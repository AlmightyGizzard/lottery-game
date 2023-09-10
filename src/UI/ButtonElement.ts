import {
  Container,
  Graphics,
  TextStyle,
  Text,
  FederatedPointerEvent,
} from "pixi.js";
import gsap from "gsap";

export class ButtonElement extends Container {
  private readonly _buttonText: Text;
  private readonly _colour: number;
  private readonly _outlineColour: number;

  private readonly _buttonFunction: () => void;

  constructor(
    text: string,
    width: number,
    height: number,
    buttonFunction: () => void,
    textStyle: TextStyle,
    colour: number,
    outlineColour: number
  ) {
    super();

    this._colour = colour ?? 0xff00ff;
    this._outlineColour = outlineColour ?? 0x000000;
    this._buttonFunction = buttonFunction;

    // Sort out the main shape of the button.
    const buttonArea = new Graphics();
    buttonArea.beginFill(this._colour);
    buttonArea.lineStyle(1, this._outlineColour);
    buttonArea.drawRoundedRect(-width / 2, -height / 2, width, height, 20);
    buttonArea.endFill();

    buttonArea.on("pointertap", this.onClick, this);
    buttonArea.eventMode = "dynamic";

    // Sort out the text overlaid atop the button.
    this._buttonText = new Text(text, textStyle);
    this._buttonText.x = -this._buttonText.width / 2;
    this._buttonText.y = -this._buttonText.height / 2;

    this.addChild(buttonArea);
    buttonArea.addChild(this._buttonText);
  }

  private onClick(e: FederatedPointerEvent): void {
    console.log("You interacted with ", this._buttonText.text);
    console.log(e.NONE);
    this._buttonFunction();
  }

  public show(): void {
    const tl = gsap.timeline();
    this.visible = true;
    tl.to(this, {
      alpha: 1,
      duration: 0.2,
    });
  }

  public hide(): void {
    const tl = gsap.timeline();
    tl.to(this, {
      alpha: 0,
      onComplete: () => {
        this.visible = false;
      },
      duration: 0.2,
    });
  }
}
