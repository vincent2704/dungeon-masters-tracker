import {MonsterManualMonsters} from "../monsterManualMonsters";
import {StringUtils} from "../../../utilities/string/stringUtils";

describe('SpecialTrait', () => {

  it("should get proper description", () => {
    let trait = MonsterManualMonsters.BANSHEE.getSpecialTraits()[0];
    expect(trait.getDescription()).toEqual(StringUtils.formatDescription(
      "The banshee can magically sense the presence " +
      "of living creatures up to {5} {miles} away. She knows the general " +
      "direction they're in but not their exact locations."
    ))
  });

});
