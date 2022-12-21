import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConfigurationComponent } from './time-configuration.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TimeConfigurationComponent', () => {
  let component: TimeConfigurationComponent;
  let fixture: ComponentFixture<TimeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule, FormsModule, HttpClientTestingModule],
      declarations: [ TimeConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
