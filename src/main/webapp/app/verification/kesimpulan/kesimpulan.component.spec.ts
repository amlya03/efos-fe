import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KesimpulanComponent } from './kesimpulan.component';

describe('KesimpulanComponent', () => {
  let component: KesimpulanComponent;
  let fixture: ComponentFixture<KesimpulanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KesimpulanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KesimpulanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
