import Component from "~/core/Component";
import Viewport from "~/core/Viewport";
import { getElement, checkExistence } from "~/utils";
import { EVENTS } from "..";

export interface CameraOption {
  // HTMLElement to apply translation
  element: HTMLElement | string | null;
}

export interface CameraEvents {
  "init": void;
}

abstract class Camera<T extends CameraEvents = CameraEvents> extends Component<CameraEvents> {
  // Options
  protected _elSelector: HTMLElement | string | null = null;

  // Internal states
  protected _viewport: Viewport;
  protected _el: HTMLElement;
  protected _position: number = 0;
  protected _focus: number = 0;

  /**
   * This value is null before initialization
   */
  public get element(): HTMLElement { return this._el; }
  public set element(val: CameraOption["element"]) {
    this._elSelector = val;
    if (this._viewport) {
      if (this._el) {
        // TODO: Remove style for previous el
      }
      this._el = getElement(this._elSelector, this._viewport.element);
    }
  }

  public get position() { return this._position; }
  public get focus() { return this._focus; }

  constructor({
    element = null,
  }: Partial<CameraOption> = {}) {
    super();
    this._elSelector = element;
  }

  public init(viewport: Viewport): this {
    this._viewport = viewport;

    if (this._elSelector) {
      this._el = getElement(this._elSelector, viewport.element);
    } else {
      checkExistence(viewport.element.firstElementChild, "First element child of viewport element");
      this._el = viewport.element.firstElementChild as HTMLElement;
    }

    this.trigger("init")

    return this;
  }

  public setFocus(val: number): this {
    return this;
  }

  public updateFocus(): this {
    return this;
  }

  public abstract copy(other: Camera): this;
}

export default Camera;
