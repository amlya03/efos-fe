import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterjobComponent } from './parameterjob.component';

describe('ParameterjobComponent', () => {
  let component: ParameterjobComponent;
  let fixture: ComponentFixture<ParameterjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterjobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
