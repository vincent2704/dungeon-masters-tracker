export class MeasurementSystem {

  private static readonly feetToMetersRatio: number = 0.3;
  private static readonly milesToKilometersRatio: number = 1.5;

  static convertFeetToMeters(feet: number): number {
    return feet * this.feetToMetersRatio;
  }

  static convertMilesToKilometers(miles: number): number {
    return miles * this.milesToKilometersRatio;
  }

}
