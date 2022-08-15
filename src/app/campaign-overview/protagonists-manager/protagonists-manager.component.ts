import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-protagonists-manager',
  templateUrl: './protagonists-manager.component.html',
  styleUrls: ['./protagonists-manager.component.css']
})
export class ProtagonistsManagerComponent implements OnInit {

  @Input()
  playerCharacters!: Actor[];

  newActorName: string = '';
  newActorLevel: string = '';
  newActorMaxHp: string = '';
  managingProtagonists: boolean = false;

  actorsToDelete: Actor[] = [];
  actorsToAdd: Actor[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onManageProtagonists(): void {
    this.managingProtagonists = !this.managingProtagonists;
  }

}
