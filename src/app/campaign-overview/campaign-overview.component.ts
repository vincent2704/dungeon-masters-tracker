import { Component, OnInit } from '@angular/core';
import {Actor} from "../models/actor";
import {ActorService} from "../services/actor.service";
import {NpcService} from "../services/npc.service";
import {Npc} from "../models/npc";

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.css']
})
export class CampaignOverviewComponent implements OnInit {

  playerCharacters: Actor[];
  npcs: Npc[];

  // add new actor form
  newActorName: string = '';
  newActorLevel: string = '';
  newActorMaxHp: string = '';
  managingProtagonists: boolean = false;

  actorsToDelete: Actor[] = [];

  constructor(private actorService: ActorService, private npcService: NpcService) {
    this.playerCharacters = actorService.getActors();
    this.npcs = npcService.getNpcs();
  }

  ngOnInit(): void {
  }

  addActor(): void {
    let newActor = new Actor(this.newActorName, parseInt(this.newActorLevel), parseInt(this.newActorMaxHp));
    this.actorService.addActor(newActor);
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
    this.managingProtagonists = false;
    //TODO: Backend call here
    this.actorService.deleteActors(this.actorsToDelete);
  }
}
