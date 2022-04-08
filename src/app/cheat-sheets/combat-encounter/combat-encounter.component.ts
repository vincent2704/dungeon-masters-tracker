import {Component, OnInit} from '@angular/core';
import {CombatDataService} from "../../services/combat-data.service";
import {Difficulty} from "../../models/combat-data/Difficulty";
import {EncounterMultiplier} from "../../models/combat-data/EncounterMultiplier";

@Component({
  selector: 'app-combat-encounter',
  templateUrl: './combat-encounter.component.html',
  styleUrls: ['./combat-encounter.component.css']
})
export class CombatEncounterComponent implements OnInit {

  readonly easyDifficultyTooltip: string = "An easy encounter doesn't tax the characters' " +
    "resources or put them in serious peril. They might lose " +
    "a few hit points, but victory is pretty much guaranteed.";

  readonly mediumDifficultyTooltip : string = "A medium encounter usually has one or " +
    "two scary moments for the players, but the characters " +
    "should emerge victorious with no casualties. One or " +
    "more of them might need to use healing resources. ";

  readonly hardDifficultyTooltip : string = "A hard encounter could go badly for the " +
    "adventurers. Weaker characters might get taken out " +
    "of the fight, and there's a slim chance that one or more " +
    "characters might die. ";

  readonly deadlyDifficultyTooltip : string = "A deadly encounter could be lethal for one or " +
    "more player characters. Survival often requires good " +
    "tactics and quick thinking, and the party risks defeat.";

  constructor(private combatDataService: CombatDataService) {
  }

  ngOnInit(): void {
  }

  getEasyThreshold(level: number) {
    return this.combatDataService.getXpThreshold(Difficulty.EASY, level);
  }

  getMediumThreshold(level: number) {
    return this.combatDataService.getXpThreshold(Difficulty.MEDIUM, level);
  }

  getHardThreshold(level: number) {
    return this.combatDataService.getXpThreshold(Difficulty.HARD, level);
  }

  getDeadlyThreshold(level: number) {
    return this.combatDataService.getXpThreshold(Difficulty.DEADLY, level);
  }

  getOneMonsterMultiplier() {
    return EncounterMultiplier.ONE_MONSTER_MULTIPLIER.getMultiplier();
  }

  getTwoMonstersMultiplier() {
    return EncounterMultiplier.TWO_MONSTERS_MULTIPLIER.getMultiplier();
  }

  getThreeToSixMonstersMultiplier() {
    return EncounterMultiplier.THREE_TO_SIX_MONSTERS_MULTIPLIER.getMultiplier();
  }

  getSevenToTenMonstersMultiplier() {
    return EncounterMultiplier.SEVEN_TO_TEN_MONSTERS_MULTIPLIER.getMultiplier();
  }

  getElevenToFourteenMonstersMultiplier() {
    return EncounterMultiplier.ELEVEN_TO_FOURTEEN_MONSTERS_MULTIPLIER.getMultiplier();
  }

  getFifteenAndMoreMonstersMultiplier() {
    return EncounterMultiplier.FIFTEEN_AND_MORE_MONSTERS_MULTIPLIER.getMultiplier();
  }


}
