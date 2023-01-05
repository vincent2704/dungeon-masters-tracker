import {Component, Input, OnInit} from '@angular/core';
import {AbilitySet} from "../../../models/common/ability/abilitySet";

@Component({
  selector: 'app-saving-throws',
  templateUrl: './saving-throws.component.html',
  styleUrls: ['./saving-throws.component.css']
})
export class SavingThrowsComponent implements OnInit {

  @Input()
  abilitySet!: AbilitySet;

  constructor() { }

  ngOnInit(): void {
  }

}
