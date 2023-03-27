import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterftpdpdetailComponent } from './parameterftpdpdetail.component';

describe('ParameterftpdpdetailComponent', () => {
  let component: ParameterftpdpdetailComponent;
  let fixture: ComponentFixture<ParameterftpdpdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterftpdpdetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterftpdpdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
