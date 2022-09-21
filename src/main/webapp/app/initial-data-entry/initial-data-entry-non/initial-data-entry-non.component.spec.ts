import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDataEntryNonComponent } from './initial-data-entry-non.component';

describe('InitialDataEntryNonComponent', () => {
  let component: InitialDataEntryNonComponent;
  let fixture: ComponentFixture<InitialDataEntryNonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialDataEntryNonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialDataEntryNonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
