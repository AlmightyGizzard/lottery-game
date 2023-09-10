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

SceneManager.initialize(0x564d65);

const scene: Scene = new Scene();
SceneManager.changeScene(scene);
// Strange bug I don't have time to troubleshoot, resize needs
// to be called twice here else it won't resize properly on initial start.
