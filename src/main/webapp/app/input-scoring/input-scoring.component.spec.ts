import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScoringComponent } from './input-scoring.component';

describe('InputScoringComponent', () => {
  let component: InputScoringComponent;
  let fixture: ComponentFixture<InputScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputScoringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
