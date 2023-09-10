import { Container } from "pixi.js";
import { ButtonElement } from "./ButtonElement";

export class ButtonConsole extends Container {
  private buttons: ButtonElement[];
  private readonly _spacing: number;
  constructor(spacing: number) {
    super();

    this._spacing = spacing;
    this.buttons = [];
  }

  public createButton(
    text: string,
    width: number,
    height: number,
    buttonFunction: () => void,
    colour?: number,
    outlineColour?: number
  ): ButtonElement {
    const button = new ButtonElement(
      text,
      width,
      height,
      buttonFunction,
      colour ?? 0x000000,
      outlineColour ?? 0xff00ff
    );
    this.buttons.push(button);
    this.addChild(button);
    this.updateList();
    return button;
  }

  private updateList(): void {
    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i];
      button.y = this._spacing * i - button.height / 2;
    }
  }
}
