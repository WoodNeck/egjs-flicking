class Panel {
  private _el: HTMLElement;
  private _size: { width: number, height: number };
  private _margin: { left: number, right: number, top: number, bottom: number };

  public get element() { return this._el; }

  constructor({
    el,
  }: {
    el: HTMLElement,
  }) {
    this._el = el;
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
