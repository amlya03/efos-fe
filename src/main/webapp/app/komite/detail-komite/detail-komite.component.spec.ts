import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKomiteComponent } from './detail-komite.component';

describe('DetailKomiteComponent', () => {
  let component: DetailKomiteComponent;
  let fixture: ComponentFixture<DetailKomiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailKomiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailKomiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
