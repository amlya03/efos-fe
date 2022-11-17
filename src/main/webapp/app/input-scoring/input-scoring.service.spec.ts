import { TestBed } from '@angular/core/testing';

import { InputScoringService } from './input-scoring.service';

describe('InputScoringService', () => {
  let service: InputScoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputScoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
