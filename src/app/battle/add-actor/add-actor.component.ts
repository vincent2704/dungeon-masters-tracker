import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {
  formActorName: string = '';
  formActorMaxHp: number = 0;
  formActorInitiative: number = 0;
  deathSavingThrowEligibility: boolean = false;

  @Output()
  actorEmitter = new EventEmitter<Actor>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let newActor = new Actor(this.formActorName, this.formActorMaxHp);
    newActor.setInitiative(this.formActorInitiative);
    newActor.setDeathSavingThrowsEligibility(this.deathSavingThrowEligibility);
    this.addActor(newActor);
  }

  deathSavingThrowsEligibilityChange(event: any) {
    this.deathSavingThrowEligibility = event.target.checked;
  }

  addActor(actor: Actor) {
    this.actorEmitter.emit(actor);
  }
}
