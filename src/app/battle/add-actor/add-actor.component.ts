import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {BattleService} from "../../services/battle/battle.service";

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
  actorEmitter = new EventEmitter<[playerCharacter: Actor, initiative: number]>();

  constructor(private battleService: BattleService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let newActor = new Actor(this.formActorName, this.formActorMaxHp);
    newActor.setDeathSavingThrowsEligibility(this.deathSavingThrowEligibility);
    this.battleService.getActorsMap().set(newActor, this.formActorInitiative)
    this.addActor(newActor);
  }

  deathSavingThrowsEligibilityChange(event: any) {
    this.deathSavingThrowEligibility = event.target.checked;
  }

  addActor(actor: Actor) {
    this.actorEmitter.emit([actor, this.formActorInitiative]);
  }
}
