import { Component, Input, OnInit } from '@angular/core';
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
import { InitialDataEntryService } from 'app/initial-data-entry/services/initial-data-entry.service';
import { refSektor } from 'app/initial-data-entry/services/config/refSektor.model';
import { refBidang } from 'app/initial-data-entry/services/config/refBidang.model';
import { environment } from 'environments/environment';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-pekerjaan-pasangan',
  templateUrl: './pekerjaan-pasangan.component.html',
  styleUrls: ['./pekerjaan-pasangan.component.scss'],
})
export class PekerjaanPasanganComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
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
  kategoriPekerjaan: any;
  tipePekerjaanChange: any;
  kirimKatePeker: any;
  kirimUmurPensi: any;
  kirimJenisBidang: any;
  kirimPro: any;
  kirimKot: any;
  kirimKec: any;
  kirimKel: any;
  kirimansiup: any;
  jenispekerjaan: any;
  getjabatan: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  kecamatan: any;
  kelurahan: any;
  daWakodepos: any;
  getdatasektorekonomi: refSektor[] = [];
  getjenisbidangdariapi: refBidang[] = [];
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
  retriveKodeProvinsi: any;
  retriveKodeKota: any;
  retriveKodeKecamatan: any;
  retriveKodeKelurahan: any;

  constructor(
    protected initialDataEntry: InitialDataEntryService,
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
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.getLoading(true);
    //////////////////////////// validasi /////////////////////////////////////////
    this.formPekerjaanPasangan = this.formBuilder.group({
      posisi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nama_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      alamat_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      no_siup: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jenis_bidang: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      sektor_ekonomi: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jumlah_karyawan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_perusahaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_bulan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      lama_bekerja_tahun: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      status_kepegawaian: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tunjangan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],

      pendapatan_lain: { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },

      total_pendapatan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      umur_pensiun: [
        { value: '55' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kategori_pekerjaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_pekerjaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jarak_lokasi_usaha: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      provinsi:[{ value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },Validators.required,],
      kabkota: [{ value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },Validators.required,],
      kecamatan: [{ value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },Validators.required,],
      kelurahan: [{ value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },Validators.required,],
      kode_pos: [{ value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },Validators.required,],
      // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    });
    this.load();
  }

  load(): void {
    this.gettokendukcapil();
    ///////////////////////////// REF ////////////////////////////////////////
    setTimeout(() => {
      this.datEntryService.getFetchListJenisPekerjaan().subscribe(data => {
        this.listJabatan = data.result;
      });
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchListJabatan().subscribe(data => {
        this.listJabatanAll = data.result;
      });
    }, 15);
    setTimeout(() => {
      this.datEntryService.getFetchTipePerusahaan().subscribe(data => {
        this.listTipePerusahaan = data.result;
      });
    }, 20);
    setTimeout(() => {
      this.datEntryService.getFetchListJumlahKaryawan().subscribe(data => {
        this.ListJumlahKaryawan = data.result;
      });
    }, 25);
    setTimeout(() => {
      this.initialDataEntry.getBidang().subscribe(data => {
        this.getjenisbidangdariapi = data.result;
      });
    }, 30);
    ///////////////////////////// REF ////////////////////////////////////////

    setTimeout(() => {
      this.datEntryService.getSemuaDataJobPasangan(this.curef).subscribe(data => {
        if (data.result == null) {
          this.getLoading(false);
        }
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
          // ///////////////////////////////////////
          provinsi: '',
          kabkota: '',
          kecamatan: '',
          kelurahan: '',
          kode_pos: this.listJobPasangan.kode_pos,
          // //////////////////////////////////////
        };
        this.formPekerjaanPasangan.setValue(retrivejobpasangan);

        setTimeout(() => {
          this.getLoading(false);
          this.carimenggunakankodepos(this.listJobPasangan.kode_pos);
        }, 300);

        this.untukprovinsijobpasangan = this.listJobPasangan.provinsi;
        this.untukkobkotajobpasangan = this.listJobPasangan.kabkota;
        this.untukkecamatanjobpasangan = this.listJobPasangan.kecamatan;
        this.untukkelurahanjobpasangan = this.listJobPasangan.kelurahan;
        this.untukjenisbidang = this.listJobPasangan.jenis_bidang;
        this.unutkjenissektor = this.listJobPasangan.sektor_ekonomi;
      });
    }, 50);
  }

  pilihTipePeker(value: any) {
    // alert(value)
    this.datEntryService.getFetchListTipePekerjaan(value).subscribe(data => {
      this.listTipePekerjaan = data.result;
      //console.log('tipe ' + this.listTipePekerjaan);
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

          // console.warn(data.result.token);
          // console.warn(this.postId);
          // this.router.navigate(['/daftaraplikasiide'], {
          //   queryParams: {},
          // });
          // alert('dapetnih');

          this.datEntryService.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              //console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
              // alert(this.postId);
              // this.onResponseSuccess(res);
            },
          });
        },
      });
  }

  jenisbidangsebelumselect(value: any) {
    const idsektorpotongan = value.split('|');
    this.initialDataEntry.getSektor(idsektorpotongan[0]).subscribe(data => {
      this.getdatasektorekonomi = data.result;
    });
  }

  onChange(value: any) {
    const proValue = value.split('|');
    this.datEntryService.getkabkota(this.postId, proValue[0]).subscribe(data => {
      this.daWakota = data.body?.result;
      this.formPekerjaanPasangan.get('kabkota')?.setValue(this.retriveKodeKota + '|' + this.retrivekabkota);
    });
  }

  onChangekota(value: any) {
    const kotaValue = value.split('|');
    this.datEntryService.getkecamatan(this.postId, kotaValue[0]).subscribe(data => {
      this.kecamatan = data.body?.result;
      this.formPekerjaanPasangan.get('kecamatan')?.setValue(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
  }

  onChangekecamatan(value: any) {
    const kecValue = value.split('|');
    this.datEntryService.getkelurahan(this.postId, kecValue[0]).subscribe(data => {
      this.kelurahan = data.body?.result;
      this.formPekerjaanPasangan.get('kelurahan')?.setValue(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
    });
  }

  onChangekelurahan(value: any) {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.formPekerjaanPasangan.get('kode_pos')?.setValue(this.daWakodepos);
  }

  goto(): void {
    // this.onResponseSuccess(res);
    // alert('otw collateral1 ');
    // console.warn('colalteral', this.app_no_de, this.curef, this.datakirimanakategoripekerjaan);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }

  updatejobpasangan() {
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

    if (this.formPekerjaanPasangan.get('provinsi')?.value != null) {
      const kirimanpro = this.formPekerjaanPasangan.get('provinsi')?.value.split('|');
      this.kirimPro = kirimanpro[1];
    } else {
      this.kirimPro = '';
    }
    if (this.formPekerjaanPasangan.get('kabkota')?.value != null) {
      const kirimankabkota = this.formPekerjaanPasangan.get('kabkota')?.value.split('|');
      this.kirimKot = kirimankabkota[1];
    } else {
      this.kirimKot = '';
    }
    if (this.formPekerjaanPasangan.get('kecamatan')?.value != null) {
      const kirimankec = this.formPekerjaanPasangan.get('kecamatan')?.value.split('|');
      this.kirimKec = kirimankec[1];
    } else {
      this.kirimKec = '';
    }
    if (this.formPekerjaanPasangan.get('kelurahan')?.value != null) {
      const kirimankel = this.formPekerjaanPasangan.get('kelurahan')?.value.split('|');
      this.kirimKel = kirimankel[1];
    } else {
      this.kirimKel = '';
    }
    if (this.formPekerjaanPasangan.get('jenis_bidang')?.value != null) {
      const potonganjenisbidang = this.formPekerjaanPasangan.get('jenis_bidang')?.value.split('|');
      this.kirimJenisBidang = potonganjenisbidang[1];
    } else {
      this.kirimJenisBidang = '';
    }

    if (this.listJobPasangan == null) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/create_job_info_pasangan', {
          curef: this.curef,
          created_by: this.SessionStorageService.retrieve('sessionUserName'),
          kategori_pekerjaan: this.kirimKatePeker,
          tipe_pekerjaan: this.formPekerjaanPasangan.get('tipe_pekerjaan')?.value,
          posisi: this.formPekerjaanPasangan.get('posisi')?.value,
          nama_perusahaan: this.formPekerjaanPasangan.get('nama_perusahaan')?.value,
          alamat_perusahaan: this.formPekerjaanPasangan.get('alamat_perusahaan')?.value,
          provinsi: this.kirimPro,
          kabkota: this.kirimKot,
          kecamatan: this.kirimKec,
          kelurahan: this.kirimKel,
          kode_pos: this.formPekerjaanPasangan.get('kode_pos')?.value,
          jenis_bidang: this.kirimJenisBidang,
          sektor_ekonomi: this.formPekerjaanPasangan.get('sektor_ekonomi')?.value,
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
                app_no_de: this.app_no_de,
              },
            });
          },
          error(err) {
            console.warn(err);
            alert(err.error.message);
          },
        });
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/update_job_info_pasangan', {
          curef: this.curef,
          updated_by: this.SessionStorageService.retrieve('sessionUserName'),
          kategori_pekerjaan: this.kirimKatePeker,
          tipe_pekerjaan: this.formPekerjaanPasangan.get('tipe_pekerjaan')?.value,
          posisi: this.formPekerjaanPasangan.get('posisi')?.value,
          nama_perusahaan: this.formPekerjaanPasangan.get('nama_perusahaan')?.value,
          alamat_perusahaan: this.formPekerjaanPasangan.get('alamat_perusahaan')?.value,
          provinsi: this.kirimPro,
          kabkota: this.kirimKot,
          kecamatan: this.kirimKec,
          kelurahan: this.kirimKel,
          kode_pos: this.formPekerjaanPasangan.get('kode_pos')?.value,
          jenis_bidang: this.kirimJenisBidang,
          sektor_ekonomi: this.formPekerjaanPasangan.get('sektor_ekonomi')?.value,
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
                app_no_de: this.app_no_de,
              },
            });
          },
          error(err) {
            alert(err.error.message);
          },
        });
    }
  }

  carimenggunakankodepos(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe(data => {
      this.retriveKodeProvinsi = data.body?.result.provKec.kd_prov;
      this.retriveKodeKota = data.body?.result.provKec.kd_kota;
      this.retriveKodeKecamatan = data.body?.result.provKec.kd_kec;
      this.retriveprovinsi = data.body?.result.provKec.nm_prov;
      this.retrivekabkota = data.body?.result.provKec.nm_kota;
      this.retrivekecamatan = data.body?.result.provKec.nm_kec;

      if (data.body?.result.provKec.kd_kel == null) {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.body?.result.kels[0].namaWilayah;
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      } else {
        this.retriveKodeKelurahan = kodepost;
        this.retrivekelurahan = data.body?.result.provKec.nm_kel;
        this.onChangekelurahan(this.retriveKodeKelurahan + '|' + this.retrivekelurahan);
      }
      this.formPekerjaanPasangan.get('provinsi')?.setValue(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChange(this.retriveKodeProvinsi + '|' + this.retriveprovinsi);
      this.onChangekota(this.retriveKodeKota + '|' + this.retrivekabkota);
      this.onChangekecamatan(this.retriveKodeKecamatan + '|' + this.retrivekecamatan);
    });
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

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
