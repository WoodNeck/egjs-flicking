import Component from "./core/Component";
import Animator from "./core/Animator";
import Viewport from "./core/Viewport";
import Renderer from "./renderer/Renderer";
import Control from "./control/Control";
import Camera from "./camera/Camera";
import { FLICKING } from "./consts/event";
import { checkExistence, getElement } from "./utils";

class Flicking extends Component<{
  [FLICKING.INIT]: Flicking,
}> {
  // Core components
  private _viewport: Viewport;
  private _animator: Animator;

  // User selection
  private _renderer: Renderer;
  private _camera: Camera;
  private _control: Control | null;

  public get renderer() { return this._renderer; }
  public get camera() { return this._camera; }
  public get control() { return this._control; }

  constructor(root: HTMLElement | string, {
    autoInit = true,
    renderer,
    camera,
    control = null,
  }: {
    autoInit: boolean,
    renderer: Renderer,
    camera: Camera,
    control: Control | null,
  }) {
    super();

    // These components should be provided
    checkExistence(renderer, "Renderer");
    checkExistence(camera, "Camera");

    this._viewport = new Viewport(getElement(root));
    this._animator = new Animator();

    this._renderer = renderer;
    this._camera = camera;
    this._control = control;

    if (autoInit) {
      this.init();
    }
  }

  public init() {
    this.resize();

    this.trigger(FLICKING.INIT, this);
  }

  public resize() {
    const viewport = this._viewport;
    const renderer = this._renderer;

    viewport.updateSize();
  }
}

export default Flicking;
