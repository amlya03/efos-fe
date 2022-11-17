import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { listAgunan } from 'app/data-entry/services/config/listAgunan.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { getMapis } from 'app/verification/service/config/getMapis.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-mapis',
  templateUrl: './mapis.component.html',
  styleUrls: ['./mapis.component.scss'],
})
export class MapisComponent implements OnInit {
  mapisForm!: FormGroup;
  app_no_de: any;
  mapisModel: getMapis = new getMapis();
  dataEntry: fetchAllDe = new fetchAllDe();
  listagunan: listAgunan[] = [];
  betaFTV: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    protected http: HttpClient,
    private localStorageService: LocalStorageService,
    protected verificationService: ServiceVerificationService,
    protected dataEntryService: DataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
  }

  ngOnInit(): void {
    {
      this.mapisForm = this.formBuilder.group({
        luas_bangunan: '',
        luas_tanah: '',
        nilai_imb: '',
        nilai_market: '',
      });
    }
    this.load();
  }

  load() {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // ambil semua data Job by Curef
      setTimeout(() => {
        this.dataEntryService.getfetchlistagunan(this.dataEntry.curef).subscribe(list => {
          this.listagunan = list.result;
          this.betaFTV = Number(this.listagunan[0].harga_objek) / Number(this.dataEntry.uang_muka);
        });
      }, 300);
    });

    this.verificationService.fetchMapis(this.app_no_de).subscribe(data => {
      this.mapisModel = data.result;
      const retriveForm = {
        luas_bangunan: this.mapisModel.luas_bangunan,
        luas_tanah: this.mapisModel.luas_tanah,
        nilai_imb: this.mapisModel.nilai_imb,
        nilai_market: this.mapisModel.nilai_market,
      };
      this.mapisForm.setValue(retriveForm);
    });
  }
  submitForm() {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_data_appraisal', {
        app_no_de: this.app_no_de,
        created_by: this.localStorageService.retrieve('sessionUserName'),
        // created_date: 2022-11-08T08:32:53.127Z,
        ftv: this.betaFTV,
        // id: 0,
        jenis_objek: this.listagunan[0].jenis_objek_deskripsi,
        luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
        luas_tanah: this.mapisForm.get('luas_tanah')?.value,
        nilai_imb: this.mapisForm.get('nilai_imb')?.value,
        nilai_market: this.mapisForm.get('nilai_market')?.value,
        objek_pembiayaan: this.listagunan[0].tipe_properti,
        tipe_agunan: this.listagunan[0].tipe_agunan,
        // updated_by: string,
        // updated_date: 2022-11-08T08:32:53.127Z
      })
      .subscribe({
        next: bawaan => {
          alert('Berhasil Menyimpan Data');
          console.log(bawaan);
          // setTimeout(() => {
          // this.router.navigate(['/data-entry/job-info'], {
          //   queryParams: {
          //     curef: this.curefGetDE,
          //     statusPerkawinan: this.statusKawin,
          //     app_no_de: this.app_no_de,
          //   },
          // });
          // }, 1000);
        },
      });
  }
}
