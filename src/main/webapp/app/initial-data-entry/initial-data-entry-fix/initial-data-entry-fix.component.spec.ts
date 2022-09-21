import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDataEntryFixComponent } from './initial-data-entry-fix.component';

describe('InitialDataEntryFixComponent', () => {
  let component: InitialDataEntryFixComponent;
  let fixture: ComponentFixture<InitialDataEntryFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialDataEntryFixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialDataEntryFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
