import { Component, OnInit } from '@angular/core';
import {Actor} from "../models/actor";
import {ActorService} from "../services/actor/actor.service";

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.css']
})
export class CampaignOverviewComponent implements OnInit {

  playerCharacters: Actor[];

  // add new actor form
  newActorName: string = '';
  newActorLevel: string = '';
  newActorMaxHp: string = '';
  managingProtagonists: boolean = false;

  actorsToDelete: Actor[] = [];

  constructor(private actorService: ActorService) {
    this.playerCharacters = actorService.getActors().map(actor => Object.assign({}, actor));
  }

  ngOnInit(): void {
  }

  addActor(): void {
    let newActor = new Actor(this.newActorName, parseInt(this.newActorLevel), parseInt(this.newActorMaxHp));
    this.playerCharacters.push(newActor);
  }

  showDeleteButton(actor: Actor): boolean {
    return this.managingProtagonists && !this.actorsToDelete.includes(actor);
  }

  showRetainButton(actor: Actor): boolean {
    return this.managingProtagonists && this.actorsToDelete.includes(actor);
  }

  onSetActorToDelete(actor: Actor): void {
    this.actorsToDelete.push(actor);
  }

  onSetActorToRetain(actor: Actor): void {
    this.actorsToDelete.splice(this.actorsToDelete.indexOf(actor), 1);
  }

  onManageProtagonists(): void {
    this.managingProtagonists = true;
  }

  onSubmitProtagonists(): void {
    this.deleteActors(this.actorsToDelete);
    //TODO: Backend call here
    this.actorService.setActors(this.playerCharacters);
    this.managingProtagonists = false;
  }

  onCancelEdit(): void {
    this.playerCharacters = this.actorService.getActors().map(actor => Object.assign({}, actor));
    this.actorsToDelete = [];
    this.managingProtagonists = false;
  }

  private deleteActors(actorsToDelete: Actor[]): void {
    for(let actor of actorsToDelete) {
      if(this.playerCharacters.indexOf(actor) > -1) {
        this.playerCharacters.splice(this.playerCharacters.indexOf(actor), 1);
      }
    }
  }
}
