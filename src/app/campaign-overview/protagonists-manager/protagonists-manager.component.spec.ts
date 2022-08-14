import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtagonistsManagerComponent } from './protagonists-manager.component';
import {Actor} from "../../models/actor";
import {ActorService} from "../../services/actor/actor.service";

describe('ProtagonistsManagerComponent', () => {
  let component: ProtagonistsManagerComponent;
  let fixture: ComponentFixture<ProtagonistsManagerComponent>;
  let actorServiceSpy: jasmine.SpyObj<ActorService>;

  beforeEach(async () => {
    const actorService = jasmine.createSpyObj('ActorService', ['getActors', 'deleteActor', 'setActors']);

    await TestBed.configureTestingModule({
      declarations: [ ProtagonistsManagerComponent ],
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

  it('should add actor to list of actors to delete', () => {
    //given
    let actorToDelete = new Actor('Actor', 10)
    //when
    component.onSetActorToDelete(actorToDelete);
    //then
    expect(component.actorsToDelete).toEqual([actorToDelete]);
  });

  it('should change actors if changes are submitted', () => {
    //given
    let actor1 = new Actor('Actor', 10);
    actor1.setLevel(1);
    let actor2 = new Actor('Actor 2', 15);
    let actor3 = new Actor('Actor 3', 14);
    let defaultActors = [actor1, actor2, actor3];

    actorServiceSpy.getActors.and.returnValue(defaultActors)
    fixture = TestBed.createComponent(ProtagonistsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //when
    component.playerCharacters[0].level = 12;
    component.onSetActorToDelete(actor2);

    component.newActorName = 'Actor 4'
    component.newActorLevel = '4';
    component.newActorMaxHp = '5'
    component.addActor();

    //and
    component.onSubmitProtagonists();

    //then
    expect(component.actorsToDelete).toEqual([]);
    expect(component.actorsToAdd).toEqual([]);
    expect(component.playerCharacters[0].level).toEqual(12);
    expect(component.playerCharacters.length).toEqual(4);
    expect(actorServiceSpy.setActors).toHaveBeenCalledWith(component.playerCharacters);
  });

  it('should not change actors if changes are cancelled', () => {
    //given
    let actor1 = new Actor('Actor', 10);
    actor1.setLevel(1);
    let actor2 = new Actor('Actor 2', 15);
    let actor3 = new Actor('Actor 3', 14);
    let defaultActors = [actor1, actor2, actor3];

    actorServiceSpy.getActors.and.returnValue(defaultActors)
    fixture = TestBed.createComponent(ProtagonistsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //when
    component.playerCharacters[0].level = 12;
    component.onSetActorToDelete(actor2);

    component.newActorName = 'Actor 4'
    component.newActorLevel = '4';
    component.newActorMaxHp = '5'
    component.addActor();

    //and
    component.onCancelEdit();

    //then
    expect(component.actorsToDelete).toEqual([]);
    expect(component.actorsToAdd).toEqual([]);
    expect(component.playerCharacters[0].level).toEqual(1);
    expect(component.playerCharacters.length).toEqual(3);
    expect(actorServiceSpy.setActors).toHaveBeenCalledTimes(0);
  });
});
