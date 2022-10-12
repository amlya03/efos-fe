import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { ServiceVerificationService } from '../service/service-verification.service';
import { daWuS } from './daWuS.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-update-status',
  templateUrl: './daftar-aplikasi-waiting-update-status.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-update-status.component.scss'],
})
export class DaftarAplikasiWaitingUpdateStatusComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  daWuS?: daWuS[];
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

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected daWusService: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal
  ) {}

  // ceklis semua
  isChecked = false;
  checkuncheckall() {
    if(this.isChecked == true){
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
    this.daWusService.getDaWuS().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWuS = data.result;
        this.dtTrigger.next(data.result);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    // alert('knfsdkds');
  }

  // serach datatable
  cariButton(listFasilitas: string, listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(2).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(3).search(listFasilitas).draw();
    $('#dataTables-example').DataTable().columns(5).search(listKategori).draw();
  }
  clearInput(): void {
    $('#dataTables-example').DataTable().columns().search('').draw();
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
    console.warn(this.kirimDe);
  }
  // update status
  postUpdateStatus(): void {
    this.kirimDe;
    for (let i = 0; i < this.kirimDe.length; i++) {
      // alert(this.kirimDe[i]);
      // alert(this.kirimStatusAplikasi[i])
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_tracking', {
          app_no_de: this.kirimDe[i],
          status_aplikasi: this.kirimStatusAplikasi[i],
          created_by: '199183174',
        })
        .subscribe({});
    }
    window.location.reload();
  }

  // Forward
  postForward(): void {
    this.kirimDe;
    for (let i = 0; i < this.kirimDe.length; i++) {
      // alert(this.kirimDe[i]);
      // alert(this.kirimStatusAplikasi[i]);
      // alert('created_by: 199183174 hardcode');
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_status_back_analis', {
          app_no_de: this.kirimDe[i],
          status_aplikasi: this.kirimStatusAplikasi[i],
          created_by: '199183174',
        })
        .subscribe({});
    }
    window.location.reload();
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
        alert(this.kirimDe);
        for (let i = 0; i < this.kirimDe.length; i++) {
          alert(this.kirimDe[i]);
          alert(this.kirimStatusAplikasi[i]);
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_reject', {
              app_no_de: this.kirimDe[i],
              status_aplikasi: this.kirimStatusAplikasi[i],
              created_by: '199183174',
            })
            .subscribe({});
        }
        Swal.fire('Data di Reject!', 'File Sudah Tidak Ada', 'success');
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'File disimpan', 'error');
      }
    });
  }
}
