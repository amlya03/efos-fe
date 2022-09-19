import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuratPersetujuanComponent } from './surat-persetujuan.component';

describe('SuratPersetujuanComponent', () => {
  let component: SuratPersetujuanComponent;
  let fixture: ComponentFixture<SuratPersetujuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuratPersetujuanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuratPersetujuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
