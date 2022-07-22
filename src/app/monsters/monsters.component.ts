import {Component, OnInit} from '@angular/core';
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

  constructor(private monsterService: MonsterService) {
  }

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

  getConditionImmunities(monster: Monster): string {
    return monster.getConditionImmunities().map(condition => condition.getName()).join(', ');
  }

  getSenses(monster: Monster): string {
    let senses = monster.getSenses().getMonsterSenses().map(monsterSense => {
      let sense = monsterSense.getSense().getName();
      let radius = monsterSense.getRadius();
      return sense + radius;
    }).join(', ');

    let passiveSkills = monster.getSenses().getPassiveSkills();
    if (passiveSkills.length > 0) {
      let passives = passiveSkills.map(passiveSkill => {
        let skill = passiveSkill.getSkill();
        let score = passiveSkill.getScore();
        return `${skill} ${score}`
      }).join(', ');

      if (senses.length > 0) {
        return `${senses}, passive ${passives}`;
      }
      return `passive ${passives}`;
    }
    return senses;
  }

  getLanguages(monster: Monster): string {
    let monsterLanguages = monster.getLanguages();
    if (!monsterLanguages) {
      return '—'
    }
    let languages = monsterLanguages.getLanguages().join(', ');
    let telepathyRadius = monsterLanguages.getTelepathyRadius();
    if (telepathyRadius) {
      return `${languages}, telepathy ${telepathyRadius}`
    }
    return languages;
  }
}
