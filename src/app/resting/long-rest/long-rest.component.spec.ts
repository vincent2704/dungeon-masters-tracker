import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongRestComponent } from './long-rest.component';

describe('LongRestComponent', () => {
  let component: LongRestComponent;
  let fixture: ComponentFixture<LongRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
