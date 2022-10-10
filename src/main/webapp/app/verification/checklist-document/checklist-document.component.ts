import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
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
  newValue: any;
  rec: any;
  app_no_de: any;


  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    public router: Router,
  ) {
      // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      this.activatedRoute.queryParams.subscribe(params => {
        this.app_no_de = params.app_no_de;
      });
      // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    }
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

  getsesuai(isSelected: any, iddokumen: any, statussesuaitidak: any, valueinout: any): void {
    // for (var x = 1; x < 11; x++) {
    //    const keteranganya = document.getElementById('keterangan'+x) as HTMLInputElement | any;
    // }
    // const keteranganyaa = document.getElementById('keterangan') as HTMLInputElement | any;
    const checked = isSelected.target.checked;
    if (checked) {
      // const keteranganyaa = document.getElementById('rec') as HTMLInputElement | any;
      this.kirimDesesuai.push(statussesuaitidak);
      this.iddokumen.push(iddokumen);
      this.store(valueinout, '1');
      // this.keterangannya.push(keteranganyaa.value);
    } else {
      // const keteranganyaa = document.getElementById('rec') as HTMLInputElement | any;
      this.store(valueinout, '0');
      const index = this.kirimDesesuai.findIndex(list => list === statussesuaitidak);
      const indexid = this.iddokumen.findIndex(list => list === iddokumen);
      // const indexids = this.datacontoh.findIndex(list => list === newValue);

      // this.datacontoh.splice(indexids,1)
      this.kirimDesesuai.splice(index, 1);
      this.iddokumen.splice(indexid, 1);
    }
    console.warn(this.kirimDesesuai);
    console.warn(this.iddokumen);
    // console.warn(this.keterangannya);
  }

  store(newValue: any, pemisah: any): void {
    if (pemisah == 1) {
      this.datacontoh.push(newValue);
    } else {
      const indexids = this.datacontoh.findIndex(list => list === newValue);
      this.datacontoh.splice(indexids, 1);
    }
    console.log(this.datacontoh);
    // this.datacontohid.push(iddokumen);
    // this.datacontoh=newValue;

    // let changes = this.newValue.diff(this.datacontoh);
    // if (changes) {
    //   alert('putetputer');
    //     console.log('Changes detected!');
    // }
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

  // update Status
  updateStatus(){
    this.router.navigate(['/syarat-persetujuan'], { queryParams: { app_no_de: this.app_no_de } });
  }
}
