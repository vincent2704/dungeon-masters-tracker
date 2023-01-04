import {MonsterList} from "../../models/monsters/monsterList";
import {Settings} from "../../services/settings/settings";
import {Action} from "../../models/monsters/actions-and-traits/action";
import {StringUtils} from "./stringUtils";

describe('StringUtils', () => {

  it("should get proper description", () => {
    // werewolf
    let action = MonsterList.WEREWOLF.getDetails().getActions()[3];

    Settings.setSISystem(false);
    expect(action.getDescription().getDescription()).toEqual(
      "+4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 5 (1d6 " +
      "+ 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    )
    Settings.setSISystem(true);
    expect(action.getDescription().getDescription()).toEqual(
      "+4 to hit, reach 1.5 m or range 6/18 m, one creature. " +
      "Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack."
    )

    // nightmare
    action = MonsterList.NIGHTMARE.getDetails().getActions()[1];

    Settings.setSISystem(false);
    expect(action.getDescription().getDescription()).toEqual(
      "The nightmare and up to three willing creatures " +
      "within 5 feet of it magically enter the Ethereal Plane from the " +
      "Material Plane, or vice versa."
    )
    Settings.setSISystem(true);
    expect(action.getDescription().getDescription()).toEqual(
      "The nightmare and up to three willing creatures " +
      "within 1.5 meters of it magically enter the Ethereal Plane from the " +
      "Material Plane, or vice versa."
    )

    // solar legendary action
    let legendaryAction = MonsterList.SOLAR.getDetails().getLegendaryActions()[1];
    Settings.setSISystem(false);
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

    let specialTrait = MonsterList.BANSHEE.getDetails().getSpecialTraits()[0];
    Settings.setSISystem(false);
    expect(specialTrait.getDescription()).toEqual(
      "The banshee can magically sense the presence " +
      "of living creatures up to 5 miles away. She knows the general " +
      "direction they're in but not their exact locations."
    )
    Settings.setSISystem(true);
    expect(specialTrait.getDescription()).toEqual(
      "The banshee can magically sense the presence " +
      "of living creatures up to 7.5 kilometers away. She knows the general " +
      "direction they're in but not their exact locations."
    )
  });

  it("properly format damage info", () => {
    // given
    let action = Action.GHOST_ACTIONS[0]; // withering touch
    Settings.setSISystem(true);

    expect(action.getDescription().getDescription()).toEqual("+5 to hit, reach 1.5 m, one target. " +
      "Hit: 17 (4d6 + 3) necrotic damage.")

    let action2 = Action.AZER_ACTIONS[0] // warhammer
    expect(action2.getDescription().getDescription()).toEqual("+5 to hit, reach 1.5 m, one " +
      "target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) " +
      "bludgeoning damage if used with two hands to make a melee " +
      "attack, plus 3 (1d6) fire damage.")

    let action3 = Action.SPECTATOR_ACTIONS[0] // bite
    expect(action3.getDescription().getDescription()).toEqual("+1 to hit, reach 1.5 m, one target. " +
      "Hit: 2 (1d6 - 1) piercing damage.")
  });

});
