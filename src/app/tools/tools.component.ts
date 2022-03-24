import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  showCalculator: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShowCalculator() {
    this.showCalculator = !this.showCalculator;
  }
}
