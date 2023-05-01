import { Component, Input, OnInit } from '@angular/core';
import { RestingService } from "../../services/resting/resting.service";
import { ShortRestInput } from "../../models/resting/shortRestInput";
import { PlayerCharacter } from "../../models/actors/playerCharacter";

@Component({
  selector: 'app-short-rest',
  templateUrl: './short-rest.component.html',
  styleUrls: ['./short-rest.component.css']
})
export class ShortRestComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[]
  // TODO: maybe in future move it to forms somehow
  actorsToShortRestInput: Map<PlayerCharacter, ShortRestInput> = new Map<PlayerCharacter, ShortRestInput>();
  shortRestDurationInHours: number = 1;

  constructor(private restingService: RestingService) {
  }

  ngOnChanges(): void {
    this.playerCharacters.forEach(playerCharacter => {
      this.actorsToShortRestInput.set(playerCharacter, new ShortRestInput())
    })
  }

  ngOnInit(): void {
    this.playerCharacters.forEach(playerCharacter => {
      this.actorsToShortRestInput.set(playerCharacter, new ShortRestInput())
    })
  }

  confirmShortRest(): void {
    if (this.isValid()) {
      this.restingService.performShortRest(this.shortRestDurationInHours, this.actorsToShortRestInput);
    }
  }

  isValid(): boolean {
    for (let [pc, input] of this.actorsToShortRestInput) {
      if (input.hitDiceToSpend > pc.availableHitDice) {
        return false;
      }
    }
    return true;
  }
}
