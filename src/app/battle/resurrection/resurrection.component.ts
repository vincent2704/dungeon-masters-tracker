import {Component, Input, OnInit} from '@angular/core';
import {Actor} from "../../models/actors/actor";
import {CampaignService} from "../../services/campaign/campaign.service";
import {DateUtils} from "../../utilities/date/dateUtils";
import {StringUtils} from "../../utilities/string/stringUtils";

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

  constructor(private temporalService: CampaignService) {
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

  canResurrection(): boolean {
    return !DateUtils.isTimePassedLongerThanYears(
      this.getCurrentTimeInBattle(), this.character.getTimeOfDeath(), 100);
  }

  canTrueResurrection(): boolean {
    return !DateUtils.isTimePassedLongerThanYears(
      this.getCurrentTimeInBattle(), this.character.getTimeOfDeath(), 200);
  }

  revivify(): void {
    this.character.revivify(this.getCurrentTimeInBattle());
  }

  raiseDead(): void {
    this.character.raiseDead(this.getCurrentTimeInBattle());
  }

  reincarnate(): void {
    this.character.reincarnate(this.getCurrentTimeInBattle());
  }

  resurrection(): void {
    this.character.resurrection(this.getCurrentTimeInBattle());
  }

  trueResurrection(): void {
    this.character.trueResurrection(this.getCurrentTimeInBattle());
  }

  private getCurrentTimeInBattle(): Date {
    // temporal service current time is actually battle start time and is
    // updated only after battle is finished, because there's an option not to track time in battle.
    let currentDate = new Date(this.temporalService.getLocalStorageCampaign().campaignDateTimeCurrentEpoch)
    return DateUtils.addRounds(currentDate, this.round - 1); // current round time hasn't passed yet, that's why -1
  }

  private moreThanTenDaysPassed(): boolean {
    return DateUtils.getDifferenceInDays(this.getCurrentTimeInBattle(), this.character.getTimeOfDeath()) > 10;
  }

  // Source: Basic Rules, pg. 104
  revivifyTooltip: string = "You touch a creature that has died within the last minute. " +
    "That creature returns to life with 1 hit point. This spell " +
    "can’t return to life a creature that has died of old age, nor " +
    "can it restore any missing body parts.";

  //  Source: Basic Rules, pg. 103
  raiseDeadTooltip: string = "You return a dead creature you touch to life, provided that " +
    "it has been dead no longer than 10 days. If the creature’s " +
    "soul is both willing and at liberty to rejoin the body, the " +
    "creature returns to life with 1 hit point. " +
    "This spell also neutralizes any poisons and cures " +
    "nonmagical diseases that affected the creature at the " +
    "time it died. This spell doesn’t, however, remove magical " +
    "diseases, curses, or similar effects; if these aren’t first re- " +
    "moved prior to casting the spell, they take effect when the " +
    "creature returns to life. The spell can’t return an undead " +
    "creature to life. " +
    "This spell closes all mortal wounds, but it doesn’t re- " +
    "store missing body parts. If the creature is lacking body " +
    "parts or organs integral for its survival—its head, for instance—the " +
    "spell automatically fails. " +
    "Coming back from the dead is an ordeal. The target " +
    "takes a −4 penalty to all attack rolls, saving throws, and " +
    "ability checks. Every time the target finishes a long rest, " +
    "the penalty is reduced by 1 until it disappears.";

  // source: https://www.dndbeyond.com/spells/reincarnate
  reincarnateTooltip: string = "You touch a dead humanoid or a piece of a dead humanoid. " +
    "The spell forms a new adult body for it and then calls the soul to enter that body. " +
    "If the target's soul isn't free or willing to do so, the spell fails." +
    "The magic fashions a new body for the creature to inhabit, which likely causes the creature's race to change. " +
    "The GM rolls a d100 and consults the following table to determine what form the creature takes when restored " +
    "to life, or the GM chooses a form.";

  //  Source: Basic Rules, pg. 103
  resurrectionTooltip: string = "You touch a dead creature that has been dead for no more " +
    "than a century, that didn’t die of old age, and that isn’t " +
    "undead. If its soul is free and willing, the target returns to " +
    "life with all its hit points. " +
    "This spell neutralizes any poisons and cures normal " +
    "diseases afflicting the creature when it died. It doesn’t, " +
    "however, remove magical diseases, curses, and the like; if " +
    "such effects aren’t removed prior to casting the spell, they " +
    "afflict the target on its return to life. " +
    "This spell closes all mortal wounds and restores any " +
    "missing body parts. " +
    "Coming back from the dead is an ordeal. The target " +
    "takes a −4 penalty to all attack rolls, saving throws, and " +
    "ability checks. Every time the target finishes a long rest, " +
    "the penalty is reduced by 1 until it disappears. " +
    "Casting this spell to restore life to a creature that has " +
    "been dead for one year or longer taxes you greatly. Until " +
    "you finish a long rest, you can’t cast spells again, and you " +
    "have disadvantage on all attack rolls, ability checks, and " +
    "saving throws.";

  //  Source: Basic Rules, pg. 107
  trueResurrectionTooltip: string = StringUtils.formatDescription(
    "You touch a creature that has been dead for no longer " +
    "than 200 years and that died for any reason except old " +
    "age. If the creature’s soul is free and willing, the creature " +
    "is restored to life with all its hit points. " +
    "This spell closes all wounds, neutralizes any poison, " +
    "cures all diseases, and lifts any curses affecting the creature when it died. " +
    "The spell replaces damaged or missing organs and limbs. " +
    "If the creature was undead, it is restored to its non-undead form. " +
    "The spell can even provide a new body if the original " +
    "no longer exists, in which case you must speak the creature’s name. " +
    "The creature then appears in an unoccupied " +
    "space you choose within {10} {feet} of you.")

}
