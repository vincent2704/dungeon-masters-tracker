import {Injectable} from '@angular/core';
import {Difficulty} from "../models/combat-data/Difficulty";
import {Actor} from "../models/actor";
import {CombatData} from "../models/combat-data/CombatData";

@Injectable({
  providedIn: 'root'
})
export class CombatDataService {

  constructor() {
  }

  getDifficulty(actors: Actor[], monstersXp: number, monsterCount: number): Difficulty {
    /* Steps as written in Dungeon Master's Guide, page 82.
      1. Determine XP Thresholds
        and
      2. Determine the Party's XP Threshold
    */
    //TODO: in future - take into account number of actors less than 3 and more than 5 for correct multiplier (DMG, page 83.)
    let mediumDifficultyThreshold = this.getActorsDifficultyThreshold(Difficulty.MEDIUM, actors);
    let hardDifficultyThreshold = this.getActorsDifficultyThreshold(Difficulty.HARD, actors);
    let deadlyDifficultyThreshold = this.getActorsDifficultyThreshold(Difficulty.DEADLY, actors);

    /*
      3. Total the Monster's XP
        and
      4. Modify Total XP for Multiple Monsters
    */
    let multiplier = this.getCombatMultiplier(monsterCount);
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
    }
    else {
      return Difficulty.EASY;
    }
  }

  getXpThreshold(difficulty: Difficulty, level: number): number {
    let valueMap = this.getValueMap(difficulty);
    return valueMap.get(level)!;
  }

  getActorsDifficultyThreshold(difficulty: Difficulty, actors: Actor[]): number {
    let valueMap = this.getValueMap(difficulty);
    let actorLevels: number[] = actors.map(actor => actor.getLevel());
    let xpThreshold = 0;

    actorLevels.forEach(actorLevel => {
      xpThreshold += valueMap.get(actorLevel)!
    });

    return xpThreshold;
  }

  private getValueMap(difficulty: Difficulty): Map<number, number> {
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

  getCombatMultiplier(monsterCount: number): number {
    if (monsterCount < 0) {
      console.error(`ENTERED MONSTER COUNT ${monsterCount} IS LESS THAN 1`);
      return 0;
    }
    if (monsterCount > 15) {
      return 4;
    }
    return CombatData.ENCOUNTER_MULTIPLIERS.get(monsterCount)!;
  }

}
