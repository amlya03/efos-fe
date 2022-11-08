import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-mapis',
  templateUrl: './mapis.component.html',
  styleUrls: ['./mapis.component.scss']
})
export class MapisComponent implements OnInit {
  mapisForm!: FormGroup;
  app_no_de: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    protected http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
  }

  ngOnInit(): void {
    {
      this.mapisForm = this.formBuilder.group({
        ftv: '',
        jenis_objek: '',
        luas_bangunan: '',
        luas_tanah: '',
        nilai_imb: '',
        nilai_market: '',
        objek_pembiayaan: '',
        tipe_agunan: '',
      });
    }
  }

  submitForm(){
    this.http.post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_data_appraisal', {
      app_no_de: this.app_no_de,
      created_by: this.localStorageService.retrieve('sessionUserName'),
      // created_date: 2022-11-08T08:32:53.127Z,
      ftv: this.mapisForm.get('ftv')?.value,
      // id: 0,
      jenis_objek: this.mapisForm.get('jenis_objek')?.value,
      luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
      luas_tanah: this.mapisForm.get('luas_tanah')?.value,
      nilai_imb: this.mapisForm.get('nilai_imb')?.value,
      nilai_market: this.mapisForm.get('nilai_market')?.value,
      objek_pembiayaan: this.mapisForm.get('objek_pembiayaan')?.value,
      tipe_agunan: this.mapisForm.get('tipe_agunan')?.value,
      // updated_by: string,
      // updated_date: 2022-11-08T08:32:53.127Z
    })
    .subscribe({
      next: bawaan => {
        alert("Berhasil Menyimpan Data")
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
