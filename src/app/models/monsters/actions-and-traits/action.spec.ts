import {Action} from "./action";
import {MonsterManualMonsters} from "../monsterManualMonsters";
import {StringUtils} from "../../../utilities/string/stringUtils";

describe('Action', () => {

  it("should get proper description", () => {
    let action = MonsterManualMonsters.WEREWOLF.getActions()[3];
    expect(action.getDescription()).toEqual(StringUtils.formatDescription(
      "Melee or Ranged Weapon Attack: " +
      "+4 to hit, reach {5} {ft.} or range {20}/{60} {ft.}, one creature. Hit: 5 (1d6 " +
      "+ 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    ))
  });

});
