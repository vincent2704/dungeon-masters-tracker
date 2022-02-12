// object representing an actor during a single fight
import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";

export class BattleActor {

  name: string;
  maxHP: number;
  private currentHP: number;
  initiative: number;
  dead: boolean;
  private progressedInTurn: boolean;
  battleConditions: BattleCondition[];

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    unconscious: boolean = false,
    dead: boolean = false,
    progressedInTurn: boolean = false,
    battleConditions: BattleCondition[] = []
  ) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.initiative = initiative;
    this.dead = dead;
    this.progressedInTurn = progressedInTurn;
    this.battleConditions = battleConditions;
  }

  getMaxHP() {
    return this.maxHP;
  }

  getCurrentHP() {
    return this.currentHP;
  }

  setHP(hp: number) {
    this.currentHP = hp;
  }

  addHP(hpToAdd: number) {
    this.currentHP = Number(this.currentHP) + Number(hpToAdd);
    if (this.currentHP > this.maxHP) {
      this.currentHP = this.maxHP;
    }
  }

  getInitiative() {
    return this.initiative;
  }

  setInitiative(initiative: number) {
    this.initiative = initiative;
  }

  setActorProgress(progressed: boolean) {
    this.progressedInTurn = progressed;
  }

  isActorProgressedInTurn(): boolean {
    return this.progressedInTurn || this.hasCondition(Condition.UNCONSCIOUS);
  }

  setDead(dead: boolean) {
    this.dead = dead;
  }

  hasCondition(condition: Condition): boolean {
    return !!this.battleConditions.find(conditionToFind => conditionToFind.getCondition() == condition);
  }

  addCondition(condition: BattleCondition) {
    this.battleConditions.push(condition);
  }


  removeCondition(condition: Condition) {
    let conditionToRemove = this.battleConditions.find(conditionToRemove => conditionToRemove.getCondition() == condition);
    if (conditionToRemove) {
      let index = this.battleConditions.indexOf(conditionToRemove);
      this.battleConditions.splice(index, 1);
    }
  }

  decrementConditionsDuration() {
    for (let battleCondition of this.battleConditions) {
      if (!battleCondition.isPermanent()) {
        battleCondition.setDurationInTurns(battleCondition.getDurationInTurns() - 1);
      }
    }

    for(let condition of this.getExpiredConditions()) {
      this.removeCondition(condition);
    }
  }

  private getExpiredConditions(): Condition[] {
    return this.battleConditions.filter(battleCondition => {
      return battleCondition.getDurationInTurns() == 0 && !battleCondition.isPermanent();
    }).map(battleCondition => {
      return battleCondition.getCondition()
    })
  }
}
