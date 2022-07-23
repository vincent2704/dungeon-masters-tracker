export class Settings {

  //TODO: later - save settings in local storage
  private static autoLoadProtagonists: boolean = true;
  private static useSISystem: boolean = true;

  constructor() { }

  static isUsingSISystem(): boolean {
    return this.useSISystem;
  }

  static setSISystem(useSI: boolean): void {
    Settings.useSISystem = useSI;
  }

  static setAutoLoadProtagonists(autoLoadProtagonists: boolean): void {
    Settings.autoLoadProtagonists = autoLoadProtagonists;
  }

  static changeUsedMeasurementSystem() {
    this.useSISystem = !this.useSISystem;
  }

  static isAutoLoadProtagonists(): boolean {
    return this.autoLoadProtagonists;
  }

  static changeAutoLoadProtagonists() {
    this.autoLoadProtagonists = !this.autoLoadProtagonists;
  }
}
