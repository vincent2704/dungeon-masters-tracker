import {MonsterManualMonsters} from "../../models/monsters/monsterManualMonsters";
import {Settings} from "../../services/settings/settings";

describe('StringUtils', () => {

  it("should get proper description", () => {
    // werewolf
    let action = MonsterManualMonsters.WEREWOLF.getActions()[3];

    // when
    Settings.setSISystem(false);
    expect(action.getDescription()).toEqual(
      "Melee or Ranged Weapon Attack: " +
      "+4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 5 (1d6 " +
      "+ 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    )

    // and when
    Settings.setSISystem(true);
    expect(action.getDescription()).toEqual(
      "Melee or Ranged Weapon Attack: " +
      "+4 to hit, reach 1.5 m or range 6/18 m, one creature. " +
      "Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    )

    // nightmare
    action = MonsterManualMonsters.NIGHTMARE.getActions()[1];

    // when
    Settings.setSISystem(false);
    expect(action.getDescription()).toEqual(
      "The nightmare and up to three willing creatures " +
      "within 5 feet of it magically enter the Ethereal Plane from the " +
      "Material Plane, or vice versa."
    )

    // and when
    Settings.setSISystem(true);
    expect(action.getDescription()).toEqual(
      "The nightmare and up to three willing creatures " +
      "within 1.5 meters of it magically enter the Ethereal Plane from the " +
      "Material Plane, or vice versa."
    )
  });

});
