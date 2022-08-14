import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtagonistsManagerComponent } from './protagonists-manager.component';
import {ActorService} from "../../services/actor/actor.service";
import {ProtagonistsInfoComponent} from "./protagonists-info/protagonists-info.component";

describe('ProtagonistsManagerComponent', () => {
  let component: ProtagonistsManagerComponent;
  let fixture: ComponentFixture<ProtagonistsManagerComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getActors', 'deleteActor', 'setActors']);

    await TestBed.configureTestingModule({
      declarations: [ ProtagonistsManagerComponent, ProtagonistsInfoComponent ],
      providers: [
        { provide: ActorService, useValue: actorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    actorServiceSpy.getActors.and.returnValue([]);
    fixture = TestBed.createComponent(ProtagonistsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
