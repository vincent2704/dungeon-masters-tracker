import {Component, OnInit} from '@angular/core';
import {MeasurementSystemService} from "../../services/measurement-system.service";

@Component({
  selector: 'app-travelling-cheat-sheet',
  templateUrl: './travelling-cheat-sheet.component.html',
  styleUrls: ['./travelling-cheat-sheet.component.css']
})
export class TravellingCheatSheetComponent implements OnInit {

  showPacesAndDistances: boolean = false;
  showWilderness: boolean = false;

  constructor(private measurementSystemService: MeasurementSystemService) {
  }

  ngOnInit(): void {
  }

  onShowPacesAndDistances() {
    this.showPacesAndDistances = !this.showPacesAndDistances;
  }

  onShowWilderness() {
    this.showWilderness = !this.showWilderness;
  }

  onUseSISystemChange() {
    this.measurementSystemService.changeUsedMeasurementSystem();
  }

  isUsingSISystem() {
    return this.measurementSystemService.isUsingSISystem();
  }
}
