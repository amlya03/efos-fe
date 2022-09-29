import { TestBed } from '@angular/core/testing';

import { ServicesUploadDocumentService } from './services-upload-document.service';

describe('ServicesUploadDocumentService', () => {
  let service: ServicesUploadDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesUploadDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
