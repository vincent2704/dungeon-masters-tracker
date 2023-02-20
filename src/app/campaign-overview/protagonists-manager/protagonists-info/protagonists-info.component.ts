import {Component, Input, OnInit} from '@angular/core';
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

@Component({
  selector: 'app-protagonists-info',
  templateUrl: './protagonists-info.component.html',
  styleUrls: ['./protagonists-info.component.css']
})
export class ProtagonistsInfoComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[];

  constructor() { }

  ngOnInit(): void {
  }

  getConditionNames(playerCharacter: PlayerCharacter): string {
    const conditions = playerCharacter.playerConditions;
    if(conditions) {
      return conditions.map(condition => condition.name)
        .join(", ")
    }
    return "";
  }
}
