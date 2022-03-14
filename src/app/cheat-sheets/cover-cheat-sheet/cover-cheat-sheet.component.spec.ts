import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverCheatSheetComponent } from './cover-cheat-sheet.component';

describe('CoverComponent', () => {
  let component: CoverCheatSheetComponent;
  let fixture: ComponentFixture<CoverCheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverCheatSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
