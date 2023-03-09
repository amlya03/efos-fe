/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { listAgunan } from 'app/data-entry/services/config/listAgunan.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { getMapis } from 'app/verification/service/config/getMapis.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';
import { refJenisPekerjaan } from '../../../data-entry/services/config/refJenisPekerjaan.model';

@Component({
  selector: 'jhi-mapis',
  templateUrl: './mapis.component.html',
  styleUrls: ['./mapis.component.scss'],
})
export class MapisComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  mapisForm!: FormGroup;
  app_noDe: any;
  mapisModel: getMapis = new getMapis();
  dataEntry: fetchAllDe = new fetchAllDe();
  imbModel: refJenisPekerjaan[] = [];
  marketabilitasModel: refJenisPekerjaan[] = [];
  listagunan: listAgunan[] = [];
  betaFTV: any;
  cekResuklt = 0;
  responseCollateral: any;
  modelCollateral: listAgunan = new listAgunan();

  // Ret ///
  retTipeKen: any;
  retTipePro: any;
  retTipeAg: any;
  retJenisObj: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService,
    protected verificationService: ServiceVerificationService,
    protected dataEntryService: DataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_noDe = params.app_no_de;
    });
  }

  ngOnInit(): void {
    {
      this.mapisForm = this.formBuilder.group({
        luas_bangunan: '',
        luas_tanah: '',
        nilai_imb: '',
        nilai_market: '',
        note: '',
        harga_transaksi: '',
        marketabilitas: '',
        status_imb: '',

        nilai_indikasi: '',
        nilai_likuidasi: '',
        nilai_pasar: '',
        nilai_pks: '',
      });
    }
    this.load();
  }

  load(): void {
    this.verificationService.getlistMarketabilitasAppraisal().subscribe({
      next: marketabilitasResponse => {
        this.marketabilitasModel = marketabilitasResponse.result;
      },
    });
    this.verificationService.getlistImbAppraisal().subscribe({
      next: imb => {
        this.imbModel = imb.result;
      },
    });
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_noDe).subscribe(data => {
      this.dataEntry = data.result;

      setTimeout(() => {
        this.dataEntryService.getCollateralByCuref(this.dataEntry.curef).subscribe(coll => {
          this.responseCollateral = coll.result;
          if (this.responseCollateral.find((value: listAgunan) => value.jenis_objek == 3)) {
            if (this.responseCollateral.find((value: listAgunan) => value.nilai_pasar)) {
              this.modelCollateral = this.responseCollateral.find((value: listAgunan) => value.nilai_pasar);
              // this.strukturForm.get('harga_objek_pembiayaan')?.setValue(this.modelCollateral.nilai_pasar)
              // console.warn('pasar',this.modelCollateral)
              this.mapisForm.get('nilai_indikasi')?.setValue(this.modelCollateral.nilai_indikasi);
              this.mapisForm.get('nilai_likuidasi')?.setValue(this.modelCollateral.nilai_likuidasi);
              this.mapisForm.get('nilai_pasar')?.setValue(this.modelCollateral.nilai_pasar);
            } else {
              this.modelCollateral = this.responseCollateral.find((value: listAgunan) => value.harga_objek);
              // this.strukturForm.get('harga_objek_pembiayaan')?.setValue(this.modelCollateral.harga_objek)
              // console.warn('objek',this.modelCollateral)
              this.mapisForm.get('nilai_indikasi')?.setValue(this.modelCollateral.nilai_indikasi);
              this.mapisForm.get('harga_transaksi')?.setValue(this.modelCollateral.harga_objek);
            }
          }
        });
      }, 5);
      // ambil semua data Job by Curef
      setTimeout(() => {
        this.dataEntryService.getCollateralByCuref(this.dataEntry.curef).subscribe(list => {
          this.listagunan = list.result;
          // console.warn('listagunan ', list)
          if (list.result != '') {
            this.retTipePro = list.result[0].tipe_properti;
            this.retTipeAg = list.result[0].tipe_agunan;
            this.retJenisObj = list.result[0].jenis_objek_deskripsi;
            this.retTipeKen = list.result[0].tipe_kendaraan;
          } else {
            this.retTipePro = '';
            this.retTipeAg = '';
            this.retJenisObj = '';
            this.retTipeKen = '';
          }
          setTimeout(() => {
            this.dataEntryService.getFetchStrukturDE(this.app_noDe, this.dataEntry.curef).subscribe(struktur => {
              this.betaFTV = Number(this.dataEntry.nilai_pembiayaan) / Number(struktur.result.harga_objek_pembiayaan);
            });
          }, 100);
        });
      }, 300);
    });

    this.verificationService.fetchMapis(this.app_noDe).subscribe(data => {
      this.mapisModel = data.result;
      if (data.result === null) {
        this.cekResuklt = 0;
        const retriveForm = {
          luas_bangunan: '',
          luas_tanah: '',
          nilai_imb: '',
          nilai_market: '',
          note: '',
          harga_transaksi: '',
          marketabilitas: '',
          status_imb: '',

          nilai_indikasi: '',
          nilai_likuidasi: '',
          nilai_pasar: '',
          nilai_pks: '',
        };
        this.mapisForm.setValue(retriveForm);
      } else {
        this.cekResuklt = 1;
        const retriveForm = {
          luas_bangunan: this.mapisModel.luas_bangunan,
          luas_tanah: this.mapisModel.luas_tanah,
          nilai_imb: this.mapisModel.nilai_imb,
          nilai_market: this.mapisModel.nilai_market,
          note: this.mapisModel.note,
          harga_transaksi: this.mapisModel.harga_transaksi,
          marketabilitas: this.mapisModel.marketabilitas,
          status_imb: this.mapisModel.status_imb,

          nilai_indikasi: this.mapisModel.nilai_indikasi,
          nilai_likuidasi: this.mapisModel.nilai_likuidasi,
          nilai_pasar: this.mapisModel.nilai_pasar,
          nilai_pks: this.mapisModel.nilai_pks,
        };
        this.mapisForm.setValue(retriveForm);
      }
    });
  }
  submitForm(): void {
    Swal.fire({
      title: 'Update Status atau Simpan Data?',
      text: 'Update Status ke Analis atau Simpan Data Saja',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Update Status!',
      cancelButtonText: 'Tidak, Simpan Data',
    }).then(result => {
      if (result.value) {
        Swal.fire('Data Berhasil diUpdate!', 'Data Sudah di Tim Analis', 'success').then(() => {
          if (this.cekResuklt == 0) {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-verif/create_data_appraisal', {
                id: '',
                app_no_de: this.app_noDe,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.retJenisObj,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.retTipePro,
                tipe_agunan: this.retTipeAg,
                note: this.mapisForm.get('note')?.value,
                harga_transaksi: this.mapisForm.get('harga_transaksi')?.value,
                marketabilitas: this.mapisForm.get('marketabilitas')?.value,
                status_imb: this.mapisForm.get('status_imb')?.value,

                nilai_indikasi: this.mapisForm.get('nilai_indikasi')?.value,
                nilai_likuidasi: this.mapisForm.get('nilai_likuidasi')?.value,
                nilai_pasar: this.mapisForm.get('nilai_pasar')?.value,
                nilai_pks: this.mapisForm.get('nilai_pks')?.value,
                // "updated_date": null,
                // "updated_by": null
              })
              .subscribe({
                next: () => {
                  this.http
                    .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
                      app_no_de: this.app_noDe,
                      created_by: this.sessionStorageService.retrieve('sessionUserName'),
                      status_aplikasi: this.dataEntry.status_aplikasi,
                    })
                    .subscribe({
                      next: () => {
                        this.router.navigate(['daftar_input_mapis']);
                        // setTimeout(() => {
                        // }, 1000);
                      },
                    });
                },
              });
          } else {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-verif/update_data_appraisal', {
                id: this.mapisModel.id,
                app_no_de: this.app_noDe,
                // created_by: this.sessionStorageService.retrieve('sessionUserName'),
                // created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.retJenisObj,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.retTipePro,
                tipe_agunan: this.retTipeAg,
                note: this.mapisForm.get('note')?.value,
                harga_transaksi: this.mapisForm.get('harga_transaksi')?.value,
                updated_date: '',
                updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                marketabilitas: this.mapisForm.get('marketabilitas')?.value,
                status_imb: this.mapisForm.get('status_imb')?.value,

                nilai_indikasi: this.mapisForm.get('nilai_indikasi')?.value,
                nilai_likuidasi: this.mapisForm.get('nilai_likuidasi')?.value,
                nilai_pasar: this.mapisForm.get('nilai_pasar')?.value,
                nilai_pks: this.mapisForm.get('nilai_pks')?.value,
              })
              .subscribe({
                next: () => {
                  this.http
                    .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
                      app_no_de: this.app_noDe,
                      created_by: this.sessionStorageService.retrieve('sessionUserName'),
                      status_aplikasi: this.dataEntry.status_aplikasi,
                    })
                    .subscribe({
                      next: () => {
                        this.router.navigate(['daftar_input_mapis']);
                        // setTimeout(() => {
                        // }, 1000);
                      },
                    });
                },
              });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Data Berhasil disimpan', 'Data disimpan', 'success').then(() => {
          if (this.cekResuklt == 0) {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-verif/create_data_appraisal', {
                id: '',
                app_no_de: this.app_noDe,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.retJenisObj,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.retTipePro,
                tipe_agunan: this.retTipeAg,
                note: this.mapisForm.get('note')?.value,
                harga_transaksi: this.mapisForm.get('harga_transaksi')?.value,
                marketabilitas: this.mapisForm.get('marketabilitas')?.value,
                status_imb: this.mapisForm.get('status_imb')?.value,

                nilai_indikasi: this.mapisForm.get('nilai_indikasi')?.value,
                nilai_likuidasi: this.mapisForm.get('nilai_likuidasi')?.value,
                nilai_pasar: this.mapisForm.get('nilai_pasar')?.value,
                nilai_pks: this.mapisForm.get('nilai_pks')?.value,
                // "updated_date": null,
                // "updated_by": null
              })
              .subscribe({
                next() {
                  window.location.reload();
                  // setTimeout(() => {
                  // }, 1000);
                },
              });
          } else {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-verif/update_data_appraisal', {
                id: this.mapisModel.id,
                app_no_de: this.app_noDe,
                // created_by: this.sessionStorageService.retrieve('sessionUserName'),
                // created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.retJenisObj,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.retTipePro,
                tipe_agunan: this.retTipeAg,
                note: this.mapisForm.get('note')?.value,
                harga_transaksi: this.mapisForm.get('harga_transaksi')?.value,
                updated_date: '',
                updated_by: this.sessionStorageService.retrieve('sessionUserName'),
                marketabilitas: this.mapisForm.get('marketabilitas')?.value,
                status_imb: this.mapisForm.get('status_imb')?.value,

                nilai_indikasi: this.mapisForm.get('nilai_indikasi')?.value,
                nilai_likuidasi: this.mapisForm.get('nilai_likuidasi')?.value,
                nilai_pasar: this.mapisForm.get('nilai_pasar')?.value,
                nilai_pks: this.mapisForm.get('nilai_pks')?.value,
              })
              .subscribe({
                next() {
                  window.location.reload();
                  // setTimeout(() => {
                  // }, 1000);
                },
              });
          }
        });
      }
    });
  }
}
