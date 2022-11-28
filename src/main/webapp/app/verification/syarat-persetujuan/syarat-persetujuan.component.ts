import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { syaratPersetujuanModel } from '../service/config/syaratPersetujuanModel.model';
import Swal from 'sweetalert2';
import { cekUjiKepatuhan } from '../service/config/cekUjiKepatuhan.model';
import { areaOfConcern } from '../service/config/areaOfConcern.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { ServiceVerificationService } from '../service/service-verification.service';

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
  syaratAkad: syaratPersetujuanModel[] = new Array<syaratPersetujuanModel>();
  syaratCair: syaratPersetujuanModel[] = new Array<syaratPersetujuanModel>();
  syaratLainLain: syaratPersetujuanModel[] = new Array<syaratPersetujuanModel>();

  // Cek Uji Kepatuhan
  cekUjiKepatuhan: cekUjiKepatuhan[] = new Array<cekUjiKepatuhan>();
  // keterangan Uji Kepatuhan
  kepatuhanUji: any;
  keteranganUji: any;

  // Area Of Concern
  areaOfConcernModel: areaOfConcern = new areaOfConcern();
  areaOfConRadio: any;
  areaOfConInput: any;

  // simpan data
  simpanDataUpdate: any;
  // Role
  untukSessionRole: any;

  // Cek Result
  cekResult: any;

  // retrive Kepatuhan
  retKepatuhan: any;

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
    protected sessionStorageService: SessionStorageService,
    protected dataEntryService: DataEntryService,
    protected serviceVerificationService: ServiceVerificationService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.load();
  }

  load(): void {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // alert('DE '+ this.dataEntry?.status_perkawinan)
    });

    // ambil semua data Syarat Persetujuan
    this.serviceVerificationService.getfetchSyaratPersetujuan(this.app_no_de).subscribe(data => {
      // Syarat Persetujuan
      this.syaratPersetujuan = data.result.syarat;
      this.syaratPersetujuan?.forEach(element => {
        if (element.kode_syarat === '1') {
          this.syaratAkad.push(element);
        } else if (element.kode_syarat === '2') {
          this.syaratCair.push(element);
        } else if (element.kode_syarat === '3') {
          this.syaratLainLain.push(element);
        }
      });

      // Cek Uji Kepatuhan
      this.cekUjiKepatuhan = data.result.cek_uji_kepatuhan;

      // Area Of Concern
      this.areaOfConcernModel = data.result.area_of_concern;

      if (data.result.area_of_concern === null) {
        this.cekResult = 0;
      } else {
        this.cekResult = 1;
      }

      this.dtTrigger.next(data.result.syarat);
    });
  }

  // POST sYARAT aKAD
  async simpanSyaratAkad(): Promise<void> {
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
      Swal.fire('Berhasil Menambahkan Syarat', email);
      // alert(email)
      window.location.reload();
    }
  }

  // POST sYARAT Cair
  async simpanSyaratCair(): Promise<void> {
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
      Swal.fire('Berhasil Menambahkan Syarat', email);
      // alert(email)
      window.location.reload();
    }
  }

  // POST sYARAT Lain -Lain
  async simpanSyaratLain(): Promise<void> {
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
      Swal.fire('Berhasil Menambahkan Syarat', email);
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
  simpanData(): void {
    // Area Of Concern
    this.areaOfConRadio = (document.getElementById('area-concern') as HTMLInputElement).value;
    this.areaOfConInput = (document.getElementById('deskripsiAreaConcern') as HTMLInputElement).value;

    for (let i = 0; i < this.cekUjiKepatuhan.length; i++) {
      // get Radio Button Validasi
      const kepatuhanUjiCoba = (<HTMLInputElement>document.getElementById('kepatuhan' + this.cekUjiKepatuhan[i].id)).checked;
      if (kepatuhanUjiCoba === true) {
        this.kepatuhanUji = 1;
      } else {
        this.kepatuhanUji = 0;
      }
      // alert(this.kepatuhanUji)

      // get input Keterangan
      this.keteranganUji = (<HTMLInputElement>document.getElementById('keterangan' + this.cekUjiKepatuhan[i].id)).value;
      // alert(this.keteranganUji)

      // post Uji Kepatuhan Dan ASrea Of Concren
      if (this.cekResult === 0) {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_syarat_persetujuan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            curef: this.dataEntry.curef,
            // id: this.cekUjiKepatuhan[i].id,
            kegiatan: this.cekUjiKepatuhan[i].id,
            kepatuhan: this.kepatuhanUji,
            keterangan: this.keteranganUji,
          })
          .subscribe({});
      } else {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_cek_uji_kepatuhan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            curef: this.dataEntry.curef,
            kegiatan: this.cekUjiKepatuhan[i].id,
            kepatuhan: this.kepatuhanUji,
            keterangan: this.keteranganUji,
            deskripsi_area: this.areaOfConInput,
            status_area: this.areaOfConRadio,
          })
          .subscribe({});
      }
      if (this.cekResult === 0) {
        this.http
          .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_area_of_concern', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            created_date: '',
            curef: this.dataEntry.curef,
            deskripsi_area: this.areaOfConInput,
            status_area: this.areaOfConRadio,
          })
          .subscribe({});
      } else {
        // this.http
        //   .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_cek_uji_kepatuhan', {
        //     app_no_de: this.app_no_de,
        //     created_by: this.untukSessionUserName,
        //     curef: this.dataEntry.curef,
        //     kegiatan: this.cekUjiKepatuhan[i].id,
        //     kepatuhan: this.kepatuhanUji,
        //     keterangan: this.keteranganUji,
        //     deskripsi_area: this.areaOfConInput,
        //     status_area: this.areaOfConRadio,
        //   })
        //   .subscribe({});
      }
    }
    this.router.navigate(['/kesimpulan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
  goto(): void {
    this.router.navigate(['/kesimpulan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
