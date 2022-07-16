import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {TemporalService} from "../../services/temporal/temporal.service";

@Component({
  selector: 'app-resurrection',
  templateUrl: './resurrection.component.html',
  styleUrls: ['./resurrection.component.css']
})
export class ResurrectionComponent implements OnInit {

  @Input()
  character!: Actor;
  isCollapsed: boolean = true;

  constructor(private temporalService: TemporalService) { }

  ngOnInit(): void {
  }

  revivify() {
    this.character.revivify(this.temporalService.getCurrentDate());
  }
}
