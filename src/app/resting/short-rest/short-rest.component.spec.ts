import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortRestComponent } from './short-rest.component';
import { RestingService } from "../../services/resting/resting.service";
import { FormsModule } from "@angular/forms";
import { ShortRestInput } from "../../models/resting/shortRestInput";

describe('ShortRestComponent', () => {
  let component: ShortRestComponent;
  let fixture: ComponentFixture<ShortRestComponent>;
  let restingServiceSpy: jasmine.SpyObj<RestingService>;

  beforeEach(async () => {
    const restingService = jasmine.createSpyObj('RestingService', ['performShortRest'])
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ShortRestComponent],
      providers: [
        { provide: RestingService, useValue: restingService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    restingServiceSpy = TestBed.inject(RestingService) as jasmine.SpyObj<RestingService>;

    fixture = TestBed.createComponent(ShortRestComponent);
    component = fixture.componentInstance;
    component.playerCharacters = []
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RestingService to perform short rest', () => {
    //given
    component.playerCharacters = [
      {
        id: 1,
        name: 'One',
        maxHp: 10,
        currentHp: 10,
        level: 1,
        resurrectionPenalty: 1,
        availableHitDice: 1
      },
      {
        id: 2,
        name: 'Two',
        maxHp: 20,
        currentHp: 20,
        level: 2,
        resurrectionPenalty: 2,
        availableHitDice: 2
      }
    ]

    component.shortRestDurationInHours = 1;
    component.actorsToShortRestInput = new Map([
      [component.playerCharacters[0], new ShortRestInput(3)],
      [component.playerCharacters[1], new ShortRestInput(2)]
    ])

    //when
    component.confirmShortRest()

    //then
    expect(restingServiceSpy.performShortRest).toHaveBeenCalledWith(1, component.actorsToShortRestInput);
  });

});
