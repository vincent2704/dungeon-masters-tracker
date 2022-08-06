import {Settings} from "../../../services/settings/settings";
import {Action} from "./action";

describe('Action', () => {

  it("should properly format description", () => {
    // given
    let description = "Melee or Ranged Weapon Attack: " +
      "+4 to hit, reach {feet} {unit} or range {feet}/{feet} {unit}, one creature. Hit: 5 (1d6 " +
      "+ 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
      "with two hands to make a melee attack.";

    // when
    Settings.setSISystem(false);
    expect(Action.formatDescription(description, 5, 20, 60))
      .toEqual("Melee or Ranged Weapon Attack: " +
        "+4 to hit, reach 5 ft. or range 20/60 ft., one creature. " +
        "Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
        "with two hands to make a melee attack.");

    // and when
    Settings.setSISystem(true);
    expect(Action.formatDescription(description, 5, 20, 60))
      .toEqual("Melee or Ranged Weapon Attack: " +
        "+4 to hit, reach 1.5 m or range 6/18 m, one creature. " +
        "Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used " +
        "with two hands to make a melee attack.");
  });

});
