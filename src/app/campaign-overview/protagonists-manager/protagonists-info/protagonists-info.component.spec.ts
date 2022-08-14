import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtagonistsInfoComponent } from './protagonists-info.component';

describe('ProtagonistsInfoComponent', () => {
  let component: ProtagonistsInfoComponent;
  let fixture: ComponentFixture<ProtagonistsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtagonistsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtagonistsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
