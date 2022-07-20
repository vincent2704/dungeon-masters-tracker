import { Component, OnInit } from '@angular/core';
import {MonsterService} from "../services/monster/monster.service";
import {Monster} from "../models/monsters/monster";
import {AbilityScore} from "../models/common/ability/abilityScore";
import {Ability} from "../models/common/ability/ability";

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {

  monsters: Monster[] = []

  constructor(private monsterService: MonsterService) { }

  ngOnInit(): void {
    this.monsters = this.monsterService.getMonsters();
  }

  getAbilityScoreInfo(abilityScore: AbilityScore): string {
    let modifierValue = Ability.ABILITY_MODIFIERS.get(abilityScore.getScore());
    let score = abilityScore.getScore();
    if (modifierValue && modifierValue > 0) {
      return `${score} (+${modifierValue})`;
    }
    return `${score} (${modifierValue})`;
  }

}
