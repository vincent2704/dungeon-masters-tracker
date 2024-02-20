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
  playerCharactersToDelete: PlayerCharacter[] = [];
  unsavedPlayerCharacters: PlayerCharacter[] = [];

  constructor(private playerCharacterService: ActorService) { }

  ngOnInit(): void {
  }

  onSubmitProtagonists(): void {
    this.submitPlayerCharacterChanges()

    console.log('protagonist editor. emitting characters:')
    this.playerCharacters.forEach(pc => {
      console.log(pc.name)
    })
  }

  onCancelEdit(): void {
    this.playerCharactersToDelete = [];
    this.unsavedPlayerCharacters = [];
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  showDeleteButton(actor: PlayerCharacter): boolean {
    return !this.playerCharactersToDelete.includes(actor);
  }

  showRetainButton(actor: PlayerCharacter): boolean {
    return this.playerCharactersToDelete.includes(actor);
  }

  onSetActorToRetain(actor: PlayerCharacter): void {
    this.playerCharactersToDelete.splice(this.playerCharactersToDelete.indexOf(actor), 1);
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
    this.playerCharactersToDelete.push(actor);
  }

  onDeleteNewActor(addedActor: PlayerCharacter) {
    for(let actor of this.unsavedPlayerCharacters) {
      if(this.unsavedPlayerCharacters.indexOf(addedActor) > -1) {
        this.unsavedPlayerCharacters.splice(this.unsavedPlayerCharacters.indexOf(actor), 1);
      }
    }
  }

  // fixed order of executions because otherwise async can cause emitting player characters list
  // before all the client responses are processed and the list is not fully updated
  private submitPlayerCharacterChanges() {
    if(this.playerCharactersToDelete.length > 0 ){
      this.playerCharacterService.deletePlayerCharacters(this.playerCharactersToDelete)
        .subscribe(() => {
          for(let playerCharacterToDelete of this.playerCharactersToDelete) {
            if(this.playerCharacterListContainsPlayerCharacter(playerCharacterToDelete)) {
              this.removePlayerCharacterFromPlayerCharacterList(playerCharacterToDelete)
            }
          }
          this.playerCharactersToDelete = [];
          this.createPlayerCharacters();
        });
    }
    else {
      if(this.unsavedPlayerCharacters.length > 0) {
        this.playerCharacterService.createPlayerCharacters(this.unsavedPlayerCharacters)
          .subscribe((response: PlayerCharacter[]) => {
            response.forEach(pc => {
              this.playerCharacters.push(pc);
            })
            this.updatePlayerCharacters()
          })
      } else {
        this.updatePlayerCharacters()
      }
    }
  }

  private createPlayerCharacters() {
    this.playerCharacterService.createPlayerCharacters(this.unsavedPlayerCharacters)
      .subscribe((response: PlayerCharacter[]) => {
        response.forEach(pc => {
          this.playerCharacters.push(pc);
        })
        this.updatePlayerCharacters()
      })
  }

  private updatePlayerCharacters() {
    this.playerCharacterService.updatePlayerCharacters(this.playerCharacters)
      .subscribe((response: PlayerCharacter[]) => {
        this.playerCharacters = response;
        this.managingFinishedEmitter.emit(this.playerCharacters)
      })
  }

  private playerCharacterListContainsPlayerCharacter(playerCharacter: PlayerCharacter): boolean {
    return this.playerCharacters.indexOf(playerCharacter) > -1;
  }

  private removePlayerCharacterFromPlayerCharacterList(playerCharacter: PlayerCharacter) {
    this.playerCharacters.splice(this.playerCharacters.indexOf(playerCharacter), 1)
  }

}
