import {MonsterList} from "../monsterList";
import {StringUtils} from "../../../utilities/string/stringUtils";

describe('LegendaryAction', () => {

  it("should get proper description", () => {
    let action = MonsterList.SOLAR.getDetails().getLegendaryActions()[1];
    expect(action.getDescription()).toEqual(StringUtils.formatDescription(
      "The solar emits magical, divine " +
      "energy. Each creature of its choice in a {10}-{foot} radius must " +
      "make a DC 23 Dexterity saving throw, taking 14 (4d6) fire " +
      "damage plus 14 (4d6) radiant damage on a failed save, or half " +
      "as much damage on a successful one."
    ))
  });

});
