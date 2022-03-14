import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityChecksCheatSheetComponent } from './ability-checks-cheat-sheet.component';

describe('AbilityChecksCheatSheetComponent', () => {
  let component: AbilityChecksCheatSheetComponent;
  let fixture: ComponentFixture<AbilityChecksCheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilityChecksCheatSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilityChecksCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
