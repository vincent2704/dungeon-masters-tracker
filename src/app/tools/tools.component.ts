import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  showCalculator: boolean = false;
  showTravel: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShowCalculator() {
    this.showCalculator = !this.showCalculator;
  }

  onShowTravel() {
    this.showTravel = !this.showTravel;
  }
}
