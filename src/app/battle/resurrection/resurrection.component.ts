import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-resurrection',
  templateUrl: './resurrection.component.html',
  styleUrls: ['./resurrection.component.css']
})
export class ResurrectionComponent implements OnInit {

  @Input()
  character!: Actor;
  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
