import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametermarginfixComponent } from './parametermarginfix.component';

describe('ParametermarginfixComponent', () => {
  let component: ParametermarginfixComponent;
  let fixture: ComponentFixture<ParametermarginfixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametermarginfixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParametermarginfixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
