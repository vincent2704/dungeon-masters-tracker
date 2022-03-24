import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceCalculatorComponent } from './distance-calculator.component';

describe('HeightDistanceCalculatorComponent', () => {
  let component: DistanceCalculatorComponent;
  let fixture: ComponentFixture<DistanceCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistanceCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate distance', () => {
    //given
    component.horizontalDistance = 2;
    component.verticalDistance = 3;
    //when
    let result = component.calculate();
    //then
    expect(result).toEqual(3.6)
  });

});
