import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPasanganComponent } from './data-pasangan.component';

describe('DataPasanganComponent', () => {
  let component: DataPasanganComponent;
  let fixture: ComponentFixture<DataPasanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataPasanganComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataPasanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
