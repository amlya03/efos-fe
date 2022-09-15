import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DaftarAplikasiOnProcessService, EntityArrayResponseDaOp } from '../service/daftar-aplikasi-on-process.service';
import { daOp } from './daOp.model';
declare let $: any;
@Component({
  selector: 'jhi-daftar-aplikasi-on-process',
  templateUrl: './daftar-aplikasi-on-process.component.html',
  styleUrls: ['./daftar-aplikasi-on-process.component.scss'],
})
export class DaftarAplikasiOnProcessComponent implements OnInit {
  title = 'EFOS';
  daOp?: daOp[];
  onResponseSuccess: any;
  valueFasilitas = '';
  valueKategori = '';
  valueNamaNasabah = '';
  valueNoAplikasi = '';
  valueCariButton = '';
  kategori_pekerjaan = '';
  kirimDe: Array<number> = [];

  constructor(
    protected daOpService: DaftarAplikasiOnProcessService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.load();
  }
  load(): void {
    this.daOpService.getDaOp().subscribe({
      next: (res: EntityArrayResponseDaOp) => {
        // console.log(res.body?.result);
        // console.warn('tabel', res);
        this.daOp = res.body?.result;
        this.onResponseSuccess(res);
      },
    });
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
}
