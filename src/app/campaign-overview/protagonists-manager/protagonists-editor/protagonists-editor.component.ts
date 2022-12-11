import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from "../../../models/actor";
import {ActorService} from "../../../services/actor/actor.service";

@Component({
  selector: 'app-protagonists-editor',
  templateUrl: './protagonists-editor.component.html',
  styleUrls: ['./protagonists-editor.component.css']
})
export class ProtagonistsEditorComponent implements OnInit {

  @Output()
  managingFinishedEmitter = new EventEmitter<Actor[]>()

  @Input()
  playerCharacters!: Actor[];

  newActorName: string = '';
  newActorLevel: string = '';
  newActorMaxHp: string = '';
  actorsToDelete: Actor[] = [];
  actorsToAdd: Actor[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
  }

  onSubmitProtagonists(): void {
    this.deleteActors(this.actorsToDelete);
    this.addActors(this.actorsToAdd);
    console.log(this.playerCharacters)
    this.actorService.updatePlayerCharacters(this.playerCharacters)
      .subscribe((playerCharacters: Actor[]) => {
        this.playerCharacters = playerCharacters;
      })
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  onCancelEdit(): void {
    this.playerCharacters = this.actorService.getActors();
    this.actorsToDelete = [];
    this.actorsToAdd = [];
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  showDeleteButton(actor: Actor): boolean {
    return !this.actorsToDelete.includes(actor);
  }

  showRetainButton(actor: Actor): boolean {
    return this.actorsToDelete.includes(actor);
  }

  onSetActorToRetain(actor: Actor): void {
    this.actorsToDelete.splice(this.actorsToDelete.indexOf(actor), 1);
  }

  addActor(): void {
    let newActor = new Actor(this.newActorName, parseInt(this.newActorMaxHp), parseInt(this.newActorMaxHp),
      0, parseInt(this.newActorLevel));
    this.actorsToAdd.push(newActor);
    this.newActorName = '';
    this.newActorLevel = '';
    this.newActorMaxHp = '';
  }

  onSetActorToDelete(actor: Actor): void {
    this.actorsToDelete.push(actor);
  }

  onDeleteNewActor(addedActor: Actor) {
    for(let actor of this.actorsToAdd) {
      if(this.actorsToAdd.indexOf(addedActor) > -1) {
        this.actorsToAdd.splice(this.actorsToAdd.indexOf(actor), 1);
      }
    }
  }

  private addActors(actorsToAdd: Actor[]): void {
    for(let actor of actorsToAdd) {
      this.playerCharacters.push(actor);
    }
    this.actorsToAdd = [];
  }

  private deleteActors(actorsToDelete: Actor[]): void {
    this.actorService.deletePlayerCharacters(actorsToDelete)
      .subscribe(() => {
        for(let actor of actorsToDelete) {
          if(this.playerCharacters.indexOf(actor) > -1) {
            this.playerCharacters.splice(this.playerCharacters.indexOf(actor), 1);
          }
        }
        this.actorsToDelete = [];
      });
  }


}
