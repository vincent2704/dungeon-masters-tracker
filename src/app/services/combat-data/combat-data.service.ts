import {Difficulty} from "../../models/combat-data/Difficulty";
import {Actor} from "../../models/actors/actor";
import {CombatData} from "../../models/combat-data/CombatData";
import {EncounterMultiplier} from "../../models/combat-data/EncounterMultiplier";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

export class CombatDataService {

  constructor() {
  }

  static getDifficulty(actors: PlayerCharacter[], monstersXp: number, monsterCount: number): Difficulty {
    if( actors.length == 0 || monstersXp == 0 || monsterCount == 0 ) {
      return Difficulty.NOT_APPLICABLE
    }
    /* Steps as written in Dungeon Master's Guide, page 82.
      1. Determine XP Thresholds
        and
      2. Determine the Party's XP Threshold
    */
    let mediumDifficultyThreshold = this.getActorsDifficultyThreshold(Difficulty.MEDIUM, actors);
    let hardDifficultyThreshold = this.getActorsDifficultyThreshold(Difficulty.HARD, actors);
    let deadlyDifficultyThreshold = this.getActorsDifficultyThreshold(Difficulty.DEADLY, actors);

    /*
      3. Total the Monster's XP
        and
      4. Modify Total XP for Multiple Monsters
    */
    let multiplier = this.getCombatMultiplierValue(actors.length, monsterCount);
    let monstersTotalXp = monstersXp * multiplier;

    /*
      5. Compare XP
     */
    if (monstersTotalXp >= deadlyDifficultyThreshold) {
      return Difficulty.DEADLY;
    }
    if (monstersTotalXp >= hardDifficultyThreshold) {
      return Difficulty.HARD;
    }
    if (monstersTotalXp >= mediumDifficultyThreshold) {
      return Difficulty.MEDIUM;
    } else {
      return Difficulty.EASY;
    }
  }

  static getXpThreshold(difficulty: Difficulty, level: number): number {
    let valueMap = this.getValueMap(difficulty);
    return valueMap.get(level)!;
  }

  static getActorsDifficultyThreshold(difficulty: Difficulty, actors: PlayerCharacter[]): number {
    let valueMap = this.getValueMap(difficulty);
    let actorLevels: number[] = actors.map(actor => actor.level);
    let xpThreshold = 0;

    actorLevels.forEach(actorLevel => {
      xpThreshold += valueMap.get(actorLevel)!
    });

    return xpThreshold;
  }

  static getCombatMultiplierValue(partySize: number, monsterCount: number): number {
    if (monsterCount < 1) {
      console.warn(`ENTERED MONSTER COUNT ${monsterCount} IS LESS THAN 1`);
      return 0;
    }

    let multiplier: EncounterMultiplier = EncounterMultiplier.getEncounterMultiplier(monsterCount);

    // according to Dungeon Master's Guide, page 83.
    if (partySize < 3) {
      return this.getOneLevelHigherMultiplierValue(multiplier);
    }
    if(partySize > 5) {
      return this.getOneLevelLowerMultiplierValue(multiplier);
    }
    return EncounterMultiplier.getEncounterMultiplier(monsterCount).getMultiplier();
  }

  private static getValueMap(difficulty: Difficulty): Map<number, number> {
    switch (difficulty) {
      case Difficulty.EASY: {
        return CombatData.EASY_XP_THRESHOLDS;
      }
      case Difficulty.MEDIUM: {
        return CombatData.MEDIUM_XP_THRESHOLDS;
      }
      case Difficulty.HARD: {
        return CombatData.HARD_XP_THRESHOLDS;
      }
      case Difficulty.DEADLY: {
        return CombatData.DEADLY_XP_THRESHOLDS;
      }
      default: {
        console.error(`DIFFICULTY VALUE MAP WAS NOT FOUND FOR DIFFICULTY: ${difficulty}`);
        return new Map<number, number>();
      }
    }
  }

  private static getOneLevelHigherMultiplierValue(multiplier: EncounterMultiplier): number {
    let allMultipliers = EncounterMultiplier.ENCOUNTER_MULTIPLIERS;
    let encounterMultiplierIndex = allMultipliers.indexOf(multiplier);
    if (encounterMultiplierIndex === allMultipliers.length - 1) {
      return 5;
    }
    return EncounterMultiplier.ENCOUNTER_MULTIPLIERS[encounterMultiplierIndex + 1].getMultiplier();
  }

  private static getOneLevelLowerMultiplierValue(multiplier: EncounterMultiplier) {
    let allMultipliers = EncounterMultiplier.ENCOUNTER_MULTIPLIERS;
    let encounterMultiplierIndex = allMultipliers.indexOf(multiplier);
    if (encounterMultiplierIndex === 0) {
      return 0.5;
    }
    return EncounterMultiplier.ENCOUNTER_MULTIPLIERS[encounterMultiplierIndex - 1].getMultiplier();
  }
}
