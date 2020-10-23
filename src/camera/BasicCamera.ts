import Flicking from "~/Flicking";
import Camera, { CameraOption } from "./Camera";
import EventEmitter from "~/core/EventEmitter";
import { getElement, checkExistence, parseAlign } from "~/utils";
import * as EVENTS from "~/consts/event";
import * as OPTIONS from "~/consts/option";

export interface BasicCameraOption extends CameraOption {}

class BasicCamera extends EventEmitter<{
  [EVENTS.CAMERA.INIT]: BasicCamera;
}> implements Camera {
  // Options
  protected _elSelector: BasicCameraOption["elSelector"] = null;
  protected _align: BasicCameraOption["align"];

  // Internal states
  protected _flicking: Flicking | null = null;
  protected _el: HTMLElement;
  protected _position: number = 0;
  protected _alignPos: number = 0;

  /**
   * This value is undefined before initialization
   */
  public get element() { return this._el; }
  public get position() { return this._position; }
  public get alignPos() { return this._alignPos; }

  // Options getter/setter
  public get elSelector() { return this._elSelector; }
  public set elSelector(val: BasicCameraOption["elSelector"]) { this._elSelector = val; }
  public get align() { return this._align; }
  public set align(val: BasicCameraOption["align"]) {
    this._align = val;
    this.updateAlignPos();
  }

  constructor({
    align = OPTIONS.ALIGN.LEFT,
    elSelector = null,
  }: Partial<BasicCameraOption> = {}) {
    super();
    this._elSelector = elSelector;
    this.align = align;
  }

  public destroy() {
    this._flicking?.off(EVENTS.VIEWPORT.RESIZE, this._onViewportResize);
    return this;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;

    const viewportEl = flicking.viewport.element;

    if (this._elSelector) {
      this._el = getElement(this._elSelector, viewportEl);
    } else {
      checkExistence(viewportEl.firstElementChild, "First element child of viewport element");
      this._el = viewportEl.firstElementChild as HTMLElement;
    }

    flicking.on(EVENTS.VIEWPORT.RESIZE, this._onViewportResize);

    this.emit(EVENTS.CAMERA.INIT, this);

    return this;
  }

  public lookAt(pos: number) {
    this._position = pos - this._alignPos;
    this._applyTransform();
    return this;
  }

  public updateAlignPos(): this {
    const flicking = this._flicking;

    if (!flicking) return this;

    this._alignPos = parseAlign(this._align, flicking.viewport.size.width);

    return this;
  }

  private _onViewportResize = () => {
    this.updateAlignPos();
  }

  private _applyTransform() {
    const el = this._el;

    el.style.transform = `translate(${-this._position}px)`;
  }
}

export default BasicCamera;
