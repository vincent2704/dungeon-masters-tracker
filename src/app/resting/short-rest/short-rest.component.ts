import {Component, Input, OnInit} from '@angular/core';
import {RestingService} from "../../services/resting/resting.service";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {ActorService} from "../../services/actor/actor.service";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

@Component({
  selector: 'app-short-rest',
  templateUrl: './short-rest.component.html',
  styleUrls: ['./short-rest.component.css']
})
export class ShortRestComponent implements OnInit {

  @Input()
  actors!: PlayerCharacter[];
  actorsToShortRestInput: Map<PlayerCharacter, ShortRestInput> = new Map<PlayerCharacter, ShortRestInput>();
  shortRestDurationInHours: number = 1;

  constructor(private actorService: ActorService, private restingService: RestingService) {
  }

  ngOnInit(): void {
    for(let actor of this.actors) {
      this.actorsToShortRestInput.set(actor, new ShortRestInput());
    }
  }

  getAvailableHitDice(actor: PlayerCharacter): number {
    return this.restingService.getActorsAvailableHitDice(actor);
  }

  confirmShortRest(): void {
    //TODO: validation on hit dice to spend vs available hit dice
    this.restingService.performShortRest(this.shortRestDurationInHours, this.actorsToShortRestInput);
  }
}
