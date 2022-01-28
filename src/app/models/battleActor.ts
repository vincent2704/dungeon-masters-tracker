// object representing an actor during a single fight
import {Condition} from "./Condition";

export class BattleActor {

  name: string;
  maxHP: number;
  private currentHP: number;
  initiative: number;
  dead: boolean;
  private progressedInTurn: boolean;
  conditions: Condition[];

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    unconscious: boolean = false,
    dead: boolean = false,
    progressedInTurn: boolean = false,
    conditions: Condition[] = []
  ) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.initiative = initiative;
    this.dead = dead;
    this.progressedInTurn = progressedInTurn;
    this.conditions = conditions;
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

  isActorProgressesInTurn(): boolean {
    return this.progressedInTurn;
  }

  setDead(dead: boolean) {
    this.dead = dead;
  }

  hasCondition(condition: Condition): boolean {
    return !!this.conditions.find(conditionToFind => conditionToFind == condition);
  }

  addCondition(condition: Condition) {
    this.conditions.push(condition);
  }

  removeCondition(condition: Condition) {
    let conditionToRemove = this.conditions.find(conditionToRemove => conditionToRemove == condition);
    if (conditionToRemove) {
      let index = this.conditions.indexOf(conditionToRemove);
      this.conditions.splice(index, 1);
    }
  }
}
