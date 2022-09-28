import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentAgunanComponent } from './upload-document-agunan.component';

describe('UploadDocumentAgunanComponent', () => {
  let component: UploadDocumentAgunanComponent;
  let fixture: ComponentFixture<UploadDocumentAgunanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDocumentAgunanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDocumentAgunanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
