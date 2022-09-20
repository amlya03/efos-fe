import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallReportComponent } from './call-report.component';

describe('CallReportComponent', () => {
  let component: CallReportComponent;
  let fixture: ComponentFixture<CallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
