import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiOnProcessComponent } from './daftar-aplikasi-on-process.component';

describe('DaftarAplikasiOnProcessComponent', () => {
  let component: DaftarAplikasiOnProcessComponent;
  let fixture: ComponentFixture<DaftarAplikasiOnProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaftarAplikasiOnProcessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiOnProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
