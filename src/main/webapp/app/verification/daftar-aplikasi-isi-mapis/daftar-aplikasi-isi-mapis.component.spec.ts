import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiIsiMapisComponent } from './daftar-aplikasi-isi-mapis.component';

describe('DaftarAplikasiIsiMapisComponent', () => {
  let component: DaftarAplikasiIsiMapisComponent;
  let fixture: ComponentFixture<DaftarAplikasiIsiMapisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaftarAplikasiIsiMapisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiIsiMapisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
