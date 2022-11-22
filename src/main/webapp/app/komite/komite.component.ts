import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataEntryService } from '../data-entry/services/data-entry.service';
import { getListFasilitasModel } from '../data-entry/services/config/getListFasilitasModel.model';
import { getProgramModel } from '../data-entry/services/config/getProgramModel.model';
import { KomiteService } from './services/komite.service';
import { daftarAplkasiKomiteModel } from './services/config/daftarAplikasiKomiteModel.model';

@Component({
  selector: 'jhi-komite',
  templateUrl: './komite.component.html',
  styleUrls: ['./komite.component.scss'],
})
export class KomiteComponent implements OnInit {
  title = 'EFOS';
  modelListAgunan: daftarAplkasiKomiteModel[] = [];
  valueCariButton = '';
  kategori_pekerjaan = '';
  Kodefasilitas: getListFasilitasModel[] = [];
  kodeprogram: getProgramModel[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected dataEntryService: DataEntryService,
    protected komiteService: KomiteService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient
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
    this.dataEntryService.getFetchKodeFasilitas().subscribe(data => {
      this.Kodefasilitas = data.result;
    });

    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    this.komiteService.getDaftarAplikasiApproval().subscribe(data => {
      this.modelListAgunan = data.result;
      this.dtTrigger.next(this.modelListAgunan);
    });
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cariButton(
    listProgram: string,
    listKategori: string,
    inputNamaNasabah: string,
    inputNoAplikasi: string,
    listFasilitas: string,
    inputCabang: string
  ): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(2).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(3).search(listProgram).draw();
    $('#dataTables-example').DataTable().columns(5).search(listKategori).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().columns().search('').draw();
  }

  view(app_no_de: string | undefined, curef: string | undefined): void {
    this.router.navigate(['/komite/detail-komite'], { queryParams: { app_no_de: app_no_de, curef: curef } });
  }
  // /////////////////////////Untuk Alert/////////////////////////////////////

  // /////////////////////////// Fasilitas ///////////////////////////////
  changeFasilitas(fasilitas: string) {
    this.dataEntryService.getFetchProgramByKode(fasilitas).subscribe(data => {
      this.kodeprogram = data.result;
    });
  }
  // /////////////////////////// Fasilitas ///////////////////////////////

  // /////////////////////////// Program ///////////////////////////////
  validasiProgram(fasilitas: string) {
    if (fasilitas == '') {
      alert('Harap Pilih Fasilitasnya Terlebih Dahulu');
    }
  }
  // /////////////////////////// Program ///////////////////////////////

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
