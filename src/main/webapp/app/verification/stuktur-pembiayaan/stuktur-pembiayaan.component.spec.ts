import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StukturPembiayaanComponent } from './stuktur-pembiayaan.component';

describe('StukturPembiayaanComponent', () => {
  let component: StukturPembiayaanComponent;
  let fixture: ComponentFixture<StukturPembiayaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StukturPembiayaanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StukturPembiayaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
