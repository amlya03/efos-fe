import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterskemafasilitasComponent } from './parameterskemafasilitas.component';

describe('ParameterskemafasilitasComponent', () => {
  let component: ParameterskemafasilitasComponent;
  let fixture: ComponentFixture<ParameterskemafasilitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterskemafasilitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterskemafasilitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
