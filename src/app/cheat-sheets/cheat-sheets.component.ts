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
  showCombatEncounterCheatSheet: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShowTravellingCheatSheet() {
    this.showTravellingCheatSheet = !this.showTravellingCheatSheet;
    this.showCoverCheatSheet = false;
    this.showAbilityChecksCheatSheet = false;
    this.showCombatEncounterCheatSheet = false;
  }

  onShowCoverCheatSheet() {
    this.showTravellingCheatSheet = false;
    this.showCoverCheatSheet = !this.showCoverCheatSheet;
    this.showAbilityChecksCheatSheet = false;
    this.showCombatEncounterCheatSheet = false;
  }

  onShowAbilityChecksCheatSheet() {
    this.showTravellingCheatSheet = false;
    this.showCoverCheatSheet = false;
    this.showAbilityChecksCheatSheet = !this.showAbilityChecksCheatSheet;
    this.showCombatEncounterCheatSheet = false;
  }

  onShowCombatEncounterCheatSheet() {
    this.showTravellingCheatSheet = false;
    this.showCoverCheatSheet = false;
    this.showAbilityChecksCheatSheet = false;
    this.showCombatEncounterCheatSheet = !this.showCombatEncounterCheatSheet;
  }
}
