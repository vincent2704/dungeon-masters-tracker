import {TestBed} from '@angular/core/testing';

import {ActorService} from './actor.service';
import {Actor} from "../../models/actors/actor";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('actorService', () => {
  let service: ActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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

  it("should copy character", () => {
    // given
    let actor = new Actor('Actor 1', 1);
    let date = new Date();
    actor.modifyHp(-2, date);
    expect(actor.isDead()).toBeTrue();

    // when
    let result = actor.copy();

    // then
    expect(result).toEqual(actor);
  });

});
