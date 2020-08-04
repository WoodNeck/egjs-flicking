class Panel {
  private _el: HTMLElement;
  private _size: { width: number, height: number };
  private _margin: { left: number, right: number, top: number, bottom: number };
  private _align: "left" | "center" | "right" | number;

  public get element() { return this._el; }

  constructor({
    el,
  }: {
    el: HTMLElement,
  }) {
    this._el = el;

    // Minimum default values
    this._size = { width: 1, height: 1};
    this._margin = { left: 0, right: 0, top: 0, bottom: 0 };
  }

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
  }

  public setAlignPoint() {

  }
}

export default Panel;
