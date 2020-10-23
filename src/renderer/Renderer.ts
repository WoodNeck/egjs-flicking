import Flicking from "~/Flicking";
import Panel from "~/core/Panel";
import * as OPTIONS from "~/consts/option";
import { ValueOf } from "~/types/internal";

export interface RendererOption {
  align: ValueOf<typeof OPTIONS.ALIGN> | number;
}

interface Renderer {
  panels: Panel[];
  align: RendererOption["align"];
  // getVisiblePanels
  init(flicking: Flicking): this;
  updatePanelSize(): this;
  updatePanelPosition(): this;
}

export default Renderer;
