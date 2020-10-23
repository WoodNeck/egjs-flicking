import EventEmitter from "./EventEmitter";
import * as EVENTS from "~/consts/event";

class Viewport extends EventEmitter<{
}> {
  private _el: HTMLElement;
  private _size: { width: number, height: number };

  public get element() { return this._el; }
  public get size() { return this._size; }

  constructor(el: HTMLElement) {
    super();
    this._el = el;
    this._size = {
      width: 1,
      height: 1,
    };
  }

  public setSize({
    width,
    height,
  }: {
    width: number | string,
    height: number | string,
  }) {
    const el = this._el;
    if (width != null) {
      if (typeof width === "string") {
        el.style.width = width;
      } else {
        el.style.width = `${width}px`;
      }
    }
    if (height != null) {
      if (typeof height === "string") {
        el.style.height = height;
      } else {
        el.style.height = `${height}px`;
      }
    }
    this.updateSize();
  }

  public updateSize() {
    const el = this._el;

    this._size = {
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
  }
}

export default Viewport;
