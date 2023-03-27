import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterstrukturComponent } from './parameterstruktur.component';

describe('ParameterstrukturComponent', () => {
  let component: ParameterstrukturComponent;
  let fixture: ComponentFixture<ParameterstrukturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterstrukturComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterstrukturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
