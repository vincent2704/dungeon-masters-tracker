import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementSystemService {

  private readonly feetToMetersRatio: number = 0.3;
  private readonly milesToKilometersRatio: number = 1.5;

  constructor() { }

  convertFeetToMeters(feet: number): number {
    return feet * this.feetToMetersRatio;
  }

  convertMilesToKilometers(miles: number): number {
    return miles * this.milesToKilometersRatio;
  }

}
