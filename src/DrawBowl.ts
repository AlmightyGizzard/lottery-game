import { Container, Sprite, Graphics } from "pixi.js";
import gsap from "gsap";
export class DrawBowl extends Container {
  private readonly _animatedPyg: Sprite;
  private readonly _bowl: Graphics;
  private animation: gsap.core.Timeline;
  constructor() {
    super();

    this._bowl = new Graphics();
    const radius = 80;

    this._bowl.beginFill(0x3e8989);
    this._bowl.drawCircle(0, 0, radius);
    this._bowl.endFill();
    this._bowl.beginFill(0x564d65);
    this._bowl.drawCircle(0, 0, radius * 0.9);
    this._bowl.endFill();

    this._animatedPyg = Sprite.from("pyg.png");
    this._animatedPyg.anchor.set(0.5);
    this._animatedPyg.scale = { x: 0.05, y: 0.05 };

    this.animation = gsap.timeline();

    this.addChild(this._bowl);
    this.addChild(this._animatedPyg);
  }

  public spin() {
    this.animation.to(this._animatedPyg, {
      duration: 2.5,
      rotation: 60,
    });
    this.animation.play();
  }

  public resetSpin() {
    this.animation.revert();
    this.animation.pause();
  }
}
