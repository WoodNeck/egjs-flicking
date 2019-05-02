import { MoveTypeStringOption, MoveTypeContext, DestinationInfo } from "../types";
import Panel from "../components/Panel";
import { EVENTS } from "../consts";

abstract class MoveType {
  protected readonly abstract type: string;

  public abstract findTargetPanel(ctx: MoveTypeContext): DestinationInfo;

  public is(type: MoveTypeStringOption): boolean {
    return type === this.type;
  }

  public findRestorePanel(ctx: MoveTypeContext): DestinationInfo {
    const viewport = ctx.viewport;
    const options = viewport.options;

    const panel = options.circular
      ? this.findRestorePanelInCircularMode(ctx)
      : viewport.getCurrentPanel()!;

    return {
      panel: panel.getOriginalPanel(),
      destPos: viewport.findEstimatedPosition(panel),
      duration: options.duration,
      eventType: EVENTS.RESTORE,
    };
  }

  protected findNearestPanel(ctx: MoveTypeContext): DestinationInfo {
    const { viewport, swipeDistance, minimumDistanceToChange } = ctx;
    const nearestPanel = viewport.getNearestPanel()!;

    return {
      panel: nearestPanel.getOriginalPanel(),
      duration: viewport.options.duration,
      destPos: viewport.findEstimatedPosition(nearestPanel),
      eventType: swipeDistance <= minimumDistanceToChange
        ? EVENTS.RESTORE
        : EVENTS.CHANGE,
    };
  }

  protected findAdjacentPanel(ctx: MoveTypeContext): DestinationInfo {
    const { viewport, isNextDirection } = ctx;

    const options = viewport.options;
    const currentIndex = viewport.getCurrentIndex();
    const currentPanel = viewport.panelManager.get(currentIndex)!;
    const hangerPosition = viewport.getHangerPosition();

    const firstClonedPanel = currentPanel.getIdenticalPanels()[1];
    const lapped = options.circular
      && (Math.abs(currentPanel.getAnchorPosition() - hangerPosition)
        > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition));

    // If lapped in circular mode, use first cloned panel as base panel
    const basePanel = lapped
      ? firstClonedPanel
      : currentPanel;
    const basePosition = basePanel.getPosition();

    const adjacentPanel = isNextDirection
      ? basePanel.nextSibling
      : basePanel.prevSibling;

    const eventType = adjacentPanel
      ? EVENTS.CHANGE
      : EVENTS.RESTORE;
    const panelToMove = adjacentPanel
      ? adjacentPanel
      : basePanel;
    const targetRelativeAnchorPosition = panelToMove.getRelativeAnchorPosition();

    const estimatedPanelPosition = options.circular
      ? isNextDirection
        ? basePosition + basePanel.getSize() + targetRelativeAnchorPosition + options.gap
        : basePosition - (panelToMove.getSize() - targetRelativeAnchorPosition) - options.gap
      : panelToMove.getAnchorPosition();
    const estimatedPosition = estimatedPanelPosition - viewport.getRelativeHangerPosition();

    return {
      panel: panelToMove,
      destPos: estimatedPosition,
      duration: options.duration,
      eventType,
    };
  }

  private findRestorePanelInCircularMode(ctx: MoveTypeContext): Panel {
    const viewport = ctx.viewport;
    const originalPanel = viewport.getCurrentPanel()!.getOriginalPanel();
    const hangerPosition = viewport.getHangerPosition();

    const firstClonedPanel = originalPanel.getIdenticalPanels()[1];
    const lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition)
      > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

    return (!ctx.isNextDirection && lapped)
      ? firstClonedPanel
      : originalPanel;
  }
}

export default MoveType;
