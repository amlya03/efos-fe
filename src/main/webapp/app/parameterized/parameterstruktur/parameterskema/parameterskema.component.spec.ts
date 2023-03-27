import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterskemaComponent } from './parameterskema.component';

describe('ParameterskemaComponent', () => {
  let component: ParameterskemaComponent;
  let fixture: ComponentFixture<ParameterskemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterskemaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterskemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
