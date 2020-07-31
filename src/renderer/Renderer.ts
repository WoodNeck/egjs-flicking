import Panel from "~/core/Panel";

export interface RendererOption {
  align: "left" | "center" | "right" | number;
}

interface Renderer {
  panels: Panel[];
  // getVisiblePanels
  collectPanels(el: HTMLElement): void;
  updatePanelSize(): void;
}

export default Renderer;
