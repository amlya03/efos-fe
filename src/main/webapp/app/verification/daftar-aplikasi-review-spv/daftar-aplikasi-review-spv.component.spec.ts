import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiReviewSpvComponent } from './daftar-aplikasi-review-spv.component';

describe('DaftarAplikasiReviewSpvComponent', () => {
  let component: DaftarAplikasiReviewSpvComponent;
  let fixture: ComponentFixture<DaftarAplikasiReviewSpvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaftarAplikasiReviewSpvComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiReviewSpvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
