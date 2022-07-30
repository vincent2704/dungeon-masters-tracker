import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCalculatorComponent } from './manual-calculator.component';
import {FormsModule} from "@angular/forms";

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
});
