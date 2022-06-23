import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortRestComponent } from './short-rest.component';
import {ActorService} from "../../services/actor/actor.service";
import {RestingService} from "../../services/resting/resting.service";
import {FormsModule} from "@angular/forms";
import {ShortRestInput} from "../../models/resting/shortRestInput";
import {Actor} from "../../models/actor";

describe('ShortRestComponent', () => {
  let component: ShortRestComponent;
  let fixture: ComponentFixture<ShortRestComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let restingServiceSpy: jasmine.SpyObj<RestingService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getActors'])
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
    actorServiceSpy.getActors.and.returnValue([]);

    restingServiceSpy = TestBed.inject(RestingService) as jasmine.SpyObj<RestingService>;

    fixture = TestBed.createComponent(ShortRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RestingService to perform short rest', () => {
    //given
    component.actors = [
      new Actor('Actor 1', 1),
      new Actor('Actor 2', 2)
    ]

    component.shortRestDurationInHours = 1;
    component.actorsToShortRestInput = new Map([
      [component.actors[0], new ShortRestInput(3)],
      [component.actors[1], new ShortRestInput(2)]
    ])

    //when
    component.confirmShortRest()

    //then
    expect(restingServiceSpy.performShortRest).toHaveBeenCalledWith(1, component.actorsToShortRestInput);
  });

});
