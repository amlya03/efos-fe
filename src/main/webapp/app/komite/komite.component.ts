/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { listPersetujuanKhususModel } from './services/config/listPersetujuanKhususModel.model';
import { refPersetujuanKhususModel } from './services/config/refPersetujuanKhususModel.model';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-komite',
  templateUrl: './komite.component.html',
  styleUrls: ['./komite.component.scss'],
})
export class KomiteComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  title = 'EFOS';
  modelListAgunan: daftarAplkasiKomiteModel[] = [];
  valueCariButton = '';
  kategori_pekerjaan = '';
  Kodefasilitas: getListFasilitasModel[] = [];
  kodeprogram: getProgramModel[] = [];
  refPersetujuanKhusus: refPersetujuanKhususModel[] = [];
  listPersetujuanKhusus: listPersetujuanKhususModel[] = [];
  roleAkun: any;

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
    private sessionStorageService: SessionStorageService,
    protected http: HttpClient
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.roleAkun = this.sessionStorageService.retrieve('sessionRole');
    this.load(this.roleAkun);
  }
  load(role: any): void {
    this.dataEntryService.getFetchKodeFasilitas().subscribe(data => {
      this.Kodefasilitas = data.result;
    });

    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////
    if (role === 'DIRBISNIS') {
      this.komiteService.getListAppDirbisnis().subscribe(data => {
        this.modelListAgunan = data.result;
        this.dtTrigger.next(this.modelListAgunan);
      });
    } else {
      this.komiteService.getDaftarAplikasiApproval().subscribe(data => {
        this.modelListAgunan = data.result;
        this.dtTrigger.next(this.modelListAgunan);
      });
    }
    // /////////////////////////langsung dari depan service hanhya untul url////////////////////////////

    // //////////////////////////////////////////////// Ref Persetujuan Khusus ///////////////////////////////////////////////////////////////////////
    this.komiteService.getRefPersetujuanKhusus().subscribe(data => {
      this.refPersetujuanKhusus = data.result;
    });
    // //////////////////////////////////////////////// Ref Persetujuan Khusus ///////////////////////////////////////////////////////////////////////
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cariButton(
    listProgram: string,
    listKategori: string,
    inputNamaNasabah: string,
    inputNoAplikasi: string
    // listFasilitas: string,
    // inputCabang: string
  ): void {
    $('#dataTables-example').DataTable().columns(1).search(inputNoAplikasi).draw();
    $('#dataTables-example').DataTable().columns(2).search(inputNamaNasabah).draw();
    $('#dataTables-example').DataTable().columns(3).search(listProgram).draw();
    $('#dataTables-example').DataTable().columns(5).search(listKategori).draw();
  }

  clearInput(): void {
    $('#dataTables-example').DataTable().search('').draw();
    setTimeout(() => {
      $('#dataTables-example').DataTable().columns().search('').draw();
    }, 50);
  }

  view(app_no_deView: string | undefined, curefView: string | undefined): void {
    this.komiteService.getListPersetujuanKhusus(app_no_deView).subscribe(data => {
      if (data.result == '') {
        for (let i = 0; i < this.refPersetujuanKhusus.length; i++) {
          this.http
            .post<any>(this.baseUrl + 'v1/efos-approval/create_persetujuan_khusus', {
              app_no_de: app_no_deView,
              created_by: this.sessionStorageService.retrieve('sessionUserName'),
              created_date: '',
              detail_persetujuan: '',
              id: 0,
              id_jenis_persetujuan: '',
              ketentuan: '',
              mitigasi_resiko: '',
              persetujuan: 0,
              usulan: '',
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/komite/detail-komite'], { queryParams: { app_no_de: app_no_deView, curef: curefView } });
              },
            });
        }
      } else {
        this.router.navigate(['/komite/detail-komite'], { queryParams: { app_no_de: app_no_deView, curef: curefView } });
      }
    });
  }
  // /////////////////////////Untuk Alert/////////////////////////////////////

  // /////////////////////////// Fasilitas ///////////////////////////////
  changeFasilitas(fasilitas: string): void {
    this.dataEntryService.getFetchProgramByKode(fasilitas).subscribe(data => {
      this.kodeprogram = data.result;
    });
  }
  // /////////////////////////// Fasilitas ///////////////////////////////

  // /////////////////////////// Program ///////////////////////////////
  validasiProgram(fasilitas: string): void {
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
