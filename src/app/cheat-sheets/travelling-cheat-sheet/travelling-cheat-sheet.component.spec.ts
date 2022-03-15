import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingCheatSheetComponent } from './travelling-cheat-sheet.component';

describe('TravellingCheatSheetComponent', () => {
  let component: TravellingCheatSheetComponent;
  let fixture: ComponentFixture<TravellingCheatSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravellingCheatSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellingCheatSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
