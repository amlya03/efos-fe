import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { callreportnon } from './call-report-nonmodel';
import { LocalStorageService } from 'ngx-webstorage';

export type EntityResponseDaWa = HttpResponse<callreportnon>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-call-report-non',
  templateUrl: './call-report-non.component.html',
  styleUrls: ['./call-report-non.component.scss'],
})
export class CallReportNonComponent implements OnInit {
  datakirimiancure: any;
  app_no_de: any;
  daWa: any;
  daWa1: any;
  nowawancara: any;
  contohtex: any;
  untukSessionRole: any;
  skalaprusahaan: any;
  checkboxCeksiu: any;
  checkboxCeksiup: any;
  checkboxCeknib: any;
  checkboxCekskdu: any;
  checkboxCekskdp: any;
  checkboxCekaktapendirian: any;
  tempunganCek: Array<number> = [];
  checkboxCek: any;
  textwawancara: any;
  untukSessionfullname: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getCallReportByDe?sd=');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getDataEntryByDe?sd=');
  protected apgetnowawancara = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/get_call_report_seq');
  protected apiskalaperusahaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-ref/list_skala_perusahaan'
  );

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionfullname = this.localStorageService.retrieve('sessionFullName');
    this.load();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    // $('#denganini').val(
    //   'JALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALANJALAN'
    // );
    this.contohtex =
      'Dengan ini saya menyatakan hasil wawancara yang diisi oleh saya "+Aoname+" dan pemberi Informasi yang disebut nasabah adalah benar adanya "+ userName';
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('callreportnon', res);

        if (res.body?.result == null) {
          this.daWa = 0;
          // this.daWade = 0;
        } else {
          this.daWa = res.body?.result;
          this.checkboxCek = this.daWa.legalitas_usaha.split(', ');

          alert(this.checkboxCek);
          for (let i = 0; i < this.checkboxCek.length; i++) {
            // alert(this.checkboxCek[i] == "Sertifikat")
            if (this.checkboxCek[i] == 'SIU') {
              this.checkboxCeksiu = 'SIU';
              alert(this.checkboxCeksiu);
            } else if (this.checkboxCek[i] == 'SIUP') {
              this.checkboxCeksiup = 'SIUP';
            } else if (this.checkboxCek[i] == 'NIB') {
              this.checkboxCeknib = 'NIB';
            } else if (this.checkboxCek[i] == 'SKDU') {
              this.checkboxCekskdu = 'SKDU';
            } else if (this.checkboxCek[i] == 'SKDP') {
              this.checkboxCekskdp = 'SKDP';
            } else if (this.checkboxCek[i] == 'Akta Pendirian') {
              this.checkboxCekaktapendirian = 'Akta Pendirian';
            }
          }
        }
      },
    });

    this.getdataentrynama().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('untukatas', res);
        this.daWa1 = res.body?.result;

        this.textwawancara =
          'Dengan ini saya menyatakan hasil wawancara yang diisi oleh saya ' +
          this.untukSessionfullname +
          ' dan pemberi Informasi yang disebut nasabah adalah benar adanya ' +
          this.daWa1.nama;
      },
    });

    this.getskalaprusahaan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('skalaperusaahaan', res.body?.result);
        this.skalaprusahaan = res.body?.result;
      },
    });
    // alert(this.checkboxCek);

    if (this.daWa == null) {
      this.getnomorwawancara().subscribe({
        next: (res: EntityArrayResponseDaWa) => {
          console.warn('contohwawancarano', res);
          this.nowawancara = res.body?.result;
          $('#no_wawancara').val('CR' + '_' + this.app_no_de + '_' + this.nowawancara);
          $('#no_wawancara1').val(this.nowawancara);
        },
      });
    } else {
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    alert(this.app_no_de);
    // this.router.navigate(['/memo'], { queryParams: {  } });
    this.router.navigate(['/data-entry/memo'], {
      queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.datakirimiancure },
    });
  }

  getskalaprusahaan(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apiskalaperusahaan, { params: options, observe: 'response' });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.app_no_de, { params: options, observe: 'response' });
  }
  getdataentrynama(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.app_no_de, { params: options, observe: 'response' });
  }
  getnomorwawancara(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apgetnowawancara, { params: options, observe: 'response' });
  }

  onCheckCek(e: any) {
    this.checkboxCeksiu = '';
    this.checkboxCeksiup = '';
    this.checkboxCeknib = '';
    this.checkboxCekskdu = '';
    this.checkboxCekskdp = '';
    this.checkboxCekaktapendirian = '';
    if (e.target.checked) {
      // cek.push(new FormControl(e.target.value));
      this.tempunganCek.push(e.target.value);
      // alert(this.tempunganCek)
    }
  }
  onclikwawancara(e: any) {
    if (e.target.checked) {
      $('#buttonsimpan').removeAttr('hidden');
    } else {
      $('#buttonsimpan').attr('hidden', 'hidden');
    }

    // $('#uang_muka').removeAttr('hidden');
  }

  simpancallreport() {
    // contohtampungankategoripekerjaan: any // contohtampunganappde: any, // contohtampungstatuskawain: any, // contohtampungancuref: any,

    const tipe_nasabah = document.getElementById('tipe_nasabah') as HTMLInputElement | any;
    const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
    const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
    const tipe_kendaraan1 = document.getElementById('tipe_kendaraan1') as HTMLInputElement | any;
    const status_agunan = document.getElementById('status_agunan') as HTMLInputElement | any;
    const dokumen_kepemilikan = document.getElementById('dokumen_kepemilikan') as HTMLInputElement | any;
    const catatan_dokumen_agunan = document.getElementById('catatan_dokumen_agunan') as HTMLInputElement | any;
    const posisi_dokumen = document.getElementById('posisi_dokumen') as HTMLInputElement | any;
    const catatan_posisi_dokumen = document.getElementById('catatan_posisi_dokumen') as HTMLInputElement | any;
    const jenis_usaha_call = document.getElementById('jenis_usaha_call') as HTMLInputElement | any;
    const lama_usaha = document.getElementById('lama_usaha') as HTMLInputElement | any;
    const bidang_usaha = document.getElementById('bidang_usaha') as HTMLInputElement | any;
    const nama_badan_usaha = document.getElementById('nama_badan_usaha') as HTMLInputElement | any;
    const skala_perusahaan = document.getElementById('skala_perusahaan') as HTMLInputElement | any;
    const jenis_produk = document.getElementById('jenis_produk') as HTMLInputElement | any;
    const tahun_berdiri_perusahaan = document.getElementById('tahun_berdiri_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('jumlah_karyawan') as HTMLInputElement | any;
    const kondisi_pandemik = document.getElementById('kondisi_pandemik') as HTMLInputElement | any;
    const kepemilikan_usaha = document.getElementById('kepemilikan_usaha') as HTMLInputElement | any;

    const tipe_pekerjaan_pasangan = document.getElementById('tipe_pekerjaan_pasangan') as HTMLInputElement | any;
    const status_pekerjaan_pasangan = document.getElementById('status_pekerjaan_pasangan') as HTMLInputElement | any;
    const lama_bekerja_bulan_pasangan = document.getElementById('lama_bekerja_bulan_pasangan') as HTMLInputElement | any;
    const lama_bekerja_tahun_pasangan = document.getElementById('lama_bekerja_tahun_pasangan') as HTMLInputElement | any;
    const jabatan_terakhir_pasangan = document.getElementById('jabatan_terakhir_pasangan') as HTMLInputElement | any;
    const nama_perusahaan_pasangan = document.getElementById('nama_perusahaan_pasangan') as HTMLInputElement | any;
    const bidang_usaha_pasangan = document.getElementById('bidang_usaha_pasangan') as HTMLInputElement | any;
    const skala_perusahaan_pasangan = document.getElementById('skala_perusahaan_pasangan') as HTMLInputElement | any;
    const tahun_berdiri_perusahaan_pasangan = document.getElementById('tahun_berdiri_perusahaan_pasangan') as HTMLInputElement | any;
    const alamat_perusahaan_pasangan = document.getElementById('alamat_perusahaan_pasangan') as HTMLInputElement | any;
    const jumlah_karyawan_perusahaan_pasangan = document.getElementById('jumlah_karyawan_perusahaan_pasangan') as HTMLInputElement | any;
    const kondisi_pandemi_pasangan = document.getElementById('kondisi_pandemi_pasangan') as HTMLInputElement | any;
    // const email = document.getElementById('email') as HTMLInputElement | any;
    const no_kontak_hr_pasangan = document.getElementById('no_kontak_hr_pasangan') as HTMLInputElement | any;
    const laba_periode_1 = document.getElementById('laba_periode_1') as HTMLInputElement | any;
    const laba_periode_2 = document.getElementById('laba_periode_2') as HTMLInputElement | any;
    const laba_periode_3 = document.getElementById('laba_periode_3') as HTMLInputElement | any;
    const laba_periode_4 = document.getElementById('laba_periode_4') as HTMLInputElement | any;
    const rata_rata_laba = document.getElementById('rata_rata_laba') as HTMLInputElement | any;
    const estimasi_angsuran = document.getElementById('estimasi_angsuran') as HTMLInputElement | any;
    const tercermin_rekening = document.getElementById('tercermin_rekening') as HTMLInputElement | any;
    const tanggal_wawancara = document.getElementById('tanggal_wawancara') as HTMLInputElement | any;
    const no_wawancara = document.getElementById('no_wawancara') as HTMLInputElement | any;
    const catatan_status_agunan = document.getElementById('catatan_status_agunan') as HTMLInputElement | any;
    // const angsuran = document.getElementById('angsuran') as HTMLInputElement | any;
    // let cekKe = this.tempunganCek.join(', ');
    let legalitas = this.tempunganCek.join(', ');
    alert('ini create');
    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/create_call_report', {
        // headers: headers,

        alamat_perusahaan: alamat_perusahaan.value,
        alamat_perusahaan_pasangan: alamat_perusahaan_pasangan.value,
        alamat_tinggal: alamat_ktp.value,
        app_no_de: this.app_no_de,
        bidang_usaha: bidang_usaha.value,
        bidang_usaha_pasangan: bidang_usaha_pasangan.value,
        // bulan_berdiri_perusahaan: "string",
        // bulan_berdiri_perusahaan_pasangan: "string",
        cabang: 'string',
        catatan_dokumen_agunan: catatan_dokumen_agunan.value,
        catatan_posisi_dokumen: catatan_posisi_dokumen.value,
        catatan_status_agunan: catatan_status_agunan.value,
        created_by: 'string',
        // created_date: "2022-10-06T07:02:19.704Z",
        curef: this.datakirimiancure,
        dokumen_agunan: dokumen_kepemilikan.value,
        estimasi_angsuran: estimasi_angsuran.value,
        id: 0,
        // jabatan_terakhir: "string",
        jabatan_terakhir_pasangan: jabatan_terakhir_pasangan.value,
        jenis_produk: jenis_produk.value,
        jenis_usaha: jenis_usaha_call.value,
        jumlah_karyawan: jumlah_karyawan.value,
        jumlah_karyawan_perusahaan_pasangan: jumlah_karyawan_perusahaan_pasangan.value,
        kategori_pekerjaan: '',
        kendaraan: tipe_kendaraan1.value,
        kepemilikan_usaha: kepemilikan_usaha.value,
        // keterangan: "string",
        kondisi_pandemi: kondisi_pandemik.value,
        kondisi_pandemi_perusahaan_pasangan: kondisi_pandemi_pasangan.value,
        laba_periode_1: laba_periode_1.value,
        laba_periode_2: laba_periode_2.value,
        laba_periode_3: laba_periode_3.value,
        laba_periode_4: laba_periode_4.value,
        // lama_bekerja_bulan: "string",
        lama_bekerja_bulan_pasangan: lama_bekerja_bulan_pasangan.value,
        // lama_bekerja_tahun: "string",
        lama_bekerja_tahun_pasangan: lama_bekerja_tahun_pasangan.value,
        lama_usaha: lama_usaha.value,
        legalitas_usaha: legalitas,
        nama_ao: 'string',
        nama_perusahaan: nama_badan_usaha.value,
        nama_perusahaan_pasangan: nama_perusahaan_pasangan.value,
        // no_kontak_hr: "string",
        no_kontak_hr_pasangan: no_kontak_hr_pasangan.value,
        no_wawancara: no_wawancara.value,
        pendidikan: pendidikan.value,
        posisi_dokumen: posisi_dokumen.value,
        rata_rata_laba: rata_rata_laba.value,
        skala_perusahaan: skala_perusahaan.value,
        skala_perusahaan_pasangan: skala_perusahaan_pasangan.value,
        status_agunan: status_agunan.value,
        status_kawin: status_perkawinan.value,
        // status_pekerjaan: "string",
        status_pekerjaan_pasangan: status_pekerjaan_pasangan.value,
        tahun_berdiri_perusahaan: tahun_berdiri_perusahaan.value,
        tahun_berdiri_perusahaan_pasangan: tahun_berdiri_perusahaan_pasangan.value,
        // take_home_pay: "string",
        tanggal_lahir: tanggal_lahir.value,
        tanggal_wawancara: tanggal_wawancara.value,
        // tipe_pekerjaan: "string",
        tipe_pekerjaan_pasangan: tipe_pekerjaan_pasangan.value,
        validasi_rekening: tercermin_rekening.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/memo'], {
            queryParams: {
              // datakiriman: contohtampungancuref,
              // statusPerkawinan: contohtampungstatuskawain,
              // app_no_de: contohtampunganappde,
              // datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
            },
          });
        },
      });
  }
}
