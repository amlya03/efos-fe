import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentDeComponent } from './upload-document-de.component';

describe('UploadDocumentDeComponent', () => {
  let component: UploadDocumentDeComponent;
  let fixture: ComponentFixture<UploadDocumentDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDocumentDeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDocumentDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
