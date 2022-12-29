import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { ServiceVerificationService } from '../service/service-verification.service';
import { daWuS } from './daWuS.model';
import { Subject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-update-status',
  templateUrl: './daftar-aplikasi-waiting-update-status.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-update-status.component.scss'],
})
export class DaftarAplikasiWaitingUpdateStatusComponent implements OnInit, OnDestroy {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
  title = 'EFOS';
  daWuS?: daWuS[];
  dataEntry: fetchAllDe = new fetchAllDe();
  onResponseSuccess: any;
  valueFasilitas = '';
  valueKategori = '';
  valueNamaNasabah = '';
  valueNoAplikasi = '';
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: Array<number> = [];
  kirimStatusAplikasi: Array<number> = [];
  updateStatusDaWuS: Array<number> = [];
  listFasilitas: getListFasilitasModel[] = [];
  checkLenghtResult: any;
  curef: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected daWusService: ServiceVerificationService,
    protected dataEntryServices: DataEntryService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal,
    private sessionStorageService: SessionStorageService
  ) {}

  // ceklis semua
  isChecked = false;
  checkuncheckall() {
    if (this.isChecked === true) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

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
    this.getLoading(true);
    // ///////////////////////// LIst Cari Fasilitas //////////////////////
    this.dataEntryServices.getFetchKodeFasilitas().subscribe(data => {
      this.listFasilitas = data.result;
    });
    // ///////////////////////// LIst Cari Fasilitas //////////////////////

    this.daWusService.getDaWuS().subscribe(data => {
      this.checkLenghtResult = data.result;
      //console.log(this.checkLenghtResult);
      if (data.code === 200) {
        this.daWuS = data.result;
        this.dtTrigger.next(this.daWuS);
        this.getLoading(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // serach datatable
  cariButton(listFasilitas: string, listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(2).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(3).search(listFasilitas).draw();
    $('#dataTables-example').DataTable().columns(5).search(listKategori).draw();
  }
  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
  }
  // get value table
  getProoduct(isSelected: any, appNoDe: any, statusAplikasi: any): void {
    const checked = isSelected.target.checked;
    if (checked) {
      this.kirimDe.push(appNoDe);
      this.kirimStatusAplikasi.push(statusAplikasi);
    } else {
      const index = this.kirimDe.findIndex(list => list === appNoDe);
      this.kirimDe.splice(index, 1);
      // alert(statusAplikasi);
    }
    //console.warn(this.kirimDe);
  }
  // update status
  postUpdateStatus(): void {
    if (this.isChecked === false) {
      this.kirimDe;
      for (let i = 0; i < this.kirimDe.length; i++) {
        // alert(this.kirimDe[i]);
        // alert(this.kirimStatusAplikasi[i])
        this.http
          .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
            app_no_de: this.kirimDe[i],
            status_aplikasi: this.kirimStatusAplikasi[i],
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
          })
          .subscribe({
            next: data => {
              window.location.reload();
            },
          });
      }
    } else {
      for (let i = 0; i < this.checkLenghtResult.length; i++) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
            app_no_de: this.checkLenghtResult[i].app_no_de,
            status_aplikasi: this.checkLenghtResult[i].status_aplikasi,
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
          })
          .subscribe({
            next: data => {
              window.location.reload();
            },
          });
      }
    }
  }

  // Forward
  postForward(): void {
    Swal.fire({
      title: 'Forward Ke Data Entry atau Forward Ke Analys Staff?',
      text: 'Pilih Forward Ke Data Entry atau Forward Ke Analys Staff',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Forward Ke Data Entry!',
      cancelButtonText: 'Forward Ke Analys Staff!',
    }).then(result => {
      if (result.value) {
        if (this.isChecked === false) {
          this.kirimDe;
          for (let i = 0; i < this.kirimDe.length; i++) {
            // alert(this.kirimDe[i]);
            // alert(this.kirimStatusAplikasi[i])
            this.http
              .post<any>(this.baseUrl + 'v1/efos-de/update_status_back_de', {
                app_no_de: this.kirimDe[i],
                status_aplikasi: this.kirimStatusAplikasi[i],
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
              })
              .subscribe({
                next: data => {
                  // window.location.reload();
                },
              });
          }
        } else {
          for (let i = 0; i < this.checkLenghtResult.length; i++) {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-de/update_status_back_de', {
                app_no_de: this.checkLenghtResult[i].app_no_de,
                status_aplikasi: this.checkLenghtResult[i].status_aplikasi,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
              })
              .subscribe({
                next: data => {
                  // window.location.reload();
                },
              });
          }
        }
        setTimeout(() => {
          Swal.fire('Data Berhasil di Forward!', 'File Sudah Pindah ke Data Entry', 'success').then(() => {
            window.location.reload();
          });
        }, 1000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setTimeout(() => {
          if (this.isChecked === false) {
            this.kirimDe;
            for (let i = 0; i < this.kirimDe.length; i++) {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-verif/update_status_back_analis', {
                  app_no_de: this.kirimDe[i],
                  status_aplikasi: this.kirimStatusAplikasi[i],
                  created_by: this.sessionStorageService.retrieve('sessionUserName'),
                })
                .subscribe({
                  next: data => {
                    // window.location.reload();
                  },
                });
            }
          } else {
            for (let i = 0; i < this.checkLenghtResult.length; i++) {
              this.http
                .post<any>(this.baseUrl + 'v1/efos-verif/update_status_back_analis', {
                  app_no_de: this.checkLenghtResult[i].app_no_de,
                  status_aplikasi: this.checkLenghtResult[i].status_aplikasi,
                  created_by: this.sessionStorageService.retrieve('sessionUserName'),
                })
                .subscribe({
                  next: data => {
                    // window.location.reload();
                  },
                });
            }
          }
          Swal.fire('Data Berhasil di Forward!', 'File Sudah Pindah ke Analys Staff', 'success').then(() => {
            window.location.reload();
          });
        }, 1000);
      }
    });
  }

  // alert reject
  confirmBox(): void {
    Swal.fire({
      title: 'Reject Data?',
      text: 'File akan hilang',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Reject!',
      cancelButtonText: 'Tidak, Simpan ini',
    }).then(result => {
      if (result.value) {
        if (this.isChecked === false) {
          this.kirimDe;
          for (let i = 0; i < this.kirimDe.length; i++) {
            // alert(this.kirimDe[i]);
            // alert(this.kirimStatusAplikasi[i])
            this.http
              .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
                app_no_de: this.kirimDe[i],
                status_aplikasi: this.kirimStatusAplikasi[i],
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
              })
              .subscribe({
                next: data => {
                  window.location.reload();
                },
              });
          }
        } else {
          for (let i = 0; i < this.checkLenghtResult.length; i++) {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-de/update_status_tracking', {
                app_no_de: this.checkLenghtResult[i].app_no_de,
                status_aplikasi: this.checkLenghtResult[i].status_aplikasi,
                created_by: this.sessionStorageService.retrieve('sessionUserName'),
              })
              .subscribe({
                next: data => {
                  window.location.reload();
                },
              });
          }
        }
        Swal.fire('Data di Reject!', 'File Sudah Tidak Ada', 'success');
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'File disimpan', 'error');
      }
    });
  }

  // ReadOnly
  readOnlyButton(app_noDe: string | null | undefined): void {
    this.dataEntryServices.getFetchSemuaDataDE(app_noDe).subscribe(data => {
      this.dataEntry = data.result;
      this.curef = this.dataEntry.curef;
      this.router.navigate(['/analisa-keuangan'], { queryParams: { app_no_de: app_noDe, curef: this.curef } });
    });
  }
}
