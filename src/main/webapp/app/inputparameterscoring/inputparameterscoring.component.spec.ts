import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputparameterscoringComponent } from './inputparameterscoring.component';

describe('InputparameterscoringComponent', () => {
  let component: InputparameterscoringComponent;
  let fixture: ComponentFixture<InputparameterscoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputparameterscoringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputparameterscoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
