import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrukturPembiayaanComponent } from './struktur-pembiayaan.component';

describe('StrukturPembiayaanComponent', () => {
  let component: StrukturPembiayaanComponent;
  let fixture: ComponentFixture<StrukturPembiayaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrukturPembiayaanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrukturPembiayaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
