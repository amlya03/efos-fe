import { Component, OnInit } from '@angular/core';
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

export type EntityResponseDaWa = HttpResponse<datapasangamodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-data-pasangan',
  templateUrl: './data-pasangan.component.html',
  styleUrls: ['./data-pasangan.component.scss'],
})
export class DataPasanganComponent implements OnInit {
  dataPasanganForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  datakiriman: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  app_no_de: any;

  curef: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  statusPerkawinan: any;
  kirimanstatusktp: any;
  untukktp: any;
  untukSessionRole: any;
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;

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
      this.statusPerkawinan = params.statusPerkawinan;
      this.app_no_de = params['app_no_de'];
      this.curef = params['curef'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();

    this.dataPasanganForm = this.formBuilder.group({
      nama_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jenis_kelamin_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_ktp_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rt_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      rw_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kewarganegaraan_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendidikan_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      email_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_handphone_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_ktp_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_terbit_ktp_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_ktp_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_exp_ktp_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      npwp_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tanggal_lahir_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      usia_pasangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load() {
    this.gettokendukcapil();
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
        this.hitungUsia();
      }, 300);
    });
  }

  hitungUsia() {
    const getValueTanggal = +new Date(this.dataPasanganForm.value.tanggal_lahir_pasangan);
    //////////////////////////// ini buat dapet bulan ////////////////////////////
    const getTahun = +~~((Date.now() - getValueTanggal) / 31557600000);
    this.dataPasanganForm.get('usia_pasangan')?.setValue(getTahun);
  }

  gettokendukcapil(): void {
    this.http
      .post<any>('http://10.20.82.12:8083/token/generate-token', {
        password: '3foWeb@pp',
        username: 'efo',
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.postId = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          console.warn(data.result.token);
          console.warn(this.postId);
          // this.router.navigate(['/daftaraplikasiide'], {
          //   queryParams: {},
          // });
          // alert('dapetnih');

          this.datEntryService.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
              // alert(this.postId);
              // this.onResponseSuccess(res);
            },
          });

          // this.getdataentry(this.postId).subscribe({
          //   next: (res: EntityArrayResponseDaWa) => {
          //     this.daWa = res.body?.result;
          //     // this.onResponseSuccess(res);
          //     console.warn('loadingNIH',this.postId );
          //     alert(this.postId)
          //   },
          // });
        },
      });
  }

  onChange(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_pasangan') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_pasangan') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    // alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodepos;
    // alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }

  goto(contohtampungancuref: any) {
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    // alert(this.app_no_de);
    // alert(this.curef);
    this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
      },
    });
    // if(this.statusPerkawinan === 'Menikah'){
    //   this.router.navigate(['/data-pasangan'], { queryParams: { datakiriman:this.app_no_de } });
    //   alert(' ini NIKAH');
    //   console.warn(this.datakiriman);
    // }
    // else{
    //   alert('ini jomblo');
    //   this.router.navigate(['/collateral'], { queryParams: { datakiriman:this.app_no_de } });
    // }
  }

  updatedatapasngan() {
    const provinsi_pasangan = document.getElementById('provinsi_pasangan') as HTMLInputElement | any;
    const kabkota_pasangan = document.getElementById('kabkota_pasangan') as HTMLInputElement | any;
    const kecamatan_pasangan = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    const kelurahan_pasangan = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    const kode_pos_pasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;

    var potonganprov = provinsi_pasangan.value.split('|');
    if (provinsi_pasangan.value.indexOf('|') !== -1) {
      var kirimanpro = potonganprov[1];
    } else {
      var kirimanpro = provinsi_pasangan.value;
    }
    var potongankota = kabkota_pasangan.value.split('|');
    if (kabkota_pasangan.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankota[1];
    } else {
      var kirimankabkota = kabkota_pasangan.value;
    }
    var potongankec = kecamatan_pasangan.value.split('|');
    if (kecamatan_pasangan.value.indexOf('|') !== -1) {
      var kirimankec = potongankec[1];
    } else {
      var kirimankec = kecamatan_pasangan.value;
    }
    var potongankel = kelurahan_pasangan.value.split('|');
    if (kelurahan_pasangan.value.indexOf('|') !== -1) {
      var kirimankel = potongankel[1];
    } else {
      var kirimankel = kelurahan_pasangan.value;
    }

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_pasangan', {
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
        kabkota_pasangan: kirimankabkota,
        kecamatan_pasangan: kirimankec,
        kelurahan_pasangan: kirimankel,
        kewarganegaraan_pasangan: this.dataPasanganForm.get('kewarganegaraan_pasangan')?.value,
        kode_pos_pasangan: kode_pos_pasangan.value,
        no_handphone_pasangan: this.dataPasanganForm.get('no_handphone_pasangan')?.value,
        no_ktp_pasangan: this.dataPasanganForm.get('no_ktp_pasangan')?.value,
        pendidikan_pasangan: this.dataPasanganForm.get('pendidikan_pasangan')?.value,
        provinsi_pasangan: kirimanpro,
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
              statusPerkawinan: this.statusPerkawinan,
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

  carimenggunakankodepos(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.retriveprovinsi = res.body?.result.provKec.nm_prov;

        this.retrivekabkota = res.body?.result.provKec.nm_kota;

        this.retrivekecamatan = res.body?.result.provKec.nm_kec;

        this.retrivekelurahan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang option:first').text(this.retriveprovinsi);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang option:first').text(this.retrivekabkota);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan option:first').text(this.retrivekecamatan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan option:first').text(this.retrivekelurahan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  getkodepostnya(kodepst: any, req: any) {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.postId}`,
    };
    // const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvKecByKdPos/' + kodepst, {
      headers: httpOptions,
      params: options,
      observe: 'response',
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
}
