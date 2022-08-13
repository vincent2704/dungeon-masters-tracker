import {Component, Input, OnInit} from '@angular/core';
import {Encounter} from "../../../models/encounter";

@Component({
  selector: 'app-saved-encounter',
  templateUrl: './saved-encounter.component.html',
  styleUrls: ['./saved-encounter.component.css']
})
export class SavedEncounterComponent implements OnInit {

  @Input()
  encounter!: Encounter;
  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
