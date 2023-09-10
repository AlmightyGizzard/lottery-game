import { Container, Text, TextStyle, Graphics, DisplayObject } from "pixi.js";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export class WinBanner extends Container {
  private readonly _bannerText: Text;
  private readonly _valueText: Text;

  constructor(width: number, height: number) {
    super();

    gsap.registerPlugin(PixiPlugin);

    PixiPlugin.registerPIXI({
      DisplayObject: DisplayObject,
    });

    const bannerArea = new Graphics();
    bannerArea.beginFill(0x2dd81);
    bannerArea.lineStyle(1, 0x564d65);
    bannerArea.drawRoundedRect(-width / 2, -height / 2, width, height, 20);
    bannerArea.endFill();

    const bannerStyle = new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: 24,
    });
    const valueStyle = new TextStyle({
      align: "center",
      fill: "#ffffff",
      fontSize: 32,
    });
    this._bannerText = new Text("YOU WIN!", bannerStyle);
    this._valueText = new Text("£69", valueStyle);
    const offset = 20;

    this._bannerText.x = -this._bannerText.width / 2;
    this._bannerText.y = -this._bannerText.height / 2 - offset;

    this._valueText.x = -this._valueText.width / 2;
    this._valueText.y = -this._valueText.height / 2 + offset;

    this.addChild(bannerArea);
    bannerArea.addChild(this._bannerText);
    bannerArea.addChild(this._valueText);
  }

  public show(value: number): void {
    const tl = gsap.timeline();
    this.visible = true;
    this._valueText.text = value;

    this.scale = { x: 0, y: 0 };
    tl.to(this, { alpha: 1, duration: 0.1 });
    tl.to(this, { pixi: { scale: 1.2 }, duration: 0.45 });
    tl.to(this, { pixi: { scale: 1 }, duration: 0.55 });
    tl.play();
  }

  public hide(): void {
    const tl = gsap.timeline();
    tl.to(this, {
      alpha: 0,
      onComplete: () => {
        this.visible = false;
      },
    });
  }
}
