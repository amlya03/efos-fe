import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarAplikasiWaitingAssigmentComponent } from './daftar-aplikasi-waiting-assigment.component';

describe('DaftarAplikasiWaitingAssigmentComponent', () => {
  let component: DaftarAplikasiWaitingAssigmentComponent;
  let fixture: ComponentFixture<DaftarAplikasiWaitingAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaftarAplikasiWaitingAssigmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarAplikasiWaitingAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
