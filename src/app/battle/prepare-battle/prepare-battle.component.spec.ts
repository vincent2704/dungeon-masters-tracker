import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareBattleComponent } from './prepare-battle.component';
import {FormsModule} from "@angular/forms";
import {AddActorComponent} from "../add-actor/add-actor.component";
import {ActorService} from "../../services/actor/actor.service";
import {Actor} from "../../models/actor";
import {SettingsService} from "../../services/settings/settings.service";
import {By} from "@angular/platform-browser";

describe('PrepareBattleComponent', () => {
  let component: PrepareBattleComponent;
  let fixture: ComponentFixture<PrepareBattleComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  let loadedActors = [
    new Actor('Actor 1', 1),
    new Actor('Actor 2', 2),
    new Actor('Actor 3', 3)
  ];

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getActors']);
    const settingsService = jasmine.createSpyObj('SettingsService', ['isAutoLoadProtagonists']);
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PrepareBattleComponent, AddActorComponent ],
      providers: [
        { provide: ActorService, useValue: actorService },
        { provide: SettingsService, useValue: settingsService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    actorServiceSpy = TestBed.inject(ActorService) as jasmine.SpyObj<ActorService>;
    settingsServiceSpy = TestBed.inject(SettingsService) as jasmine.SpyObj<SettingsService>;
    actorServiceSpy.getActors.and.returnValue(loadedActors);
    settingsServiceSpy.isAutoLoadProtagonists.and.returnValue(true);

    fixture = TestBed.createComponent(PrepareBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render actors to table', () => {
    expect(component.actors).toEqual(loadedActors);

    let tableRows = fixture.debugElement.queryAll(By.css('tr'));
    expect(tableRows.length).toEqual(4);
  });

});
