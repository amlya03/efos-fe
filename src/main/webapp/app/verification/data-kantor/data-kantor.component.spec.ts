import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataKantorComponent } from './data-kantor.component';

describe('DataKantorComponent', () => {
  let component: DataKantorComponent;
  let fixture: ComponentFixture<DataKantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataKantorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataKantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
