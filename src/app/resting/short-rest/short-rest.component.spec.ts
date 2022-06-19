import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortRestComponent } from './short-rest.component';
import {ActorService} from "../../services/actor/actor.service";
import {RestingService} from "../../services/resting/resting.service";
import {FormsModule} from "@angular/forms";
import {Actor} from "../../models/actor";
import {ShortRestInput} from "../../models/resting/shortRestInput";

describe('ShortRestComponent', () => {
  let component: ShortRestComponent;
  let fixture: ComponentFixture<ShortRestComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let restingServiceSpy: jasmine.SpyObj<RestingService>;

  let defaultActors = [
    new Actor('Actor 1', 1),
    new Actor('Actor 2', 2)
  ]

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getProtagonistsActorsCopy'])
    const restingService = jasmine.createSpyObj('RestingService', ['performShortRest'])
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ShortRestComponent ],
      providers: [
        { provide: ActorService, useValue: actorService },
        { provide: RestingService, useValue: restingService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    restingServiceSpy = TestBed.inject(RestingService) as jasmine.SpyObj<RestingService>;
    actorServiceSpy.getProtagonistsActorsCopy.and.returnValue(defaultActors);

    fixture = TestBed.createComponent(ShortRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RestingService to perform short rest', () => {
    //given
    defaultActors[0].level = 5;
    defaultActors[1].level = 4;

    component.shortRestDurationInHours = 1;
    component.actorsToShortRestInput = new Map([
      [defaultActors[0], new ShortRestInput(3)],
      [defaultActors[1], new ShortRestInput(2)]
    ])

    //when
    component.confirmShortRest()

    //then
    expect(restingServiceSpy.performShortRest).toHaveBeenCalledWith(1, component.actorsToShortRestInput);
  });

});
