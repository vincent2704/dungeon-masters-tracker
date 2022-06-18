import { Component, OnInit } from '@angular/core';
import {ActorService} from "../../services/actor/actor.service";
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-short-rest',
  templateUrl: './short-rest.component.html',
  styleUrls: ['./short-rest.component.css']
})
export class ShortRestComponent implements OnInit {

  actors: Actor[];

  constructor(private actorService: ActorService) {
    this.actors = actorService.getProtagonistsActors();
  }

  ngOnInit(): void {
  }

}
