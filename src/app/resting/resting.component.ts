import { Component, OnInit } from '@angular/core';
import {PlayerCharacter} from "../models/actors/playerCharacter";
import { LocalStorageUtils } from "../utilities/storage/localStorageUtils";

@Component({
  selector: 'app-resting',
  templateUrl: './resting.component.html',
  styleUrls: ['./resting.component.css']
})
export class RestingComponent implements OnInit {

  playerCharacters: PlayerCharacter[] = [];

  constructor() { }

  ngOnInit(): void {
    this.playerCharacters = LocalStorageUtils.getPlayerCharacters();
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]) {
    console.log(`resting component pcs: ${JSON.stringify(playerCharacters)}`)
    LocalStorageUtils.setPlayerCharacters(playerCharacters);
    this.playerCharacters = playerCharacters;
  }
}
