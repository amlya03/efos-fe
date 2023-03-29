import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterinformasidiriComponent } from './parameterinformasidiri.component';

describe('ParameterinformasidiriComponent', () => {
  let component: ParameterinformasidiriComponent;
  let fixture: ComponentFixture<ParameterinformasidiriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterinformasidiriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterinformasidiriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
