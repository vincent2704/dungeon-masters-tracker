import {Component, OnInit} from '@angular/core';
import {BattleActor} from "../../models/battleActor";
import {BattleActorService} from "../../services/battle-actor.service";

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {
  //TODO: formModel to private object so BattleActor can have all fields private
  formModel: BattleActor = new BattleActor('', 0);

  constructor(private battleActorService: BattleActorService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.battleActorService.addBattleActor(this.formModel.name, this.formModel.getMaxHP(), this.formModel.getInitiative());
  }

}
