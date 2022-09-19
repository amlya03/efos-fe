import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutasiRekeningComponent } from './mutasi-rekening.component';

describe('MutasiRekeningComponent', () => {
  let component: MutasiRekeningComponent;
  let fixture: ComponentFixture<MutasiRekeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MutasiRekeningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MutasiRekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
