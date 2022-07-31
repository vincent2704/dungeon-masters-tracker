import {Component, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor/actor.service";

@Component({
  selector: 'app-combat-difficulty-calculator',
  templateUrl: './combat-difficulty-calculator.component.html',
  styleUrls: ['./combat-difficulty-calculator.component.css']
})
export class CombatDifficultyCalculatorComponent implements OnInit {

  protagonists: Actor[];
  actorsSelectionStatusMap: Map<Actor, boolean>;
  participatingActors: Actor[] = [];

  constructor(private actorService: ActorService) {
    this.actorsSelectionStatusMap = new Map<Actor, boolean>();
    this.protagonists = []
  }

  ngOnInit(): void {
    this.protagonists = this.actorService.getActors();
    this.protagonists.forEach(actor => {
      this.actorsSelectionStatusMap.set(actor, true);
    })
    // this is needed or the child components participating actors would be empty at start
    this.actorsSelectionStatusMap.forEach((isSelected, actor) => {
      if(isSelected) {
        this.participatingActors.push(actor);
      }
    })
  }

  onSelectActor(actor: Actor) {
    let selected = this.actorsSelectionStatusMap.get(actor);
    this.actorsSelectionStatusMap.set(actor, !selected);

    // TODO: this works but is actually stupid, needs refactor later
    this.participatingActors = [];
    this.actorsSelectionStatusMap.forEach((isSelected, actor) => {
      if(isSelected) {
        this.participatingActors.push(actor);
      }
    })
  }

  isSelected(actor: Actor): boolean {
    return this.actorsSelectionStatusMap.get(actor)!;
  }

}
