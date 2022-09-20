import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconsciousDamageComponent } from './unconscious-damage.component';

describe('UnconsciousDamageComponent', () => {
  let component: UnconsciousDamageComponent;
  let fixture: ComponentFixture<UnconsciousDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnconsciousDamageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconsciousDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
