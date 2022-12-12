import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { listAgunan } from 'app/data-entry/services/config/listAgunan.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { getMapis } from 'app/verification/service/config/getMapis.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { SessionStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-mapis',
  templateUrl: './mapis.component.html',
  styleUrls: ['./mapis.component.scss'],
})
export class MapisComponent implements OnInit {
  mapisForm!: FormGroup;
  app_noDe: any;
  mapisModel: getMapis = new getMapis();
  dataEntry: fetchAllDe = new fetchAllDe();
  listagunan: listAgunan[] = [];
  betaFTV: any;
  cekResuklt = 0;

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
      });
    }
    this.load();
  }

  load(): void {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_noDe).subscribe(data => {
      this.dataEntry = data.result;

      // ambil semua data Job by Curef
      setTimeout(() => {
        this.dataEntryService.getfetchlistagunan(this.dataEntry.curef).subscribe(list => {
          this.listagunan = list.result;

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
      } else {
        this.cekResuklt = 1;
      }
      const retriveForm = {
        luas_bangunan: this.mapisModel.luas_bangunan,
        luas_tanah: this.mapisModel.luas_tanah,
        nilai_imb: this.mapisModel.nilai_imb,
        nilai_market: this.mapisModel.nilai_market,
      };
      this.mapisForm.setValue(retriveForm);
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
        Swal.fire('Data Berhasil diUpdate!', 'Data Sudah di Tim Analis', 'success').then((message: any) => {
          if (this.cekResuklt == 0) {
            this.http
              .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_data_appraisal', {
                id: '',
                app_no_de: this.app_noDe,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.listagunan[0].jenis_objek_deskripsi,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.listagunan[0].tipe_properti,
                tipe_agunan: this.listagunan[0].tipe_agunan,
                // "updated_date": null,
                // "updated_by": null
              })
              .subscribe({
                next: bawaan => {
                  this.http
                    .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_tracking', {
                      app_no_de: this.app_noDe,
                      created_by: this.sessionStorageService.retrieve('sessionUserName'),
                      status_aplikasi: this.dataEntry.status_aplikasi,
                    })
                    .subscribe({
                      next: bawaan => {
                        this.router.navigate(['daftar_input_mapis']);
                        // setTimeout(() => {
                        // }, 1000);
                      },
                    });
                },
              });
          } else {
            this.http
              .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_data_appraisal', {
                id: '',
                app_no_de: this.app_noDe,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.listagunan[0].jenis_objek_deskripsi,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.listagunan[0].tipe_properti,
                tipe_agunan: this.listagunan[0].tipe_agunan,
                // "updated_date": null,
                // "updated_by": null
              })
              .subscribe({
                next: bawaan => {
                  this.http
                    .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_tracking', {
                      app_no_de: this.app_noDe,
                      created_by: this.sessionStorageService.retrieve('sessionUserName'),
                      status_aplikasi: this.dataEntry.status_aplikasi,
                    })
                    .subscribe({
                      next: bawaan => {
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
        Swal.fire('Data Berhasil disimpan', 'Data disimpan', 'success').then((message: any) => {
          if (this.cekResuklt == 0) {
            this.http
              .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_data_appraisal', {
                id: '',
                app_no_de: this.app_noDe,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.listagunan[0].jenis_objek_deskripsi,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.listagunan[0].tipe_properti,
                tipe_agunan: this.listagunan[0].tipe_agunan,
                // "updated_date": null,
                // "updated_by": null
              })
              .subscribe({
                next: bawaan => {
                  window.location.reload();
                  // setTimeout(() => {
                  // }, 1000);
                },
              });
          } else {
            this.http
              .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_data_appraisal', {
                id: '',
                app_no_de: this.app_noDe,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
                created_date: '',
                ftv: this.betaFTV,
                jenis_objek: this.listagunan[0].jenis_objek_deskripsi,
                luas_bangunan: this.mapisForm.get('luas_bangunan')?.value,
                luas_tanah: this.mapisForm.get('luas_tanah')?.value,
                nilai_imb: this.mapisForm.get('nilai_imb')?.value,
                nilai_market: this.mapisForm.get('nilai_market')?.value,
                objek_pembiayaan: this.listagunan[0].tipe_properti,
                tipe_agunan: this.listagunan[0].tipe_agunan,
                // "updated_date": null,
                // "updated_by": null
              })
              .subscribe({
                next: bawaan => {
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
