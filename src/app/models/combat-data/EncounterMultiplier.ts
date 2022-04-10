export class EncounterMultiplier {

  private constructor(private multiplier: number) {
  }

  getMultiplier() {
    return this.multiplier;
  }

  static ONE_MONSTER_MULTIPLIER = new EncounterMultiplier(1);
  static TWO_MONSTERS_MULTIPLIER = new EncounterMultiplier(1.5);
  static THREE_TO_SIX_MONSTERS_MULTIPLIER = new EncounterMultiplier(2);
  static SEVEN_TO_TEN_MONSTERS_MULTIPLIER = new EncounterMultiplier(2.5);
  static ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER = new EncounterMultiplier(3);
  static FIFTEEN_AND_MORE_MONSTERS_MULTIPLIER = new EncounterMultiplier(4);

  static ENCOUNTER_MULTIPLIERS = [
    EncounterMultiplier.ONE_MONSTER_MULTIPLIER,
    EncounterMultiplier.TWO_MONSTERS_MULTIPLIER,
    EncounterMultiplier.THREE_TO_SIX_MONSTERS_MULTIPLIER,
    EncounterMultiplier.SEVEN_TO_TEN_MONSTERS_MULTIPLIER,
    EncounterMultiplier.ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER,
    EncounterMultiplier.FIFTEEN_AND_MORE_MONSTERS_MULTIPLIER
  ];

  // data from Encounter Multipliers table. Key is number of monsters, value is the multiplier used to calculate
  // encounter difficulty. Note that it has more rows than the one in DM guide, because table there uses monsters count
  // range, e.g. 3-6 in one row, here for the sake of simpler calculating they are spread into 4 separate rows
  // source - Dungeon Master's Guide, page 82.
  private static readonly ENCOUNTER_MULTIPLIERS_TABLE = new Map<number, EncounterMultiplier>([
    [1, EncounterMultiplier.ONE_MONSTER_MULTIPLIER],
    [2, EncounterMultiplier.TWO_MONSTERS_MULTIPLIER],
    [3, EncounterMultiplier.THREE_TO_SIX_MONSTERS_MULTIPLIER],
    [4, EncounterMultiplier.THREE_TO_SIX_MONSTERS_MULTIPLIER],
    [5, EncounterMultiplier.THREE_TO_SIX_MONSTERS_MULTIPLIER],
    [6, EncounterMultiplier.THREE_TO_SIX_MONSTERS_MULTIPLIER],
    [7, EncounterMultiplier.SEVEN_TO_TEN_MONSTERS_MULTIPLIER],
    [8, EncounterMultiplier.SEVEN_TO_TEN_MONSTERS_MULTIPLIER],
    [9, EncounterMultiplier.SEVEN_TO_TEN_MONSTERS_MULTIPLIER],
    [10, EncounterMultiplier.SEVEN_TO_TEN_MONSTERS_MULTIPLIER],
    [11, EncounterMultiplier.ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER],
    [12, EncounterMultiplier.ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER],
    [13, EncounterMultiplier.ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER],
    [14, EncounterMultiplier.ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER],
    [15, EncounterMultiplier.FIFTEEN_AND_MORE_MONSTERS_MULTIPLIER]
  ]);

  static getEncounterMultiplier(monsterCount: number): EncounterMultiplier {
    if (monsterCount >= 15) {
      return this.ENCOUNTER_MULTIPLIERS_TABLE.get(15)!;
    }
    return this.ENCOUNTER_MULTIPLIERS_TABLE.get(monsterCount)!;
  }

}
