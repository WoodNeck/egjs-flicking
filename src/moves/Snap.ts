import MoveType from "./MoveType";
import { MOVE_TYPE, EVENTS } from "../consts";
import { MoveTypeContext, DestinationInfo } from "../types";
import { clamp } from "../utils";

class Snap extends MoveType {
  protected readonly type: string = MOVE_TYPE.SNAP;
  protected count: number;

  constructor(count: number) {
    super();
    this.count = count;
  }

  public findTargetPanel(ctx: MoveTypeContext): DestinationInfo {
    const { viewport, axesEvent, swipeDistance, minimumDistanceToChange } = ctx;
    const snapCount = this.count;
    const eventDelta = Math.abs(axesEvent.delta.flick);
    const currentPanel = viewport.getCurrentPanel()!;
    const nearestPanel = viewport.getNearestPanel()!;

    // This can happen when bounce is 0
    const shouldMoveWhenBounceIs0 = viewport.canSetBoundMode()
      && (nearestPanel.getIndex() === currentPanel.getIndex());
    const shouldMoveToAdjacent = !viewport.isOutOfBound()
      && (swipeDistance <= minimumDistanceToChange || shouldMoveWhenBounceIs0);

    if (snapCount > 1 && eventDelta > minimumDistanceToChange) {
      return this.findSnappedPanel(ctx);
    } else if (shouldMoveToAdjacent) {
      return this.findAdjacentPanel(ctx);
    } else {
      return this.findNearestPanel(ctx);
    }
  }

  protected findSnappedPanel(ctx: MoveTypeContext): DestinationInfo {
    const { axesEvent, viewport, isNextDirection } = ctx;

    const snapCount = this.count;
    const options = viewport.options;
    const scrollAreaSize = viewport.getScrollAreaSize();
    const halfGap = options.gap / 2;
    const estimatedHangerPos = axesEvent.destPos.flick + viewport.getRelativeHangerPosition();
    let panelToMove = viewport.getNearestPanel()!;
    let cycleIndex = panelToMove.getCloneIndex() + 1; // 0(original) or 1(clone)
    let passedPanelCount = 0;

    while (passedPanelCount < snapCount) {
      const siblingPanel = isNextDirection
        ? panelToMove.nextSibling
        : panelToMove.prevSibling;
      if (!siblingPanel) {
        break;
      }

      const panelIndex = panelToMove.getIndex();
      const siblingIndex = siblingPanel.getIndex();
      if ((isNextDirection && siblingIndex <= panelIndex)
        || (!isNextDirection && siblingIndex >= panelIndex)
      ) {
        cycleIndex = isNextDirection
          ? cycleIndex + 1
          : cycleIndex - 1;
      }
      panelToMove = siblingPanel;
      passedPanelCount += 1;

      // Since panlToMove holds also cloned panels, we should use original panel's position
      const originalPanel = panelToMove.getOriginalPanel();
      const panelPosition = originalPanel.getPosition() + cycleIndex * scrollAreaSize;
      const panelSize = originalPanel.getSize();

      const panelNextPosition = panelPosition + panelSize + halfGap;
      const panelPrevPosition = panelPosition - halfGap;

      // Current panelToMove contains destPos
      if (
        (isNextDirection && panelNextPosition > estimatedHangerPos)
        || (!isNextDirection && panelPrevPosition < estimatedHangerPos)
      ) {
        break;
      }
    }

    const originalPosition = panelToMove.getOriginalPanel().getPosition();

    panelToMove = panelToMove.clone(panelToMove.getCloneIndex(), true);
    panelToMove.setPosition(originalPosition + cycleIndex * scrollAreaSize, true);

    const defaultDuration = viewport.options.duration;
    const duration = clamp(axesEvent.duration, defaultDuration, defaultDuration * passedPanelCount);

    return {
      panel: panelToMove,
      destPos: viewport.findEstimatedPosition(panelToMove),
      duration,
      eventType: passedPanelCount > 0
        ? EVENTS.CHANGE
        : EVENTS.RESTORE,
    };
  }
}

export default Snap;
