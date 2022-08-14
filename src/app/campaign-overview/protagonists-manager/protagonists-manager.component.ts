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
    this.playerCharacters = this.getProtagonistsCopy();
  }

  onSubmitProtagonists(): void {
    this.deleteActors(this.actorsToDelete);
    this.addActors(this.actorsToAdd);
    let playerCharacters = this.playerCharacters.map(playerCharacter => {
      return playerCharacter.copy();
    })
    this.actorService.setActors(playerCharacters);
    this.managingProtagonists = false;
  }

  onCancelEdit(): void {
    this.playerCharacters = this.getProtagonistsCopy();
    this.actorsToDelete = [];
    this.actorsToAdd = [];
    this.managingProtagonists = false;
  }

  showDeleteButton(actor: Actor): boolean {
    return this.managingProtagonists && !this.actorsToDelete.includes(actor);
  }

  showRetainButton(actor: Actor): boolean {
    return this.managingProtagonists && this.actorsToDelete.includes(actor);
  }

  onSetActorToRetain(actor: Actor): void {
    this.actorsToDelete.splice(this.actorsToDelete.indexOf(actor), 1);
  }

  onManageProtagonists(): void {
    this.managingProtagonists = true;
  }

  addActor(): void {
    let newActor = new Actor(this.newActorName, parseInt(this.newActorMaxHp), parseInt(this.newActorMaxHp),0, parseInt(this.newActorLevel));
    this.actorsToAdd.push(newActor);
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
    for(let actor of actorsToDelete) {
      if(this.playerCharacters.indexOf(actor) > -1) {
        this.playerCharacters.splice(this.playerCharacters.indexOf(actor), 1);
      }
    }
    this.actorsToDelete = [];
  }

  private getProtagonistsCopy() {
    return this.actorService.getActors().map(actor => actor.copy());
  }

}