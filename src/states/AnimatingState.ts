import State from "./State";
import { STATE_TYPE, EVENTS, MOVE_TYPE } from "../consts";
import { FlickingContext } from "../types";
import { circulate, isBetween } from "../utils";
import Viewport from "../components/Viewport";

class AnimatingState extends State {
  public readonly type = STATE_TYPE.ANIMATING;
  public readonly holding = false;
  public readonly playing = true;

  public onHold(e: any, { viewport, triggerEvent, transitTo }: FlickingContext): void {
    const scrollArea = viewport.getScrollArea();
    const scrollAreaSize = viewport.getScrollAreaSize();
    const loopCount = Math.floor((this.lastPosition + this.delta - scrollArea.prev) / scrollAreaSize);

    const targetPanel = this.targetPanel;
    if (loopCount !== 0 && targetPanel) {
      const cloneCount = viewport.panelManager.getCloneCount();
      const originalTargetPosition = targetPanel.getPosition();

      // cloneIndex is from -1 to cloneCount - 1
      const newCloneIndex = circulate(targetPanel.getCloneIndex() - loopCount, -1, cloneCount - 1, true);
      const newTargetPosition = originalTargetPosition - loopCount * scrollAreaSize;
      const newTargetPanel = targetPanel.getIdenticalPanels()[newCloneIndex + 1].clone(newCloneIndex, true);

      // Set new target panel considering looped count
      newTargetPanel.setPosition(newTargetPosition, true);
      this.targetPanel = newTargetPanel.getOriginalPanel();
    }

    // Reset last position and delta
    this.delta = 0;
    this.lastPosition = viewport.getCameraPosition();

    // Update current panel as current nearest panel
    viewport.setCurrentPanel(viewport.getNearestPanel()!);

    const moveType = viewport.moveType;
    if (moveType.is(MOVE_TYPE.STRICT)) {
      this.circulatePosition(viewport);
    }

    triggerEvent(EVENTS.HOLD_START, e, true)
      .onSuccess(() => {
        transitTo(STATE_TYPE.DRAGGING);
      })
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onChange(e: any, { moveCamera, transitTo }: FlickingContext): void {
    if (!e.delta.flick) {
      return;
    }

    moveCamera(e)
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onFinish(e: any, { flicking, viewport, triggerEvent, transitTo }: FlickingContext) {
    const isTrusted = e && e.isTrusted;

    viewport.setCurrentPanel(this.targetPanel!);
    transitTo(STATE_TYPE.IDLE);

    const moveType = viewport.moveType;
    if (moveType.is(MOVE_TYPE.STRICT)) {
      this.circulatePosition(viewport);
    }

    triggerEvent(EVENTS.MOVE_END, e, isTrusted, {
      direction: this.direction,
    });

    if (flicking.options.adaptive) {
      viewport.updateAdaptiveSize();
    }
  }

  private circulatePosition(viewport: Viewport) {
    const panelManager = viewport.panelManager;
    const originalPanelArea = {
      prev: panelManager.firstPanel()!.getAnchorPosition(),
      next: panelManager.lastPanel()!.getAnchorPosition(),
    };

    if (!isBetween(viewport.getHangerPosition(), originalPanelArea.prev, originalPanelArea.next)) {
      const currentPanel = viewport.getCurrentPanel()!.getOriginalPanel();
      const estimatedPosition = currentPanel.getAnchorPosition() - viewport.getRelativeHangerPosition();

      viewport.moveCamera(estimatedPosition);
      viewport.updateAxesPosition(estimatedPosition);
      viewport.setCurrentPanel(currentPanel);
    }
    viewport.updateScrollArea();
  }
}

export default AnimatingState;
