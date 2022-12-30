import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actors/actor";
import {PlayerCharacter} from "../../../models/actors/playerCharacter";

@Component({
  selector: 'app-protagonists-info',
  templateUrl: './protagonists-info.component.html',
  styleUrls: ['./protagonists-info.component.css']
})
export class ProtagonistsInfoComponent implements OnInit {

  @Input()
  playerCharacters!: PlayerCharacter[];

  constructor() { }

  ngOnInit(): void {
  }
}
