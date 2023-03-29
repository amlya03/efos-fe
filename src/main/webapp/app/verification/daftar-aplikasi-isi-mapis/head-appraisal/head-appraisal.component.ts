/* eslint-disable @typescript-eslint/prefer-for-of */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { daWaModel } from 'app/verification/daftar-aplikasi-waiting-assigment/daWa.model';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { environment } from 'environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-head-appraisal',
  templateUrl: './head-appraisal.component.html',
  styleUrls: ['./head-appraisal.component.scss'],
})
export class HeadAppraisalComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  title = 'EFOS';
  kirimDe: daWaModel[] = [];
  getListAppraisalProcess: daWaModel[] = [];

  // checklist dawa
  checkLenghtResult: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected verificationServices: ServiceVerificationService,
    protected dataEntryServices: DataEntryService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
    this.getLoading(true);
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  load(): void {
    this.verificationServices.getListAppraisalReview().subscribe(data => {
      this.checkLenghtResult = data.result;
      if (data.code === 200) {
        this.getListAppraisalProcess = data.result;
        this.dtTrigger.next(this.getListAppraisalProcess);
        this.getLoading(false);
      }
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  cariButton(listFasilitas: string, listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(2).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(3).search(listFasilitas).draw();
    $('#dataTables-example').DataTable().columns(5).search(listKategori).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
  }

  // ceklis semua
  // eslint-disable-next-line @typescript-eslint/member-ordering
  isChecked = false;
  checkuncheckall(): void {
    if (this.isChecked) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  // Get Chek data
  getProoduct(isSelected: any, appNoDe: any): void {
    const checked = isSelected.target.checked;
    // alert(checked)
    if (checked) {
      this.kirimDe.push(appNoDe);
    } else {
      const uncheckDE = this.kirimDe.findIndex((list: any) => list === appNoDe);
      this.kirimDe.splice(uncheckDE, 1);
    }
  }

  viewData(getAppNoDe: any): void {
    this.router.navigate(['/mapis'], { queryParams: { app_no_de: getAppNoDe } });
  }

  // post assign
  updateStatus(): void {
    // setTimeout(() => {
    if (this.kirimDe.length !== 0) {
      if (this.isChecked) {
        this.kirimDe;
        for (let i = 0; i < this.kirimDe.length; i++) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-de/update_status_analyst_paralel', {
              app_no_de: this.kirimDe[i],
              status_aplikasi: '3.0.0.2',
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
            })
            .subscribe({
              next() {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Data Sukses di Updated',
                }).then(() => {
                  window.location.reload();
                });
              },
              error() {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
                Toast.fire({
                  icon: 'error',
                  title: 'Data Gagal di Updated',
                });
              },
            });
          // if (this.kirimDe[this.kirimDe.length - 1] === this.kirimDe[i]) {
          //   alert('Data di Assign kepada ' + this.kirimAssign);
          // }
        }
      } else {
        for (let i = 0; i < this.checkLenghtResult.length; i++) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-de/update_status_analyst_paralel', {
              app_no_de: this.kirimDe[i],
              status_aplikasi: '3.0.0.2',
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
            })
            .subscribe({
              next() {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Data Sukses di Updated',
                }).then(() => {
                  window.location.reload();
                });
              },
              error() {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
                Toast.fire({
                  icon: 'error',
                  title: 'Data Gagal di Updated',
                });
              },
            });
          // if (this.checkLenghtResult[this.checkLenghtResult.length - 1] === this.checkLenghtResult[i]) {
          //   alert('Data di Assign kepada ' + this.kirimAssign);
          // }
        }
      }
    } else {
      alert('Harap Pilih Data Terlebih Dahulu');
    }
    // }, 1000);
  }
}
