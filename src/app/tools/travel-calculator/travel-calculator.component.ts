import { Component, OnInit } from '@angular/core';
import {MeasurementSystemService} from "../../services/measurement-system.service";

@Component({
  selector: 'app-travel',
  templateUrl: './travel-calculator.component.html',
  styleUrls: ['./travel-calculator.component.css']
})
export class TravelCalculatorComponent implements OnInit {
  pace: string = '';
  travelTimeInformation: string = '';

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

  }

  private updateTravelTime(distance: number) {
    let distanceToPaceRatio = this.getRatioForPace(this.pace);
    let travelTimeInHours: string = (distance/distanceToPaceRatio).toFixed(1);
    this.travelTimeInformation =  `Travel time: ${travelTimeInHours} hours`;
  }

  private getRatioForPace(pace: string): number {
    if(pace === 'Fast') {
      return this.measurementSystemService.isUsingSISystem() ? 6 : 4;
    }
    if(pace === 'Normal') {
      return this.measurementSystemService.isUsingSISystem() ? 4.5 : 3;
    }
    if(pace === 'Slow') {
      return this.measurementSystemService.isUsingSISystem() ? 3 : 2;
    }
    console.error('ERROR ON SELECTING PACE');
    return 0;
  }

}
