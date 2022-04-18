import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TravelCalculatorComponent} from './travel-calculator.component';
import {SettingsService} from "../../services/settings.service";

describe('TravelCalculatorComponent', () => {
  let component: TravelCalculatorComponent;
  let fixture: ComponentFixture<TravelCalculatorComponent>;

  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    const settingsService = jasmine.createSpyObj('SettingsService', ['isUsingSISystem'])

    await TestBed.configureTestingModule({
      declarations: [TravelCalculatorComponent],
      providers: [
        {provide: SettingsService, useValue: settingsService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TravelCalculatorComponent);
    component = fixture.componentInstance;

    settingsServiceSpy = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have <h2> with "Traveling calculator"', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const header = nativeElement.querySelector('h2')!;
    expect(header.textContent).toEqual('Traveling calculator');
  });

  it('should return correct placeholder in SI', () => {
    //given
    settingsServiceSpy.isUsingSISystem.and.returnValue(true);
    // when
    let placeholder = component.getTypeDistancePlaceholder();
    //then
    expect(placeholder).toEqual('Distance in kilometers');
  });

  it('should return correct placeholder in Imperial', () => {
    //given
    settingsServiceSpy.isUsingSISystem.and.returnValue(false);
    //when
    let placeholder = component.getTypeDistancePlaceholder();
    //then
    expect(placeholder).toEqual('Distance in miles');
  });

});
