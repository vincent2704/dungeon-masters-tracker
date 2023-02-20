import {Component, Input, OnInit} from '@angular/core';
import {PlayerCharacter} from "../../../../models/actors/playerCharacter";

@Component({
  selector: 'app-condition-cell',
  templateUrl: './condition-cell.component.html',
  styleUrls: ['./condition-cell.component.css']
})
export class ConditionCellComponent implements OnInit {

  constructor() { }

  @Input()
  playerCharacter!: PlayerCharacter;

  ngOnInit(): void {
  }

}
