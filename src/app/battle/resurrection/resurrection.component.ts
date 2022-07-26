import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actor";
import {TemporalService} from "../../services/temporal/temporal.service";
import {DateUtils} from "../../utilities/date/dateUtils";

@Component({
  selector: 'app-resurrection',
  templateUrl: './resurrection.component.html',
  styleUrls: ['./resurrection.component.css']
})
export class ResurrectionComponent implements OnInit {

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
    return `${DateUtils.getDifferenceInSeconds(
      this.getCurrentTimeInBattle(), this.character.getTimeOfDeath())} seconds`;
  }

  canRevivify(): boolean {
    return DateUtils.getDifferenceInMinutes(this.getCurrentTimeInBattle(), this.character.getTimeOfDeath()) <= 1;
  }

  canRaiseDead(): boolean {
    return !this.moreThanTenDaysPassed();
  }

  canReincarnate(): boolean {
    return !this.moreThanTenDaysPassed();
  }

  revivify(): void {
    this.character.revivify(this.getCurrentTimeInBattle());
  }

  raiseDead(): void {
    this.character.raiseDead(this.getCurrentTimeInBattle());
  }

  reincarnate() {
    this.character.reincarnate(this.getCurrentTimeInBattle());
  }

  private getCurrentTimeInBattle(): Date {
    // temporal service current time is actually battle start time and is
    // updated only after battle is finished, because there's an option not to track time in battle.
    let currentDate = this.temporalService.getCurrentDate();
    return DateUtils.addRounds(currentDate, this.round-1); // current round time hasn't passed yet, that's why -1
  }

  private moreThanTenDaysPassed(): boolean {
    return DateUtils.getDifferenceInDays(this.getCurrentTimeInBattle(), this.character.getTimeOfDeath()) > 10;
  }

}
