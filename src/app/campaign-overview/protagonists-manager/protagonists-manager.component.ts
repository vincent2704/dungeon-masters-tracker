import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor/actor.service";

@Component({
  selector: 'app-protagonists-manager',
  templateUrl: './protagonists-manager.component.html',
  styleUrls: ['./protagonists-manager.component.css']
})
export class ProtagonistsManagerComponent implements OnInit {

  @Input()
  playerCharacters!: Actor[];

  newActorName: string = '';
  newActorLevel: string = '';
  newActorMaxHp: string = '';
  managingProtagonists: boolean = false;

  actorsToDelete: Actor[] = [];
  actorsToAdd: Actor[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getPlayerCharacters()
      .subscribe((playerCharacters: Actor[]) => {
        this.playerCharacters = playerCharacters;
      })
  }

  onManageProtagonists(): void {
    this.managingProtagonists = !this.managingProtagonists;
  }

  onProtagonistsChangesSubmitted(playerCharacters: Actor[]): void {
    this.managingProtagonists = false;
    this.playerCharacters = playerCharacters;
  }

}
