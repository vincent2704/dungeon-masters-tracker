import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TravelCalculatorComponent} from './travel-calculator.component';
import {MeasurementSystemService} from "../../services/measurement-system.service";

describe('TravelCalculatorComponent', () => {
  let component: TravelCalculatorComponent;
  let fixture: ComponentFixture<TravelCalculatorComponent>;

  let measurementSystemStub: Partial<MeasurementSystemService>;
  let measurementSystem;

  beforeEach(async () => {
    measurementSystemStub = {
      useSISystem: true,

      isUsingSISystem(): boolean {
        return this.useSISystem!;
      }
    };

    await TestBed.configureTestingModule({
      declarations: [TravelCalculatorComponent],
      providers: [
        {provide: MeasurementSystemService, useValue: measurementSystemStub}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TravelCalculatorComponent);
    component = fixture.componentInstance;

    measurementSystem = TestBed.inject(MeasurementSystemService);
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
    let placeholder = component.getTypeDistancePlaceholder();
    //then
    expect(placeholder).toEqual('Distance in kilometers');
  });

  it('should return correct placeholder in Imperial', () => {
    //given
    measurementSystemStub.useSISystem = false;
    fixture.detectChanges();
    //when
    let placeholder = component.getTypeDistancePlaceholder();
    //then
    expect(placeholder).toEqual('Distance in miles');
  });

});
