import Panel from "~/core/Panel";

export interface RendererOption {
  align: "left" | "top" | "center" | "right" | "bottom" | number;
}

interface Renderer {
  panels: Panel[];
  align: RendererOption["align"];
  // getVisiblePanels
  collectPanels(el: HTMLElement): void;
  updatePanelSize(): void;
}

export default Renderer;
