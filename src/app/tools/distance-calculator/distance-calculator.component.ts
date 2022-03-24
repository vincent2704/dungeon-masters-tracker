import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distance-calculator',
  templateUrl: './distance-calculator.component.html',
  styleUrls: ['./distance-calculator.component.css']
})
export class DistanceCalculatorComponent implements OnInit {
  horizontalDistance: number = 0;
  verticalDistance: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  calculate(): number {
    let a2 = Math.pow(this.horizontalDistance, 2);
    let b2 = Math.pow(this.verticalDistance, 2);
    let c = Math.sqrt(a2 + b2);
    return parseFloat(c.toFixed(1));
  }
}
