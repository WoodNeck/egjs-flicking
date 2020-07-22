import Renderer from "./Renderer";
import Panel from "~/core/Panel";

class BasicRenderer implements Renderer {
  private _panels: Panel[] = [];

  public get panels(): Panel[] { return this._panels; }

  constructor({} = {}) {

  }
}

export default BasicRenderer;
