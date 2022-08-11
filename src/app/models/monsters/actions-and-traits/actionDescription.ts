import {ActionDescriptionPoint} from "./actionDescriptionPoint";
import {ActionType} from "./actionType";
import {StringUtils} from "../../../utilities/string/stringUtils";

export class ActionDescription {
  constructor(
    private readonly description: string,
    private readonly actionType: ActionType = ActionType.NOT_SPECIFIED,
    private readonly points: ActionDescriptionPoint[] = []
  ) {
  }

  getDescription(): string {
    return StringUtils.formatDescription(this.description);
  }

  getActionType(): string {
    return this.actionType;
  }

  getPoints(): ActionDescriptionPoint[] {
    return this.points;
  }
}
