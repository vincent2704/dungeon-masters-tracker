import { Component, OnInit } from '@angular/core';
import {MeasurementSystemService} from "../../services/measurement-system.service";

@Component({
  selector: 'app-travel',
  templateUrl: './travel-calculator.component.html',
  styleUrls: ['./travel-calculator.component.css']
})
export class TravelCalculatorComponent implements OnInit {
  pace: string = '';
  travelInformation: string = '';

  constructor(private measurementSystemService: MeasurementSystemService) { }

  ngOnInit(): void {
  }

  setPace(event: Event) {
    this.pace = (<HTMLInputElement>event.target).value;
  }

  getTypeDistancePlaceholder(): string {
    return this.measurementSystemService.isUsingSISystem() ? 'Type distance in kilometers' : 'Type distance in miles';
  }

  getTimePlaceholder(): string {
    return 'Type travel time in hours';
  }

  onCalculateTime(event: any) {
    let distance = parseFloat((<HTMLInputElement>event.target).value);
    this.updateTravelTime(distance);
  }

  onCalculateDistance(event: any) {
    let time = parseFloat((<HTMLInputElement>event.target).value);
    this.updateTravelDistance(time);
  }

  private updateTravelTime(distance: number) {
    let travelTimeInHours: string = (distance/this.getOneHourTravelToPaceRatio()).toFixed(1);
    this.travelInformation =  `Travel time: ${travelTimeInHours} hours`;
  }

  private updateTravelDistance(time: number) {
    let distanceTraveledForHours = (time * this.getOneHourTravelToPaceRatio()).toFixed(1);
    let measureUnit = this.measurementSystemService.isUsingSISystem() ? 'kilometers' : 'miles';
    this.travelInformation =  `Traveled distance: ${distanceTraveledForHours} ${measureUnit}`;
  }

  private getOneHourTravelToPaceRatio(): number {
    if(this.pace === 'Fast') {
      return this.measurementSystemService.isUsingSISystem() ? 6 : 4;
    }
    if(this.pace === 'Normal') {
      return this.measurementSystemService.isUsingSISystem() ? 4.5 : 3;
    }
    if(this.pace === 'Slow') {
      return this.measurementSystemService.isUsingSISystem() ? 3 : 2;
    }
    console.error('ERROR ON SELECTING PACE');
    return 0;
  }

}
