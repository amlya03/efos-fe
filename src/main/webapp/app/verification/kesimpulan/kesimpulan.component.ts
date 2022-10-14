import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Editor } from 'ngx-editor';
import { LocalStorageService } from 'ngx-webstorage';
import { kesimpulanVerification } from '../service/config/kesimpulanVerification.model';
import { ServiceVerificationService } from '../service/service-verification.service';

@Component({
  selector: 'jhi-kesimpulan',
  templateUrl: './kesimpulan.component.html',
  styleUrls: ['./kesimpulan.component.scss']
})
export class KesimpulanComponent implements OnInit {
  kesimpulanForm!: FormGroup;
  submitted = false;
  editor!: Editor;
  app_no_de: any;
  curef: any;
  kesimpulanModel: kesimpulanVerification = new kesimpulanVerification();
  untukSessionUserName: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected localStorageService: LocalStorageService,
    protected serviceVerificationService: ServiceVerificationService,
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.untukSessionUserName = this.localStorageService.retrieve('sessionUserName');
    this.editor = new Editor();
    this.load();
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.kesimpulanForm = this.formBuilder.group({
      kesimpulan: '',
      rekomendasi: '',
    });
  }

  load(): void {
    // ambil semua data Kesimpulan
    this.serviceVerificationService.fetchKesimpulan(this.app_no_de).subscribe(data => {
      this.kesimpulanModel = data.result;
      let retriveKesimpulan = {
        kesimpulan: this.kesimpulanModel.kesimpulan,
        rekomendasi: this.kesimpulanModel.rekomendasi,
      };
      this.kesimpulanForm.setValue(retriveKesimpulan);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.kesimpulanModel == null) {
    this.http
    .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_kesimpulan_verifikasi', {
          id: 0,
          app_no_de: this.app_no_de,
          created_date: '',
          created_by: this.untukSessionUserName,
          kesimpulan: this.kesimpulanForm.get('kesimpulan')?.value,
          rekomendasi: this.kesimpulanForm.get('rekomendasi')?.value,
          updated_date: '',
          updated_by: this.untukSessionUserName,
      // updated_by: this.mutasiForm.get('updated_by')?.value,
      // updated_date: this.mutasiForm.get('updated_date')?.value,
    })
    .subscribe({
      next: response => console.warn(response),
      error: error => console.warn(error),
    });
    }
    // else
    //   this.http
    //     .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/update_analisa_keuangan', {

    //     })
    //     .subscribe({});
    this.router.navigate(['/verification/memo'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
