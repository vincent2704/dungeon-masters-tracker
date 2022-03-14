import {Component, OnInit} from '@angular/core';
import {DistanceConverterService} from "../../services/distance-converter.service";

@Component({
  selector: 'app-travelling-cheat-sheet',
  templateUrl: './travelling-cheat-sheet.component.html',
  styleUrls: ['./travelling-cheat-sheet.component.css']
})
export class TravellingCheatSheetComponent implements OnInit {

  showInSI: boolean = true;

  constructor(private distanceConverterService: DistanceConverterService) {
  }

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


  onUseSISystemChange() {
    this.showInSI = !this.showInSI;
  }
}
