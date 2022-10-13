import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { colateralmodel } from './collateral-model';
// import { count } from 'console';

export type EntityResponseDaWa = HttpResponse<colateralmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss'],
})
export class CollateralComponent implements OnInit {
  app_no_de: any;
  curef: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  datatipeagunan: any;
  tampungantipeagunan: any;
  tambahatautidak: any;
  statussertifikat: any;
  listagunan: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  daWakotas: any;
  kecamatan: any;
  kecamatans: any;
  kelurahan: any;
  kelurahans: any;
  daWakodepos: any;
  constructor(
    private route: ActivatedRoute,
    protected datEntryService: DataEntryService,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getCollateralByCuref?sc=');
  protected apigettipeagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tipe_agunan');
  protected apistatussertifikat = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_sertifikat'
  );
  protected apigetlistagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_developer');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.gettokendukcapil();

    alert('colalteral' + this.app_no_de);
    alert(this.curef);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('pasangan', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });

    this.gettipeagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('pasangan', res);
        this.datatipeagunan = res.body?.result;
        this.tampungantipeagunan = 0;
      },
    });

    this.getstatussertifikat().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('statussertifikat', res);
        this.statussertifikat = res.body?.result;
        this.tampungantipeagunan = 0;
      },
    });

    this.getlistagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('listagunan', res);
        this.listagunan = res.body?.result;
        this.tampungantipeagunan = 0;
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
            },
          });
        },
      });
  }
  onChange(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_agunan') as HTMLInputElement | any;

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

  onChanges(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_sesuai_sertifikat') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotas = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }
  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
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
  onChangekotas(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_sesuai_sertifikat') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatans = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }
  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
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
  onChangekecamatans(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_sesuai_sertifikat') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahans = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }
  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
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
  onChangekelurahans(selectedStatus: any) {
    // alert(this.postId);
    alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_sesuai_sertifikat') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_sesuai_sertifikat') as HTMLInputElement | any;
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

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.curef, { params: options, observe: 'response' });
  }

  gettipeagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigettipeagunan, { params: options, observe: 'response' });
  }

  getstatussertifikat(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apistatussertifikat, { params: options, observe: 'response' });
  }
  getlistagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetlistagunan, { params: options, observe: 'response' });
  }

  changefom() {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  tambahcollateral() {
    // const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;
    alert('tambah');
    this.tambahatautidak = 'benar';
    $('#tambahdata').attr('hidden', 'hidden');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.onResponseSuccess(res);
    alert('ke struktur ');
    alert(this.datakirimanakategoripekerjaan);
    console.warn('INI ADA GK SIH', this.curef, this.app_no_de);
    this.router.navigate(['/data-entry/struktur-pembiayaan'], {
      queryParams: {
        app_no_de: this.app_no_de,
        datakirimiancure: this.curef,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
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

  gotoeditcollateral(idcollateral: any) {
    // this.onResponseSuccess(res);
    alert('ke editcollateral ');
    alert(this.datakirimanakategoripekerjaan);
    console.warn('INI ADA GK SIH', this.curef, this.app_no_de);
    this.router.navigate(['/data-entry/editcollateral'], {
      queryParams: {
        app_no_de: this.app_no_de,
        datakirimiancure: this.curef,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        datakirimanidcollateral: idcollateral,
      },
    });
  }

  createcollateral() {
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
        // alamat_perusahaan: alamat_perusahaan.value,

        alamat_agunan: 'string',
        alamat_sesuai_sertifikat: 'string',
        app_no_de: 'string',
        blok_rumah: 'string',
        curef: 'string',
        developer: 'string',
        harga_objek: 'string',
        harga_objek_sertifikat: 'string',
        hubungan_pemegang_hak: 'string',
        id_collateral: 'string',
        id_collateral_detail: 0,
        id_rumah: 'string',
        jenis_objek: 'string',
        kabkota_agunan: 'string',
        kabkota_sesuai_sertifikat: 'string',
        kecamatan_agunan: 'string',
        kecamatan_sesuai_sertifikat: 'string',
        kelurahan_agunan: 'string',
        kelurahan_sesuai_sertifikat: 'string',
        kode_pos_agunan: 'string',
        kode_pos_sesuai_sertifikat: 'string',
        luas_bangunan: 'string',
        luas_bangunan_sertifikat: 'string',
        luas_tanah: 'string',
        luas_tanah_sertifikat: 'string',
        merk: 'string',
        model: 'string',
        nama_bpkb: 'string',
        nama_pemegang_hak: 'string',
        nama_perumahan: 'string',
        no_handphone_cp: 'string',
        no_id_pemegang_hak_sertifikat: 'string',
        no_mesin: 'string',
        no_plat: 'string',
        no_rangka: 'string',
        no_sertifikat: 'string',
        nomor_bpkb: 'string',
        nomor_rumah: 'string',
        provinsi_agunan: 'string',
        provinsi_sesuai_sertifikat: 'string',
        rt: 'string',
        rt_sertifikat: 'string',
        rw: 'string',
        rw_sertifikat: 'string',
        seri: 'string',
        status_active: 'string',
        status_agunan: 'string',
        status_developer: 'string',
        status_jaminan_sebelumnya: 'string',
        status_sertifikat: 'string',
        tahun_dibuat: 'string',
        tanggal_expired: 'string',
        tanggal_terbit: 'string',
        tipe_agunan: 'string',
        tipe_kendaraan: 'string',
        tipe_properti: 'string',
        warna: 'string',
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          // this.router.navigate(['/data-entry/job-info'], {
          //   // queryParams: {
          //   //   datakiriman: contohtampungancuref,
          //   //   statusPerkawinan: contohtampungstatuskawain,
          //   //   app_no_de: contohtampunganappde,
          //   //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
          //   // },
          // });
          window.location.reload();
        },
      });
  }
}
