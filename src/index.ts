// import { Application } from "pixi.js";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";

SceneManager.initialize(0x564d65);

const scene: Scene = new Scene();
SceneManager.changeScene(scene);
