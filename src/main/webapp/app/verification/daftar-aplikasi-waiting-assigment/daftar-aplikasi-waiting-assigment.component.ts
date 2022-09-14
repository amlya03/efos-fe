import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DaftarAplikasiWaitingAssigmentService, EntityArrayResponseDaWa } from '../service/daftar-aplikasi-waiting-assigment.service';
import { daWaModel } from './daWa.model';
import { daWaModelAprisal } from './daWaAprisal.model';

@Component({
  selector: 'jhi-daftar-aplikasi-waiting-assigment',
  templateUrl: './daftar-aplikasi-waiting-assigment.component.html',
  styleUrls: ['./daftar-aplikasi-waiting-assigment.component.scss'],
})
export class DaftarAplikasiWaitingAssigmentComponent implements OnInit, OnDestroy {
  title = 'EFOS';
  numbers: Array<number> = [];
  dtOptions: DataTables.Settings = {};
  daWa?: daWaModel[];
  daWaAprisal?: daWaModelAprisal[];
  dtTrigger: Subject<any> = new Subject<any>();
  onResponseSuccess: any;
  filterTerm!: string;
  p = 1;
  total = 0;
  valueFasilitas = '';
  valueKategori = '';
  valueNamaNasabah = '';
  valueNoAplikasi = '';
  valueCariButton = '';
  ceklis = [];
  isMasterSel = false;
  categoryList: any;
  checkedCategoryList: any;
  buatCheck = false;

  constructor(
    protected daWaService: DaftarAplikasiWaitingAssigmentService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {
    this.isMasterSel = false;
    this.categoryList = [
      { id: 1, value: 'PHP', isSelected: false },
      { id: 2, value: 'Laravel', isSelected: false },
      { id: 3, value: 'Angular', isSelected: true },
      { id: 4, value: 'React', isSelected: true },
      { id: 5, value: 'Vue', isSelected: true },
      { id: 6, value: 'JQuery', isSelected: false },
      { id: 7, value: 'Javascript', isSelected: false },
    ];
    this.getCheckedItemList();
  }

  checkUncheckAll(): void {
    for (let i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].isSelected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected(): void {
    this.isMasterSel = this.categoryList.every(function (item: any) {
      return (item.isSelected = true);
    });
    this.getCheckedItemList();
  }

  getCheckedItemList(): void {
    this.checkedCategoryList = [];
    for (let i = 0; i < this.categoryList.length; i++) {
      if (this.categoryList[i].isSelected) {
        this.checkedCategoryList.push(this.categoryList[i]);
      }
    }
    this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  }

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.daWaService.getDaWa(this.p).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res);
        this.daWa = res.body?.result;
        this.ceklis = res.body?.result;
        this.onResponseSuccess(res);
      },
    });

    this.daWaService.getDaWaAprisal().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('Aprisal', res);
        this.daWaAprisal = res.body?.result;
        this.onResponseSuccess(res);
      },
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cariButton(listFasilitas: string, listKategori: string, inputNamaNasabah: string, inputNoAplikasi: string): void {
    // alert('sedang dicoba');
    this.valueFasilitas = listFasilitas;
    this.valueKategori = listKategori;
    this.valueNamaNasabah = inputNamaNasabah;
    this.valueNoAplikasi = inputNoAplikasi;
    // alert('Fasilitas '+this.valueFasilitas)
    // alert('Kategori  '+this.valueKategori)
    // alert('Nama  ' +this.valueCariButton)
    // alert('aplikasi   '+this.valueNoAplikasi)
    this.filterTerm = inputNamaNasabah;
  }
  clearInput(): void {
    this.valueFasilitas = '';
    this.valueKategori = '';
    this.valueNamaNasabah = '';
    this.valueNoAplikasi = '';
  }

  pageChangeEvent(event: number): void {
    this.p = event;
    this.load();
  }

  pilihSemuaCheck(): void {
    alert('Pilih Semua Check!');
    this.buatCheck = true;
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
