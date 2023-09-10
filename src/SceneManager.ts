import { Application, DisplayObject } from "pixi.js";
// import { Scene } from "./Scene";

export class SceneManager {
  private constructor() {
    /*this class is purely static. No constructor to see here*/
  }

  private static app: Application;
  private static currentScene: IScene;

  public static get width(): number {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }
  public static get height(): number {
    return Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
  }

  // Use this function ONCE to start the entire machinery
  public static initialize(background: number): void {
    // Create our pixi app
    SceneManager.app = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
    });

    // Add the ticker
    SceneManager.app.ticker.add(SceneManager.update);

    window.addEventListener("resize", SceneManager.resize);
    SceneManager.resize();
  }

  public static resize(): void {
    if (SceneManager.currentScene) {
      SceneManager.currentScene.resize(SceneManager.width, SceneManager.height);
    }
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    // Remove and destroy old scene... if we had one..
    if (SceneManager.currentScene) {
      SceneManager.app.stage.removeChild(SceneManager.currentScene);
      SceneManager.currentScene.destroy();
    }

    // Add the new one
    SceneManager.currentScene = newScene;
    SceneManager.app.stage.addChild(SceneManager.currentScene);
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(framesPassed: number): void {
    // Let the current scene know that we updated it...
    // Just for funzies, sanity check that it exists first.
    if (SceneManager.currentScene) {
      SceneManager.currentScene.update(framesPassed);
    }
  }
}

export interface IScene extends DisplayObject {
  update(framesPassed: number): void;

  resize(screenWidth: number, screenHeight: number): void;
}
