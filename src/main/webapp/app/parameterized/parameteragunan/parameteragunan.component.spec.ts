import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameteragunanComponent } from './parameteragunan.component';

describe('ParameteragunanComponent', () => {
  let component: ParameteragunanComponent;
  let fixture: ComponentFixture<ParameteragunanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameteragunanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameteragunanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
