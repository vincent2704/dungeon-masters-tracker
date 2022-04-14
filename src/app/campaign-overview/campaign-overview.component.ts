import { Component, OnInit } from '@angular/core';
import {Actor} from "../models/actor";
import {ActorService} from "../services/actor.service";

@Component({
  selector: 'app-campaign-overview',
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.css']
})
export class CampaignOverviewComponent implements OnInit {

  playerCharacters: Actor[];

  constructor(private actorService: ActorService) {
    this.playerCharacters = actorService.getActors();
  }

  ngOnInit(): void {
  }

}
