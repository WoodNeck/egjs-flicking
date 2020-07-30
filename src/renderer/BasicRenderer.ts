import Renderer from "./Renderer";
import Panel from "~/core/Panel";

class BasicRenderer implements Renderer {
  private _panels: Panel[] = [];

  public get panels(): Panel[] { return this._panels; }

  constructor({} = {}) {

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
