import {Component, Input, OnInit} from '@angular/core';
import {RestingService} from "../../services/resting/resting.service";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {PlayerCharacter} from "../../models/actors/playerCharacter";

@Component({
  selector: 'app-short-rest',
  templateUrl: './short-rest.component.html',
  styleUrls: ['./short-rest.component.css']
})
export class ShortRestComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[];
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
    // TODO: validation on hit dice to spend vs available hit dice
    this.restingService.performShortRest(this.shortRestDurationInHours, this.actorsToShortRestInput);
  }
}
