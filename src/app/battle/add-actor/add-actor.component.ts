import {Component, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor.service";

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

  constructor(private actorService: ActorService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let newActor = new Actor(this.formActorName, this.formActorMaxHp);
    newActor.setInitiative(this.formActorInitiative);
    newActor.setDeathSavingThrowsEligibility(this.deathSavingThrowEligibility);
    this.actorService.addActor(newActor);
  }

  deathSavingThrowsEligibilityChange(event: any) {
    this.deathSavingThrowEligibility = event.target.checked;
  }
}
