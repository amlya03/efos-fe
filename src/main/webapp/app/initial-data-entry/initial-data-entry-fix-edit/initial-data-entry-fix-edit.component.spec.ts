import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDataEntryFixEditComponent } from './initial-data-entry-fix-edit.component';

describe('InitialDataEntryFixEditComponent', () => {
  let component: InitialDataEntryFixEditComponent;
  let fixture: ComponentFixture<InitialDataEntryFixEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialDataEntryFixEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialDataEntryFixEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
