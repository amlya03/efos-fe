import { TestBed } from '@angular/core/testing';

import { ServiceVerificationService } from './service-verification.service';

describe('ServiceVerificationService', () => {
  let service: ServiceVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
