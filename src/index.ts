// import { Application } from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";

// const app = new Application({
//   view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
//   resolution: window.devicePixelRatio || 1,
//   autoDensity: true,
//   backgroundColor: 0x6495ed,
//   width: 640,
//   height: 480,
//   resizeTo: window,
// });

SceneManager.initialize(640, 480, 0x696969);

const scene: Scene = new Scene();
scene.resize(SceneManager.width, SceneManager.height);
SceneManager.changeScene(scene);
