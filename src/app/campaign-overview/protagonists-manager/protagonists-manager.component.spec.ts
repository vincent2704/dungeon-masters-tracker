import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtagonistsManagerComponent } from './protagonists-manager.component';

describe('ProtagonistsManagerComponent', () => {
  let component: ProtagonistsManagerComponent;
  let fixture: ComponentFixture<ProtagonistsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtagonistsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtagonistsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
