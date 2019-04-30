import MoveType from "./MoveType";
import { MOVE_TYPE, EVENTS } from "../consts";
import { MoveTypeContext, DestinationInfo } from "../types";
import { isBetween } from "../utils";

class Strict extends MoveType {
  protected readonly type: string = MOVE_TYPE.STRICT;
  private count: number;

  constructor(count: number) {
    super();
    this.count = count;
  }

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

  public getCount(): number {
    return this.count;
  }

  private findMaximumFromCurrentPanel(ctx: MoveTypeContext): DestinationInfo {
    const { viewport } = ctx;
    const state = viewport.stateMachine.getState();
    const delta = state.delta;
    const movedToNextDirection = delta > 0;

    const scrollArea = viewport.getScrollArea();
    const relativeHangerPosition = viewport.getRelativeHangerPosition();
    const targetPosition = movedToNextDirection
      ? scrollArea.next + relativeHangerPosition
      : scrollArea.prev + relativeHangerPosition;
    const targetPanel = viewport.findNearestPanelAt(targetPosition)!;

    return {
      panel: targetPanel,
      destPos: viewport.findEstimatedPosition(targetPanel),
      duration: viewport.options.duration,
      eventType: EVENTS.CHANGE,
    };
  }
}

export default Strict;
