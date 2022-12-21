import { Component, OnInit } from '@angular/core';
import {ActorService} from "../services/actor/actor.service";
import {PlayerCharacter} from "../models/actors/playerCharacter";

@Component({
  selector: 'app-resting',
  templateUrl: './resting.component.html',
  styleUrls: ['./resting.component.css']
})
export class RestingComponent implements OnInit {

  playerCharacters: PlayerCharacter[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getPlayerCharacters()
      .subscribe(
        response => {
          this.playerCharacters = response
        },
        error => {
          console.log(error)
        })
  }

}
