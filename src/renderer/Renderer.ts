import Panel from "~/core/Panel";

interface Renderer {
  panels: Panel[];
  // getVisiblePanels
  gatherPanels(el: HTMLElement): void;
  applyStyle(): void;
  updatePanelSize(): void;
}

export default Renderer;
