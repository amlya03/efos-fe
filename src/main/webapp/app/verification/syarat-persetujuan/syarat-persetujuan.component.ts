import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject } from 'rxjs';
import { syaratPersetujuanModel } from '../service/config/syaratPersetujuanModel.model';
import Swal from 'sweetalert2';
import { cekUjiKepatuhan } from '../service/config/cekUjiKepatuhan.model';
import { areaOfConcern } from '../service/config/areaOfConcern.model';

@Component({
  selector: 'jhi-syarat-persetujuan',
  templateUrl: './syarat-persetujuan.component.html',
  styleUrls: ['./syarat-persetujuan.component.scss'],
})
export class SyaratPersetujuanComponent implements OnInit {
  dataEntry: fetchAllDe = new fetchAllDe();
  app_no_de: any;
  untukSessionUserName: any;

  // Syarat Persetujuan
  syaratPersetujuan?: syaratPersetujuanModel[];
  syaratAkad: Array<syaratPersetujuanModel> = new Array<syaratPersetujuanModel>();
  syaratCair: Array<syaratPersetujuanModel> = new Array<syaratPersetujuanModel>();
  syaratLainLain: Array<syaratPersetujuanModel> = new Array<syaratPersetujuanModel>();

  // Cek Uji Kepatuhan
  cekUjiKepatuhan: Array<cekUjiKepatuhan> = new Array<cekUjiKepatuhan>();
  // keterangan Uji Kepatuhan
  kepatuhanUji: any;
  keteranganUji: any;

  // Area Of Concern
  areaOfConcernModel: areaOfConcern = new areaOfConcern();
  areaOfConRadio: any;
  areaOfConInput: any;

  // simpan data
  simpanDataUpdate: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  curef: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected localStorageService: LocalStorageService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }
  // URL DE
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  // URL List Syarat Persetujuan
  protected fetchSyaratPersetujuan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/getSyaratPersetujuan?sd='
  );

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.untukSessionUserName = this.localStorageService.retrieve('sessionUserName');
    this.load();
  }

  // DE
  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  // Syarat Persetujuan
  getfetchSyaratPersetujuan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSyaratPersetujuan + this.app_no_de);
  }

  load(): void {
    // ambil semua data DE
    this.getFetchSemuaData().subscribe(data => {
      this.dataEntry = data.result;
      // alert('DE '+ this.dataEntry?.status_perkawinan)
    });

    // ambil semua data Syarat Persetujuan
    this.getfetchSyaratPersetujuan().subscribe(data => {
      // Syarat Persetujuan
      this.syaratPersetujuan = data.result.syarat;
      this.syaratPersetujuan?.forEach(element => {
        if (element.kode_syarat == 1) {
          this.syaratAkad.push(element);
        } else if (element.kode_syarat == 2) {
          this.syaratCair.push(element);
        } else if (element.kode_syarat == 3) {
          this.syaratLainLain.push(element);
        }
      });

      //Cek Uji Kepatuhan
      this.cekUjiKepatuhan = data.result.cek_uji_kepatuhan;
      // this.cekUjiKepatuhan?.forEach(element => {
      //     console.log(element.keterangan)
      // });

      //Area Of Concern
      this.areaOfConcernModel = data.result.area_of_concern;
      // console.log("area "+ (this.areaOfConcernModel.deskripsi_area))

      this.dtTrigger.next(data.result.syarat);
      // console.log(this.syaratAkad)
    });
  }

  // POST sYARAT aKAD
  async simpanSyaratAkad() {
    const { value: email } = await Swal.fire({
      title: 'Input Syarat Akad',
      input: 'text',
      confirmButtonText: `Simpan`,
      inputPlaceholder: 'Input Syarat',
    });
    if (email) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_syarat_persetujuan', {
          app_no_de: this.app_no_de,
          created_by: this.untukSessionUserName,
          created_date: '',
          curef: this.dataEntry.curef,
          id: 0,
          keterangan: '',
          kode_syarat: 1,
          syarat: email,
        })
        .subscribe({});
      // Swal.fire(`Entered email: ${akadValue}`);
      Swal.fire(`Berhasil Menambahkan Syarat ${email}`);
      // alert(email)
      window.location.reload();
    }
  }

  // POST sYARAT Cair
  async simpanSyaratCair() {
    const { value: email } = await Swal.fire({
      title: 'Input Syarat Cair',
      input: 'text',
      confirmButtonText: `Simpan`,
      inputPlaceholder: 'Input Syarat',
    });
    if (email) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_syarat_persetujuan', {
          app_no_de: this.app_no_de,
          created_by: this.untukSessionUserName,
          created_date: '',
          curef: this.dataEntry.curef,
          id: 0,
          keterangan: '',
          kode_syarat: 2,
          syarat: email,
        })
        .subscribe({});
      // Swal.fire(`Entered email: ${akadValue}`);
      Swal.fire(`Berhasil Menambahkan Syarat ${email}`);
      // alert(email)
      window.location.reload();
    }
  }

  // POST sYARAT Lain -Lain
  async simpanSyaratLain() {
    const { value: email } = await Swal.fire({
      title: 'Input Syarat Lain - lain',
      input: 'text',
      confirmButtonText: `Simpan`,
      inputPlaceholder: 'Input Syarat',
    });
    if (email) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_syarat_persetujuan', {
          app_no_de: this.app_no_de,
          created_by: this.untukSessionUserName,
          created_date: '',
          curef: this.dataEntry.curef,
          id: 0,
          keterangan: '',
          kode_syarat: 3,
          syarat: email,
        })
        .subscribe({});
      // Swal.fire(`Entered email: ${akadValue}`);
      Swal.fire(`Berhasil Menambahkan Syarat ${email}`);
      // alert(email)
      window.location.reload();
    }
  }

  // async confirmBox(): Promise<void> {
  // Swal.fire({
  //   title: 'Do you want to save the changes?',
  //   showDenyButton: true,  showCancelButton: true,
  //   confirmButtonText: `Save`,
  //   denyButtonText: `Don't save`,
  // }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       Swal.fire('Saved!', '', 'success')
  //     } else if (result.isDenied) {
  //       Swal.fire('Changes are not saved', '', 'info')
  //    }
  // });

  // simpan data Syarat PErsetujuan
  simpanData() {
    // Area Of Concern
    this.areaOfConRadio = (<HTMLInputElement>document.getElementById('area-concern')).value;
    this.areaOfConInput = (<HTMLInputElement>document.getElementById('deskripsiAreaConcern')).value;

    for (let i = 0; i < this.cekUjiKepatuhan.length; i++) {
      // get Radio Button Validasi
      let kepatuhanUjiCoba = (<HTMLInputElement>document.getElementById('kepatuhan' + this.cekUjiKepatuhan[i].id)).checked;
      if (kepatuhanUjiCoba == true) {
        this.kepatuhanUji = 1;
      } else {
        this.kepatuhanUji = 0;
      }
      // alert(this.kepatuhanUji)

      // get input Keterangan
      this.keteranganUji = (<HTMLInputElement>document.getElementById('keterangan' + this.cekUjiKepatuhan[i].id)).value;
      // alert(this.keteranganUji)

      // post Uji Kepatuhan Dan ASrea Of Concren
      if (this.areaOfConcernModel == null) {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_cek_uji_kepatuhan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            created_date: '',
            curef: this.dataEntry.curef,
            id: this.cekUjiKepatuhan[i].id,
            kegiatan: this.cekUjiKepatuhan[i].id,
            kepatuhan: this.kepatuhanUji,
            keterangan: this.keteranganUji,
            deskripsi_area: this.areaOfConInput,
            status_area: this.areaOfConRadio,
          })
          .subscribe({});
      } else {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_uji_cek_kepatuhan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            created_date: '',
            curef: this.dataEntry.curef,
            kegiatan: this.cekUjiKepatuhan[i].id,
            kepatuhan: this.kepatuhanUji,
            keterangan: this.keteranganUji,
            deskripsi_area: this.areaOfConInput,
            status_area: this.areaOfConRadio,
          })
          .subscribe({});
      }
    }
    this.router.navigate(['/kesimpulan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
