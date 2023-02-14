/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Editor } from 'ngx-editor';
import { SessionStorageService } from 'ngx-webstorage';
import { kesimpulanVerification } from '../service/config/kesimpulanVerification.model';
import { ServiceVerificationService } from '../service/service-verification.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-kesimpulan',
  templateUrl: './kesimpulan.component.html',
  styleUrls: ['./kesimpulan.component.scss'],
})
export class KesimpulanComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  kesimpulanForm!: FormGroup;
  submitted = false;
  editor!: Editor;
  app_no_de: any;
  curef: any;
  kesimpulanModel: kesimpulanVerification = new kesimpulanVerification();
  untukSessionUserName: any;
  // Role
  untukSessionRole: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected sessionStorageService: SessionStorageService,
    protected serviceVerificationService: ServiceVerificationService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.editor = new Editor();
    this.load();
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.kesimpulanForm = this.formBuilder.group({
      kesimpulan: { value: '', disabled: this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' },
      rekomendasi: { value: '', disabled: this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' },
    });
  }

  load(): void {
    // ambil semua data Kesimpulan
    this.serviceVerificationService.fetchKesimpulan(this.app_no_de).subscribe(data => {
      // eslint-disable-next-line eqeqeq
      if (data.result == null || data.result == '') {
        this.getLoading(false);
      } else {
        this.getLoading(false);
      }
      this.kesimpulanModel = data.result;
      const retriveKesimpulan = {
        kesimpulan: this.kesimpulanModel.kesimpulan,
        rekomendasi: this.kesimpulanModel.rekomendasi,
      };
      this.kesimpulanForm.setValue(retriveKesimpulan);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.kesimpulanModel === null) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/create_kesimpulan_verifikasi', {
          id: 0,
          app_no_de: this.app_no_de,
          created_date: '',
          created_by: this.untukSessionUserName,
          kesimpulan: this.kesimpulanForm.get('kesimpulan')?.value,
          rekomendasi: this.kesimpulanForm.get('rekomendasi')?.value,
          updated_date: '',
          updated_by: this.untukSessionUserName,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/verification/memo'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
          },
          // error: error => console.warn(error),
        });
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/update_kesimpulan_verifikasi', {
          id: 0,
          app_no_de: this.app_no_de,
          created_date: '',
          created_by: this.untukSessionUserName,
          kesimpulan: this.kesimpulanForm.get('kesimpulan')?.value,
          rekomendasi: this.kesimpulanForm.get('rekomendasi')?.value,
          updated_date: '',
          updated_by: this.untukSessionUserName,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/verification/memo'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
          },
          // error: error => console.warn(error),
        });
    }
  }

  // Selanjutnya
  next(): void {
    this.router.navigate(['/verification/memo'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
