import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { getListFasilitasModel } from 'app/data-entry/services/config/getListFasilitasModel.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ServiceVerificationService } from '../service/service-verification.service';
import { daWaModel } from './daWa.model';
import { daWaModelAprisal } from './daWaAprisal.model';
declare let $: any;

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-assigment',
  templateUrl: './daftar-aplikasi-waiting-assigment.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-assigment.component.scss'],
})
export class DaftarAplikasiWaitingAssigmentComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  numbers: Array<number> = [];
  daWa?: daWaModel[] = [];
  listFasilitas: getListFasilitasModel[] = [];
  daWaAprisal?: daWaModelAprisal[];
  onResponseSuccess: any;
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: Array<number> = [];
  kirimStatusAplikasi: Array<number> = [];
  kirimAssign: any;

  // checklist dawa
  checkLenghtResult: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected daWaService: ServiceVerificationService,
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
  }
  load(): void {
    // ///////////////////////// LIst Cari Fasilitas //////////////////////
    this.dataEntryServices.getFetchKodeFasilitas().subscribe(data => {
      this.listFasilitas = data.result;
    });
    // ///////////////////////// LIst Cari Fasilitas //////////////////////

    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    this.daWaService.getDaWa().subscribe(data => {
      this.checkLenghtResult = data.result;
      if (data.code === 200) {
        this.daWa = data.result;
        this.dtTrigger.next(this.daWa);
      }
    });
    // ////////Aprisal/////
    this.daWaService.getDaWaAprisal().subscribe(data => {
      // console.warn('aprisal', data);
      if (data.code === 200) {
        this.daWaAprisal = data.result;
      }
    });
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
  }

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
    $('#dataTables-example').DataTable().columns().search('').draw();
  }

  // ceklis semua
  isChecked = false;
  checkuncheckall() {
    if (this.isChecked === true) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  getProoduct(isSelected: any, appNoDe: any, statusAplikasi: any): void {
    const checked = isSelected.target.checked;
    if (checked) {
      this.kirimDe.push(appNoDe);
      this.kirimStatusAplikasi.push(statusAplikasi);
    } else {
      const index = this.kirimDe.findIndex(list => list === appNoDe);
      this.kirimDe.splice(index, 1);
    }
    // console.warn(this.kirimStatusAplikasi);
    // console.warn(this.kirimDe);
  }

  // post assign
  postAssign(): void {
    if (this.isChecked === false) {
      this.kirimDe;
      for (let i = 0; i < this.kirimDe.length; i++) {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/verif_assignment', {
            analis_verifikasi: this.kirimAssign,
            app_no_de: this.kirimDe[i],
            status_aplikasi: this.kirimStatusAplikasi[i],
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
          })
          .subscribe({
            next: data => {},
          });
      }
    } else {
      for (let i = 0; i < this.checkLenghtResult.length; i++) {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/verif_assignment', {
            analis_verifikasi: this.kirimAssign,
            app_no_de: this.checkLenghtResult[i].app_no_de,
            status_aplikasi: this.checkLenghtResult[i].status_aplikasi,
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
          })
          .subscribe({
            next: data => {},
          });
      }
    }
    setTimeout(() => {
      // alert(this.kirimDe.length == 0)
      if (this.kirimDe.length == 0) {
        alert('Harap Pilih Data Terlebih Dahulu');
      } else {
        window.location.reload();
      }
    }, 1000);

    this.dtElement.dtInstance.then((dtIntance: DataTables.Api) => {
      dtIntance.destroy();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        responsive: true,
      };
      this.dtTrigger.next(this.daWa);
    });
  }

  viewdataentry(getCuref: any, getStatus: any, getAppNoDe: any): void {
    this.router.navigate(['/data-entry/personalinfo'], {
      queryParams: { curef: getCuref, statusPerkawinan: getStatus, app_no_de: getAppNoDe },
    });
    // this.router.navigate(['/data-entry/personalinfo'], { queryParams: { app_no_de: getAppNoDe } });
  }
  // /////////////////////////Untuk Alert/////////////////////////////////////

  simpleAlert(): void {
    Swal.fire('Hello world!');
  }
  dropdownAlert(): void {
    Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        apples: 'Apples',
        bananas: 'Bananas',
        grapes: 'Grapes',
        oranges: 'Oranges',
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
    });
  }
  alertWithSuccess(): void {
    Swal.fire('Makasiiii...', 'Berhasil jugaaa', 'success');
  }

  confirmBox(): void {
    Swal.fire({
      title: 'Mau dihapusss?',
      text: 'File akan hilang',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Tidak, Simpan ini',
    }).then(result => {
      if (result.value) {
        Swal.fire('Terhapus!', 'File Sudah Tidak Ada', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'File disimpan', 'error');
      }
    });
  }
}
