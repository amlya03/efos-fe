import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCalonNasabahComponent } from './data-calon-nasabah.component';

describe('DataCalonNasabahComponent', () => {
  let component: DataCalonNasabahComponent;
  let fixture: ComponentFixture<DataCalonNasabahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataCalonNasabahComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataCalonNasabahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
