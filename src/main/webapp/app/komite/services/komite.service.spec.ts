import { TestBed } from '@angular/core/testing';

import { KomiteService } from './komite.service';

describe('KomiteService', () => {
  let service: KomiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KomiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
