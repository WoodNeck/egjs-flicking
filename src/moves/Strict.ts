import MoveType from "./MoveType";
import { MOVE_TYPE, EVENTS } from "../consts";
import { MoveTypeContext, DestinationInfo } from "../types";
import { isBetween } from "../utils";

class Strict extends MoveType {
  protected readonly type: string = MOVE_TYPE.STRICT;

  public findTargetPanel(ctx: MoveTypeContext): DestinationInfo {
    const { viewport, swipeDistance, minimumDistanceToChange } = ctx;

    const cameraPos = viewport.getCameraPosition();
    const scrollArea = viewport.getScrollArea();
    const currentPanel = viewport.getCurrentPanel()!;
    const nearestPanel = viewport.getNearestPanel()!;
    // This can happen when bounce is 0
    const shouldMoveWhenBounceIs0 = viewport.canSetBoundMode()
      && (nearestPanel.getIndex() === currentPanel.getIndex());
    const shouldMoveToAdjacent = !viewport.isOutOfBound()
      && (swipeDistance <= minimumDistanceToChange || shouldMoveWhenBounceIs0);

    if (!isBetween(cameraPos, scrollArea.prev, scrollArea.next)) {
      return this.findMaximumFromCurrentPanel(ctx);
    } else if (shouldMoveToAdjacent) {
      return this.findAdjacentPanel(ctx);
    } else {
      return this.findNearestPanel(ctx);
    }
  }

  private findMaximumFromCurrentPanel(ctx: MoveTypeContext): DestinationInfo {
    const { viewport } = ctx;
    const currentPanel = viewport.getCurrentPanel()!;
    const state = viewport.stateMachine.getState();
    const scrollArea = viewport.getScrollArea();
    const delta = state.delta;
    const movedToNextDirection = delta > 0;

    let targetPanel = movedToNextDirection
      ? currentPanel.nextSibling
      : currentPanel.prevSibling;
    if (!targetPanel) {
      targetPanel = currentPanel;
    }

    const destPos = movedToNextDirection
      ? scrollArea.next
      : scrollArea.prev;

    return {
      panel: targetPanel.getOriginalPanel(),
      destPos,
      duration: viewport.options.duration,
      eventType: EVENTS.CHANGE,
    };
  }
}

export default Strict;
