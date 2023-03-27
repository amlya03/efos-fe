import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterftpdpComponent } from './parameterftpdp.component';

describe('ParameterftpdpComponent', () => {
  let component: ParameterftpdpComponent;
  let fixture: ComponentFixture<ParameterftpdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterftpdpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterftpdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
