import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoVerificationComponent } from './memo-verification.component';

describe('MemoVerificationComponent', () => {
  let component: MemoVerificationComponent;
  let fixture: ComponentFixture<MemoVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
