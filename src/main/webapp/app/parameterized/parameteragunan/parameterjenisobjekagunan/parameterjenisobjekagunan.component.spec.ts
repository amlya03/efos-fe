import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterjenisobjekagunanComponent } from './parameterjenisobjekagunan.component';

describe('ParameterjenisobjekagunanComponent', () => {
  let component: ParameterjenisobjekagunanComponent;
  let fixture: ComponentFixture<ParameterjenisobjekagunanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterjenisobjekagunanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterjenisobjekagunanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
