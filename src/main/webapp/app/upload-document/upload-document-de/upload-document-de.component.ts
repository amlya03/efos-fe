import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { uploadDocument } from '../services/config/uploadDocument.model';
import { ServicesUploadDocumentService } from '../services/services-upload-document.service';

@Component({
  selector: 'jhi-upload-document-de',
  templateUrl: './upload-document-de.component.html',
  styleUrls: ['./upload-document-de.component.scss'],
})
export class UploadDocumentDeComponent implements OnInit, OnDestroy {
  uploadDocument?: uploadDocument[];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(protected uploadServices: ServicesUploadDocumentService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
  }

  load(): void {
    this.uploadServices.getListUploadDocumentDE().subscribe(data => {
      console.warn('ini upload de' + data);
      // if (data.code === 200) {
      this.uploadDocument = (data as any).result;
      this.dtTrigger.next(data.result);
      // }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }
}
