import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";

@Component({
  selector: 'app-protagonists-info',
  templateUrl: './protagonists-info.component.html',
  styleUrls: ['./protagonists-info.component.css']
})
export class ProtagonistsInfoComponent implements OnInit {

  @Input()
  playerCharacters!: Actor[];

  constructor() { }

  ngOnInit(): void {
  }
}
