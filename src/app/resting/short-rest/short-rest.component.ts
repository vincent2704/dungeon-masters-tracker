import {Component, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {RestingService} from "../../services/resting/resting.service";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {ActorService} from "../../services/actor/actor.service";

@Component({
  selector: 'app-short-rest',
  templateUrl: './short-rest.component.html',
  styleUrls: ['./short-rest.component.css']
})
export class ShortRestComponent implements OnInit {

  actors: Actor[] = [];
  actorsToShortRestInput: Map<Actor, ShortRestInput> = new Map<Actor, ShortRestInput>();
  shortRestDurationInHours: number = 1;

  constructor(private actorService: ActorService, private restingService: RestingService) {
  }

  ngOnInit(): void {
    this.actors = this.actorService.getActors()
    for(let actor of this.actors) {
      this.actorsToShortRestInput.set(actor, new ShortRestInput());
    }
  }

  getAvailableHitDice(actor: Actor): number {
    return this.restingService.getActorsAvailableHitDice(actor);
  }

  confirmShortRest(): void {
    //TODO: validation on hit dice to spend vs available hit dice
    this.restingService.performShortRest(this.shortRestDurationInHours, this.actorsToShortRestInput);
  }
}
