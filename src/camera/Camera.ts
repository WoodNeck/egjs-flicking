import EventEmitter from "~/core/EventEmitter";
import Viewport from "~/core/Viewport";
import { getElement, checkExistence } from "~/utils";
import * as EVENTS from "~/consts/event";
import * as OPTIONS from "~/consts/option";
import { ValueOf } from "~/types/internal";

export interface CameraOption {
  // HTMLElement to apply translation
  elSelector: HTMLElement | string | null;
  align: ValueOf<typeof OPTIONS.ALIGN> | number;
}

abstract class Camera extends EventEmitter<{
  [EVENTS.CAMERA.INIT]: Camera;
}> {
  // Options
  protected _elSelector: CameraOption["elSelector"] = null;
  protected _align: CameraOption["align"];

  // Internal states
  protected _viewport: Viewport | null = null;
  protected _el: HTMLElement;
  protected _position: number = 0;
  protected _focus: number = 0;

  /**
   * This value is null before initialization
   */
  public get element(): HTMLElement { return this._el; }

  public get position() { return this._position; }
  public get focus() { return this._focus; }

  // Options getter/setter
  public get elSelector() { return this._elSelector; }
  public set elSelector(val: CameraOption["elSelector"]) { this._elSelector = val; }
  public get align() { return this._align; }
  public set align(val: CameraOption["align"]) {
    this._align = val;
    this.updateFocus();
  }

  constructor({
    align = OPTIONS.ALIGN.LEFT,
    elSelector = null,
  }: Partial<CameraOption> = {}) {
    super();
    this._elSelector = elSelector;
    this.align = align;
  }

  public init(viewport: Viewport): this {
    this._viewport = viewport;

    if (this._elSelector) {
      this._el = getElement(this._elSelector, viewport.element);
    } else {
      checkExistence(viewport.element.firstElementChild, "First element child of viewport element");
      this._el = viewport.element.firstElementChild as HTMLElement;
    }

    this.trigger("init", this);

    return this;
  }

  public updateFocus(): this {
    if (!this._viewport) return this;

    const align = this._align;

    let alignPoint: number;
    if (typeof align === "string") {
      switch (align) {
        case OPTIONS.ALIGN.LEFT:
        case OPTIONS.ALIGN.TOP:
          alignPoint = 0;
          break;
        case OPTIONS.ALIGN.CENTER:
          alignPoint = 0.5;
          break;
        case OPTIONS.ALIGN.RIGHT:
        case OPTIONS.ALIGN.BOTTOM:
          alignPoint = 1;
          break;
        default:
          alignPoint = 0;
      }
    } else {
      // So, 1px from left/top isn't possible.
      alignPoint = align;
    }

    if (alignPoint <= 1) {
      this._focus = alignPoint * this._viewport.size.width;
    } else {
      this._focus = alignPoint;
    }

    return this;
  }

  public abstract copy(other: Camera): this;
}

export default Camera;
