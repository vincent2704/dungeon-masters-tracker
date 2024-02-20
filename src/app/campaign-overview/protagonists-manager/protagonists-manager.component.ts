import { Component, OnInit } from '@angular/core';
import { ActorService } from "../../services/actor/actor.service";
import { PlayerCharacter } from "../../models/actors/playerCharacter";
import { LocalStorageUtils } from "../../utilities/storage/localStorageUtils";

@Component({
  selector: 'app-protagonists-manager',
  templateUrl: './protagonists-manager.component.html',
  styleUrls: ['./protagonists-manager.component.css']
})
export class ProtagonistsManagerComponent implements OnInit {

  playerCharacters: PlayerCharacter[] = [];

  newActorName: string = '';
  newActorLevel: string = '';
  newActorMaxHp: string = '';
  managingProtagonists: boolean = false;

  actorsToDelete: PlayerCharacter[] = [];
  actorsToAdd: PlayerCharacter[] = [];

  constructor(private actorService: ActorService) {
  }

  ngOnInit(): void {
    this.actorService.getPlayerCharacters()
      .subscribe((playerCharacters: PlayerCharacter[]) => {
        this.playerCharacters = playerCharacters;
      })
  }

  onManageProtagonists(): void {
    this.managingProtagonists = !this.managingProtagonists;
  }

  onProtagonistsChangesSubmitted(playerCharacters: PlayerCharacter[]): void {
    this.managingProtagonists = false;
    this.playerCharacters = playerCharacters;
    LocalStorageUtils.setPlayerCharacters(playerCharacters);
  }

}
