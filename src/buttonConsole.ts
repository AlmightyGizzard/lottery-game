import { Container } from "pixi.js";
import { buttonElement } from "./buttonElement";

export class buttonConsole extends Container {
  private buttons: buttonElement[];
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
    colour?: number,
    outlineColour?: number
  ) {
    const button = new buttonElement(
      text,
      width,
      height,
      colour ?? 0x000000,
      outlineColour ?? 0xff00ff
    );
    this.buttons.push(button);
    this.addChild(button);
    this.updateList();
  }

  private updateList(): void {
    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i];
      button.y = this._spacing * i - button.height / 2;
    }
  }
}