import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {TemporalService} from "../../services/temporal/temporal.service";

@Component({
  selector: 'app-resurrection',
  templateUrl: './resurrection.component.html',
  styleUrls: ['./resurrection.component.css']
})
export class ResurrectionComponent implements OnInit {

  private readonly MILLISECONDS_IN_ROUND = 6_000;

  @Input()
  character!: Actor;
  @Input()
  round!: number;

  isCollapsed: boolean = true;

  constructor(private temporalService: TemporalService) {
  }

  ngOnInit(): void {
  }

  getTimeOfDeathFormatted(): string {
    let timeOfDeath = this.character.getTimeOfDeath();

    return `${timeOfDeath.getDate()}` +
      ` ${timeOfDeath.toLocaleString('en-US', {month: 'long'})}` +
      ` ${timeOfDeath.getFullYear()}, ${timeOfDeath.getHours()}:${timeOfDeath.getMinutes()}`;
  }

  getDiedAgoTime(): string {
    return `${this.getSecondsPassedSince(this.character.getTimeOfDeath())} seconds`;
  }

  revivify(): void {
    this.character.revivify(this.getCurrentTimeInBattle());
  }

  canRevivify(): boolean {
    return this.getSecondsPassedSince(this.character.getTimeOfDeath()) <= 60;
  }

  private getCurrentTimeInBattle(): Date {
    // temporal service current time is actually battle start time and is
    // updated only after battle is finished, because there's an option not to track time in battle.
    return new Date(this.temporalService.getCurrentDate().getTime() + ((this.round - 1) * this.MILLISECONDS_IN_ROUND));
  }

  private getSecondsPassedSince(date: Date): number {
    return (this.getCurrentTimeInBattle().getTime() - date.getTime()) / 1000;
  }
}
