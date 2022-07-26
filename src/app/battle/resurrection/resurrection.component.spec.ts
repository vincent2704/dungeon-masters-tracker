import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResurrectionComponent } from './resurrection.component';
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";
import {Actor} from "../../models/actor";
import {TemporalService} from "../../services/temporal/temporal.service";
import {DateUtils} from "../../utilities/date/dateUtils";

describe('ResurrectionComponent', () => {
  let component: ResurrectionComponent;
  let fixture: ComponentFixture<ResurrectionComponent>;

  let temporalServiceSpy: jasmine.SpyObj<TemporalService>;
  let currentDate = new Date(
    1524, 6, 17,
    18, 30, 0
  );

  beforeEach(async () => {
    const temporalService = jasmine.createSpyObj('TemporalService', ['getCurrentDate'])

    await TestBed.configureTestingModule({
      declarations: [ ResurrectionComponent, NgbCollapse ],
      providers: [
        {provide: TemporalService, useValue: temporalService},
      ]
    })
    .compileComponents();

    temporalServiceSpy = TestBed.inject(TemporalService) as jasmine.SpyObj<TemporalService>;
    temporalServiceSpy.getCurrentDate.and.returnValue(currentDate);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResurrectionComponent);
    component = fixture.componentInstance;
    component.character = new Actor('Character', 10)
    component.character.kill(new Date(
      1524, 6, 17,
      18, 30, 0
    ));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow to use Revivify', () => {
    //given
    component.round = 11;

    //then
    expect(component.canRevivify()).toBeTrue();
  });

  it('should not allow to use Revivify', () => {
    //given
    component.round = 12;

    //then
    expect(component.canRevivify()).toBeFalse();

    // and when
    DateUtils.subtractDays(component.character.getTimeOfDeath(), 10)
    // then
    expect(component.canRevivify()).toBeFalse();
  });

  it('should allow to use Raise Dead', () => {
    //given
    //pass exactly 10 days since character's death, not a second more
    component.character = new Actor('Character', 10);
    let exactlyTenDaysAgo = DateUtils.subtractDays(temporalServiceSpy.getCurrentDate(), 10);
    component.character.kill(exactlyTenDaysAgo);
    //and
    component.round = 1;

    //then
    expect(component.canRaiseDead()).toBeTrue();
  });

  it('should not allow to use Raise Dead', () => {
    //given
    component.character = new Actor('Character', 10);
    let exactlyTenDaysAgo = DateUtils.subtractDays(temporalServiceSpy.getCurrentDate(), 10);
    component.character.kill(exactlyTenDaysAgo);
    component.round = 2; // 10 days ago + 6 seconds (after 1st round finished)

    //then
    expect(component.canRaiseDead()).toBeFalse();
  });

  it('should return time of death formatted', () => {
    expect(component.getTimeOfDeathFormatted()).toEqual('17 July 1524, 18:30');
  });

  it('should return died ago time', () => {
    //given
    component.character = new Actor('Character', 10)
    component.character.kill(new Date(
      1524, 6, 17,
      18, 30, 0
    ));
    //and
    component.round = 11;
    expect(component.getDiedAgoTime()).toEqual('60 seconds');
  });

});
