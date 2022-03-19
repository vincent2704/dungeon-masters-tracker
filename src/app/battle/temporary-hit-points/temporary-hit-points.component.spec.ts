import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemporaryHitPointsComponent } from './temporary-hit-points.component';
import {Actor} from "../../models/actor";
import {NgbCollapse} from "@ng-bootstrap/ng-bootstrap";

describe('TemporaryHitPointsComponent', () => {
  let component: TemporaryHitPointsComponent;
  let fixture: ComponentFixture<TemporaryHitPointsComponent>;
  let actor = new Actor('Example Actor', 10);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryHitPointsComponent, NgbCollapse ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryHitPointsComponent);
    component = fixture.componentInstance;
    component.actor = actor;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
