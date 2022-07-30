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
  selectedActors: Map<Actor, boolean>;

  constructor(private actorService: ActorService) {
    this.selectedActors = new Map<Actor, boolean>();
    this.protagonists = []
  }

  ngOnInit(): void {
    this.protagonists = this.actorService.getActors();
    this.protagonists.forEach(actor => {
      this.selectedActors.set(actor, true);
    })
  }

  onSelectActor(actor: Actor) {
    let selected = this.selectedActors.get(actor);
    this.selectedActors.set(actor, !selected);
  }

  isSelected(actor: Actor): boolean {
    return this.selectedActors.get(actor)!;
  }

}
