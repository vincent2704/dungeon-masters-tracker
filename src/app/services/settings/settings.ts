export class Settings {

  //TODO: later - save settings in local storage
  private static autoLoadProtagonists: boolean = true;
  private static useSISystem: boolean = true;
  private static autoLoadMonsterActions: boolean = false;
  private static campaignId: string = '0f29e0da-c69f-44a5-9679-76019f21c8ec';

  constructor() { }

  static setCampaignIdTextFieldValue(campaignId: string) {
    this.campaignId = campaignId;
  }

  static getCampaignIdTextFieldValue(): string {
    return this.campaignId;
  }

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
