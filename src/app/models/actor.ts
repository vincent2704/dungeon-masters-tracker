import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";

export class Actor {

  name: string;
  maxHP: number;
  private currentHP: number;
  initiative: number;
  private dead: boolean;
  private progressedInTurn: boolean;
  battleConditions: BattleCondition[];
  private eligibleForDeathSavingThrows: boolean;

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    unconscious: boolean = false,
    dead: boolean = false,
    progressedInTurn: boolean = false,
    battleConditions: BattleCondition[] = [],
    deathSavingThrowsEligibility: boolean = true
  ) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.initiative = initiative;
    this.dead = dead;
    this.progressedInTurn = progressedInTurn;
    this.battleConditions = battleConditions;
    this.eligibleForDeathSavingThrows = deathSavingThrowsEligibility;
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

  modifyHp(hpToAdd: number) {
    if (this.isDead()) {
      return;
    }
    this.currentHP = Number(this.currentHP) + Number(hpToAdd);
    if (this.currentHP > this.maxHP) {
      this.currentHP = this.maxHP;
    }
    if (this.getCurrentHP() > 0 && this.hasCondition(Condition.UNCONSCIOUS)) {
      //TODO: this will have to be changed when unconsciousness source other than damage will be implemented!
      this.removeCondition(Condition.UNCONSCIOUS);
    }
    if (this.getCurrentHP() <= -this.getMaxHP()) {
      this.kill();
      this.setHP(-this.getMaxHP());
      return;
    }
    if (this.getCurrentHP() <= 0 && !this.dead && !this.hasCondition(Condition.UNCONSCIOUS)) {
      if (this.isEligibleForDeathSavingThrows()) {
        this.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
      } else {
        this.kill();
      }
      return;
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

  isActorTurnProgressed(): boolean {
    return this.progressedInTurn || this.hasCondition(Condition.UNCONSCIOUS) || this.isDead();
  }

  isDead() {
    return this.dead;
  }

  kill() {
    this.dead = true;
    if (this.isEligibleForDeathSavingThrows()) {
      this.removeConditions(Condition.NON_MAGICAL_CONDITIONS);
    } else {
      this.removeConditions(Condition.CONDITIONS);
    }
  }

  resurrect() {
    this.dead = false;
  }

  isEligibleForDeathSavingThrows(): boolean {
    return this.eligibleForDeathSavingThrows;
  }

  setDeathSavingThrowsEligibility(eligible: boolean) {
    this.eligibleForDeathSavingThrows = eligible;
  }

  hasCondition(condition: Condition): boolean {
    return !!this.battleConditions.find(conditionToFind => conditionToFind.getCondition() == condition);
  }

  addCondition(condition: BattleCondition) {
    this.battleConditions.push(condition);
  }

  getConditions(): BattleCondition[] {
    return this.battleConditions;
  }

  getAvailableConditions() {
    let availableConditions: Condition[] = [];
    for (let condition of Condition.CONDITIONS) {
      if (!this.battleConditions.find(battleCondition => battleCondition.getCondition() === condition)) {
        availableConditions.push(condition);
      }
    }
    return availableConditions;
  }

  removeCondition(condition: Condition) {
    let conditionToRemove = this.battleConditions.find(conditionToRemove => conditionToRemove.getCondition() == condition);
    if (conditionToRemove) {
      if (conditionToRemove.getCondition() === Condition.UNCONSCIOUS && this.currentHP <= 0) {
        this.currentHP = 1;
      }
      let index = this.battleConditions.indexOf(conditionToRemove);
      this.battleConditions.splice(index, 1);
    }
  }

  removeConditions(conditions: Condition[]) {
    for (let condition of conditions) {
      this.removeCondition(condition);
    }
  }

  decrementConditionsDuration() {
    for (let battleCondition of this.battleConditions) {
      if (!battleCondition.isPermanent()) {
        battleCondition.setDurationInTurns(battleCondition.getDurationInTurns() - 1);
      }
    }

    for (let condition of this.getExpiredConditions()) {
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
