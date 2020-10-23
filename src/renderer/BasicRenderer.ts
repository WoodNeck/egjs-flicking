import Renderer, { RendererOption } from "./Renderer";
import Panel from "~/core/Panel";
import * as OPTIONS from "~/consts/option";
import Flicking from "~/Flicking";

export interface BasicRendererOption extends RendererOption {

}

class BasicRenderer implements Renderer {
  private _flicking: Flicking;
  private _panels: Panel[] = [];

  // Options
  private _align: BasicRendererOption["align"];

  public get panels() { return this._panels; }

  // Options getter/setter
  public get align() { return this._align; }
  public set align(val: BasicRendererOption["align"]) {
    this._align = val;
    this._panels.forEach(panel => panel.align = val);
  }

  constructor({
    align = OPTIONS.ALIGN.LEFT,
  }: Partial<BasicRendererOption> = {}) {
    this.align = align;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;
    this._collectPanels(flicking.camera.element);
    return this;
  }

  public updatePanelSize() {
    this._panels.forEach(panel => panel.resize());
    return this;
  }

  public updatePanelPosition() {

    return this;
  }

  private _collectPanels(cameraEl: HTMLElement) {
    this._panels = Array.from(cameraEl.children)
      .map((el: HTMLElement) => new Panel({ el, align: this._align }));
    return this;
  }
}

export default BasicRenderer;
