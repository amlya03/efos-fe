import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapisComponent } from './mapis.component';

describe('MapisComponent', () => {
  let component: MapisComponent;
  let fixture: ComponentFixture<MapisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
