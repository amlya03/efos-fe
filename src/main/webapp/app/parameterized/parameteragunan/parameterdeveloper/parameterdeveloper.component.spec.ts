import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterdeveloperComponent } from './parameterdeveloper.component';

describe('ParameterdeveloperComponent', () => {
  let component: ParameterdeveloperComponent;
  let fixture: ComponentFixture<ParameterdeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterdeveloperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterdeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
