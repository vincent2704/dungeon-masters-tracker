import {Component, OnInit} from '@angular/core';
import {Actor} from "../../../models/actor";
import {ActorService} from "../../../services/actor/actor.service";

@Component({
  selector: 'app-protagonists-info',
  templateUrl: './protagonists-info.component.html',
  styleUrls: ['./protagonists-info.component.css']
})
export class ProtagonistsInfoComponent implements OnInit {

  playerCharacters: Actor[] = [];

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.playerCharacters = this.actorService.getActors();
  }

}
