class Viewport {
  private _el: HTMLElement;
  private _size: { width: number, height: number };

  public get element() { return this._el; }
  public get size() { return this._size; }

  constructor(el: HTMLElement) {
    this._el = el;
    this._size = {
      width: 1,
      height: 1,
    };
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
