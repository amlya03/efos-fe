import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InqueryDetailComponent } from './inquery-detail.component';

describe('InqueryDetailComponent', () => {
  let component: InqueryDetailComponent;
  let fixture: ComponentFixture<InqueryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InqueryDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InqueryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
