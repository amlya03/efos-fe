import { TestBed } from '@angular/core/testing';

import { InitialDataEntryService } from './initial-data-entry.service';

describe('InitialDataEntryService', () => {
  let service: InitialDataEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialDataEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
