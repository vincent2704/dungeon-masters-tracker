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
  private stabilized: boolean = false;
  private diedAt?: Date;

  constructor(
    name: string,
    maxHP: number,
    currentHP: number = maxHP,
    initiative: number = 0,
    level: number = 1,
    dead: boolean = false,
    battleConditions: BattleCondition[] = [],
    eligibleForSavingThrows: boolean = true,
  ) {
    this.name = name;

    if (maxHP < 1) {
      this.maxHP = 1;
    } else {
      this.maxHP = maxHP;
    }

    if (currentHP < 0) {
      this.currentHP = 0;
    } else {
      this.currentHP = currentHP;
    }
    this.initiative = initiative;
    this.level = level;
    this.dead = dead;
    this.battleConditions = battleConditions;
    this.eligibleForDeathSavingThrows = eligibleForSavingThrows;
    this.temporaryHP = new TemporaryHP(0, 0);
  }

  getMaxHP(): number {
    return this.maxHP;
  }

  getCurrentHP(): number {
    return this.currentHP;
  }

  modifyHp(hitPointsModifier: number): void {
    let hpBeforeModifying = this.currentHP;
    let isHeal: boolean = hitPointsModifier > 0;
    let isDamage: boolean = hitPointsModifier < 0;

    if (this.isDead()) {
      return;
    }

    if (isDamage) {
      if (this.isKnockedDown()) {
        this.setStabilized(false);
      }
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

      this.currentHP = Number(this.currentHP) + Number(hitPointsModifier);
      if (this.getCurrentHP() <= -this.getMaxHP()) {
        this.kill();
        this.currentHP = 0;
        return;
      }
      if (this.getCurrentHP() < 0) {
        this.currentHP = 0;
      }
      if (this.getCurrentHP() <= 0 && !this.dead && !this.hasCondition(Condition.UNCONSCIOUS)) {
        if (this.isEligibleForDeathSavingThrows()) {
          this.addCondition(new BattleCondition(Condition.UNCONSCIOUS));
          this.stabilized = false;
        } else {
          this.kill();
        }
        return;
      }
    }


    if (isHeal) {
      this.currentHP = Number(this.currentHP) + Number(hitPointsModifier);
      if (this.currentHP > this.maxHP) {
        this.currentHP = this.maxHP;
      }

      if (hpBeforeModifying == 0) {
        //TODO: this will have to be changed when unconsciousness source other than damage will be implemented!
        this.removeCondition(Condition.UNCONSCIOUS);
      }
    }

  }

  getInitiative(): number {
    return this.initiative;
  }

  setInitiative(initiative: number): void {
    this.initiative = initiative;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  isDead(): boolean {
    return this.dead;
  }

  kill(): void {
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
    return this.currentHP == 0;
  }

  isStabilized(): boolean {
    return this.stabilized;
  }

  setStabilized(stabilized: boolean): void {
    this.stabilized = stabilized;
  }

  hasCondition(condition: Condition): boolean {
    return !!this.battleConditions.find(conditionToFind => conditionToFind.getCondition() == condition);
  }

  addCondition(condition: BattleCondition): void {
    this.battleConditions.push(condition);
  }

  getConditions(): BattleCondition[] {
    return this.battleConditions;
  }

  getTemporaryHitPoints(): TemporaryHP {
    return this.temporaryHP;
  }

  setTemporaryHitPoints(hitPoints: number, duration: number): void {
    this.temporaryHP = new TemporaryHP(hitPoints, duration);
  }

  decrementTemporaryHitPointDuration(): void {
    this.temporaryHP.decrementDuration();
  }

  getAvailableConditions(): Condition[] {
    let availableConditions: Condition[] = [];
    for (let condition of Condition.CONDITIONS) {
      if (!this.battleConditions.find(battleCondition => battleCondition.getCondition() === condition)) {
        availableConditions.push(condition);
      }
    }
    return availableConditions;
  }

  removeCondition(condition: Condition): void {
    let conditionToRemove = this.battleConditions.find(conditionToRemove => conditionToRemove.getCondition() == condition);
    if (conditionToRemove) {
      let index = this.battleConditions.indexOf(conditionToRemove);
      this.battleConditions.splice(index, 1);
    }
  }

  removeConditions(conditions: Condition[]): void {
    for (let condition of conditions) {
      this.removeCondition(condition);
    }
  }

  decrementConditionsDuration(): void {
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
      this.battleConditions, this.eligibleForDeathSavingThrows)
  }

  revivify(currentTime: Date): void {
    if(this.isDead()) {
      let characterDeathTime = this.diedAt;
      if(!characterDeathTime) {
        console.error(`Character ${this.name} set to revive is dead but death time not found!`);
        return;
      }
      let timeSinceDiedInSeconds = currentTime.getSeconds()-this.diedAt!.getSeconds();
      if(timeSinceDiedInSeconds <= 60) {
        this.dead = false;
        this.diedAt = undefined;
        this.modifyHp(1);
      }
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
