import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildernessCheatSheetComponent } from './wilderness-cheat-sheet.component';

describe('WildernessCheatSheetComponent', () => {
  let component: WildernessCheatSheetComponent;
  let fixture: ComponentFixture<WildernessCheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildernessCheatSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildernessCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
