import { TestBed } from '@angular/core/testing';

import { MovieRecommenderService } from './movie-recommender.service';

describe('MovieRecommenderService', () => {
  let service: MovieRecommenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieRecommenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
