import {Component, Input, OnInit} from '@angular/core';
import {DistanceConverterService} from "../../../services/distance-converter.service";

@Component({
  selector: 'app-paces-and-distances-cheat-sheet',
  templateUrl: './paces-and-distances-cheat-sheet.component.html',
  styleUrls: ['./paces-and-distances-cheat-sheet.component.css']
})
export class PacesAndDistancesCheatSheetComponent implements OnInit {

  @Input()
  showInSI!: boolean;

  constructor(private distanceConverterService: DistanceConverterService) { }

  ngOnInit(): void {
  }

  getDistanceInMinute(distanceInFeet: number): string {
    return this.showInSI
      ? this.distanceConverterService.convertFeetToMeters(distanceInFeet) + " m"
      : distanceInFeet + " feet";
  }

  getDistance(distanceInMiles: number): string {
    return this.showInSI
      ? this.distanceConverterService.convertMilesToKilometers(distanceInMiles) + " km"
      : distanceInMiles + " miles";
  }

}