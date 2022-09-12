import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiWaitingUpdateStatusComponent } from './daftar-aplikasi-waiting-update-status.component';

describe('DaftarAplikasiWaitingUpdateStatusComponent', () => {
  let component: DaftarAplikasiWaitingUpdateStatusComponent;
  let fixture: ComponentFixture<DaftarAplikasiWaitingUpdateStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaftarAplikasiWaitingUpdateStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiWaitingUpdateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
