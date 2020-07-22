import Renderer from "./Renderer";
import Panel from "~/core/Panel";

// TODO: This should render all panels
class BasicRenderer implements Renderer {
  public get panels(): Panel[] { return []; }
}

export default BasicRenderer;
