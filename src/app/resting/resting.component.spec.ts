import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestingComponent } from './resting.component';

describe('RestingComponent', () => {
  let component: RestingComponent;
  let fixture: ComponentFixture<RestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
