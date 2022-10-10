import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyaratPersetujuanComponent } from './syarat-persetujuan.component';

describe('SyaratPersetujuanComponent', () => {
  let component: SyaratPersetujuanComponent;
  let fixture: ComponentFixture<SyaratPersetujuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyaratPersetujuanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyaratPersetujuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
