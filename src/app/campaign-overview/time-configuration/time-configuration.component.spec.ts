import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConfigurationComponent } from './time-configuration.component';

describe('TimeConfigurationComponent', () => {
  let component: TimeConfigurationComponent;
  let fixture: ComponentFixture<TimeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
