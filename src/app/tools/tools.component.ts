import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  show3dDistanceCalculator: boolean = false;
  showTravelCalculator: boolean = false;
  showCombatDifficultyCalculator: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShow3dCalculator() {
    this.show3dDistanceCalculator = !this.show3dDistanceCalculator;
  }

  onShowTravelCalculator() {
    this.showTravelCalculator = !this.showTravelCalculator;
  }

  onShowCombatDifficultyCalculator() {
    this.showCombatDifficultyCalculator = !this.showCombatDifficultyCalculator;
  }
}
