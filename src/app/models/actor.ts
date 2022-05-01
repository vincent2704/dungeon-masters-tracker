import {Condition} from "./Condition";
import {BattleCondition} from "./battleCondition";
import {TemporaryHP} from "./temporaryHP";

export class Actor {

  name: string;
  maxHP: number;
  currentHP: number;
  initiative: number;
  level: number;
  private dead: boolean;
  private progressedInTurn: boolean;
  battleConditions: BattleCondition[];
  private eligibleForDeathSavingThrows: boolean;
  private temporaryHP: TemporaryHP;

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    level: number = 1,
    unconscious: boolean = false,
    dead: boolean = false,
    progressedInTurn: boolean = false,
    battleConditions: BattleCondition[] = [],
    deathSavingThrowsEligibility: boolean = true,
  ) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.initiative = initiative;
    this.level = level;
    this.dead = dead;
    this.progressedInTurn = progressedInTurn;
    this.battleConditions = battleConditions;
    this.eligibleForDeathSavingThrows = deathSavingThrowsEligibility;
    this.temporaryHP = new TemporaryHP(0, 0);
  }

  progressActor(): void {
    this.setActorProgress(true);
    this.decrementConditionsDuration();
    this.decrementTemporaryHitPointDuration();
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

  modifyHp(hitPointsModifier: number) {
    let isDamage: boolean = hitPointsModifier < 0;

    if (hitPointsModifier === 0) {
      console.warn("Actor's Hit Points are modified by 0!: " + this.name);
    }

    if (this.isDead()) {
      return;
    }
    if (isDamage) {
      if (this.temporaryHP.hasTemporaryHitPoints()) {
        let temporaryHitPoints = this.temporaryHP.getHitPoints();
        let receivedDamage = -hitPointsModifier;
        if (receivedDamage > temporaryHitPoints) {
          let leftOverHitPoints = receivedDamage - temporaryHitPoints;
          this.temporaryHP.subtractTemporaryHitPoints(receivedDamage);
          this.modifyHp(-leftOverHitPoints);
          return;
        } else {
          this.temporaryHP.subtractTemporaryHitPoints(receivedDamage);
          return;
        }
      }
    }

    this.currentHP = Number(this.currentHP) + Number(hitPointsModifier);
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

  getLevel() {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
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

  getTemporaryHitPoints() {
    return this.temporaryHP;
  }

  setTemporaryHitPoints(hitPoints: number, duration: number) {
    this.temporaryHP = new TemporaryHP(hitPoints, duration);
  }

  decrementTemporaryHitPointDuration() {
    this.temporaryHP.decrementDuration();
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
        battleCondition.decrementDuration();
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
