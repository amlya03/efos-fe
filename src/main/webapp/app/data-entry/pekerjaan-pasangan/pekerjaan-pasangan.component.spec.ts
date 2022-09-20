import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PekerjaanPasanganComponent } from './pekerjaan-pasangan.component';

describe('PekerjaanPasanganComponent', () => {
  let component: PekerjaanPasanganComponent;
  let fixture: ComponentFixture<PekerjaanPasanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PekerjaanPasanganComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PekerjaanPasanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
