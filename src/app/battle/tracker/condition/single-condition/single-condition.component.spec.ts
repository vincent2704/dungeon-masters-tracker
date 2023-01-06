import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleConditionComponent } from './single-condition.component';

describe('ConditionTooltipComponent', () => {
  let component: SingleConditionComponent;
  let fixture: ComponentFixture<SingleConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
