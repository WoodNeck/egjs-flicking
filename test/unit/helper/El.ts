import { ValueOf } from "~/types/internal";

// Flicking Element
class El {
  public static get DEFAULT_STRUCTURE() {
    return El.viewport().add(
      El.camera().add(
        El.panel().setWidth("100%"),
        El.panel().setWidth("100%"),
        El.panel().setWidth("100%"),
      ),
    );
  }

  public static viewport() {
    return new El(EL_TYPE.VIEWPORT);
  }

  public static camera() {
    return new El(EL_TYPE.CAMERA);
  }

  public static panel(width?: string, height?: string) {
    const el = new El(EL_TYPE.PANEL);
    if (width) {
      el.setWidth(width);
    }
    if (height) {
      el.setHeight(height);
    }
    return el;
  }

  private _el: HTMLElement;

  public get el() { return this._el; }

  constructor(type: ValueOf<typeof EL_TYPE>) {
    this._el = document.createElement("div");
    this._el.classList.add(type);
  }

  public add(...els: El[]) {
    els.forEach(el => {
      this._el.appendChild(el._el);
    });
    return this;
  }

  public setWidth(widthCSS: string) {
    this._el.style.width = widthCSS;
    return this;
  }

  public setHeight(heightCSS: string) {
    this._el.style.height = heightCSS;
    return this;
  }
}

export default El;

export const EL_TYPE = {
  VIEWPORT: "flicking-viewport",
  CAMERA: "flicking-camera",
  PANEL: "flicking-panel",
};
