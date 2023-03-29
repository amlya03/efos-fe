/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { listAgunan } from 'app/data-entry/services/config/listAgunan.model';
import { negativeList } from 'app/data-entry/services/config/negativeList.model';
import { preScreenBm } from 'app/data-entry/services/config/preScreenBm.model';
import { refListTipePerusahaan } from 'app/data-entry/services/config/refListTipePerusahaan.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { dukcapilModel } from 'app/initial-data-entry/services/config/dukcapilModel.model';
import { modelJobIde } from 'app/initial-data-entry/services/config/modelJobIde.model';
import { slik } from 'app/initial-data-entry/services/config/slik.model';
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { uploadDocument } from 'app/upload-document/services/config/uploadDocument.model';
import { ServicesUploadDocumentService } from 'app/upload-document/services/services-upload-document.service';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-negative-list',
  templateUrl: './negative-list.component.html',
  styleUrls: ['./negative-list.component.scss'],
})
export class NegativeListComponent implements OnInit, OnDestroy {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  negativeForm!: FormGroup;
  baseUrl: string = environment.baseUrl;
  dataEntryModel: fetchAllDe = new fetchAllDe();
  jobModel: modelJobIde = new modelJobIde();
  negativeListPekerjaan: negativeList[] = [];
  negativeListBidangUsaha: negativeList[] = [];
  negativeListInstansi: negativeList[] = [];
  tipePerusahaanModel: refListTipePerusahaan[] = [];
  uploadDocument: uploadDocument = new uploadDocument();
  collateralModel: any;
  collateralResponse: listAgunan = new listAgunan();
  dukcapilModel: dukcapilModel = new dukcapilModel();
  dukcapilModelPasangan: dukcapilModel = new dukcapilModel();
  curef: string | undefined;
  app_no_de: string | undefined;
  lembagaResponse: any;
  contLamaBekerja: any;
  contUsia: any;
  slikModel: slik[] = [];
  totalOutNas: any;
  totalPlaNas: any;
  totalAngNas: any;
  totalPasOut: any;
  totalPasPla: any;
  totalPasAng: any;
  joinTanggalMulai: any;
  joinJatuhTempoMulai: any;
  modelPresreen: preScreenBm = new preScreenBm();

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtTrigger = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService,
    protected verificationServices: ServiceVerificationService,
    protected uploadServices: ServicesUploadDocumentService,
    protected initialDataService: InitialDataEntryService,
    private sessionStorageService: SessionStorageService,
    private modalService: NgbModal
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };

    this.negativeForm = this.formBuilder.group({
      checkUsiaPensiun: 0,
      checkSlik: { value: 0, disabled: true },
      checkDukcapil: 0,
      checkPekerjaan: 0,
      checkLamaBekerja: 0,
      checkInstansi: 0,
      checkIsu: 0,
      checkDataCopy: 0,
      checkCallReport: 0,
    });
    this.load();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  updatedBm(): void {
    this.router.navigate(['/negative-list'], {
      queryParams: { app_no_de: this.app_no_de },
    });
  }

  load(): void {
    // //////////// Ref Negative LIst Pekerjaan /////////////////////////
    this.dataEntryService.getListNegativePekerjaan().subscribe(peker => {
      this.negativeListPekerjaan = peker.result;
    });

    // //////////// Ref Negative LIst Bidang USaha /////////////////////////
    this.dataEntryService.getListNegativeBidangUsaha().subscribe(usaha => {
      this.negativeListBidangUsaha = usaha.result;
    });

    // //////////// Ref Negative LIst Instansi /////////////////////////
    this.dataEntryService.getListNegativeInstansi().subscribe(instansi => {
      this.negativeListInstansi = instansi.result;
    });

    // Get View Data Entry
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe({
      next: data => {
        this.dataEntryModel = data.result;
        // console.warn(this.dataEntryModel);

        // get Data Dukcapil
        if (this.dataEntryModel.status_perkawinan === 'KAWIN') {
          this.initialDataService.getDataDukcapil(this.dataEntryModel.no_ktp).subscribe({
            next: dukcapil => {
              this.dukcapilModel = dukcapil.result;
              // console.warn('dukcapil', this.dukcapilModel)
              this.initialDataService.getDataDukcapil(this.dataEntryModel.no_ktp).subscribe({
                next: dukcapilPasangan => {
                  this.dukcapilModelPasangan = dukcapilPasangan.result;
                  // console.warn('dukcapil', this.dukcapilModel)
                },
              });
            },
          });
        } else {
          this.initialDataService.getDataDukcapil(this.dataEntryModel.no_ktp).subscribe({
            next: dukcapil => {
              this.dukcapilModel = dukcapil.result;
              // console.warn('dukcapil', this.dukcapilModel)
            },
          });
        }

        // Get View Job Info
        this.dataEntryService.getFetchSemuaDataJob(this.dataEntryModel.curef).subscribe({
          next: job => {
            this.jobModel = job.result.shift();
            this.contUsia = Number(this.jobModel.umur_pensiun);
            const lamaBekerjaTahunResponse = this.jobModel.lama_bekerja_tahun;
            const lamaBekerjaBulanResponse = this.jobModel.lama_bekerja_bulan;
            this.contLamaBekerja = Number(lamaBekerjaTahunResponse) * 12 + Number(lamaBekerjaBulanResponse);
            // console.warn(this.jobModel);

            // //////////// Ref LIst Perusahaan /////////////////////////
            this.dataEntryService.getFetchTipePerusahaan().subscribe(perusahaan => {
              this.tipePerusahaanModel = perusahaan.result;
              const retrivePerusahaan = this.tipePerusahaanModel.find(
                (value: refListTipePerusahaan) => value.company_code === this.jobModel.tipe_perusahaan
              );
              this.lembagaResponse = retrivePerusahaan?.company_deskripsi;
            });

            this.uploadServices.getListUploadDocument(this.dataEntryModel.curef, 'DE').subscribe(dE => {
              this.uploadDocument = dE.result.find((response: uploadDocument) => response.doc_description === 'Form Permohonan Pembiayaan');
            });

            let tanggalMulai: any;
            let tanggalJatuhTempo: any;
            this.verificationServices.fetchSlik(this.dataEntryModel.app_no_ide).subscribe({
              next: Response => {
                this.getLoading(false);
                this.negativeForm.get('checkSlik')?.setValue(true);

                this.slikModel = Response.result.dataSlikResult;
                // console.warn('slik', this.slikModel)

                this.totalOutNas = Response.result.total_outstanding_nasabah;
                this.totalPlaNas = Response.result.total_plafon_nasabah;
                this.totalAngNas = Response.result.total_angsuran_nasabah;
                this.totalPasOut = Response.result.total_outstanding_pasangan;
                this.totalPasPla = Response.result.total_plafon_pasangan;
                this.totalPasAng = Response.result.total_angsuran_pasangan;

                this.slikModel.forEach(sLikRssponse => {
                  tanggalMulai = sLikRssponse.tanggal_mulai;
                  const resultMulaiTahun = tanggalMulai.slice(0, 4);
                  const resultMulaiBulan = tanggalMulai.slice(4, 6);
                  const resultMulaiTanggal = tanggalMulai.slice(6);
                  this.joinTanggalMulai = resultMulaiTahun + '/' + resultMulaiBulan + '/' + resultMulaiTanggal;

                  tanggalJatuhTempo = sLikRssponse.tanggal_jatuh_tempo;
                  const resultJatuhTempoTahun = tanggalJatuhTempo.slice(0, 4);
                  const resultJatuhTempoBulan = tanggalJatuhTempo.slice(4, 6);
                  const resultJatuhTempoTanggal = tanggalJatuhTempo.slice(6);
                  this.joinJatuhTempoMulai = resultJatuhTempoTahun + '/' + resultJatuhTempoBulan + '/' + resultJatuhTempoTanggal;
                });
                this.dtTrigger.next(this.slikModel);
              },
              error: () => {
                this.negativeForm.get('checkSlik')?.setValue(false);
                this.getLoading(false);
              },
            });
          },
          error: () => {
            this.getLoading(false);
          },
        });

        // Get View Collateral
        this.dataEntryService.getCollateralByCuref(this.dataEntryModel.curef).subscribe(collateral => {
          this.collateralResponse = collateral.result.shift();
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (this.collateralResponse) {
            this.collateralModel = this.collateralResponse.tipe_agunan;
          } else {
            this.collateralModel = '';
          }
        });
      },
      error: () => {
        this.getLoading(false);
      },
    });

    this.dataEntryService.getPreScreenBM(this.app_no_de).subscribe(preScreen => {
      this.modelPresreen = preScreen.result;

      if (this.modelPresreen.checkUsiaPensiun === '1') {
        this.negativeForm.get('checkUsiaPensiun')?.setValue(1);
      } else {
        this.negativeForm.get('checkUsiaPensiun')?.setValue(0);
      }
      if (this.modelPresreen.checkSlik === '1') {
        this.negativeForm.get('checkSlik')?.setValue(1);
      } else {
        this.negativeForm.get('checkSlik')?.setValue(0);
      }
      if (this.modelPresreen.checkDukcapil === '1') {
        this.negativeForm.get('checkDukcapil')?.setValue(1);
      } else {
        this.negativeForm.get('checkDukcapil')?.setValue(0);
      }
      if (this.modelPresreen.checkPekerjaan === '1') {
        this.negativeForm.get('checkPekerjaan')?.setValue(1);
      } else {
        this.negativeForm.get('checkPekerjaan')?.setValue(0);
      }
      if (this.modelPresreen.checkLamaBekerja === '1') {
        this.negativeForm.get('checkLamaBekerja')?.setValue(1);
      } else {
        this.negativeForm.get('checkLamaBekerja')?.setValue(0);
      }
      if (this.modelPresreen.checkInstansi === '1') {
        this.negativeForm.get('checkInstansi')?.setValue(1);
      } else {
        this.negativeForm.get('checkInstansi')?.setValue(0);
      }
      if (this.modelPresreen.checkIsu === '1') {
        this.negativeForm.get('checkIsu')?.setValue(1);
      } else {
        this.negativeForm.get('checkIsu')?.setValue(0);
      }
      if (this.modelPresreen.checkDataCopy === '1') {
        this.negativeForm.get('checkDataCopy')?.setValue(1);
      } else {
        this.negativeForm.get('checkDataCopy')?.setValue(0);
      }
      if (this.modelPresreen.checkCallReport === '1') {
        this.negativeForm.get('checkCallReport')?.setValue(1);
      } else {
        this.negativeForm.get('checkCallReport')?.setValue(0);
      }
      console.warn(this.negativeForm.getRawValue());
    });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  // View Upload
  viewData(): void {
    let popup: any;
    const buatPdf = this.uploadDocument.nama_dokumen?.split('.').pop();
    if (buatPdf === 'pdf') {
      window.open(this.baseUrl + 'v1/efos-de/downloadFile/' + this.uploadDocument.nama_dokumen + '');
    } else {
      const url = this.baseUrl + 'v1/efos-de/downloadFile/' + this.uploadDocument.nama_dokumen + '';
      const img = '<img src="' + url + '">';
      popup = window.open('');
      popup.document.write(img);
    }
  }

  openSlikContent(slikContent: any): void {
    this.modalService.open(slikContent, { scrollable: true, size: 'xl' });
  }

  openDukcapilContent(dukcapilContent: any): void {
    this.modalService.open(dukcapilContent, { scrollable: true, size: 'xl' });
  }

  openUploadDokumen(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_prescreen_bm', {
        id: 0,
        app_no_de: this.app_no_de,
        checkCallReport: this.negativeForm.get('checkCallReport')?.value,
        checkDataCopy: this.negativeForm.get('checkDataCopy')?.value,
        checkDukcapil: this.negativeForm.get('checkDukcapil')?.value,
        checkInstansi: this.negativeForm.get('checkInstansi')?.value,
        checkIsu: this.negativeForm.get('checkIsu')?.value,
        checkLamaBekerja: this.negativeForm.get('checkLamaBekerja')?.value,
        checkPekerjaan: this.negativeForm.get('checkPekerjaan')?.value,
        checkSlik: 1,
        checkUsiaPensiun: this.negativeForm.get('checkUsiaPensiun')?.value,
        created_by: this.sessionStorageService.retrieve('sessionUserName'),
        created_date: '',
        updated_by: this.sessionStorageService.retrieve('sessionUserName'),
        updated_date: '',
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/upload_document/upload_document_de'], {
            queryParams: { curef: this.dataEntryModel.curef, app_no_de: this.dataEntryModel.app_no_de },
          });
        },
        error: () => {
          this.router.navigate(['/upload_document/upload_document_de'], {
            queryParams: { curef: this.dataEntryModel.curef, app_no_de: this.dataEntryModel.app_no_de },
          });
        },
      });
  }

  openCallReport(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_prescreen_bm', {
        id: 0,
        app_no_de: this.app_no_de,
        checkCallReport: this.negativeForm.get('checkCallReport')?.value,
        checkDataCopy: this.negativeForm.get('checkDataCopy')?.value,
        checkDukcapil: this.negativeForm.get('checkDukcapil')?.value,
        checkInstansi: this.negativeForm.get('checkInstansi')?.value,
        checkIsu: this.negativeForm.get('checkIsu')?.value,
        checkLamaBekerja: this.negativeForm.get('checkLamaBekerja')?.value,
        checkPekerjaan: this.negativeForm.get('checkPekerjaan')?.value,
        checkSlik: 1,
        checkUsiaPensiun: this.negativeForm.get('checkUsiaPensiun')?.value,
        created_by: this.sessionStorageService.retrieve('sessionUserName'),
        created_date: '',
        updated_by: this.sessionStorageService.retrieve('sessionUserName'),
        updated_date: '',
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/data-entry/call-report'], {
            queryParams: { curef: this.dataEntryModel.curef, app_no_de: this.dataEntryModel.app_no_de },
          });
        },
        error: () => {
          this.router.navigate(['/data-entry/call-report'], {
            queryParams: { curef: this.dataEntryModel.curef, app_no_de: this.dataEntryModel.app_no_de },
          });
        },
      });
  }

  checkUsiaPensiun(event: any): void {
    if (event) {
      this.negativeForm.get('checkUsiaPensiun')?.setValue(1);
    } else {
      this.negativeForm.get('checkUsiaPensiun')?.setValue(0);
    }
  }

  checkSlik(event: any): void {
    if (event) {
      this.negativeForm.get('checkSlik')?.setValue(1);
    } else {
      this.negativeForm.get('checkSlik')?.setValue(1);
    }
  }

  checkDukcapil(event: any): void {
    if (event) {
      this.negativeForm.get('checkDukcapil')?.setValue(1);
    } else {
      this.negativeForm.get('checkDukcapil')?.setValue(0);
    }
  }

  checkPekerjaan(event: any): void {
    if (event) {
      this.negativeForm.get('checkPekerjaan')?.setValue(1);
    } else {
      this.negativeForm.get('checkPekerjaan')?.setValue(0);
    }
  }

  checkLamaBekerja(event: any): void {
    if (event) {
      this.negativeForm.get('checkLamaBekerja')?.setValue(1);
    } else {
      this.negativeForm.get('checkLamaBekerja')?.setValue(0);
    }
  }

  checkInstansi(event: any): void {
    if (event) {
      this.negativeForm.get('checkInstansi')?.setValue(1);
    } else {
      this.negativeForm.get('checkInstansi')?.setValue(0);
    }
  }

  checkIsu(event: any): void {
    if (event) {
      this.negativeForm.get('checkIsu')?.setValue(1);
    } else {
      this.negativeForm.get('checkIsu')?.setValue(0);
    }
  }

  checkDataCopy(event: any): void {
    if (event) {
      this.negativeForm.get('checkDataCopy')?.setValue(1);
    } else {
      this.negativeForm.get('checkDataCopy')?.setValue(0);
    }
  }

  checkCallReport(event: any): void {
    if (event) {
      this.negativeForm.get('checkCallReport')?.setValue(1);
    } else {
      this.negativeForm.get('checkCallReport')?.setValue(0);
    }
  }

  updateStatus(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/update_status_dataentry', {
        app_no_de: this.app_no_de,
        created_by: this.sessionStorageService.retrieve('sessionUserName'),
        status_aplikasi: this.dataEntryModel.status_aplikasi,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/data-entry']);
        },
        error(err) {
          alert(err.error.message);
        },
      });
  }

  saveNegativeList(): void {
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/create_prescreen_bm', {
        id: 0,
        app_no_de: this.app_no_de,
        checkCallReport: this.negativeForm.get('checkCallReport')?.value,
        checkDataCopy: this.negativeForm.get('checkDataCopy')?.value,
        checkDukcapil: this.negativeForm.get('checkDukcapil')?.value,
        checkInstansi: this.negativeForm.get('checkInstansi')?.value,
        checkIsu: this.negativeForm.get('checkIsu')?.value,
        checkLamaBekerja: this.negativeForm.get('checkLamaBekerja')?.value,
        checkPekerjaan: this.negativeForm.get('checkPekerjaan')?.value,
        checkSlik: 1,
        checkUsiaPensiun: this.negativeForm.get('checkUsiaPensiun')?.value,
        created_by: this.sessionStorageService.retrieve('sessionUserName'),
        created_date: '',
        updated_by: this.sessionStorageService.retrieve('sessionUserName'),
        updated_date: '',
      })
      .subscribe({
        next: () => {
          this.updateStatus();
        },
        error(err) {
          alert(err.error.message);
        },
      });
  }
}
