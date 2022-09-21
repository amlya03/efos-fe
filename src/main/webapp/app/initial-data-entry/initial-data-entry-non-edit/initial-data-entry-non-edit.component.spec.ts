import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDataEntryNonEditComponent } from './initial-data-entry-non-edit.component';

describe('InitialDataEntryNonEditComponent', () => {
  let component: InitialDataEntryNonEditComponent;
  let fixture: ComponentFixture<InitialDataEntryNonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialDataEntryNonEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialDataEntryNonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
