import { TestBed } from '@angular/core/testing';

import { DaftarAplikasiOnProcessService } from './daftar-aplikasi-on-process.service';

describe('DaftarAplikasiOnProcessService', () => {
  let service: DaftarAplikasiOnProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaftarAplikasiOnProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
