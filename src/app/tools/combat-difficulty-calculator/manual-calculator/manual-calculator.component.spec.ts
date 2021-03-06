import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCalculatorComponent } from './manual-calculator.component';
import {FormsModule} from "@angular/forms";
import {Actor} from "../../../models/actor";

describe('ManualCalculatorComponent', () => {
  let component: ManualCalculatorComponent;
  let fixture: ComponentFixture<ManualCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ManualCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get difficulty', () => {
    // given
    let actor1 = new Actor('1', 1)
    actor1.setLevel(3)
    let actor2 =  new Actor('2', 2)
    actor2.setLevel(3)
    let actor3 = new Actor('3', 3)
    actor3.setLevel(3)
    let actor4 = new Actor('4', 4)
    actor4.setLevel(2)
    // easy - 275 XP, medium - 550 XP, hard - 825 XP, deadly - 1400 XP
    component.participatingActors = [actor1, actor2, actor3, actor4]

    component.monsterXp = '500';
    component.monsterCount = '4'

    // when
    component.onSubmit();

    // then
    expect(component.difficultyDescription).toEqual('Predicted difficulty: Hard');
  });

});
