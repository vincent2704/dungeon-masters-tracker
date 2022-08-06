import {Settings} from "../settings/settings";

export class MeasurementSystem {

  private static readonly feetToMetersRatio: number = 0.3;
  private static readonly milesToKilometersRatio: number = 1.5;

  static getFeetDistance(feet: number): number {
    return Settings.isUsingSISystem() ? feet * this.feetToMetersRatio : feet;
  }

  static getMilesDistance(miles: number): number {
    return Settings.isUsingSISystem() ? miles * this.milesToKilometersRatio : miles;
  }

  static getMeasurementUnit(): string {
    return Settings.isUsingSISystem() ? 'm' : 'ft.'
  }

  static getMeasurementUnitLong() {
    return Settings.isUsingSISystem() ? 'meters' : 'feet'
  }

  static getMeasurementUnitLongSingular() {
    return Settings.isUsingSISystem() ? 'meter' : 'foot'
  }
}
