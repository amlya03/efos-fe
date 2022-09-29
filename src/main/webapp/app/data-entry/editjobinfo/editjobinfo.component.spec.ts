import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditjobinfoComponent } from './editjobinfo.component';

describe('EditjobinfoComponent', () => {
  let component: EditjobinfoComponent;
  let fixture: ComponentFixture<EditjobinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditjobinfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditjobinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
