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
  battleConditions: BattleCondition[];
  private eligibleForDeathSavingThrows: boolean;
  private temporaryHP: TemporaryHP;
  private knockedDown: boolean;
  private stabilized: boolean = false;

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    level: number = 1,
    dead: boolean = false,
    battleConditions: BattleCondition[] = [],
    eligibleForSavingThrows: boolean = true,
    knockedDown: boolean = false,
  ) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = currentHP;
    this.initiative = initiative;
    this.level = level;
    this.dead = dead;
    this.battleConditions = battleConditions;
    this.eligibleForDeathSavingThrows = eligibleForSavingThrows;
    this.temporaryHP = new TemporaryHP(0, 0);
    this.knockedDown = knockedDown;
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
    if(this.isKnockedDown()) {
      this.setStabilized(false);
    }

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
    if (this.getCurrentHP() > 0 && this.isKnockedDown()) {
      //TODO: this will have to be changed when unconsciousness source other than damage will be implemented!
      this.removeCondition(Condition.UNCONSCIOUS);
      this.knockedDown = false;
    }
    if (this.getCurrentHP() <= -this.getMaxHP()) {
      this.kill();
      this.setHP(-this.getMaxHP());
      return;
    }
    if (this.getCurrentHP() <= 0 && !this.dead && !this.hasCondition(Condition.UNCONSCIOUS)) {
      if (this.isEligibleForDeathSavingThrows()) {
        this.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
        this.knockedDown = true;
        this.stabilized = false;
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

  isEligibleForDeathSavingThrows(): boolean {
    return this.eligibleForDeathSavingThrows;
  }

  setDeathSavingThrowsEligibility(eligible: boolean) {
    this.eligibleForDeathSavingThrows = eligible;
  }

  isKnockedDown(): boolean {
    return this.knockedDown;
  }

  setKnockedDown(knockedDown: boolean) {
    this.knockedDown = knockedDown;
  }

  isStabilized() {
    return this.stabilized;
  }

  setStabilized(stabilized: boolean) {
    this.stabilized = stabilized;
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

  copy(): Actor {
    return new Actor(this.name, this.maxHP, this.currentHP, this.initiative, this.level, this.dead,
      this.battleConditions, this.eligibleForDeathSavingThrows, this.knockedDown)
  }

  private getExpiredConditions(): Condition[] {
    return this.battleConditions.filter(battleCondition => {
      return battleCondition.getDurationInTurns() == 0 && !battleCondition.isPermanent();
    }).map(battleCondition => {
      return battleCondition.getCondition()
    })
  }

}
