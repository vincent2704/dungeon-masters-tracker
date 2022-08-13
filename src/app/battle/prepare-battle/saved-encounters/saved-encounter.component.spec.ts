import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEncounterComponent } from './saved-encounter.component';

describe('SavedEncountersComponent', () => {
  let component: SavedEncounterComponent;
  let fixture: ComponentFixture<SavedEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedEncounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
