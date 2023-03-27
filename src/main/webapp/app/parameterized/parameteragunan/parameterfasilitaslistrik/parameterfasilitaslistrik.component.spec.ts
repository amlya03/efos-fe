import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterfasilitaslistrikComponent } from './parameterfasilitaslistrik.component';

describe('ParameterfasilitaslistrikComponent', () => {
  let component: ParameterfasilitaslistrikComponent;
  let fixture: ComponentFixture<ParameterfasilitaslistrikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterfasilitaslistrikComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterfasilitaslistrikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
