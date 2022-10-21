import { Component, OnInit } from '@angular/core';
import { createRequestOption } from 'app/core/request/request-util';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { datapasangamodel } from './data-pasangan-model';
import { Observable } from 'rxjs';
import { DataEntryService } from '../services/data-entry.service';
import { LocalStorageService } from 'ngx-webstorage';

export type EntityResponseDaWa = HttpResponse<datapasangamodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-data-pasangan',
  templateUrl: './data-pasangan.component.html',
  styleUrls: ['./data-pasangan.component.scss'],
})
export class DataPasanganComponent implements OnInit {
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

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params.statusPerkawinan;
      this.app_no_de = params['app_no_de'];
      this.curef = params['curef'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.gettokendukcapil();

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('pasangan', res);
        console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;

        this.untukktp = res.body?.result.status_ktp_pasangan;
        // this.onResponseSuccess(res);
      },
    });
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

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.app_no_de, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

  updatedatapasngan(contohtampungancuref: any) {
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    // alert(this.app_no_de);
    // alert(this.curef);

    const nama_pasangan = document.getElementById('nama_pasangan') as HTMLInputElement | any;
    const jenis_kelamin_pasangan = document.getElementById('jenis_kelamin_pasangan') as HTMLInputElement | any;
    const alamat_ktp_pasangan = document.getElementById('alamat_ktp_pasangan') as HTMLInputElement | any;
    const provinsi_pasangan = document.getElementById('provinsi_pasangan') as HTMLInputElement | any;
    const kabkota_pasangan = document.getElementById('kabkota_pasangan') as HTMLInputElement | any;
    const kecamatan_pasangan = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    const kelurahan_pasangan = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    const kode_pos_pasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;
    const rt_pasangan = document.getElementById('rt_pasangan') as HTMLInputElement | any;
    const rw_pasangan = document.getElementById('rw_pasangan') as HTMLInputElement | any;
    const tanggal_lahir_pasangan = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;
    const kewarganegaraan_pasangan = document.getElementById('kewarganegaraan_pasangan') as HTMLInputElement | any;
    const pendidikan_pasangan = document.getElementById('pendidikan_pasangan') as HTMLInputElement | any;
    const email_pasangan = document.getElementById('email_pasangan') as HTMLInputElement | any;
    const no_handphone_pasangan = document.getElementById('no_handphone_pasangan') as HTMLInputElement | any;
    const no_ktp_pasangan = document.getElementById('no_ktp_pasangan') as HTMLInputElement | any;
    const tanggal_terbit_ktp_pasangan = document.getElementById('tanggal_terbit_ktp_pasangan') as HTMLInputElement | any;
    const tanggal_exp_ktp_pasangan = document.getElementById('tanggal_exp_ktp_pasangan') as HTMLInputElement | any;
    const npwp_pasangan = document.getElementById('npwp_pasangan') as HTMLInputElement | any;
    const id = document.getElementById('id') as HTMLInputElement | any;
    const app_no_ide = document.getElementById('app_no_ide') as HTMLInputElement | any;
    const curef = document.getElementById('curef') as HTMLInputElement | any;

    const statusktpia = (<HTMLInputElement>document.getElementById('ktp_seumur_hidup_pasangan_ya')).checked;
    const statusktptidak = (<HTMLInputElement>document.getElementById('ktp_seumur_hidup_pasangan_tidak')).checked;

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

    if (statusktpia == true) {
      this.kirimanstatusktp = 1;
    } else if (statusktptidak == true) {
      this.kirimanstatusktp = 0;
    } else {
      this.kirimanstatusktp = 9;
    }

    if (this.kirimanstatusktp == 1) {
      var kirimantanggalex = null;
    } else {
      // alert(this.kirimanstatusktp);
      var kirimantanggalex = tanggal_exp_ktp_pasangan.value;
    }

    // alert(id.value);
    // alert(contohtampungancuref);

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_pasangan', {
        // headers: headers,

        nama_pasangan: nama_pasangan.value,
        alamat_ktp_pasangan: alamat_ktp_pasangan.value,
        app_no_ide: app_no_ide.value,
        jenis_kelamin_pasangan: jenis_kelamin_pasangan.value,
        // created_by: usia.value,
        curef: curef.value,
        email_pasangan: email_pasangan.value,
        id: id.value,
        npwp_pasangan: npwp_pasangan.value,
        kabkota_pasangan: kirimankabkota,
        kecamatan_pasangan: kirimankec,
        kelurahan_pasangan: kirimankel,
        kewarganegaraan_pasangan: kewarganegaraan_pasangan.value,
        kode_pos_pasangan: kode_pos_pasangan.value,
        // nama_ibu_kandung_pasangan: agama.value,
        no_handphone_pasangan: no_handphone_pasangan.value,
        no_ktp_pasangan: no_ktp_pasangan.value,
        // nama_ibu_kandung: ' 1',
        pendidikan_pasangan: pendidikan_pasangan.value,
        provinsi_pasangan: kirimanpro,
        rt_pasangan: rt_pasangan.value,
        rw_pasangan: rw_pasangan.value,
        status_ktp_pasangan: this.kirimanstatusktp,
        tanggal_exp_ktp_pasangan: kirimantanggalex,
        tanggal_lahir_pasangan: tanggal_lahir_pasangan.value,
        tanggal_terbit_ktp_pasangan: tanggal_terbit_ktp_pasangan.value,
        //  tempat_lahir_pasangan: kecamatan.value,
        // usia_pasangan: kecamatan_domisili.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
            queryParams: {
              app_no_de: this.app_no_de,
              curef: this.curef,
              // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
            },
          });
        },
      });

    // this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
    //   // queryParams: {
    //   //   app_no_de: this.app_no_de,
    //   //   curef: this.curef,
    //   //   datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
    //   // },
    // });
  }
  radiobbuttonktp() {
    this.untukktp = 1;
  }
  radiobbutton() {
    this.untukktp = 0;
  }
}
