import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { jobinfolist } from './job-info-modellist';
import { DataEntryService } from '../services/data-entry.service';

export type EntityResponseDaWa = HttpResponse<jobinfolist>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss'],
})
export class JobInfoComponent implements OnInit {
  datakiriman!: string;
  datakirimanstatus!: string;
  datakirimanappde!: string;
  datakirimanakategoripekerjaan!: string;
  daWa: any;
  nampungsebelum: any;
  tampunganid: any;
  bawaidjob: any;
  nampungdatakatagoripekerjaan: any;
  getjenispekerjaandariapi: any;
  gettipeperusahaandariapi: any;
  getjenisbidangdariapi: any;
  getdatasektorekonomi: any;
  getjumlahkaryawandariapi: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  daWakotaD: any;
  kecamatanD: any;
  kelurahanD: any;
  daWakodeposD: any;
  daWakotasebelum: any;
  getjabatandariapi: any;
  getjabatansebelum: any;
  getjumlahkaryawansebelumdariapi: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanstatus = params['datakirimanstatus'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }
  //  http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=572
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  //  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  protected apigetjenispekeraan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_pekerjaan?sc='
  );
  protected apilisttipeperusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_perusahaan'
  );
  protected apilistjabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-ref/list_jabatan');
  protected apijumlahkaryawan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jumlah_karyawan'
  );
  protected apilistjenisbidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');

  ngOnInit(): void {
    // const job_info_retrive = (<HTMLInputElement>document.getElementById("job_info")).value;
    // localStorage.setItem('daftar_aplikasi_de', job_info_retrive)
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.gettokendukcapil();
    // alert(this.datakiriman);
    // alert(this.datakirimanstatus);
    this.nampungdatakatagoripekerjaan = this.datakirimanakategoripekerjaan;
    // alert(this.nampungdatakatagoripekerjaan);

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res.body?.result);
        this.daWa = res.body?.result;
      },
    });

    this.sebelum(this.tampunganid).subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;
        this.tampunganid = this.nampungsebelum[0];
        // alert('ini masih hard code');
        console.warn('SEBELUMNYA', this.tampunganid);

        // this.onResponseSuccess(res);
      },
    });

    this.getjenispekerjaan(this.nampungdatakatagoripekerjaan).subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenispekerjaan', res.body?.result);
        this.getjenispekerjaandariapi = res.body?.result;
      },
    });

    this.getlisttipeperusahaan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('tipe_perusahaan', res.body?.result);
        this.gettipeperusahaandariapi = res.body?.result;
      },
    });

    this.getlistjabatan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jabatan', res.body?.result);
        this.getjabatandariapi = res.body?.result;
      },
    });

    this.getlistjenisbidang().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenisbidang', res.body?.result);
        this.getjenisbidangdariapi = res.body?.result;
      },
    });
    this.getjumlahkaryawan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jumlahkaryawan', res.body?.result);
        this.getjumlahkaryawandariapi = res.body?.result;
      },
    });

    this.getjumlahkaryawansebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jumlahkaryawan', res.body?.result);
        this.getjumlahkaryawansebelumdariapi = res.body?.result;
      },
    });

    this.getlistjabatansebelum().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('jabatansebelum', res);

        this.getjabatansebelum = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load2() {
    this.sebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;

        // alert('ini masih hard code');
        console.warn('SEBELUMNYA', this.nampungsebelum);

        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakiriman, { params: options, observe: 'response' });
  }

  sebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.datakiriman, { params: options, observe: 'response' });
  }

  getjenispekerjaan(katagori_pekerjaan: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);

    if (katagori_pekerjaan == 'Non Fix Income') {
      var idkatagoripekerjaan = '2';
    }
    {
      var idkatagoripekerjaan = '1';
    }

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + idkatagoripekerjaan, { params: options, observe: 'response' });
  }

  getjenispekerjaansebelum(katagori_pekerjaansebelum: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    var katagori_pekerjaansebelumvalue = katagori_pekerjaansebelum.split('|');

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + katagori_pekerjaansebelumvalue[0], {
      params: options,
      observe: 'response',
    });
  }
  getlistjabatansebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjabatan, { params: options, observe: 'response' });
  }

  getlistjabatan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjabatan, { params: options, observe: 'response' });
  }

  getlisttipeperusahaan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilisttipeperusahaan, { params: options, observe: 'response' });
  }
  getlistjenisbidang(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjenisbidang, { params: options, observe: 'response' });
  }

  jenisbidangselect() {
    const id_sektor = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');
    // alert(this.postId);
    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomi = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  jenisbidangsebelumselect() {
    const id_sektor = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
    const idsektorpotongan = id_sektor.value.split('|');
    // alert(this.postId);
    // console.log('kode' + selectedStatus);
    this.getsektorekonomi(idsektorpotongan[0]).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.getdatasektorekonomi = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  getsektorekonomi(idsktor: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // const httpOptions = {
    //   // 'Authorization': token,
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`,
    // };
    // const kodepotongan = kodekota.split('|');
    return this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + idsktor, {
      params: options,
      observe: 'response',
    });
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  getjumlahkaryawan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apijumlahkaryawan, { params: options, observe: 'response' });
  }
  getjumlahkaryawansebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apijumlahkaryawan, { params: options, observe: 'response' });
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

  katagoripekerjaanselect() {
    const provinsi_cabang = document.getElementById('kategori_pekerjaan_sebelum') as HTMLInputElement | any;

    // alert(this.postId);

    this.getjenispekerjaansebelum(provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotasebelum = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChange() {
    const provinsi_cabang = document.getElementById('provinsi_cabang_perusahaan') as HTMLInputElement | any;

    // alert(this.postId);

    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakota = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekota() {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_cabang_perusahaan') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekecamatan() {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekelurahan() {
    // alert(this.postId);
    alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodepos;
    alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }

  onChangeD() {
    const provinsi_cabang = document.getElementById('provinsi_sebelum') as HTMLInputElement | any;

    // alert(this.postId);

    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotaD = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onChangekotaD() {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_sebelum') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatanD = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekecamatanD() {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_sebelum') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahanD = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log();
  }

  onChangekelurahanD() {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_sebelum') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_sebelum') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodeposD = datakodepos[0];

    // alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodeposD;
    // alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.onResponseSuccess(res);

    if (this.datakirimanstatus === 'Menikah') {
      this.router.navigate(['/data-entry/data-pasangan'], {
        queryParams: {
          datakirimanappde: this.datakirimanappde,
          datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
          datakirimancuref: this.datakiriman,
        },
      });
      // alert(' ini NIKAH');
      console.warn(this.datakiriman);
    } else {
      // alert('ini jomblo');
      // alert(contohtampungancuref);
      this.router.navigate(['/data-entry/collateral'], {
        queryParams: {
          datakirimanappde: this.datakirimanappde,
          datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
          datakirimancuref: this.datakiriman,
        },
      });
    }
  }

  updatejobsebelum() {
    const kategori_pekerjaan_sebelum = document.getElementById('kategori_pekerjaan_sebelum') as HTMLInputElement | any;
    const tipe_pekerjaan_sebelum = document.getElementById('tipe_pekerjaan_sebelum') as HTMLInputElement | any;
    const posisi_sebelum = document.getElementById('posisi_sebelum') as HTMLInputElement | any;
    const nama_perusahaan_sebelum = document.getElementById('nama_perusahaan_sebelum') as HTMLInputElement | any;
    const alamat_pekerjaan_sebelum = document.getElementById('alamat_pekerjaan_sebelum') as HTMLInputElement | any;
    const provinsi_sebelum = document.getElementById('provinsi_sebelum') as HTMLInputElement | any;
    const kabkota_sebelum = document.getElementById('kabkota_sebelum') as HTMLInputElement | any;
    const kecamatan_sebelum = document.getElementById('kecamatan_sebelum') as HTMLInputElement | any;
    const kelurahan_sebelum = document.getElementById('kelurahan_sebelum') as HTMLInputElement | any;
    const kode_pos_sebelum = document.getElementById('kode_pos_sebelum') as HTMLInputElement | any;
    const rt_sebelum = document.getElementById('rt_sebelum') as HTMLInputElement | any;
    const rw_sebelum = document.getElementById('rw_sebelum') as HTMLInputElement | any;
    const jenis_bidang_sebelum = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
    const sektor_ekonomi_sebelum = document.getElementById('sektor_ekonomi_sebelum') as HTMLInputElement | any;
    const lama_bekerja_tahun_sebelum = document.getElementById('lama_bekerja_tahun_sebelum') as HTMLInputElement | any;
    const lama_bekerja_bulan_sebelum = document.getElementById('lama_bekerja_bulan_sebelum') as HTMLInputElement | any;
    const jumlah_karyawan_sebelum = document.getElementById('jumlah_karyawan_sebelum') as HTMLInputElement | any;
    const jumlah_karyawan_sebelumnya = document.getElementById('jumlah_karyawan_sebelumnya') as HTMLInputElement | any;
    const tipe_perusahaan_sebelum = document.getElementById('tipe_perusahaan_sebelum') as HTMLInputElement | any;
    const tipe_kepegawaian_sebelum = document.getElementById('tipe_kepegawaian_sebelum') as HTMLInputElement | any;
    const id = document.getElementById('id') as HTMLInputElement | any;
    const curef = document.getElementById('curef') as HTMLInputElement | any;

    var kirimanpotonganprovinsi = provinsi_sebelum.value.split('|');
    var cekdatapipe = provinsi_sebelum.value.indexOf('|');
    var cekpipejenisbidang = jenis_bidang_sebelum.value.indexOf('|');
    var kirimanjenisbidang1 = jenis_bidang_sebelum.value.split('|');

    if (cekdatapipe !== -1) {
      var kirimanprovinsi = kirimanpotonganprovinsi[1];

      // alert("update provinsi bawa value pipe |"+kirimanprovinsi)
    } else {
      //  var kirimanprovinsi =kirimanpotonganprovinsi[1];
      var kirimanprovinsi = provinsi_sebelum.value;
      // alert("update provinsi bawa value"+kirimanprovinsi)
    }
    var potongankabkota = kabkota_sebelum.value.split('|');
    if (kabkota_sebelum.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankabkota[1];
    } else {
      var kirimankabkota = kabkota_sebelum.value;
    }
    var potongankecamatan = kecamatan_sebelum.value.split('|');
    if (kecamatan_sebelum.value.indexOf('|') !== -1) {
      var kirimankecamatan = potongankecamatan[1];
    } else {
      var kirimankecamatan = kecamatan_sebelum.value;
    }
    var potongankelurahan = kelurahan_sebelum.value.split('|');
    if (kelurahan_sebelum.value.indexOf('|') !== -1) {
      var kirimankelurahan = potongankelurahan[1];
    } else {
      var kirimankelurahan = kelurahan_sebelum.value;
    }

    if (jenis_bidang_sebelum.value.indexOf('|') !== -1) {
      var jneisbidangsebelumnya = jenis_bidang_sebelum.value.split('|');
      var kirimanjenisbidang = jneisbidangsebelumnya[1];
      alert('ada piope nya' + jenis_bidang_sebelum.values + jneisbidangsebelumnya[1]);
    } else {
      alert('gkada');
      var kirimanjenisbidang = jenis_bidang_sebelum.value;
    }

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_job_sebelum_de', {
        // headers: headers,

        alamat_pekerjaan_sebelum: alamat_pekerjaan_sebelum.value,
        id: id.value,
        // jabatan_sebelum: contohtampungancuref,
        jenis_bidang_sebelum: kirimanjenisbidang,
        // jenis_pekerjaan_sebelum: usia.value,
        jumlah_karyawan_sebelum: jumlah_karyawan_sebelum.value,
        kategori_pekerjaan_sebelum: kategori_pekerjaan_sebelum.value,
        kabkota_sebelum: kirimankabkota,
        kecamatan_sebelum: kirimankecamatan,
        kelurahan_sebelum: kirimankelurahan,
        kode_pos_sebelum: kode_pos_sebelum.value,
        lama_bekerja_bulan_sebelum: lama_bekerja_bulan_sebelum.value,
        lama_bekerja_tahun_sebelum: lama_bekerja_tahun_sebelum.value,
        nama_perusahaan_sebelum: nama_perusahaan_sebelum.value,
        payroll_sebelum: ' 1',
        posisi_sebelum: posisi_sebelum.value,
        provinsi_sebelum: kirimanprovinsi,
        rt_sebelum: rt_sebelum.value,
        // nama_ibu_kandung: ' 1',
        rw_sebelum: rw_sebelum.value,
        sektor_ekonomi_sebelum: sektor_ekonomi_sebelum.value,
        // tahun_berdiri_sebelum: id.value,
        tipe_kepegawaian_sebelum: tipe_kepegawaian_sebelum.value,
        tipe_pekerjaan_sebelum: tipe_pekerjaan_sebelum.value,
        tipe_perusahaan_sebelum: tipe_perusahaan_sebelum.value,
        // umur_pensiun_sebelum: kirimankabkota,
        curef: curef.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;

          // this.router.navigate(['/data-entry/job-info'], {
          //   queryParams: {
          //     datakiriman:  this.datakiriman,
          //     datakirimanstatus: this.datakirimanstatus,
          //     datakirimanappde: this.datakirimanappde,
          //     datakirimanakategoripekerjaan:   this.datakirimanakategoripekerjaan,
          //   },
          // });

          if (this.datakirimanstatus === 'Menikah') {
            this.router.navigate(['/data-entry/data-pasangan'], {
              queryParams: {
                datakirimanappde: this.datakirimanappde,
                datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
                datakirimancuref: this.datakiriman,
              },
            });
            // alert(' ini NIKAH');
            console.warn(this.datakiriman);
          } else {
            // alert('ini jomblo');
            // alert(contohtampungancuref);
            this.router.navigate(['/data-entry/collateral'], {
              queryParams: {
                datakirimanappde: this.datakirimanappde,
                datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
                datakirimancuref: this.datakiriman,
              },
            });
          }
        },
      });
  }

  vieweditjobinfo(contohtampungancuref: any, id: any): void {
    // alert(getAppNoDe);
    // alert(id);
    this.router.navigate(['/data-entry/editjobinfo'], {
      // queryParams: { app_no_de: getAppNoDe }
      queryParams: {
        datakirimanappde: this.datakirimanappde,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        datakiriman: contohtampungancuref,
        datakirimanid: id,
        datakirimanstatus: this.datakirimanstatus,
      },
    });
  }

  buatcreatejobinfo() {
    const kategori_pekerjaan = document.getElementById('kategori_pekerjaan') as HTMLInputElement | any;
    const curef_id = document.getElementById('curef_id') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const payroll = document.getElementById('payroll') as HTMLInputElement | any;
    const payroll1 = document.getElementById('payroll1') as HTMLInputElement | any;
    const jabatan = document.getElementById('jabatan') as HTMLInputElement | any;
    const jenis_pekerjaan = document.getElementById('jenis_pekerjaan') as HTMLInputElement | any;
    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const provinsi_cabang_perusahaan = document.getElementById('provinsi_cabang_perusahaan') as HTMLInputElement | any;
    const kabkota_cabang_perusahaan = document.getElementById('kabkota_cabang_perusahaan') as HTMLInputElement | any;
    const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
    const jenis_bidang_perusahaan = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
    const jenis_sektor_perusahaan = document.getElementById('jenis_sektor_perusahaan') as HTMLInputElement | any;
    const umur1 = document.getElementById('umur1') as HTMLInputElement | any;
    const umur_pensiun = document.getElementById('umur_pensiun') as HTMLInputElement | any;
    const lama_bekerja_tahun = document.getElementById('lama_bekerja_tahun') as HTMLInputElement | any;
    const lama_bekerja_bulan = document.getElementById('lama_bekerja_bulan') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('jumlah_karyawan') as HTMLInputElement | any;
    const jumlah_karyawan2 = document.getElementById('jumlah_karyawan2') as HTMLInputElement | any;
    const pendapatan = document.getElementById('pendapatan') as HTMLInputElement | any;
    const pendapatan_lain = document.getElementById('pendapatan_lain') as HTMLInputElement | any;
    const tunjangan = document.getElementById('tunjangan') as HTMLInputElement | any;
    const total_pendapatan = document.getElementById('total_pendapatan') as HTMLInputElement | any;
    const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const tipe_kepegawaian = document.getElementById('tipe_kepegawaian') as HTMLInputElement | any;

    // alert(id.value);
    // alert(jenis_kelamin.value);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    alert('CREATE NIH');
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_job_info', {
        // headers: headers,
        alamat_perusahaan: alamat_perusahaan.value,
        // bulan_berdiri: contohtampungankategoripekerjaan,
        // created_by: contohtampungancuref,
        curef: this.datakiriman,
        id: '',
        jabatan: jabatan.value,
        jenis_bidang: alamat_perusahaan.value,
        jenis_pekerjaan: jenis_bidang_perusahaan.value,
        jumlah_karyawan: jumlah_karyawan.value,
        kabkota: alamat_perusahaan.value,
        kategori_pekerjaan: alamat_perusahaan.value,
        kecamatan: alamat_perusahaan.value,
        kelurahan: jumlah_karyawan.value,
        kepemilikan_perusahaan: alamat_perusahaan.value,
        kode_pos: alamat_perusahaan.value,
        lama_bekerja_bulan: jumlah_karyawan.value,
        lama_bekerja_tahun: jumlah_karyawan.value,
        nama_perusahaan: alamat_perusahaan.value,
        no_siup: alamat_perusahaan.value,
        no_telepon: jumlah_karyawan.value,
        npwp: jumlah_karyawan.value,
        pemilik_usaha: alamat_perusahaan.value,
        pendapatan: alamat_perusahaan.value,
        pendapatan_lain: jumlah_karyawan.value,
        posisi: jumlah_karyawan.value,
        provinsi: alamat_perusahaan.value,
        rt: alamat_perusahaan.value,
        rw: jumlah_karyawan.value,
        sektor_ekonomi: jumlah_karyawan.value,
        tahun_berdiri: alamat_perusahaan.value,
        tipe_kepegawaian: alamat_perusahaan.value,
        tipe_pekerjaan: jumlah_karyawan.value,
        tipe_perusahaan: jumlah_karyawan.value,
        total_pendapatan: alamat_perusahaan.value,
        tunjangan: alamat_perusahaan.value,
        umur_pensiun: jumlah_karyawan.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          // this.router.navigate(['/data-entry/job-info'], {
          //   // queryParams: {
          //   //   datakiriman: contohtampungancuref,
          //   //   datakirimanstatus: contohtampungstatuskawain,
          //   //   datakirimanappde: contohtampunganappde,
          //   //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
          //   // },
          // });
          window.location.reload();
        },
      });
  }
}
