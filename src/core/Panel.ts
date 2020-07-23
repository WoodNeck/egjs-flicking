class Panel {
  private _el: HTMLElement;
  private _size: { width: number, height: number };

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
    this._size = {
      width: el.offsetWidth,
      height: el.offsetHeight,
    }
  }
}

export default Panel;
