import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DaftarAplikasiWaitingAssigmentService, EntityArrayResponseDaWa } from '../service/daftar-aplikasi-waiting-assigment.service';
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
  daWa?: daWaModel[];
  daWaAprisal?: daWaModelAprisal[];
  onResponseSuccess: any;
  valueFasilitas = '';
  valueKategori = '';
  valueNamaNasabah = '';
  valueNoAplikasi = '';
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: Array<number> = [];

  constructor(
    protected daWaService: DaftarAplikasiWaitingAssigmentService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.daWaService.getDaWa().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        // console.warn('tabel', res);
        this.daWa = res.body?.result;
        this.onResponseSuccess(res);
      },
    });

    this.daWaService.getDaWaAprisal().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        // console.warn('Aprisal', res);
        this.daWaAprisal = res.body?.result;
        this.onResponseSuccess(res);
      },
    });
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
    alert('knfsdkds');
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

  pilihSemuaCheck(): void {
    alert('Pilih Semua Check!');
  }

  getProoduct(isSelected: any, product: any, id: any): void {
    const checked = isSelected.target.checked;
    if (checked) {
      this.kirimDe.push(product);
    } else {
      const index = this.kirimDe.findIndex(list => list === product);
      this.kirimDe.splice(index, 1);
      console.warn(id);
    }
    console.warn(this.kirimDe);
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
