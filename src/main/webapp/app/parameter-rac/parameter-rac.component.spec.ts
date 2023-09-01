import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterRacComponent } from './ParameterRacComponent';

describe('ParameterRacComponent', () => {
  let component: ParameterRacComponent;
  let fixture: ComponentFixture<ParameterRacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterRacComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterRacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
