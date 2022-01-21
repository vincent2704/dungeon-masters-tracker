import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  turn: number = 0;

  nextTurn(): void {
    this.turn++;
  }

}
