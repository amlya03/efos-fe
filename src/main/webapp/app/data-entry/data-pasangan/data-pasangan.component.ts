import { Component, Input, OnInit } from '@angular/core';
import { createRequestOption } from 'app/core/request/request-util';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { datapasangamodel } from './data-pasangan-model';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { environment } from 'environments/environment';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';

export type EntityResponseDaWa = HttpResponse<datapasangamodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-data-pasangan',
  templateUrl: './data-pasangan.component.html',
  styleUrls: ['./data-pasangan.component.scss'],
})
export class DataPasanganComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  dataPasanganForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  datakiriman: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  app_no_de: any;
  curef: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  kirimanstatusktp: any;
  untukktp: any;
  untukSessionRole: any;
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;
  retriveKodeProvinsi: any;
  retriveKodeKota: any;
  retriveKodeKecamatan: any;
  retriveKodeKelurahan: any;
  pendidikanModel: refJenisPekerjaan[] = [];

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
      this.curef = params['curef'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();
    this.getLoading(true);
    this.dataPasanganForm = this.formBuilder.group({
      nama_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      jenis_kelamin_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      alamat_ktp_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      provinsi_pasangan: {
        value: '' || null,
        disabled: true,
      },
      kabkota_pasangan: { value: '' || null, disabled: true },
      kecamatan_pasangan: {
        value: '' || null,
        disabled: true,
      },
      kelurahan_pasangan: {
        value: '' || null,
        disabled: true,
      },
      kode_pos_pasangan: {
        value: '' || null,
        disabled: true,
      },
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      rt_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      rw_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      kewarganegaraan_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      pendidikan_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      email_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_handphone_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      no_ktp_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      tanggal_terbit_ktp_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      status_ktp_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      tanggal_exp_ktp_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      npwp_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      tanggal_lahir_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
      usia_pasangan: [{ value: '' || null, disabled: true }, Validators.required],
    });
  }

  load() {
    setTimeout(() => {
      this.datEntryService.getListPendidikan().subscribe({
        next: data => {
          this.pendidikanModel = data.result;
        },
      });
    }, 10);

    this.datEntryService.getprovinsi().subscribe(res => {
      this.daWaprof = res.result;
    });

    this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      this.retriveprovinsi = data.result.provinsi_pasangan;
      this.retrivekabkota = data.result.kabkota_pasangan;
      this.retrivekecamatan = data.result.kecamatan_pasangan;
      this.retrivekelurahan = data.result.kelurahan_pasangan;

      let retriveDataPasangan = {
        tanggal_lahir_pasangan: this.dataEntry.tanggal_lahir_pasangan,
        usia_pasangan: this.dataEntry.usia_pasangan,
        nama_pasangan: this.dataEntry.nama_pasangan,
        jenis_kelamin_pasangan: this.dataEntry.jenis_kelamin_pasangan,
        alamat_ktp_pasangan: this.dataEntry.alamat_ktp_pasangan,
        // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        provinsi_pasangan: '',
        kabkota_pasangan: '',
        kecamatan_pasangan: '',
        kelurahan_pasangan: '',
        kode_pos_pasangan: this.dataEntry.kode_pos_pasangan,
        // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        rt_pasangan: this.dataEntry.rt_pasangan,
        rw_pasangan: this.dataEntry.rw_pasangan,
        kewarganegaraan_pasangan: this.dataEntry.kewarganegaraan_pasangan,
        pendidikan_pasangan: this.dataEntry.pendidikan_pasangan,
        email_pasangan: this.dataEntry.email_pasangan,
        no_handphone_pasangan: this.dataEntry.no_handphone_pasangan,
        no_ktp_pasangan: this.dataEntry.no_ktp_pasangan,
        tanggal_terbit_ktp_pasangan: this.dataEntry.tanggal_terbit_ktp_pasangan,
        status_ktp_pasangan: this.dataEntry.status_ktp_pasangan,
        tanggal_exp_ktp_pasangan: this.dataEntry.tanggal_exp_ktp_pasangan,
        npwp_pasangan: this.dataEntry.npwp_pasangan,
      };
      this.dataPasanganForm.setValue(retriveDataPasangan);

      setTimeout(() => {
        this.hitungUsia(this.dataEntry.tanggal_lahir_pasangan);
        this.carimenggunakankodepos(this.dataEntry.kode_pos_pasangan);
        this.getLoading(false);
      }, 300);
    });
  }

  hitungUsia(tgl: any) {
    const getValueTanggal = +new Date(tgl);
    //////////////////////////// ini buat dapet bulan ////////////////////////////
    const getTahun = +~~((Date.now() - getValueTanggal) / 31557600000);
    this.dataPasanganForm.get('usia_pasangan')?.setValue(getTahun);
  }

  onChange(value: any) {
    const valuenya = value.split('|');
    this.datEntryService.getkabkota(valuenya[0]).subscribe(res => {
      this.daWakota = res.result;
      this.dataPasanganForm.get('kabkota_pasangan')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any) {
    const valuenya = value.split('|');
    this.datEntryService.getkecamatan(valuenya[0]).subscribe(res => {
      this.kecamatan = res.result;
      this.dataPasanganForm.get('kecamatan_pasangan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any) {
    const valuenya = value.split('|');
    this.datEntryService.getkelurahan(valuenya[0]).subscribe(res => {
      this.kelurahan = res.result;
      this.dataPasanganForm.get('kelurahan_pasangan')?.setValue(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.dataPasanganForm.get('kode_pos_pasangan')?.setValue(this.daWakodepos);
  }

  goto(contohtampungancuref: any) {
    this.SessionStorageService.store('dataPas', 1);
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    // alert(this.app_no_de);
    // alert(this.curef);
    this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }

  updatedatapasngan() {
    const provinsi_pasangan = document.getElementById('provinsi_pasangan') as HTMLInputElement | any;
    const kabkota_pasangan = document.getElementById('kabkota_pasangan') as HTMLInputElement | any;
    const kecamatan_pasangan = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    const kelurahan_pasangan = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    const kode_pos_pasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;

    const kirimanpro = this.dataPasanganForm.get('provinsi_pasangan')?.value.split('|');
    const kirimankabkota = this.dataPasanganForm.get('kabkota_pasangan')?.value.split('|');
    const kirimankec = this.dataPasanganForm.get('kecamatan_pasangan')?.value.split('|');
    const kirimankel = this.dataPasanganForm.get('kelurahan_pasangan')?.value.split('|');

    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/update_pasangan', {
        id: this.dataEntry.id_customer,
        app_no_ide: this.dataEntry.app_no_ide,
        kategori_pekerjaan: this.dataEntry.kategori_pekerjaan,
        nama_pasangan: this.dataPasanganForm.get('nama_pasangan')?.value,
        alamat_ktp_pasangan: this.dataPasanganForm.get('alamat_ktp_pasangan')?.value,
        jenis_kelamin_pasangan: this.dataPasanganForm.get('jenis_kelamin_pasangan')?.value,
        updated_by: this.SessionStorageService.retrieve('sessionUserName'),
        curef: this.dataEntry.curef,
        email_pasangan: this.dataPasanganForm.get('email_pasangan')?.value,
        npwp_pasangan: this.dataPasanganForm.get('npwp_pasangan')?.value,
        provinsi_pasangan: kirimanpro[1],
        kabkota_pasangan: kirimankabkota[1],
        kecamatan_pasangan: kirimankec[1],
        kelurahan_pasangan: kirimankel[1],
        kewarganegaraan_pasangan: this.dataPasanganForm.get('kewarganegaraan_pasangan')?.value,
        kode_pos_pasangan: this.dataPasanganForm.get('kode_pos_pasangan')?.value,
        no_handphone_pasangan: this.dataPasanganForm.get('no_handphone_pasangan')?.value,
        no_ktp_pasangan: this.dataPasanganForm.get('no_ktp_pasangan')?.value,
        pendidikan_pasangan: this.dataPasanganForm.get('pendidikan_pasangan')?.value,
        rt_pasangan: this.dataPasanganForm.get('rt_pasangan')?.value,
        rw_pasangan: this.dataPasanganForm.get('rw_pasangan')?.value,
        status_ktp_pasangan: this.dataPasanganForm.get('status_ktp_pasangan')?.value,
        tanggal_exp_ktp_pasangan: this.dataPasanganForm.get('tanggal_exp_ktp_pasangan')?.value,
        tanggal_lahir_pasangan: this.dataPasanganForm.get('tanggal_lahir_pasangan')?.value,
        tanggal_terbit_ktp_pasangan: this.dataPasanganForm.get('tanggal_terbit_ktp_pasangan')?.value,
        usia_pasangan: this.dataPasanganForm.get('usia_pasangan')?.value,
      })
      .subscribe({
        next: bawaan => {
          alert('Berhasil Menyimpan Data');
          this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
            queryParams: {
              curef: this.curef,
              app_no_de: this.app_no_de,
            },
          });
        },
        error: error => {
          alert('Gagal Menyimpan Data');
        },
      });
  }
  radiobbuttonktp() {
    this.untukktp = 1;
  }
  radiobbutton() {
    this.untukktp = 0;
  }

  carimenggunakankodepos(kodepost: any) {
    this.datEntryService.getKdpost(kodepost).subscribe(data => {
      this.retriveKodeProvinsi = data.result.provKec.kd_prov;
      this.retriveKodeKota = data.result.provKec.kd_kota;
      this.retriveKodeKecamatan = data.result.provKec.kd_kec;
      this.retriveprovinsi = data.result.provKec.nm_prov;
      this.retrivekabkota = data.result.provKec.nm_kota;
      this.retrivekecamatan = data.result.provKec.nm_kec;
      this.retriveKodeKelurahan = kodepost;
      this.retrivekelurahan = this.dataEntry.kelurahan_pasangan;
      this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      this.dataPasanganForm.get('provinsi_pasangan')?.setValue(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChange(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChangekota(this.retriveKodeKota + '|' + this.retrivekabkota);
      this.onChangekecamatan(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // charCode.toLocaleString('id-ID',{style: 'currency', currency:'IDR'})
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
