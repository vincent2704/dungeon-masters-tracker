import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  unsavedPlayerCharacter = {
    name: '',
    level: '',
    maxHp: ''
  }
  actorsToDelete: PlayerCharacter[] = [];
  unsavedPlayerCharacters: PlayerCharacter[] = [];

  constructor(private playerCharacterService: ActorService) { }

  ngOnInit(): void {
  }

  onSubmitProtagonists(): void {
    this.createPlayerCharacters();

    if(this.actorsToDelete.length > 0) {
      this.playerCharacterService.deletePlayerCharacters(this.actorsToDelete)
        .subscribe();
    }

    for(let actor of this.actorsToDelete) {
      if(this.playerCharacters.indexOf(actor) > -1) {
        this.playerCharacters.splice(this.playerCharacters.indexOf(actor), 1);
      }
    }
    this.actorsToDelete = [];

    this.playerCharacterService.updatePlayerCharacters(this.playerCharacters)
      .subscribe((playerCharacters: PlayerCharacter[]) => {
        this.playerCharacters = playerCharacters;
      })
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  onCancelEdit(): void {
    this.actorsToDelete = [];
    this.unsavedPlayerCharacters = [];
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

  addToUnsavedPCList(): void {
    let hp = parseInt(this.unsavedPlayerCharacter.maxHp);
    let level = parseInt(this.unsavedPlayerCharacter.level);
    let newPlayerCharacter: PlayerCharacter = {
      name: this.unsavedPlayerCharacter.name,
      maxHp: hp,
      currentHp: hp,
      level: level,
      resurrectionPenalty: 0,
      playerConditions: [],
      availableHitDice: level
    }
    this.unsavedPlayerCharacters.push(newPlayerCharacter);

    this.unsavedPlayerCharacter = {
      name: '',
      maxHp: '',
      level: ''
    }
  }

  onSetActorToDelete(actor: PlayerCharacter): void {
    this.actorsToDelete.push(actor);
  }

  onDeleteNewActor(addedActor: PlayerCharacter) {
    for(let actor of this.unsavedPlayerCharacters) {
      if(this.unsavedPlayerCharacters.indexOf(addedActor) > -1) {
        this.unsavedPlayerCharacters.splice(this.unsavedPlayerCharacters.indexOf(actor), 1);
      }
    }
  }

  private createPlayerCharacters() {
    this.playerCharacterService.createPlayerCharacters(this.unsavedPlayerCharacters)
      .subscribe()
  }

}
