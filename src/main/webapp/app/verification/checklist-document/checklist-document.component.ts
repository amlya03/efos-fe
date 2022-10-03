import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { data } from 'jquery';
// import { jobinfolist } from './job-info-modellist';
// import { DataEntryService } from '../services/data-entry.service';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-checklist-document',
  templateUrl: './checklist-document.component.html',
  styleUrls: ['./checklist-document.component.scss'],
})
export class ChecklistDocumentComponent implements OnInit {
  daWa: any;
  kirimDesesuai: Array<number> = [];
  kirimDetidak: any;
  iddokumen: Array<number> = [];
  keterangannya: Array<any> = [];
  datacontoh: Array<any> = [];
  datacontohid: Array<any> = [];
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDokumenUploadByCuref?');

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.getdataentry().subscribe(data => {
      console.warn('tabel', data.body?.result);
      this.daWa = data.body?.result;

      // this.daWa = (data as any).result;
      // this.dtTrigger.next(data.result);
    });
  }

  // keterangan: any;
  container: any[] = [1];
  keterangan: any = [{ key: 1, values: '' }];
  // keterangan : boolean[] = [] ;

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + 'sc=curef_20220816_322' + '&ss=DE', { params: options, observe: 'response' });
  }

  getsesuai(isSelected: any, iddokumen: any, statussesuaitidak: any): void {
    // for (var x = 1; x < 11; x++) {
    //    const keteranganya = document.getElementById('keterangan'+x) as HTMLInputElement | any;
    // }
    // const keteranganyaa = document.getElementById('keterangan') as HTMLInputElement | any;
    const checked = isSelected.target.checked;
    if (checked) {
      this.kirimDesesuai.push(statussesuaitidak);
      this.iddokumen.push(iddokumen);
      // this.keterangannya.push(keteranganyaa.value);
    } else {
      const index = this.kirimDesesuai.findIndex(list => list === statussesuaitidak);
      const indexid = this.iddokumen.findIndex(list => list === iddokumen);
      this.kirimDesesuai.splice(index, 1);
      this.iddokumen.splice(indexid, 1);
    }
    console.warn(this.kirimDesesuai);
    console.warn(this.iddokumen);
    // console.warn(this.keterangannya);
  }

  store(newValue: any, iddokumen: any): void {
    this.datacontoh.push(newValue);
    this.datacontohid.push(iddokumen);
    // this.datacontoh=newValue;
    console.log(this.datacontoh);
  }

  postAssign(): void {
    this.iddokumen;
    for (let i = 0; i < this.iddokumen.length; i++) {
      // alert(this.kirimDe[i]);
      // alert(this.kirimStatusAplikasi[i])
      // alert(this.kirimAssign)
      if (this.datacontohid[i] == this.iddokumen[i]) {
        var datakirimanketeranga = this.datacontoh[i];
      }

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/verif_assignment', {
          iddokumen: this.kirimDesesuai[i],
          app_no_de: this.iddokumen[i],
          keteranganya: datakirimanketeranga,
          // 'created_by': '199183174'
        })
        .subscribe({});
      // window.location.reload();
    }

    // this.dtElement.dtInstance.then((dtIntance: DataTables.Api) => {
    //   dtIntance.destroy();
    //   this.dtOptions = {
    //     pagingType: 'full_numbers',
    //     pageLength: 10,
    //     processing: true,
    //     responsive: true,
    //   };
    //   this.dtTrigger.next(this.daWa);
    // });
  }
}
