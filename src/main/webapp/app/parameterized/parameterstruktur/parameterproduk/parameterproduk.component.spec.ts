import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterprodukComponent } from './parameterproduk.component';

describe('ParameterprodukComponent', () => {
  let component: ParameterprodukComponent;
  let fixture: ComponentFixture<ParameterprodukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParameterprodukComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterprodukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
