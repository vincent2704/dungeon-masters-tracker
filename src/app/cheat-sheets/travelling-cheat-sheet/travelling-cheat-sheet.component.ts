import {Component, OnInit} from '@angular/core';
import {Settings} from "../../services/settings/settings";

@Component({
  selector: 'app-travelling-cheat-sheet',
  templateUrl: './travelling-cheat-sheet.component.html',
  styleUrls: ['./travelling-cheat-sheet.component.css']
})
export class TravellingCheatSheetComponent implements OnInit {

  showPacesAndDistances: boolean = false;
  showWilderness: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onShowPacesAndDistances() {
    this.showPacesAndDistances = !this.showPacesAndDistances;
  }

  onShowWilderness() {
    this.showWilderness = !this.showWilderness;
  }

  isUsingSISystem() {
    return Settings.isUsingSISystem();
  }

}
