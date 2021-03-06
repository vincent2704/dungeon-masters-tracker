import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacesAndDistancesCheatSheetComponent } from './paces-and-distances-cheat-sheet.component';
import {Settings} from "../../../services/settings/settings";

describe('PacesAndDistancesCheatSheetComponent', () => {
  let component: PacesAndDistancesCheatSheetComponent;
  let fixture: ComponentFixture<PacesAndDistancesCheatSheetComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ PacesAndDistancesCheatSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacesAndDistancesCheatSheetComponent);
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
    Settings.setSISystem(false);

    //when
    let displayedFeetDistance = component.getDistanceForMinute(feetDistance);
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
    Settings.setSISystem(true);

    //when
    let displayedFeetDistance = component.getDistanceForMinute(feetDistance);
    let displayedMilesDistance = component.getDistance(milesDistance);

    //then
    expect(displayedFeetDistance).toEqual("120 m");
    expect(displayedMilesDistance).toEqual("6 km");
  });

});
