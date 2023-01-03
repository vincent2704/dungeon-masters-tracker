import {ActionDescriptionPoint} from "./actionDescriptionPoint";
import {ActionType} from "./actionType";
import {StringUtils} from "../../../utilities/string/stringUtils";
import {DiceRoll} from "../../common/diceRoll";

export class ActionDescription {
  constructor(
    private readonly description: string,
    private readonly actionType: ActionType = ActionType.NOT_SPECIFIED,
    private readonly attackModifier: number = 0,
    private readonly points: ActionDescriptionPoint[] = [],
    private readonly damageRoll?: DiceRoll,
  ) {
  }

  getDescription(): string {
    return StringUtils.formatActionDescription(this.description, this.attackModifier, this.damageRoll);
  }

  getActionType(): string {
    return this.actionType;
  }

  getPoints(): ActionDescriptionPoint[] {
    return this.points;
  }

  getAttackModifier(): number {
    return this.attackModifier;
  }

  getDamageRoll(): DiceRoll | undefined {
    return this.damageRoll;
  }

}
