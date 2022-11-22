import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getJobPasangan } from '../services/config/getJobPasangan.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { getListTipePekerjaan } from '../services/config/getListTipePekerjaan.model';
import { refJenisPekerjaan } from '../services/config/refJenisPekerjaan.model';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refListJabatan } from '../services/config/refListJabatan.model';
import { refTipePerusahaan } from '../services/config/refTipePerusahaan.model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-pekerjaan-pasangan',
  templateUrl: './pekerjaan-pasangan.component.html',
  styleUrls: ['./pekerjaan-pasangan.component.scss'],
})
export class PekerjaanPasanganComponent implements OnInit {
  formPekerjaanPasangan!: FormGroup;
  listJobPasangan: getJobPasangan = new getJobPasangan();
  dataEntry: fetchAllDe = new fetchAllDe();
  listTipePekerjaan: getListTipePekerjaan[] = [];
  listJabatan: refJenisPekerjaan[] = [];
  listJabatanAll: refListJabatan[] = [];
  ListJumlahKaryawan: refListJumlahKaryawan[] = [];
  listTipePerusahaan: refTipePerusahaan[] = [];
  app_no_de: any;
  curef: any;
  statusPerkawinan: any;
  kategoriPekerjaan: any;
  tipePekerjaanChange: any;
  kirimKatePeker: any;
  kirimUmurPensi: any;

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
  retriveprovinsi: any;
  retrivekabkota: any;
  retrivekecamatan: any;
  retrivekelurahan: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
      this.curef = params['curef'];
      this.statusPerkawinan = params.statusPerkawinan;
    });
  }
  protected apilistjenisbidang = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/list_jenis_bidang');

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');

    //////////////////////////// validasi /////////////////////////////////////////
    this.formPekerjaanPasangan = this.formBuilder.group({
      posisi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_siup: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jenis_bidang: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      sektor_ekonomi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jumlah_karyawan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_bulan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_tahun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_kepegawaian: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tunjangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan_lain: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      total_pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      umur_pensiun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kategori_pekerjaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_pekerjaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jarak_lokasi_usaha: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_pos: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRESCR' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
    this.load();
  }

  load(): void {
    this.gettokendukcapil();
    ///////////////////////////// REF ////////////////////////////////////////
    this.datEntryService.getFetchListJenisPekerjaan().subscribe(data => {
      this.listJabatan = data.result;
    });
    this.datEntryService.getFetchListJabatan().subscribe(data => {
      this.listJabatanAll = data.result;
    });
    this.datEntryService.getFetchTipePerusahaan().subscribe(data => {
      this.listTipePerusahaan = data.result;
    });
    this.datEntryService.getFetchListJumlahKaryawan().subscribe(data => {
      this.ListJumlahKaryawan = data.result;
    });

    ///////////////////////////// REF ////////////////////////////////////////

    // setTimeout(() => {
    this.datEntryService.getSemuaDataJobPasangan(this.curef).subscribe(data => {
      this.listJobPasangan = data.result;
      ////////////////////////////////////////////////////////////////////////////
      if (this.listJobPasangan.kategori_pekerjaan == 'Fix Income') {
        this.kategoriPekerjaan = 1;
      } else if (this.listJobPasangan.kategori_pekerjaan == 'Non Fix Income') {
        this.kategoriPekerjaan = 2;
      } else {
        this.kategoriPekerjaan = 3;
      }
      // alert(this.listJobPasangan.kategori_pekerjaan)
      this.datEntryService.getFetchListTipePekerjaan(this.kategoriPekerjaan).subscribe(data => {
        this.listTipePekerjaan = data.result;
        // console.log('tipe '+ this.listTipePekerjaan)
      });
      let retrivejobpasangan = {
        kategori_pekerjaan: this.kategoriPekerjaan,
        tipe_pekerjaan: this.listJobPasangan.tipe_pekerjaan,
        posisi: this.listJobPasangan.posisi,
        nama_perusahaan: this.listJobPasangan.nama_perusahaan,
        alamat_perusahaan: this.listJobPasangan.alamat_perusahaan,
        no_siup: this.listJobPasangan.no_siup,
        jenis_bidang: this.listJobPasangan.jenis_bidang,
        sektor_ekonomi: this.listJobPasangan.sektor_ekonomi,
        jumlah_karyawan: this.listJobPasangan.jumlah_karyawan,
        tipe_perusahaan: this.listJobPasangan.tipe_perusahaan,
        lama_bekerja_bulan: this.listJobPasangan.lama_bekerja_bulan,
        lama_bekerja_tahun: this.listJobPasangan.lama_bekerja_tahun,
        status_kepegawaian: this.listJobPasangan.status_kepegawaian,
        pendapatan: this.listJobPasangan.pendapatan,
        tunjangan: this.listJobPasangan.tunjangan,
        pendapatan_lain: this.listJobPasangan.pendapatan_lain,
        total_pendapatan: this.listJobPasangan.total_pendapatan,
        umur_pensiun: this.listJobPasangan.umur_pensiun,
        jarak_lokasi_usaha: this.listJobPasangan.jarak_lokasi_usaha,
        kode_pos: this.listJobPasangan.kode_pos,
      };
      this.formPekerjaanPasangan.setValue(retrivejobpasangan);

      this.untukprovinsijobpasangan = this.listJobPasangan.provinsi;
      this.untukkobkotajobpasangan = this.listJobPasangan.kabkota;
      this.untukkecamatanjobpasangan = this.listJobPasangan.kecamatan;
      this.untukkelurahanjobpasangan = this.listJobPasangan.kelurahan;
      this.untukjenisbidang = this.listJobPasangan.jenis_bidang;
      this.unutkjenissektor = this.listJobPasangan.sektor_ekonomi;
    });
    // }, 1000);
  }

  pilihTipePeker(value: any) {
    // alert(value)
    this.datEntryService.getFetchListTipePekerjaan(value).subscribe(data => {
      this.listTipePekerjaan = data.result;
      console.log('tipe ' + this.listTipePekerjaan);
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

  updatejobpasangan(contohtampungancuref: any) {
    // alert(this.listJobPasangan == null);
    const provinsi_cabang_swasta = document.getElementById('provinsi_cabang_swasta') as HTMLInputElement | any;
    const kabkota_cabang_swasta = document.getElementById('kabkota_cabang_swasta') as HTMLInputElement | any;
    const kecamatan_swasta = document.getElementById('kecamatan_swasta') as HTMLInputElement | any;
    const kelurahan_swasta = document.getElementById('kelurahan_swasta') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const sektor_ekonomi = document.getElementById('sektor_ekonomi') as HTMLInputElement | any;
    let totalPendapatan =
      Number(this.formPekerjaanPasangan.get('pendapatan')?.value) +
      Number(this.formPekerjaanPasangan.get('tunjangan')?.value) +
      Number(this.formPekerjaanPasangan.get('pendapatan_lain')?.value);
    //////////////////// LOGIC //////////////////////////////////
    if (this.formPekerjaanPasangan.get('kategori_pekerjaan')?.value == 1) {
      this.kirimKatePeker = 'Fix Income';
    } else if (this.formPekerjaanPasangan.get('kategori_pekerjaan')?.value == 2) {
      this.kirimKatePeker = 'Non Fix Income';
    } else {
      this.kirimKatePeker = 'Lain-lainnya';
    }
    if (this.formPekerjaanPasangan.get('umur_pensiun')?.value != null) {
      this.kirimUmurPensi = this.formPekerjaanPasangan.get('umur_pensiun')?.value;
    } else {
      this.kirimUmurPensi = 55;
    }

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
    if (this.listJobPasangan == null) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_job_info_pasangan', {
          curef: this.curef,
          created_by: this.SessionStorageService.retrieve('sessionUserName'),
          kategori_pekerjaan: this.kirimKatePeker,
          tipe_pekerjaan: this.formPekerjaanPasangan.get('tipe_pekerjaan')?.value,
          posisi: this.formPekerjaanPasangan.get('posisi')?.value,
          nama_perusahaan: this.formPekerjaanPasangan.get('nama_perusahaan')?.value,
          alamat_perusahaan: this.formPekerjaanPasangan.get('alamat_perusahaan')?.value,
          provinsi: kirimanpro,
          kabkota: kirimankabkota,
          kecamatan: kirimankec,
          kelurahan: kirimankel,
          kode_pos: this.formPekerjaanPasangan.get('kode_pos')?.value,
          jenis_bidang: kirimjenisbidang,
          sektor_ekonomi: sektor_ekonomi.value,
          jumlah_karyawan: this.formPekerjaanPasangan.get('jumlah_karyawan')?.value,
          tipe_perusahaan: this.formPekerjaanPasangan.get('tipe_perusahaan')?.value,
          lama_bekerja_bulan: this.formPekerjaanPasangan.get('lama_bekerja_bulan')?.value,
          lama_bekerja_tahun: this.formPekerjaanPasangan.get('lama_bekerja_tahun')?.value,
          status_kepegawaian: this.formPekerjaanPasangan.get('status_kepegawaian')?.value,
          pendapatan: this.formPekerjaanPasangan.get('pendapatan')?.value,
          tunjangan: this.formPekerjaanPasangan.get('tunjangan')?.value,
          pendapatan_lain: this.formPekerjaanPasangan.get('pendapatan_lain')?.value,
          total_pendapatan: totalPendapatan,
          no_siup: this.formPekerjaanPasangan.get('no_siup')?.value,
          umur_pensiun: this.kirimUmurPensi,
          jarak_lokasi_usaha: this.formPekerjaanPasangan.get('jarak_lokasi_usaha')?.value,
        })

        .subscribe({
          next: bawaan => {
            alert('Berhasil Menyimpan Data');
            // setTimeout(() => {
            this.router.navigate(['/data-entry/collateral'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
        });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_job_info_pasangan', {
          curef: this.curef,
          updated_by: this.SessionStorageService.retrieve('sessionUserName'),
          kategori_pekerjaan: this.kirimKatePeker,
          tipe_pekerjaan: this.formPekerjaanPasangan.get('tipe_pekerjaan')?.value,
          posisi: this.formPekerjaanPasangan.get('posisi')?.value,
          nama_perusahaan: this.formPekerjaanPasangan.get('nama_perusahaan')?.value,
          alamat_perusahaan: this.formPekerjaanPasangan.get('alamat_perusahaan')?.value,
          provinsi: kirimanpro,
          kabkota: kirimankabkota,
          kecamatan: kirimankec,
          kelurahan: kirimankel,
          kode_pos: this.formPekerjaanPasangan.get('kode_pos')?.value,
          jenis_bidang: kirimjenisbidang,
          sektor_ekonomi: sektor_ekonomi.value,
          jumlah_karyawan: this.formPekerjaanPasangan.get('jumlah_karyawan')?.value,
          tipe_perusahaan: this.formPekerjaanPasangan.get('tipe_perusahaan')?.value,
          lama_bekerja_bulan: this.formPekerjaanPasangan.get('lama_bekerja_bulan')?.value,
          lama_bekerja_tahun: this.formPekerjaanPasangan.get('lama_bekerja_tahun')?.value,
          status_kepegawaian: this.formPekerjaanPasangan.get('status_kepegawaian')?.value,
          pendapatan: this.formPekerjaanPasangan.get('pendapatan')?.value,
          tunjangan: this.formPekerjaanPasangan.get('tunjangan')?.value,
          pendapatan_lain: this.formPekerjaanPasangan.get('pendapatan_lain')?.value,
          total_pendapatan: totalPendapatan,
          no_siup: this.formPekerjaanPasangan.get('no_siup')?.value,
          umur_pensiun: this.kirimUmurPensi,
          jarak_lokasi_usaha: this.formPekerjaanPasangan.get('jarak_lokasi_usaha')?.value,
        })

        .subscribe({
          next: bawaan => {
            alert('Berhasil Menyimpan Data');
            // setTimeout(() => {
            this.router.navigate(['/data-entry/collateral'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
        });
    }
  }

  carimenggunakankodepos(kodepost: any, req: any) {
    // alert(kodepost)
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.untukprovinsijobpasangan = res.body?.result.provKec.nm_prov;

        this.untukkobkotajobpasangan = res.body?.result.provKec.nm_kota;

        this.untukkecamatanjobpasangan = res.body?.result.provKec.nm_kec;

        this.untukkelurahanjobpasangan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang_swasta option:first').text(this.untukprovinsijobpasangan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang_swasta option:first').text(this.untukkobkotajobpasangan);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_swasta option:first').text(this.untukkecamatanjobpasangan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_swasta option:first').text(this.untukkelurahanjobpasangan);
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
