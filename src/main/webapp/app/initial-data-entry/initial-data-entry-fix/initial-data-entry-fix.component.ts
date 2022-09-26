import { Component, OnInit } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { initialdataentryfix } from './initial-data-entry-model';
import { InitialDataEntryService } from '../services/initial-data-entry.service';

export type EntityResponseDaWa = HttpResponse<initialdataentryfix>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-fix',
  templateUrl: './initial-data-entry-fix.component.html',
  styleUrls: ['./initial-data-entry-fix.component.scss'],
})
export class InitialDataEntryFixComponent implements OnInit {
  daWa: any;
  errorMessage: any;
  daWaprof: any;
  postId: any;
  daWakota: any;
  daWakecamatan: any;
  daWakelurahan: any;
  daWakodepos: any;
  daWacuref: any;
  ktp_seumur_hidup: any;

  // //////////////////////////////////////////
  nama: string | undefined;
  jenis_kelamin: string | undefined;
  app_no_ide: string | undefined;
  tanggal_lahir: string | undefined;
  tempat_lahir: string | undefined;
  status_perkawinan: string | undefined;
  agama: string | undefined;
  pendidikan: string | undefined;
  kewarganegaraan: string | undefined;
  nama_ibu_kandung: string | undefined;
  npwp: string | undefined;
  alamat_ktp: string | undefined;
  provinsi_cabang: any;
  kabkota_cabang: any;
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  rt: string | undefined;
  rw: string | undefined;
  no_ktp: string | undefined;
  tanggal_terbit_ktp: string | undefined;
  tanggal_exp_ktp: string | undefined;
  no_handphone: string | undefined;
  contohdata: any;

  // ///////////////////////////////////////////
  constructor(
    protected http: HttpClient,
    private router: Router,
    protected applicationConfigService: ApplicationConfigService,
    protected ideFixServices: InitialDataEntryService
  ) {}

  protected getcuref = this.applicationConfigService.getEndpointFor(' http://10.20.34.110:8805/api/v1/efos-ide/getCuref');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getAppId');
  protected getprovinsi = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/wilayahSvc/getProvinsi/');
  protected gettokenducapil = this.applicationConfigService.getEndpointFor('http://10.20.82.12:8083/token/generate-token');
  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.postUpdateStatus();

    this.ideFixServices.getIdeById().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWa = (data as any).result;
      } else {
        this.daWa = (data as any).result;
      }
    });
    // this.getcurefnih().subscribe({
    //   next: (res: EntityArrayResponseDaWa) => {
    //     this.daWacuref = res.body?.result;
    //     // this.onResponseSuccess(res);
    //   },
    // });

    this.ideFixServices.getIdeByCuref().subscribe(data => {
      console.warn(data);
      if (data.code === 200) {
        this.daWacuref = (data as any).result;
      } else {
        this.daWacuref = (data as any).result;
      }
    });
    // this.getdataentry1().subscribe({
    //   next: (res: EntityArrayResponseDaWa) => {
    //     console.warn('PROVINSI', res);

    //     this.daWaprof = res.body?.result;
    //     // this.onResponseSuccess(res);
    //   },
    // });
  }

  // getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.resourceUrl, { params: options, observe: 'response' });
  // }

  // getcurefnih(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.getcuref, { params: options, observe: 'response' });
  // }

  getdataentry1(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getProvinsi/', {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOH' + token);
  }

  getkabkota(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      // 'Authorization': token,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekota.split('|');

    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKota/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  getkecamatan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKec/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkecamatan');
  }

  getkodepos(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKdPos/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkecamatan');
  }

  getkelurahan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    const httpOptions = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const kodepotongan = kodekecamatan.split('|');
    return this.http.get<ApiResponse>('http://10.20.82.12:8083/wilayahSvc/getKel/' + kodepotongan[0], {
      headers: httpOptions,
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkecamatan');
  }

  gotoprescreaning(getappide: any, kodeposget: any, getcuref: any): void {
    const kirimanprovinsi = this.provinsi_cabang.split('|');
    const kirimankabkota = this.kabkota_cabang.split('|');
    const kirimankecamatan = this.kecamatan.split('|');
    const kirimankelurahan = this.kelurahan.split('|');

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = {
      nama: this.nama,
      nama_pasangan: '',
      kategori_pekerjaan: 'Fixincome',
      curef: getcuref,
      jenis_kelamin: this.jenis_kelamin,
      jenis_kelamin_pasangan: '',
      usia: '0',
      app_no_ide: getappide,
      tanggal_lahir: this.tanggal_lahir,
      tanggal_lahir_pasangan: '',
      tempat_lahir: this.tempat_lahir,
      tempat_lahir_pasangan: '',
      status_perkawinan: this.status_perkawinan,
      status_alamat: '',
      status_kendaraan: '',
      status_ktp: '',
      status_ktp_pasangan: '',
      status_rumah: '',
      agama: this.agama,
      agama_pasangan: '',
      pendidikan: this.pendidikan,
      pendidikan_pasangan: '',
      kewarganegaraan: this.kewarganegaraan,
      kewarganegaraan_pasangan: '',
      nama_ibu_kandung: this.nama_ibu_kandung,
      nama_ibu_kandung_pasangan: '',
      npwp: this.npwp,
      npwp_pasangan: '',
      alamat_ktp: this.alamat_ktp,
      alamat_ktp_pasangan: '',
      alamat_domisili: '',
      provinsi: kirimanprovinsi[1],
      provinsi_domisili: '',
      provinsi_pasangan: '',
      kabkota: kirimankabkota[1],
      kabkota_domisili: '',
      kecamatan: kirimankecamatan[1],
      kecamatan_domisili: '',
      kecamatan_pasangan: '',
      kelurahan: kirimankelurahan[1],
      kelurahan_domisili: '',
      kelurahan_pasangan: '',
      kode_pos: kodeposget,
      kode_pos_domisili: '',
      kode_pos_pasangan: '',
      lama_menetap: '',
      cabang: '',
      created_by: '',
      created_date: '',
      email: '',
      email_pasangan: '',
      id: 0,
      jumlah_anak: '',
      rt: this.rt,
      rt_domisili: '',
      rt_pasangan: '',
      rw: this.rw,
      rw_domisili: '',
      rw_pasangan: '',
      no_ktp: this.no_ktp,
      no_ktp_pasangan: '',
      tanggal_terbit_ktp: this.tanggal_terbit_ktp,
      tanggal_terbit_ktp_pasangan: '',
      tanggal_exp_ktp: this.tanggal_exp_ktp,
      tipe_kendaraan: '',
      no_handphone: this.no_handphone,
      no_handphone_pasangan: '',
      no_telepon: '',
      updated_by: '',
      updated_date: '',
      usia_pasangan: '',
    };
    // alert(kodeposget);
    // alert(this.provinsi_cabang);
    // this.http.post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', body, { headers }).subscribe({
    //     next: data => {
    //   //     this.router.navigate(['/hasilprescreening'], {
    //   //       queryParams: {},
    //   //     });
    //   //   },
    //   //   error: error => {
    //   //     this.errorMessage = error.message;
    //   //     console.error('There was an error!', error);
    //   //     // alert(this.errorMessage);
    //   //     alert('kekirim gk yah ?');
    //      },
    // });
    // alert(this.postId);
    //       this.router.navigate(['/hasilprescreening'], {
    //         queryParams: {},
    //       });

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: '',
        kategori_pekerjaan: 'Fixincome',
        curef: getcuref,
        jenis_kelamin: this.jenis_kelamin,
        jenis_kelamin_pasangan: '',
        usia: '0',
        app_no_ide: getappide,
        tanggal_lahir: this.tanggal_lahir,
        tanggal_lahir_pasangan: '',
        tempat_lahir: this.tempat_lahir,
        tempat_lahir_pasangan: '',
        status_perkawinan: this.status_perkawinan,
        status_alamat: '',
        status_kendaraan: '',
        status_ktp: '',
        status_ktp_pasangan: '',
        status_rumah: '',
        agama: this.agama,
        agama_pasangan: '',
        pendidikan: this.pendidikan,
        pendidikan_pasangan: '',
        kewarganegaraan: this.kewarganegaraan,
        kewarganegaraan_pasangan: '',
        nama_ibu_kandung: this.nama_ibu_kandung,
        nama_ibu_kandung_pasangan: '',
        npwp: this.npwp,
        npwp_pasangan: '',
        alamat_ktp: this.alamat_ktp,
        alamat_ktp_pasangan: '',
        alamat_domisili: '',
        provinsi: kirimanprovinsi[1],
        provinsi_domisili: '',
        provinsi_pasangan: '',
        kabkota: kirimankabkota[1],
        kabkota_domisili: '',
        kecamatan: kirimankecamatan[1],
        kecamatan_domisili: '',
        kecamatan_pasangan: '',
        kelurahan: kirimankelurahan[1],
        kelurahan_domisili: '',
        kelurahan_pasangan: '',
        kode_pos: kodeposget,
        kode_pos_domisili: '',
        kode_pos_pasangan: '',
        lama_menetap: '',
        cabang: '',
        created_by: '',
        created_date: '',
        email: '',
        email_pasangan: '',
        id: 0,
        jumlah_anak: '',
        rt: this.rt,
        rt_domisili: '',
        rt_pasangan: '',
        rw: this.rw,
        rw_domisili: '',
        rw_pasangan: '',
        no_ktp: this.no_ktp,
        no_ktp_pasangan: '',
        tanggal_terbit_ktp: this.tanggal_terbit_ktp,
        tanggal_terbit_ktp_pasangan: '',
        tanggal_exp_ktp: this.tanggal_exp_ktp,
        tipe_kendaraan: '',
        no_handphone: this.no_handphone,
        no_handphone_pasangan: '',
        no_telepon: '',
        updated_by: '',
        updated_date: '',
        usia_pasangan: '',
      })
      .subscribe({
        next: data => {
          this.contohdata = data.result.id;
          this.app_no_ide = data.result.app_no_ide;
          this.tanggal_lahir = data.result.tanggal_lahir;

          this.router.navigate(['/hasilprescreening'], {
            queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
          });

          alert(this.contohdata);
        },
      });
  }

  postUpdateStatus(): void {
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

          this.getdataentry1(this.postId).subscribe({
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
  gotodaftaraplikasiide(getappide: any, kodeposget: any, getcuref: any): void {
    // const kodepotongan =this.nama.split("|");
    const kirimanprovinsi = this.provinsi_cabang.split('|');
    const kirimankabkota = this.kabkota_cabang.split('|');
    const kirimankecamatan = this.kecamatan.split('|');
    const kirimankelurahan = this.kelurahan.split('|');

    // const headers =   'Content-Type': 'application/json';
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //     let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('X-Authorization','');
    // headers.append('Authorization', 'Bearer ' );

    // {'Content-Type': 'application/json'}

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    // let headers = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Credentials', 'true');

    // alert(kodeposget);

    // alert(this.provinsi_cabang);

    // this.http.post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', body, { headers })
    // http://10.20.34.178:8805/api/v1/efos-ide/create_app_ide
    // http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide
    // this.http
    //   .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', body,{headers: httpOptions} )

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
        headers: headers,
        nama: this.nama,
        nama_pasangan: '',
        kategori_pekerjaan: 'Fixincome',
        curef: getcuref,
        jenis_kelamin: this.jenis_kelamin,
        jenis_kelamin_pasangan: '',
        usia: '0',
        app_no_ide: getappide,
        tanggal_lahir: this.tanggal_lahir,
        tanggal_lahir_pasangan: '',
        tempat_lahir: this.tempat_lahir,
        tempat_lahir_pasangan: '',
        status_perkawinan: this.status_perkawinan,
        status_alamat: '',
        status_kendaraan: '',
        status_ktp: '',
        status_ktp_pasangan: '',
        status_rumah: '',
        agama: this.agama,
        agama_pasangan: '',
        pendidikan: this.pendidikan,
        pendidikan_pasangan: '',
        kewarganegaraan: this.kewarganegaraan,
        kewarganegaraan_pasangan: '',
        nama_ibu_kandung: this.nama_ibu_kandung,
        nama_ibu_kandung_pasangan: '',
        npwp: this.npwp,
        npwp_pasangan: '',
        alamat_ktp: this.alamat_ktp,
        alamat_ktp_pasangan: '',
        alamat_domisili: '',
        provinsi: kirimanprovinsi[1],
        provinsi_domisili: '',
        provinsi_pasangan: '',
        kabkota: kirimankabkota[1],
        kabkota_domisili: '',
        kecamatan: kirimankecamatan[1],
        kecamatan_domisili: '',
        kecamatan_pasangan: '',
        kelurahan: kirimankelurahan[1],
        kelurahan_domisili: '',
        kelurahan_pasangan: '',
        kode_pos: kodeposget,
        kode_pos_domisili: '',
        kode_pos_pasangan: '',
        lama_menetap: '',
        cabang: '',
        created_by: '',
        created_date: '',
        email: '',
        email_pasangan: '',
        id: 0,
        jumlah_anak: '',
        rt: this.rt,
        rt_domisili: '',
        rt_pasangan: '',
        rw: this.rw,
        rw_domisili: '',
        rw_pasangan: '',
        no_ktp: this.no_ktp,
        no_ktp_pasangan: '',
        tanggal_terbit_ktp: this.tanggal_terbit_ktp,
        tanggal_terbit_ktp_pasangan: '',
        tanggal_exp_ktp: this.tanggal_exp_ktp,
        tipe_kendaraan: '',
        no_handphone: this.no_handphone,
        no_handphone_pasangan: '',
        no_telepon: '',
        updated_by: '',
        updated_date: '',
        usia_pasangan: '',
      })
      .subscribe({
        next: data => {
          this.contohdata = data.result.id;

          this.router.navigate(['/daftaraplikasiide'], {
            //   queryParams: {},
          });

          alert(this.contohdata);
        },
      });
  }

  onSubmit(event: any) {
    return event.target.nama.value;
  }

  onChange(selectedStatus: any) {
    // alert(this.postId);

    this.getkabkota(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });

    console.log(selectedStatus);
  }

  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatan(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.daWakecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahan(this.postId, selectedStatus).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.daWakelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    const datakodepos = selectedStatus.split('|');

    this.daWakodepos = datakodepos[0];

    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);

    console.log(selectedStatus);
  }
}
