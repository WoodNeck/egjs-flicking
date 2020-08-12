import Component from "./core/Component";
import Animator from "./core/Animator";
import Viewport from "./core/Viewport";
import Renderer from "./renderer/Renderer";
import Control from "./control/Control";
import Camera from "./camera/Camera";
import * as EVENTS from "./consts/event";
import * as OPTIONS from "./consts/option";
import { checkExistence, getElement } from "./utils";
import { ValueOf } from "./types/internal";

class Flicking extends Component<{
  [EVENTS.FLICKING.INIT]: Flicking,
  [EVENTS.FLICKING.RESIZE]: ({
    size: Viewport["size"],
    target: Flicking,
  }),
}> {
  // Core components
  private _viewport: Viewport;
  private _animator: Animator;

  // User selection
  private _renderer: Renderer;
  private _camera: Camera;
  private _control: Control | null;

  // Internal states
  private _initialized = false;

  // Options
  private _align: ValueOf<typeof OPTIONS.ALIGN> | null;
  private _direction: ValueOf<typeof OPTIONS.DIRECTION>;
  private _autoInit: boolean;
  private _autoResize: boolean;

  public get viewport() { return this._viewport; }
  public get animator() { return this._animator; }
  public get renderer() { return this._renderer; }
  public get camera() { return this._camera; }
  public get control() { return this._control; }

  // Options getter/setter
  public get align() { return this._align; }
  public set align(val: Flicking["_align"]) {
    if (val) {
      this._camera.align = val;
      this._renderer.align = val;
    }
    this._align = val;
  }
  public get direction() { return this._direction; }
  public set direction(val: Flicking["_direction"]) {
    this._direction = val;
  }
  public get autoInit() { return this._autoInit; }
  public set autoInit(val: Flicking["_autoInit"]) {
    if (val && !this._initialized) {
      this.init();
    }
    this._autoInit = val;
  }
  public get autoResize() { return this._autoResize; }
  public set autoResize(val: Flicking["_autoResize"]) {
    window.removeEventListener(EVENTS.BROWSER.RESIZE, this.resize);
    if (val) {
      window.addEventListener(EVENTS.BROWSER.RESIZE, this.resize);
    }
    this._autoResize = val;
  }

  constructor(root: HTMLElement | string, {
    renderer,
    camera,
    control = null,
    align = null,
    direction = OPTIONS.DIRECTION.HORIZONTAL,
    autoInit = true,
    autoResize = true,
  }: {
    renderer: Renderer;
    camera: Camera;
    control: Control | null;
    align?: Flicking["_align"];
    direction?: Flicking["_direction"];
    autoInit?: Flicking["_autoInit"];
    autoResize?: Flicking["_autoResize"];
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

    // Bind options
    this.align = align;
    this.direction = direction;
    this.autoInit = autoInit;
    this.autoResize = autoResize;
  }

  public init(): this {
    if (this._initialized) return this;

    const viewport = this._viewport;
    const camera = this._camera;
    const renderer = this._renderer;

    camera.init(viewport);
    renderer.collectPanels(camera.element);

    this.resize();

    this._initialized = true;
    this.trigger(EVENTS.FLICKING.INIT, this);

    return this;
  }

  public resize = (): this => {
    const viewport = this._viewport;
    const renderer = this._renderer;
    const camera = this._camera;

    viewport.updateSize();
    renderer.updatePanelSize();
    camera.updateFocus();

    this.trigger(EVENTS.FLICKING.RESIZE, {
      size: viewport.size,
      target: this,
    });

    return this;
  }
}

export default Flicking;
