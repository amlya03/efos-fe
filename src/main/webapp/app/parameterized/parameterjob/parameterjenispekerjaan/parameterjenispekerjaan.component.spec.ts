import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterjenispekerjaanComponent } from './parameterjenispekerjaan.component';

describe('ParameterjenispekerjaanComponent', () => {
  let component: ParameterjenispekerjaanComponent;
  let fixture: ComponentFixture<ParameterjenispekerjaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterjenispekerjaanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterjenispekerjaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
