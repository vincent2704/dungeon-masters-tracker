import {Component, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor.service";

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {
  //TODO: formModel to private object so Actor can have all fields private
  formModel: Actor = new Actor('', 0);

  constructor(private actorService: ActorService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.actorService.addActor(this.formModel.name, this.formModel.getMaxHP(), this.formModel.getInitiative());
  }

}
