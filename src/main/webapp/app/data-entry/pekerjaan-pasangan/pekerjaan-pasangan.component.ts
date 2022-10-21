import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { LocalStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup } from '@angular/forms';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-pekerjaan-pasangan',
  templateUrl: './pekerjaan-pasangan.component.html',
  styleUrls: ['./pekerjaan-pasangan.component.scss'],
})
export class PekerjaanPasanganComponent implements OnInit {
  datakirimiancure: any;

  app_no_de: any;
  curef: any;
  statusPerkawinan: any;
  daWa: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobPasanganByCuref?sc=');
  kirimansiup: any;
  jenispekerjaan: any;
  getjabatan: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  getdatasektorekonomi: any;
  getjenisbidangdariapi: any;
  untukSessionRole: any;
  formpekerjaanpasangan: any;
  pemisahkategoripekerjaan: any;
  pemisahtipeperusahaan: any;
  pemisahtipekejeraan: any;
  untukprovinsijobpasangan: any;
  untukkecamatanjobpasangan: any;
  untukkelurahanjobpasangan: any;
  untukkobkotajobpasangan: any;
  untukjenisbidang: any;
  unutkjenissektor: any;
  untuktipepekerjaan: any;
  gettipeperusahaandariapi: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
      this.curef = params['curef'];
      this.statusPerkawinan = params.statusPerkawinan;
    });
  }
  protected apilistjenisbidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');

  protected apigetjenispekeraan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_pekerjaan?sc='
  );
  protected apilisttipeperusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tipe_perusahaan'
  );
  protected apilistjabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_jabatan');

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.formpekerjaanpasangan = this.formBuilder.group({
      kate_peker: '',
      tipe_pekerjaan: '',
      posisi1: '',
      nama_perusahaan: '',
      id: '',
      alamat_perusahaan1: '',
      provinsi1: '',
      kabkota1: '',
      kecamatan1: '',
      kelurahan1: '',
      kode_pos1: '',
      siup2: '',
      jenis_bidang: '',
      sektor_ekonomi: '',
      jumlah_karyawan: '',
      tipe_perusahaan: '',
      lama_bekerja_bulan1: '',
      lama_bekerja_tahun1: '',
      status_kepegawaian: '',
      pendapatan: '',
      tunjangan: '',
      pendapatan_lain: '',
      total_pendapatan: '',
      usia: '',
    });
    this.load();
  }

  load(): void {
    this.gettokendukcapil();
    // alert(this.curef);
    // alert('tidak jalan ');

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('strukturdata', res);
        // alert('tidak jalan dalam fungi ');
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // alert(this.daWa);
        // console.warn('buatpemisah', res);
        // console.warn('buatoemisah', res.body);
        // /////////////////////// Untuk COnvert hasil yang angka ///////////////////////////////////

        if (this.daWa == null) {
          // alert('tidak jalan ');

          let retrivejobpasangan = {
            kate_peker: '',
            tipe_pekerjaan: '',
            posisi1: '',
            nama_perusahaan: '',
            id: '',
            alamat_perusahaan1: '',
            provinsi1: '',
            kabkota1: '',
            kecamatan1: '',
            kelurahan1: '',
            kode_pos1: '',
            siup2: '',
            jenis_bidang: '',
            sektor_ekonomi: '',
            jumlah_karyawan: '',
            tipe_perusahaan: '',
            lama_bekerja_bulan1: '',
            lama_bekerja_tahun1: '',
            status_kepegawaian: '',
            pendapatan: '',
            tunjangan: '',
            pendapatan_lain: '',
            total_pendapatan: '',
            usia: '',
          };
          this.formpekerjaanpasangan.setValue(retrivejobpasangan);
          if (this.untukSessionRole == 'VER_PRESCR') {
            // alert('ini if');
            this.formpekerjaanpasangan.disable();
          } else {
            // alert('ini else');
            this.formpekerjaanpasangan.enable();
          }
        } else {
          if (this.daWa.kategori_pekerjaan == 1) {
            this.daWa.kategori_pekerjaan = 'Fix Income';
          }
          if (this.daWa.kategori_pekerjaan == 2) {
            this.daWa.kategori_pekerjaan = 'Non Fix Income';
          }
          if (this.daWa.kategori_pekerjaan == 3) {
            this.daWa.kategori_pekerjaan = 'Lainnya';
          }
          if (this.daWa.tipe_pekerjaan == 1) {
            this.daWa.tipe_pekerjaan = 'Pegawai Negeri Sipil';
          }
          if (this.daWa.tipe_pekerjaan == 2) {
            this.daWa.tipe_pekerjaan = 'Pegawai Swasta';
          }
          if (this.daWa.tipe_pekerjaan == 3) {
            this.daWa.tipe_pekerjaan = 'Wiraswasta';
          }
          if (this.daWa.tipe_pekerjaan == 4) {
            this.daWa.tipe_pekerjaan = 'Profesional';
          }
          if (this.daWa.tipe_pekerjaan == 5) {
            this.daWa.tipe_pekerjaan = 'Pensiunan';
          }
          if (this.daWa.tipe_pekerjaan == 6) {
            this.daWa.tipe_pekerjaan = 'Tidak Bekerja';
          }
          if (this.daWa.tipe_pekerjaan == 7) {
            this.daWa.tipe_pekerjaan = 'TNI / POLRI';
          }
          if (this.daWa.tipe_pekerjaan == 8) {
            this.daWa.tipe_pekerjaan = 'Pegawai BUMN';
          }
          if (this.daWa.tipe_perusahaan == 1) {
            this.daWa.tipe_perusahaan = 'Perseorangan';
          }
          if (this.daWa.tipe_perusahaan == 2) {
            this.daWa.tipe_perusahaan = 'PT Terbuka (Perseroan Terbatas TBK)';
          }
          if (this.daWa.tipe_perusahaan == 3) {
            this.daWa.tipe_perusahaan = 'PT (Perseroan Terbatas)';
          }
          if (this.daWa.tipe_perusahaan == 5) {
            this.daWa.tipe_perusahaan = 'CV';
          }
          if (this.daWa.tipe_perusahaan == 6) {
            this.daWa.tipe_perusahaan = 'Tidak Bekerja';
          }

          // alert('tidak jalan else');
          let retrivejobpasangan = {
            kate_peker: this.daWa.kategori_pekerjaan,
            tipe_pekerjaan: this.daWa.tipe_pekerjaan,
            posisi1: this.daWa.posisi,
            nama_perusahaan: this.daWa.nama_perusahaan,
            id: this.daWa.id,
            alamat_perusahaan1: this.daWa.alamat_perusahaan,
            provinsi1: this.daWa.provinsi,
            kabkota1: this.daWa.kabkota,
            kecamatan1: this.daWa.kecamatan,
            kelurahan1: this.daWa.kelurahan,
            kode_pos1: this.daWa.kode_pos,
            siup2: this.daWa.no_siup,
            jenis_bidang: this.daWa.jenis_bidang,
            sektor_ekonomi: this.daWa.sektor_ekonomi,
            jumlah_karyawan: this.daWa.jumlah_karyawan,
            tipe_perusahaan: this.daWa.tipe_perusahaan,
            lama_bekerja_bulan1: this.daWa.lama_bekerja_bulan,
            lama_bekerja_tahun1: this.daWa.lama_bekerja_tahun,
            status_kepegawaian: this.daWa.status_kepegawaian,
            pendapatan: this.daWa.pendapatan,
            tunjangan: this.daWa.tunjangan,
            pendapatan_lain: this.daWa.pendapatan_lain,
            total_pendapatan: this.daWa.total_pendapatan,
            usia: this.daWa.umur_pensiun,
          };

          this.formpekerjaanpasangan.setValue(retrivejobpasangan);
          this.pemisahkategoripekerjaan = 0;
          this.pemisahtipeperusahaan = 0;
          this.pemisahtipekejeraan = 0;
          this.untukprovinsijobpasangan = this.daWa.provinsi;
          this.untukkobkotajobpasangan = this.daWa.kabkota;
          this.untukkecamatanjobpasangan = this.daWa.kecamatan;
          this.untukkelurahanjobpasangan = this.daWa.kelurahan;
          this.untukjenisbidang = this.daWa.jenis_bidang;
          this.unutkjenissektor = this.daWa.sektor_ekonomi;
          this.untuktipepekerjaan = this.daWa.tipe_pekerjaan;

          if (this.untukSessionRole == 'VER_PRESCR') {
            // alert('ini if');
            this.formpekerjaanpasangan.disable();
          } else {
            // alert('ini else');
            this.formpekerjaanpasangan.enable();
          }
        }

        // /////////////////////// Untuk COnvert hasil yang angka ///////////////////////////////////
        // alert(this.daWa.tipe_perusahaan)
        // alert('tidak jalan ');
      },
    });

    this.getlistjabatanpasangan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('jabatansebelum', res);

        this.getjabatan = res.body?.result;
        // alert(this.postId);
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
        },
      });

    this.getlistjenisbidang().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('jenisbidang', res.body?.result);
        this.getjenisbidangdariapi = res.body?.result;
      },
    });

    this.getlisttipeperusahaan().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('tipe_perusahaan', res.body?.result);
        this.gettipeperusahaandariapi = res.body?.result;
      },
    });
  }

  jenisbidangsebelumselect() {
    const id_sektor = document.getElementById('jenis_bidang') as HTMLInputElement | any;
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

  getlistjenisbidang(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjenisbidang, { params: options, observe: 'response' });
  }

  getlisttipeperusahaan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilisttipeperusahaan, { params: options, observe: 'response' });
  }

  getsektorekonomi(idsktor: any, req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);

    return this.http.get<ApiResponse>('http://10.20.34.110:8805/api/v1/efos-ide/list_sektor_ekonomi?se=' + idsktor, {
      params: options,
      observe: 'response',
    });
  }

  onChange(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_cabang_swasta') as HTMLInputElement | any;

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
    const provinsi_cabang = document.getElementById('kabkota_cabang_swasta') as HTMLInputElement | any;
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

    const provinsi_cabang = document.getElementById('kecamatan_swasta') as HTMLInputElement | any;
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
    const provinsi_cabang = document.getElementById('kelurahan_swasta') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos_swasta') as HTMLInputElement | any;
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

  katagoripekerjaanselect() {
    const provinsi_cabang = document.getElementById('kate_peker') as HTMLInputElement | any;

    // alert(this.postId);

    this.getjenispekerjaan(provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.jenispekerjaan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  getjenispekerjaan(katagori_pekerjaansebelum: any, req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    var katagori_pekerjaansebelumvalue = katagori_pekerjaansebelum.split('|');

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetjenispekeraan + katagori_pekerjaansebelumvalue[0], {
      params: options,
      observe: 'response',
    });
  }

  getlistjabatanpasangan(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apilistjabatan, { params: options, observe: 'response' });
  }

  goto(): void {
    // this.onResponseSuccess(res);
    // alert('otw collateral1 ');
    // console.warn('colalteral', this.app_no_de, this.curef, this.datakirimanakategoripekerjaan);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.curef, { params: options, observe: 'response' });
  }

  updatejobpasangan(contohtampungancuref: any) {
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    // alert(this.app_no_de);
    // alert(this.curef);

    const kate_peker = document.getElementById('kate_peker') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const posisi1 = document.getElementById('posisi1') as HTMLInputElement | any;
    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan1 = document.getElementById('alamat_perusahaan1') as HTMLInputElement | any;
    const provinsi_cabang_swasta = document.getElementById('provinsi_cabang_swasta') as HTMLInputElement | any;
    const kabkota_cabang_swasta = document.getElementById('kabkota_cabang_swasta') as HTMLInputElement | any;
    const kecamatan_swasta = document.getElementById('kecamatan_swasta') as HTMLInputElement | any;
    const kelurahan_swasta = document.getElementById('kelurahan_swasta') as HTMLInputElement | any;
    const kode_pos_swasta = document.getElementById('kode_pos_swasta') as HTMLInputElement | any;
    const siup2 = document.getElementById('siup2') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const sektor_ekonomi = document.getElementById('sektor_ekonomi') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('jumlah_karyawan') as HTMLInputElement | any;
    const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const lama_bekerja_bulan1 = document.getElementById('lama_bekerja_bulan1') as HTMLInputElement | any;
    const lama_bekerja_tahun1 = document.getElementById('lama_bekerja_tahun1') as HTMLInputElement | any;
    const status_kepegawaian = document.getElementById('status_kepegawaian') as HTMLInputElement | any;
    const pendapatan = document.getElementById('pendapatan') as HTMLInputElement | any;
    const tunjangan = document.getElementById('tunjangan') as HTMLInputElement | any;
    const pendapatan_lain = document.getElementById('pendapatan_lain') as HTMLInputElement | any;
    const total_pendapatan = document.getElementById('total_pendapatan') as HTMLInputElement | any;
    const usia = document.getElementById('usia') as HTMLInputElement | any;
    const id = document.getElementById('id') as HTMLInputElement | any;
    const curef = document.getElementById('curef') as HTMLInputElement | any;

    var potonganprov = provinsi_cabang_swasta.value.split('|');
    if (provinsi_cabang_swasta.value.indexOf('|') !== -1) {
      var kirimanpro = potonganprov[1];
    } else {
      var kirimanpro = provinsi_cabang_swasta.value;
    }
    var potongankota = kabkota_cabang_swasta.value.split('|');
    if (kabkota_cabang_swasta.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankota[1];
    } else {
      var kirimankabkota = kabkota_cabang_swasta.value;
    }
    var potongankec = kecamatan_swasta.value.split('|');
    if (kecamatan_swasta.value.indexOf('|') !== -1) {
      var kirimankec = potongankec[1];
    } else {
      var kirimankec = kecamatan_swasta.value;
    }
    var potongankel = kelurahan_swasta.value.split('|');
    if (kelurahan_swasta.value.indexOf('|') !== -1) {
      var kirimankel = potongankel[1];
    } else {
      var kirimankel = kelurahan_swasta.value;
    }
    var potonganjenisbidang = jenis_bidang.value.split('|');
    if (jenis_bidang.value.indexOf('|') !== -1) {
      var kirimjenisbidang = potonganjenisbidang[1];
    } else {
      var kirimjenisbidang = jenis_bidang.value;
    }
    // var potongansektorekonomi = jenis_bidang.value.split('|');
    // if (jenis_bidang.value.indexOf('|') !== -1) {
    //   var kirimjenisbidang = potonganjenisbidang[1];
    // } else {
    //   var kirimjenisbidang = jenis_bidang.value;
    // }

    if (tipe_pekerjaan.value != 'Wiraswasta' || tipe_pekerjaan.value != 'Wiraswasta') {
      this.kirimansiup = '';
    } else {
      this.kirimansiup = siup2.value;
    }
    // alert(id.value);
    // alert(contohtampungancuref);

    if (this.daWa == null) {
      // alert('kosong');
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_job_info_pasangan', {
          // headers: headers,

          curef: this.curef,
          alamat_perusahaan: alamat_perusahaan1.value,
          // created_by: app_no_ide.value,
          // created_date: jenis_kelamin.value,
          id: id.value,
          // jarak_lokasi_usaha: curef.value,
          jenis_bidang: kirimjenisbidang,
          // jenis_pekerjaan: id.value,
          jumlah_karyawan: jumlah_karyawan.value,
          kabkota: kirimankabkota,
          kategori_pekerjaan: kate_peker.value,
          kecamatan: kirimankec,
          kelurahan: kirimankel,
          kode_pos: kode_pos_swasta.value,
          lama_bekerja_bulan: lama_bekerja_bulan1.value,
          lama_bekerja_tahun: lama_bekerja_tahun1.value,
          nama_perusahaan: nama_perusahaan.value,
          no_siup: this.kirimansiup,
          pendapatan: pendapatan.value,
          pendapatan_lain: pendapatan_lain.value,
          posisi: posisi1.value,
          provinsi: kirimanpro,
          // rt: provinsi_cabang.value,
          // rw: tanggal_exp_ktp_pasangan.value,
          sektor_ekonomi: sektor_ekonomi.value,
          status_kepegawaian: status_kepegawaian.value,
          tipe_pekerjaan: tipe_pekerjaan.value,
          tipe_perusahaan: tipe_perusahaan.value,
          total_pendapatan: total_pendapatan.value,
          // total_pengeluaran: provinsi_pasangan.value,
          tunjangan: tunjangan.value,
          // umur_pensiun: rw_pasangan.value,
          // updated_by: provinsi_cabang.value,
          // updated_date: tanggal_exp_ktp_pasangan.value,
        })

        .subscribe({
          next: bawaan => {
            //           this.contohdata = bawaan.result.app_no_de;
            // this.databawaan = bawaan.result.app_no_de;
            // alert('MASUKAJAHSUSAH');
            this.router.navigate(['/data-entry/collateral'], {
              queryParams: {
                app_no_de: this.app_no_de,
                curef: this.curef,
                // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
              },
            });
          },
        });
    } else {
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_job_info_pasangan', {
          // headers: headers,

          curef: this.curef,
          alamat_perusahaan: alamat_perusahaan1.value,
          // created_by: app_no_ide.value,
          // created_date: jenis_kelamin.value,
          id: id.value,
          // jarak_lokasi_usaha: curef.value,
          jenis_bidang: kirimjenisbidang,
          // jenis_pekerjaan: id.value,
          jumlah_karyawan: jumlah_karyawan.value,
          kabkota: kirimankabkota,
          kategori_pekerjaan: kate_peker.value,
          kecamatan: kirimankec,
          kelurahan: kirimankel,
          kode_pos: kode_pos_swasta.value,
          lama_bekerja_bulan: lama_bekerja_bulan1.value,
          lama_bekerja_tahun: lama_bekerja_tahun1.value,
          nama_perusahaan: nama_perusahaan.value,
          no_siup: this.kirimansiup,
          pendapatan: pendapatan.value,
          pendapatan_lain: pendapatan_lain.value,
          posisi: posisi1.value,
          provinsi: kirimanpro,
          // rt: provinsi_cabang.value,
          // rw: tanggal_exp_ktp_pasangan.value,
          sektor_ekonomi: sektor_ekonomi.value,
          status_kepegawaian: status_kepegawaian.value,
          tipe_pekerjaan: tipe_pekerjaan.value,
          tipe_perusahaan: tipe_perusahaan.value,
          total_pendapatan: total_pendapatan.value,
          // total_pengeluaran: provinsi_pasangan.value,
          tunjangan: tunjangan.value,
          // umur_pensiun: rw_pasangan.value,
          // updated_by: provinsi_cabang.value,
          // updated_date: tanggal_exp_ktp_pasangan.value,
        })

        .subscribe({
          next: bawaan => {
            //           this.contohdata = bawaan.result.app_no_de;
            // this.databawaan = bawaan.result.app_no_de;
            // alert('MASUKAJAHSUSAH');
            this.router.navigate(['/data-entry/collateral'], {
              queryParams: {
                app_no_de: this.app_no_de,
                curef: this.curef,
                // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
              },
            });
          },
        });
    }

    // this.router.navigate(['/data-entry/collateral'], {
    //   queryParams: {
    //     app_no_de: this.app_no_de,
    //     curef: this.curef,
    //     // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
    //   },
    // });
  }
}
