import { TestBed } from '@angular/core/testing';

import { DaftarAplikasiWaitingUpdateStatusService } from './daftar-aplikasi-waiting-update-status.service';

describe('DaftarAplikasiWaitingUpdateStatusService', () => {
  let service: DaftarAplikasiWaitingUpdateStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaftarAplikasiWaitingUpdateStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
