import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallReportNonComponent } from './call-report-non.component';

describe('CallReportNonComponent', () => {
  let component: CallReportNonComponent;
  let fixture: ComponentFixture<CallReportNonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallReportNonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallReportNonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
