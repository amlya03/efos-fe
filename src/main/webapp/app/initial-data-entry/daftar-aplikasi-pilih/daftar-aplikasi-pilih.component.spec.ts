import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiPilihComponent } from './daftar-aplikasi-pilih.component';

describe('DaftarAplikasiPilihComponent', () => {
  let component: DaftarAplikasiPilihComponent;
  let fixture: ComponentFixture<DaftarAplikasiPilihComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaftarAplikasiPilihComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiPilihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
