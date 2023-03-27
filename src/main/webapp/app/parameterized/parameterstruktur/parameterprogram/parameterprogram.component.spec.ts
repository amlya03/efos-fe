import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterprogramComponent } from './parameterprogram.component';

describe('ParameterprogramComponent', () => {
  let component: ParameterprogramComponent;
  let fixture: ComponentFixture<ParameterprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterprogramComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
