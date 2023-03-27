import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametermarginstepupComponent } from './parametermarginstepup.component';

describe('ParametermarginstepupComponent', () => {
  let component: ParametermarginstepupComponent;
  let fixture: ComponentFixture<ParametermarginstepupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametermarginstepupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParametermarginstepupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
