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

  it("should properly display distance in imperial system", () => {
    //given
    let feetDistance = 400;
    let milesDistance = 4;
    //and
    component.showInSI = false;

    //when
    let displayedFeetDistance = component.getDistanceInMinute(feetDistance);
    let displayedMilesDistance = component.getDistance(milesDistance);

    //then
    expect(displayedFeetDistance).toEqual("400 feet");
    expect(displayedMilesDistance).toEqual("4 miles");
  });

  it("should properly display distance in metric system", () => {
    //given
    let feetDistance = 400;
    let milesDistance = 4;
    //and
    component.showInSI = true;

    //when
    let displayedFeetDistance = component.getDistanceInMinute(feetDistance);
    let displayedMilesDistance = component.getDistance(milesDistance);

    //then
    expect(displayedFeetDistance).toEqual("120 m");
    expect(displayedMilesDistance).toEqual("6 km");
  });
});
