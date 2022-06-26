import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-long-rest',
  templateUrl: './long-rest.component.html',
  styleUrls: ['./long-rest.component.css']
})
export class LongRestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getTimeSinceLastRest(): number {
    return 18;
  }

  getMinimumRestingTime(): number {
    return 8
  }
}
