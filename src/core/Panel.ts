import EventEmitter from "~/core/EventEmitter";
import * as EVENTS from "~/consts/event";
import * as OPTIONS from "~/consts/option";
import { ValueOf } from "~/types/internal";
import { parseAlign } from "~/utils";

class Panel extends EventEmitter<{
  [EVENTS.PANEL.RESIZE]: ({
    width: Panel["width"],
    height: Panel["height"],
    target: Panel,
  }),
}> {
  private _el: HTMLElement;
  private _size: { width: number, height: number };
  private _margin: { left: number, right: number, top: number, bottom: number };
  private _align: ValueOf<typeof OPTIONS.ALIGN> | number;
  private _alignPos: number; // Actual align pos
  private _horizontal: boolean;

  public get element() { return this._el; }
  public get width() { return this._size.width + this._margin.left + this._margin.right; }
  public get height() { return this._size.height + this._margin.top + this._margin.bottom; }

  // Options
  public get align() { return this._align; }
  public set align(val: Panel["_align"]) {
    this._align = val;
    this._updateAlignPos();
  }

  constructor({
    el,
    align,
  }: {
    el: HTMLElement,
    align: Panel["_align"],
  }) {
    super();
    this._el = el;

    // Default values
    this._size = { width: 1, height: 1};
    this._margin = { left: 0, right: 0, top: 0, bottom: 0 };
    this._alignPos = 0;
    this._horizontal = true;

    // Options
    this.align = align;
  }

  /**
   * You should call {@link Renderer}'s {@link Renderer#updatePanelPosition updatePanelPosition} after it to take its effect.
   */
  public resize() {
    const el = this._el;
    const elStyle = window.getComputedStyle(el) || (el as any).currentStyle as CSSStyleDeclaration;

    this._size = {
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
    this._margin = {
      left: parseFloat(elStyle.marginLeft),
      right: parseFloat(elStyle.marginRight),
      top: parseFloat(elStyle.marginTop),
      bottom: parseFloat(elStyle.marginBottom),
    };

    this._updateAlignPos();

    this.emit(EVENTS.PANEL.RESIZE, {
      width: this.width,
      height: this.height,
      target: this,
    });
  }

  public reposition(offset: number) {

  }

  private _updateAlignPos() {
    this._alignPos = parseAlign(this._align, this._horizontal ? this.width : this.height);
  }
}

export default Panel;
