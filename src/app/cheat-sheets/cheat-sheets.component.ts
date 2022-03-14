import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cheat-sheets',
  templateUrl: './cheat-sheets.component.html',
  styleUrls: ['./cheat-sheets.component.css']
})
export class CheatSheetsComponent implements OnInit {
  showTravellingCheatSheet: boolean = false;
  showCoverCheatSheet: boolean = false;
  showAbilityChecksCheatSheet: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShowTravellingCheatSheet() {
    this.showTravellingCheatSheet = !this.showTravellingCheatSheet;
  }

  onShowCoverCheatSheet() {
    this.showCoverCheatSheet = !this.showCoverCheatSheet;
  }

  onShowAbilityChecksCheatSheet() {
    this.showAbilityChecksCheatSheet = !this.showAbilityChecksCheatSheet;
  }
}
