import {Component, Input, OnInit} from '@angular/core';
import {Action} from "../../../models/monsters/actions-and-traits/action";
import {CombatUtils} from "../../../services/combat/combatUtils";
import {Actor} from "../../../models/actors/actor";
import {DiceRoll} from "../../../models/common/diceRoll";

@Component({
  selector: 'app-monster-actions',
  templateUrl: './monster-actions.component.html',
  styleUrls: ['./monster-actions.component.css']
})
export class MonsterActionsComponent implements OnInit {

  @Input()
  monsterActor!: Actor;

  selectedAction!: Action;
  showSelectedActionRolls: boolean = false;

  attackRollResult: string = '';
  hitRollResult: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getMonsterName(): string {
    return this.monsterActor.getMonster()!.getBasicInfo().getName();
  }

  getActions(): Action[] {
    return this.monsterActor.getMonster()!.getDetails().getActions();
  }

  rollAttack() {
    this.hitRollResult = 0;
    this.attackRollResult = CombatUtils.throwDiceForAttackRoll(this.selectedAction);
  }

  rollHit(diceRoll: DiceRoll, criticalHit: boolean) {
    this.attackRollResult = '';
    this.hitRollResult = CombatUtils.throwDice(diceRoll, criticalHit);
  }

  toggleSelectedActionRolls(action: Action) {
    if(!this.showSelectedActionRolls && action.getDescription().getDamageRolls().length > 0) {
      this.selectedAction = action;
      this.showSelectedActionRolls = true;
    } else {
      this.showSelectedActionRolls = false;
      this.hitRollResult = 0;
      this.attackRollResult = '';
    }
  }

}
