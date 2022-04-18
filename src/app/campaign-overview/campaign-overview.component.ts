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

  constructor(private actorService: ActorService, private npcService: NpcService) {
    this.playerCharacters = actorService.getActors();
    this.npcs = npcService.getNpcs();
  }

  ngOnInit(): void {
  }

}
