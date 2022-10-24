import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcollateralComponent } from './editcollateral.component';

describe('EditcollateralComponent', () => {
  let component: EditcollateralComponent;
  let fixture: ComponentFixture<EditcollateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditcollateralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditcollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
