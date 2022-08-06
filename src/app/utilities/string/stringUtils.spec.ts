import {MonsterManualMonsters} from "../../models/monsters/monsterManualMonsters";
import {Settings} from "../../services/settings/settings";

describe('StringUtils', () => {

  it("should get proper description", () => {
    // werewolf
    let action = MonsterManualMonsters.WEREWOLF.getActions()[3];

    Settings.setSISystem(false);
    expect(action.getDescription()).toEqual(
      "Melee or Ranged Weapon Attack: " +
      "+4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 5 (1d6 " +
      "+ 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    )
    Settings.setSISystem(true);
    expect(action.getDescription()).toEqual(
      "Melee or Ranged Weapon Attack: " +
      "+4 to hit, reach 1.5 m or range 6/18 m, one creature. " +
      "Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    )

    // nightmare
    action = MonsterManualMonsters.NIGHTMARE.getActions()[1];

    Settings.setSISystem(false);
    expect(action.getDescription()).toEqual(
      "The nightmare and up to three willing creatures " +
      "within 5 feet of it magically enter the Ethereal Plane from the " +
      "Material Plane, or vice versa."
    )
    Settings.setSISystem(true);
    expect(action.getDescription()).toEqual(
      "The nightmare and up to three willing creatures " +
      "within 1.5 meters of it magically enter the Ethereal Plane from the " +
      "Material Plane, or vice versa."
    )

    // solar legendary action
    Settings.setSISystem(false);
    let legendaryAction = MonsterManualMonsters.SOLAR.getLegendaryActions()[1];
    expect(legendaryAction.getDescription()).toEqual(
      "The solar emits magical, divine " +
      "energy. Each creature of its choice in a 10-foot radius must " +
      "make a DC 23 Dexterity saving throw, taking 14 (4d6) fire " +
      "damage plus 14 (4d6) radiant damage on a failed save, or half " +
      "as much damage on a successful one."
    );
    Settings.setSISystem(true);
    expect(legendaryAction.getDescription()).toEqual(
      "The solar emits magical, divine " +
      "energy. Each creature of its choice in a 3-meter radius must " +
      "make a DC 23 Dexterity saving throw, taking 14 (4d6) fire " +
      "damage plus 14 (4d6) radiant damage on a failed save, or half " +
      "as much damage on a successful one."
    );
  });

});
