import {TestBed} from '@angular/core/testing';

import {ActorService} from './actor.service';
import {Actor} from "../../models/actor";

describe('actorService', () => {
  let service: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should find actor by their name", () => {
    // given
    let actorToFind = new Actor('Name 2', 2);
    let actors = [
      new Actor('Name 1', 1),
      actorToFind,
      new Actor('Name 3', 3),
    ];
    service.setActors(actors)

    // when
    let result = service.findActorByName('Name 2');

    // then
    expect(result).toEqual(actorToFind);
  });

  it("should remove actor", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    service.setActors([actor1, actor2, actor3]);

    // when
    service.deleteActor(actor2);
    let expectedActors = [actor1, actor3];

    expect(service.getActors()).toEqual(expectedActors);
  });

  it("should remove multiple actors", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    service.setActors([actor1, actor2, actor3]);

    // when
    let notPresentActor = new Actor('Not present actor', 1);
    let actorsToDelete = [actor1, actor3, notPresentActor];
    service.deleteActors(actorsToDelete);

    expect(service.getActors()).toEqual([actor2]);
  });

  it("should unstabilize if knocked down actor is hit", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    let date = new Date();
    actor.modifyHp(-1, date);
    expect(actor.isKnockedDown()).toBeTrue();
    actor.setStabilized(true);

    // when
    actor.modifyHp(-1, date);

    // then
    expect(actor.isStabilized()).toBeFalse();
  });

});
