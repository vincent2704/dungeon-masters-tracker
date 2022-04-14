import {TestBed} from '@angular/core/testing';

import {ActorService} from './actor.service';
import {Actor} from "../models/actor";
import {PROTAGONISTS} from "../models/actorsData";

describe('actorService', () => {
  let actorService: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    actorService = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(actorService).toBeTruthy();
  });

  it("should reset battle actors to protagonists", () => {
    // given
    let someActors = [
      new Actor('Name 1', 1),
      new Actor('Name 2', 2),
      new Actor('Name 3', 3),
    ];
    actorService.setActors(someActors);
    expect(actorService.getActors()).toEqual(someActors);

    // when
    actorService.resetActors();
    expect(actorService.getActors()).toEqual(PROTAGONISTS)
  });

  it("should return true if all actors have progressed their turn", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    actor1.setActorProgress(true);
    actor2.setActorProgress(true);
    actor3.setActorProgress(true);
    actorService.setActors([actor1, actor2, actor3]);

    expect(actorService.allActorsProgressed()).toEqual(true);
  });

  it("should return false if all actors have yet not progressed their turn", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    actor1.setActorProgress(true);
    actor2.setActorProgress(true);
    actor3.setActorProgress(false);
    actorService.setActors([actor1, actor2, actor3]);

    expect(actorService.allActorsProgressed()).toEqual(false);
  });

  it("should reset all battle actors' progress", () => {
    // given
    let actor1 = new Actor('Actor 1', 1);
    let actor2 = new Actor('Actor 2', 1);
    let actor3 = new Actor('Actor 3', 1);
    actor1.setActorProgress(true);
    actor2.setActorProgress(true);
    actor3.setActorProgress(true);
    actorService.setActors([actor1, actor2, actor3]);

    // when
    actorService.resetActorsProgress();

    expect(actor1.isActorTurnProgressed()).toEqual(false);
    expect(actor2.isActorTurnProgressed()).toEqual(false);
    expect(actor3.isActorTurnProgressed()).toEqual(false);
  });

});
