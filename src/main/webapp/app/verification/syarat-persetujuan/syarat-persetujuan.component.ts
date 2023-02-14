/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { environment } from 'environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jhi-syarat-persetujuan',
  templateUrl: './syarat-persetujuan.component.html',
  styleUrls: ['./syarat-persetujuan.component.scss'],
})
export class SyaratPersetujuanComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  dataEntry: fetchAllDe = new fetchAllDe();
  app_no_de: any;
  untukSessionUserName: any;
  areaOfConForm!: FormGroup;

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
  bodyDeskripsiAreaOfconcern: any;
  areaOfConRadio: any;
  areaOfConInput: any;

  // simpan data
  simpanDataUpdate: any;
  // Role
  untukSessionRole: any;

  // Cek Result
  cekResult: any;
  cekUjiResult = 0;

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
    protected serviceVerificationService: ServiceVerificationService,
    private formBuilder: FormBuilder
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.load();

    this.areaOfConForm = this.formBuilder.group({
      area_of_concern: '',
    });
  }

  load(): void {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      if (data.result == null || data.result == '') {
        this.getLoading(false);
      } else {
        this.getLoading(false);
      }
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
      // console.warn(this.cekUjiKepatuhan.keterangan)
      if (this.cekUjiKepatuhan[0].app_no_de == null) {
        this.cekUjiResult = 0;
      } else {
        this.cekUjiResult = 1;
      }

      // Area Of Concern
      this.areaOfConcernModel = data.result.area_of_concern;

      const retriveForm = {
        area_of_concern: data.result.area_of_concern.status_area,
      };
      this.areaOfConForm.setValue(retriveForm);

      if (data.result.area_of_concern === null) {
        this.bodyDeskripsiAreaOfconcern = '';
        this.cekResult = 0;
      } else {
        this.bodyDeskripsiAreaOfconcern = data.result.area_of_concern.deskripsi_area;
        this.cekResult = 1;
      }

      this.dtTrigger.next(data.result.syarat);
    });
  }

  // POST sYARAT aKAD
  simpanSyaratAkad(): void {
    Swal.fire({
      title: 'Input Syarat Akad',
      html:
        '<br />' +
        '<div class="row form-material" style="width: 100%;"><div class="form-group row">' +
        '<label class="col-sm-4 col-form-label">Syarat</label>' +
        '<div class="col-sm-8"><input id="syarat" class="form-control"/>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-4 col-form-label">Keterangan</label>' +
        '<div class="col-sm-8"><select id="keterangan" class="form-control"><option value="">Pilih Keterangan</option><option value="Disyaratkan">Disyaratkan</option><option value="Tidak Disyaratkan">Tidak Disyaratkan</option></select>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // allowOutsideClick: false,
    }).then(() => {
      const syaratSyarat = $('#syarat').val();
      const keteranganSyarat = $('#keterangan').val();
      if (syaratSyarat == '') {
        alert('Mohon Isi Syarat');
        return;
      } else if (keteranganSyarat == '') {
        alert('Mohon Isi Keterangan');
        return;
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/create_syarat_persetujuan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            created_date: '',
            curef: this.dataEntry.curef,
            id: 0,
            keterangan: keteranganSyarat,
            kode_syarat: 1,
            syarat: syaratSyarat,
          })
          .subscribe({
            next() {
              window.location.reload();
            },
          });
      }
    });
  }

  // POST sYARAT Cair
  simpanSyaratCair(): void {
    Swal.fire({
      title: 'Input Syarat Cair',
      html:
        '<br />' +
        '<div class="row form-material" style="width: 100%;"><div class="form-group row">' +
        '<label class="col-sm-4 col-form-label">Syarat</label>' +
        '<div class="col-sm-8"><input id="syarat" class="form-control"/>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-4 col-form-label">Keterangan</label>' +
        '<div class="col-sm-8"><select id="keterangan" class="form-control"><option value="">Pilih Keterangan</option><option value="Disyaratkan">Disyaratkan</option><option value="Tidak Disyaratkan">Tidak Disyaratkan</option></select>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // allowOutsideClick: false,
    }).then(() => {
      const syaratSyaratLain = $('#syarat').val();
      const keteranganSyaratLain = $('#keterangan').val();
      if (syaratSyaratLain == '') {
        alert('Mohon Isi Syarat');
        return;
      } else if (keteranganSyaratLain == '') {
        alert('Mohon Isi Keterangan');
        return;
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/create_syarat_persetujuan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            created_date: '',
            curef: this.dataEntry.curef,
            id: 0,
            keterangan: keteranganSyaratLain,
            kode_syarat: 2,
            syarat: syaratSyaratLain,
          })
          .subscribe({
            next() {
              window.location.reload();
            },
          });
      }
    });
  }

  // POST sYARAT Lain -Lain
  simpanSyaratLain(): void {
    Swal.fire({
      title: 'Input Syarat Akad Lain - lain',
      html:
        '<br />' +
        '<div class="row form-material" style="width: 100%;"><div class="form-group row">' +
        '<label class="col-sm-4 col-form-label">Syarat</label>' +
        '<div class="col-sm-8"><input id="syarat" class="form-control"/>' +
        '</div></div><p></p>' +
        '<div class="form-group row"><label class="col-sm-4 col-form-label">Keterangan</label>' +
        '<div class="col-sm-8"><select id="keterangan" class="form-control"><option value="">Pilih Keterangan</option><option value="Disyaratkan">Disyaratkan</option><option value="Tidak Disyaratkan">Tidak Disyaratkan</option></select>' +
        '</div></div>' +
        '<div>',
      focusConfirm: false,
      // allowOutsideClick: false,
    }).then(() => {
      const syaratValue = $('#syarat').val();
      const keteranganValue = $('#keterangan').val();
      if (syaratValue == '') {
        alert('Mohon Isi Syarat');
        return;
      } else if (keteranganValue == '') {
        alert('Mohon Isi Keterangan');
        return;
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/create_syarat_persetujuan', {
            app_no_de: this.app_no_de,
            created_by: this.untukSessionUserName,
            created_date: '',
            curef: this.dataEntry.curef,
            id: 0,
            keterangan: keteranganValue,
            kode_syarat: 3,
            syarat: syaratValue,
          })
          .subscribe({
            next() {
              window.location.reload();
            },
          });
      }
    });
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
      this.keteranganUji = (<HTMLInputElement>document.getElementById('keterangan' + (i + 1))).value;
      // alert(this.keteranganUji)

      // post Uji Kepatuhan Dan ASrea Of Concren
      if (this.cekUjiResult == 0) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/create_cek_uji_kepatuhan', {
            app_no_de: this.app_no_de,
            created_by: this.sessionStorageService.retrieve('sessionUserName'),
            created_date: '',
            curef: this.dataEntry.curef,
            kegiatan: this.cekUjiKepatuhan[i].id,
            kepatuhan: this.kepatuhanUji,
            keterangan: this.keteranganUji,
          })
          .subscribe({});
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/update_cek_uji_kepatuhan', {
            app_no_de: this.app_no_de,
            updated_by: this.sessionStorageService.retrieve('sessionUserName'),
            updated_date: '',
            curef: this.dataEntry.curef,
            kegiatan: this.cekUjiKepatuhan[i].id,
            kepatuhan: this.kepatuhanUji,
            keterangan: this.keteranganUji,
          })
          .subscribe({});
      }
    }

    // Area Of Concern
    if (this.cekResult === 0) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/create_area_of_concern', {
          app_no_de: this.app_no_de,
          created_by: this.sessionStorageService.retrieve('sessionUserName'),
          created_date: '',
          curef: this.dataEntry.curef,
          deskripsi_area: this.areaOfConInput,
          status_area: this.areaOfConForm.get('area_of_concern')?.value,
        })
        .subscribe({});
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/update_area_of_concern', {
          app_no_de: this.app_no_de,
          updated_by: this.sessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
          curef: this.dataEntry.curef,
          deskripsi_area: this.areaOfConInput,
          status_area: this.areaOfConForm.get('area_of_concern')?.value,
        })
        .subscribe({});
    }
    this.router.navigate(['/kesimpulan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
  goto(): void {
    this.router.navigate(['/kesimpulan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
