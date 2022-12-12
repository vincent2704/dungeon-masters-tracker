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

  actorToAdd = {
    name: '',
    level: '',
    maxHp: ''
  }
  actorsToDelete: Actor[] = [];
  actorsToAdd: Actor[] = [];

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
      .subscribe((playerCharacters: Actor[]) => {
        this.playerCharacters = playerCharacters;
      })
    this.managingFinishedEmitter.emit(this.playerCharacters)
  }

  onCancelEdit(): void {
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
    let newActor = new Actor(this.actorToAdd.name, parseInt(this.actorToAdd.maxHp), parseInt(this.actorToAdd.maxHp),
      parseInt(this.actorToAdd.level));
    this.actorsToAdd.push(newActor);
    this.actorToAdd = {
      name: '',
      maxHp: '',
      level: ''
    }
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
      .subscribe();
  }


}
