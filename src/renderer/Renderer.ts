import Panel from "~/core/Panel";

interface Renderer {
  panels: Panel[];
  // getVisiblePanels
  collectPanels(el: HTMLElement): void;
  updatePanelSize(): void;
}

export default Renderer;
