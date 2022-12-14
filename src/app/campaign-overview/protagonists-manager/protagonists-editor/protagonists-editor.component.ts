import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actors/actor";
import {ActorService} from "../../../services/actor/actor.service";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

@Component({
  selector: 'app-protagonists-editor',
  templateUrl: './protagonists-editor.component.html',
  styleUrls: ['./protagonists-editor.component.css']
})
export class ProtagonistsEditorComponent implements OnInit {

  @Output()
  managingFinishedEmitter = new EventEmitter<PlayerCharacter[]>()

  @Input()
  playerCharacters!: PlayerCharacter[];

  actorToAdd = {
    name: '',
    level: '',
    maxHp: ''
  }
  actorsToDelete: PlayerCharacter[] = [];
  actorsToAdd: PlayerCharacter[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
  }

  onSubmitProtagonists(): void {
    if(this.actorsToDelete.length > 0) {
      this.actorService.deletePlayerCharacters(this.actorsToDelete)
        .subscribe();
      for(let actor of this.actorsToDelete) {
        if(this.playerCharacters.indexOf(actor) > -1) {
          this.playerCharacters.splice(this.playerCharacters.indexOf(actor), 1);
        }
      }
      this.actorsToDelete = [];
    }
    this.addActors(this.actorsToAdd);

    this.actorService.updatePlayerCharacters(this.playerCharacters)
      .subscribe((playerCharacters: PlayerCharacter[]) => {
        this.playerCharacters = playerCharacters;
      })
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  onCancelEdit(): void {
    this.actorsToDelete = [];
    this.actorsToAdd = [];
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  showDeleteButton(actor: PlayerCharacter): boolean {
    return !this.actorsToDelete.includes(actor);
  }

  showRetainButton(actor: PlayerCharacter): boolean {
    return this.actorsToDelete.includes(actor);
  }

  onSetActorToRetain(actor: PlayerCharacter): void {
    this.actorsToDelete.splice(this.actorsToDelete.indexOf(actor), 1);
  }

  addActor(): void {
    let newPlayerCharacter: PlayerCharacter = {
      name: this.actorToAdd.name,
      maxHp: parseInt(this.actorToAdd.maxHp),
      level: parseInt(this.actorToAdd.level),
    }
    this.actorsToAdd.push(newPlayerCharacter);
    this.actorToAdd = {
      name: '',
      maxHp: '',
      level: ''
    }
  }

  onSetActorToDelete(actor: PlayerCharacter): void {
    this.actorsToDelete.push(actor);
  }

  onDeleteNewActor(addedActor: PlayerCharacter) {
    for(let actor of this.actorsToAdd) {
      if(this.actorsToAdd.indexOf(addedActor) > -1) {
        this.actorsToAdd.splice(this.actorsToAdd.indexOf(actor), 1);
      }
    }
  }

  private addActors(playerCharactersToAdd: PlayerCharacter[]): void {
    for(let pc of playerCharactersToAdd) {
      this.playerCharacters.push(pc);
    }
    this.actorsToAdd = [];
  }

  private deleteActors(playerCharactersToDelete: PlayerCharacter[]): void {
    this.actorService.deletePlayerCharacters(playerCharactersToDelete)
      .subscribe();
  }


}
