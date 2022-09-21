import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasilPrescreeningComponent } from './hasil-prescreening.component';

describe('HasilPrescreeningComponent', () => {
  let component: HasilPrescreeningComponent;
  let fixture: ComponentFixture<HasilPrescreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HasilPrescreeningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HasilPrescreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
