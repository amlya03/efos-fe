import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDataEntryComponent } from './initial-data-entry.component';

describe('InitialDataEntryComponent', () => {
  let component: InitialDataEntryComponent;
  let fixture: ComponentFixture<InitialDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialDataEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
