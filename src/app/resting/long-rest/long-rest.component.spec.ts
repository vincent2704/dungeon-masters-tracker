import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongRestComponent } from './long-rest.component';
import {FormsModule} from "@angular/forms";
import {RestingService} from "../../services/resting/resting.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LongRestComponent', () => {
  let component: LongRestComponent;
  let fixture: ComponentFixture<LongRestComponent>;

  let restingServiceSpy: jasmine.SpyObj<RestingService>;

  beforeEach(async () => {
    const restingSpy = jasmine.createSpyObj('RestingService', ['getMinimumRestingTime', 'performLongRest', 'getTimeSinceLastLongRest'])

    await TestBed.configureTestingModule({
      providers: [
        {provide: RestingService, useValue: restingSpy}
      ],
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [ LongRestComponent ]
    })
      .compileComponents();

    restingServiceSpy = TestBed.inject(RestingService) as jasmine.SpyObj<RestingService>;
    restingServiceSpy.getMinimumRestingTime.and.returnValue(8);
    fixture = TestBed.createComponent(LongRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform Long Rest', () => {
    // when
    component.rest()
    // then
    expect(restingServiceSpy.performLongRest)
      .toHaveBeenCalledWith(component.restTimeInHours, component.playerCharacters);
  });

  it('should get time since last Long Rest', () => {
    //given
    let restingServiceResponse = 24;
    restingServiceSpy.getTimeSinceLastLongRest.and.returnValue(restingServiceResponse);
    //when
    let result = component.getTimeSinceLastRest();
    //then
    expect(result).toEqual(restingServiceResponse);
  });

  it('should get minimum resting time', () => {
    //given
    let restingServiceResponse = 8;
    restingServiceSpy.getMinimumRestingTime.and.returnValue(restingServiceResponse);
    //when
    let result = component.getMinimumRestingTime();
    //then
    expect(result).toEqual(restingServiceResponse);
  });

  it('should return resting enabled', () => {
    //given
    component.restTimeInHours = 8;
    restingServiceSpy.getMinimumRestingTime.and.returnValue(16);

    //then
    expect(component.isRestingEnabled()).toBeFalse();
  });

  it('should return resting disabled', () => {
    //given
    component.restTimeInHours = 8;
    restingServiceSpy.getMinimumRestingTime.and.returnValue(8);

    //then
    expect(component.isRestingEnabled()).toBeTrue();
  });

});
