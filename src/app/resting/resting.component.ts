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

    LocalStorageUtils.getPlayerCharacters().forEach(pc => {
      console.log(`${pc.name}`);
    })
  }

  updatePlayerCharacters(playerCharacters: PlayerCharacter[]) {
    LocalStorageUtils.setPlayerCharacters(playerCharacters);

    this.playerCharacters = playerCharacters;
  }
}
