export class PlayerCharacter {

  constructor(
    private name: string,
    private maxHp: number,
    private currentHp: number = maxHp,
    private level: number = 1,
    private resurrectionPenalty: number = 0,
    private timeOfDeath?: Date,
    private id?: number
  ) {
    if (maxHp < 1) {
      this.maxHp = 1;
    } else {
      this.maxHp = maxHp;
    }

    if (currentHp < 0) {
      this.currentHp = 0;
    } else {
      this.currentHp = currentHp;
    }
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getMaxHp(): number {
    return this.maxHp;
  }

  setMaxHp(maxHp: number) {
    this.maxHp = maxHp;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  getResurrectionPenalty(): number {
    return this.resurrectionPenalty;
  }

  setResurrectionPenalty(penalty: number): void {
    this.resurrectionPenalty = penalty;
  }

  getTimeOfDeath(): Date | undefined {
    return this.timeOfDeath;
  }

  setTimeOfDeath(timeOfDeath: Date): void {
    this.timeOfDeath = timeOfDeath;
  }

  getId(): number | undefined {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

}



