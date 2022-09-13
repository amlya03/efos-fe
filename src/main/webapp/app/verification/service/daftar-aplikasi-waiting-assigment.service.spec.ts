import { TestBed } from '@angular/core/testing';

import { DaftarAplikasiWaitingAssigmentService } from './daftar-aplikasi-waiting-assigment.service';

describe('DaftarAplikasiWaitingAssigmentService', () => {
  let service: DaftarAplikasiWaitingAssigmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaftarAplikasiWaitingAssigmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
