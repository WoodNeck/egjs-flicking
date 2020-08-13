import Renderer, { RendererOption } from "./Renderer";
import Panel from "~/core/Panel";
import * as OPTIONS from "~/consts/option";

export interface BasicRendererOption extends RendererOption {

}

class BasicRenderer implements Renderer {
  private _panels: Panel[] = [];
  private _align: BasicRendererOption["align"];

  public get panels() { return this._panels; }
  public get align() { return this._align; }
  public set align(val: BasicRendererOption["align"]) {
    this._align = val;
    this._panels.forEach(panel => panel.align = val);
  }

  constructor({
    align = OPTIONS.ALIGN.LEFT,
  }: Partial<RendererOption> = {}) {
    this.align = align;
  }

  public collectPanels(cameraEl: HTMLElement) {
    this._panels = Array.from(cameraEl.children)
      .map((el: HTMLElement) => new Panel({ el }));
  }

  public updatePanelSize() {
    this._panels.forEach(panel => panel.resize());
  }
}

export default BasicRenderer;
