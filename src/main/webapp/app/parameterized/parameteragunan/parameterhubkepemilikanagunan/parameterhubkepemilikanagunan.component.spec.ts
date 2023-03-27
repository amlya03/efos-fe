import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterhubkepemilikanagunanComponent } from './parameterhubkepemilikanagunan.component';

describe('ParameterhubkepemilikanagunanComponent', () => {
  let component: ParameterhubkepemilikanagunanComponent;
  let fixture: ComponentFixture<ParameterhubkepemilikanagunanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterhubkepemilikanagunanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterhubkepemilikanagunanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
