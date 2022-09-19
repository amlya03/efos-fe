import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRumahComponent } from './data-rumah.component';

describe('DataRumahComponent', () => {
  let component: DataRumahComponent;
  let fixture: ComponentFixture<DataRumahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataRumahComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataRumahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
