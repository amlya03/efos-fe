import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomiteComponent } from './komite.component';

describe('KomiteComponent', () => {
  let component: KomiteComponent;
  let fixture: ComponentFixture<KomiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KomiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KomiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
