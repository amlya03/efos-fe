import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {
  DaftarAplikasiWaitingUpdateStatusService,
  EntityArrayResponseDaWuS,
} from '../service/daftar-aplikasi-waiting-update-status.service';
import { daWuS } from './daWuS.model';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-update-status',
  templateUrl: './daftar-aplikasi-waiting-update-status.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-update-status.component.scss'],
})
export class DaftarAplikasiWaitingUpdateStatusComponent implements OnInit {
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

  constructor(
    protected daWusService: DaftarAplikasiWaitingUpdateStatusService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected http: HttpClient,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.daWusService.getDaWuS().subscribe({
      next: (res: EntityArrayResponseDaWuS) => {
        // console.log(res.body?.result);
        // console.warn('tabel', res);
        this.daWuS = res.body?.result;
        this.onResponseSuccess(res);
      },
    });
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
  getProoduct(isSelected: any, product: any, statusAplikasi: any): void {
    const checked = isSelected.target.checked;
    if (checked) {
      this.kirimDe.push(product);
      this.kirimStatusAplikasi.push(statusAplikasi);
    } else {
      const index = this.kirimDe.findIndex(list => list === product);
      this.kirimDe.splice(index, 1);
      alert(statusAplikasi);
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
        .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_status_tracking', {
          app_no_de: this.kirimDe[i],
          status_aplikasi: this.kirimStatusAplikasi[i],
          created_by: '199183174',
        })
        .subscribe({});
    }
  }

  // Forward
  postForward(): void {
    this.kirimDe;
    for (let i = 0; i < this.kirimDe.length; i++) {
      alert(this.kirimDe[i]);
      alert(this.kirimStatusAplikasi[i]);
      alert('created_by: 199183174 hardcode');
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/update_status_back_analis', {
          app_no_de: this.kirimDe[i],
          status_aplikasi: this.kirimStatusAplikasi[i],
          created_by: '199183174',
        })
        .subscribe({});
    }
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
            .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_status_reject', {
              app_no_de: this.kirimDe[i],
              status_aplikasi: this.kirimStatusAplikasi[i],
              created_by: '199183174',
            })
            .subscribe({});
        }
        Swal.fire('Data di Reject!', 'File Sudah Tidak Ada', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'File disimpan', 'error');
      }
    });
  }
}
