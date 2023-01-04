export class Settings {

  //TODO: later - save settings in local storage
  private static autoLoadProtagonists: boolean = true;
  private static useSISystem: boolean = true;
  private static autoLoadMonsterActions: boolean = false;

  constructor() { }

  static setSISystem(useSI: boolean): void {
    Settings.useSISystem = useSI;
  }

  static changeUsedMeasurementSystem(): void {
    this.useSISystem = !this.useSISystem;
  }

  static changeAutoLoadProtagonists(): void {
    this.autoLoadProtagonists = !this.autoLoadProtagonists;
  }

  static changeAutoLoadMonsterActions(): void {
    this.autoLoadMonsterActions = !this.autoLoadMonsterActions;
  }

  static setAutoLoadProtagonists(autoLoadProtagonists: boolean): void {
    Settings.autoLoadProtagonists = autoLoadProtagonists;
  }

  static isUsingSISystem(): boolean {
    return this.useSISystem;
  }

  static isAutoLoadProtagonists(): boolean {
    return this.autoLoadProtagonists;
  }

  static isAutoLoadMonsterActions(): boolean {
    return this.autoLoadMonsterActions;
  }
}
