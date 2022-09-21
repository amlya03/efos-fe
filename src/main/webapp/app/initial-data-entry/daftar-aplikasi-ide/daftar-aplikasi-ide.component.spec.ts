import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiIdeComponent } from './daftar-aplikasi-ide.component';

describe('DaftarAplikasiIdeComponent', () => {
  let component: DaftarAplikasiIdeComponent;
  let fixture: ComponentFixture<DaftarAplikasiIdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaftarAplikasiIdeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiIdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
