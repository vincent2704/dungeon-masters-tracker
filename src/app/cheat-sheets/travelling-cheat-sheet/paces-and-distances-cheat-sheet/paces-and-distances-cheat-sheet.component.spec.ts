import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacesAndDistancesCheatSheetComponent } from './paces-and-distances-cheat-sheet.component';
import {SettingsService} from "../../../services/settings/settings.service";

describe('PacesAndDistancesCheatSheetComponent', () => {
  let component: PacesAndDistancesCheatSheetComponent;
  let fixture: ComponentFixture<PacesAndDistancesCheatSheetComponent>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    const settingsService = jasmine.createSpyObj('SettingsService', ['isUsingSISystem']);

    await TestBed.configureTestingModule({
      declarations: [ PacesAndDistancesCheatSheetComponent ],
      providers: [
        { provide: SettingsService, useValue: settingsService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacesAndDistancesCheatSheetComponent);
    component = fixture.componentInstance;

    settingsServiceSpy = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
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
    settingsServiceSpy.isUsingSISystem.and.returnValue(false);

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
    settingsServiceSpy.isUsingSISystem.and.returnValue(true);

    //when
    let displayedFeetDistance = component.getDistanceForMinute(feetDistance);
    let displayedMilesDistance = component.getDistance(milesDistance);

    //then
    expect(displayedFeetDistance).toEqual("120 m");
    expect(displayedMilesDistance).toEqual("6 km");
  });

});
