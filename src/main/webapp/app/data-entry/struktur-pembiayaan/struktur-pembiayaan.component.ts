import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { strukturpembiayaanmodel } from './struktur-pembiayaan-model';
import { LocalStorageService } from 'ngx-webstorage';

export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-struktur-pembiayaan',
  templateUrl: './struktur-pembiayaan.component.html',
  styleUrls: ['./struktur-pembiayaan.component.scss'],
})
export class StrukturPembiayaanComponent implements OnInit {
  datakiriman: any;
  datakirimiancure: any;
  curef: any;
  datakirimanakategoripekerjaan: any;
  app_no_de: any;

  daWa: any;
  Kodefasilitas: any;
  kodeprogram: any;
  kodeproduk: any;
  kodeskema: any;
  kodetenor: any;
  merginstepup: any;
  databawaan: any;
  postId: any;
  errorMessage: any;
  untukSessionRole: any;
  tujuanpembiayaan: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
  }
  protected getekodefasilitas = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_fasilitas');
  protected apigettujuanpembiayaan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_tujuan_pembiayaan'
  );

  protected getkodeprogramstruktur = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/list_program?sp='
  );
  protected getkodeproduknya = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_produk?sp=');
  protected getskema = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_skema?ss=');
  protected getfix = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tenor_fix?ss=');
  protected getstepup = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tenor_stepup?ss=');
  protected getmarginstepup = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/list_margin_stepup?ss='
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getStrukturBiayaByDe?');

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.load();
    // console.warn('strukturdata', this.datakirimiancure);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('strukturdata', res);

        if (res.body?.result == null) {
          this.daWa = '0';
        } else {
          this.daWa = res.body?.result;
        }

        // this.onResponseSuccess(res);
      },
    });

    this.getkodefasilitas().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('kodefasilitas', res.body?.result);
        this.Kodefasilitas = res.body?.result;
      },
    });

    this.gettujuanpembiayaan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('kodefasilitas', res.body?.result);
        this.tujuanpembiayaan = res.body?.result;
      },
    });
  }
  getkodefasilitas(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.getekodefasilitas, { params: options, observe: 'response' });
  }

  gettujuanpembiayaan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigettujuanpembiayaan, { params: options, observe: 'response' });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + 'sc=' + this.curef + '&sd=' + this.app_no_de, {
      params: options,
      observe: 'response',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.onResponseSuccess(res);
    alert('ke emergency');
    alert(this.datakirimanakategoripekerjaan);
    alert(this.app_no_de);
    this.router.navigate(['/data-entry/emergency-contact'], {
      queryParams: {
        app_no_de: this.app_no_de,
        datakirimiancure: this.datakirimiancure,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }

  onchangefasilitas(kodefasilitasnya: any) {
    const provinsi_cabang = document.getElementById('kode_fasilitas') as HTMLInputElement | any;

    var potongankodefasilitas = provinsi_cabang.value.split('|');

    alert(potongankodefasilitas[0]);
    // alert(this.postId);
    // console.log('kode' + selectedStatus);
    console.log('kode' + provinsi_cabang.value);

    if (potongankodefasilitas[0] == 'U') {
      $('#uang_muka').attr('hidden', 'hidden');
      $('#siapsiap').attr('hidden', 'hidden');
    } else {
      $('#siapsiap').removeAttr('hidden');
      $('#uang_muka').removeAttr('hidden');
    }
    this.getkodeprogram(provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodefasilitas', res);

        this.kodeprogram = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onchangeprogram(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('program') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    console.log('kode' + provinsi_cabang.value);

    this.getkodeproduk(provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodeproduk', res);

        this.kodeproduk = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onchangeproduk(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('produk') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    console.log('kode' + provinsi_cabang.value);
    this.getkodeskema(provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('skema', res);

        this.kodeskema = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }

  onchangeskema(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('skema') as HTMLInputElement | any;
    const pemisahskemamaster = provinsi_cabang.value.split('|');
    alert(pemisahskemamaster[1]);
    if (pemisahskemamaster[1] == 1) {
      let tipePro = '<option selected value="fix">FIX</option>';
      tipePro = tipePro + '';
      $('#tipe_margin').append(tipePro);

      console.log('kode' + selectedStatus);
      console.log('kode' + provinsi_cabang.value);
      this.gettenor(provinsi_cabang.value).subscribe({
        next: (res: EntityArrayResponseDaWa) => {
          console.warn('tenor', res);

          this.kodetenor = res.body?.result;
          // alert(this.postId);
          // this.onResponseSuccess(res);
        },
      });
    } else {
      let tipePro = '<option selected value="stepup">STEPUP</option>';
      tipePro = tipePro + '';
      $('#tipe_margin').append(tipePro);

      console.log('kode' + selectedStatus);
      console.log('kode' + provinsi_cabang.value);
      this.gettenor(provinsi_cabang.value).subscribe({
        next: (res: EntityArrayResponseDaWa) => {
          console.warn('tenor', res);

          this.kodetenor = res.body?.result;
          // alert(this.postId);
          // this.onResponseSuccess(res);
        },
      });
    }
  }

  onchangejangkawaktu(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('jangka_waktu') as HTMLInputElement | any;
    const pemisahfixorstepup = document.getElementById('skema') as HTMLInputElement | any;

    const pemisahfixr = provinsi_cabang.value.split('|');
    const pemisahskemamaster = pemisahfixorstepup.value.split('|');

    if (pemisahskemamaster[1] == 1) {
      let margin = pemisahfixr[1];
      margin = margin + '';
      $('#margin').val(margin);
      $('#margin1').val(margin);

      // alert('masukmargin')
      // $('#margin').val=pemisahfixr[1];
    } else {
      //  alert('kokhilang ');
      this.getmargin(pemisahskemamaster[0]).subscribe({
        next: (res: EntityArrayResponseDaWa) => {
          console.warn('marginstepup', res);

          var marginke1 = res.body?.result[0];
          var marginke2 = res.body?.result[1];

          $('#margin').val('Margin ke1=' + marginke1 + 'margin ke2=' + marginke2);
          $('#margin1').val(marginke1);

          // this.merginstepup = res.body?.result;
          // alert(this.postId);
          // this.onResponseSuccess(res);
        },
      });
    }
    // alert(this.postId);
  }

  getkodeprogram(kodefasilitas: any, req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    const kodepotongan = kodefasilitas.split('|');
    return this.http.get<ApiResponse>(this.getkodeprogramstruktur + kodepotongan[0], { params: options, observe: 'response' });
  }

  getkodeproduk(kodeproduk: any, req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    const kodepotongan = kodeproduk.split('|');
    return this.http.get<ApiResponse>(this.getkodeproduknya + kodepotongan[0], { params: options, observe: 'response' });
  }
  getkodeskema(kodeskema: any, req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    const kodepotongan = kodeskema.split('|');
    return this.http.get<ApiResponse>(this.getskema + kodepotongan[0], { params: options, observe: 'response' });
  }

  gettenor(kodeskema: any, req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    const kodepotongan = kodeskema.split('|');
    if (kodepotongan[1] == 1) {
      return this.http.get<ApiResponse>(this.getfix + kodepotongan[0], { params: options, observe: 'response' });
    } else {
      return this.http.get<ApiResponse>(this.getstepup + kodepotongan[0], { params: options, observe: 'response' });
    }
  }
  getmargin(kodeproduk: any, req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    // const kodepotongan=kodeproduk.split('|')
    return this.http.get<ApiResponse>(this.getmarginstepup + kodeproduk, { params: options, observe: 'response' });
  }

  itungrincihan() {
    const kode_fasilitas = document.getElementById('kode_fasilitas') as HTMLInputElement | any;
    const program = document.getElementById('program') as HTMLInputElement | any;
    const produk = document.getElementById('produk') as HTMLInputElement | any;
    const skema = document.getElementById('skema') as HTMLInputElement | any;
    const fasilitas_ke = document.getElementById('fasilitas_ke') as HTMLInputElement | any;
    const jangka_waktu = document.getElementById('jangka_waktu') as HTMLInputElement | any;
    const uang_muka = document.getElementById('uang_muka') as HTMLInputElement | any;
    const harga_objek_pembiayaan = document.getElementById('harga_objek_pembiayaan') as HTMLInputElement | any;
    // const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;

    var kirimanpotonganprovinsi = kode_fasilitas.value.split('|');
    var kirimanprogram = program.value.split('|');
    var kirimanproduk = produk.value.split('|');
    var kirimanskema = skema.value.split('|');
    // var kirimanfasilitas = provinsi_cabang.value.split('|');
    var kirimanjangkawaktu = jangka_waktu.value.split('|');

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
        // headers: headers,

        app_no_de: this.app_no_de,
        curef: this.datakirimiancure,
        dp: uang_muka.value,
        fasilitas: fasilitas_ke.value,
        harga_objek: harga_objek_pembiayaan.value,
        kode_fasilitas: kirimanpotonganprovinsi[0],
        kode_produk: kirimanproduk[0],
        skema_id: kirimanskema[0],
        skema_master: kirimanskema[1],
        tenor: kirimanjangkawaktu[0],
      })

      .subscribe({
        next: data => {
          this.postId = data.result;

          var anguran1 = data.result.angsuran[0];
          var anguran2 = data.result.angsuran[1];
          var nilai = data.result.nilai_pembiayaan;

          if (anguran2 == null) {
            $('#angsuran').val(anguran1);
            $('#angsurankirim').val(anguran1);
          } else {
            $('#angsurankirim').val(anguran1);
            $('#angsuran').val('Angsuran ke1=' + anguran1 + 'Angsuran ke2=' + anguran2);
          }

          $('#hasil_pembiayaan').val(nilai);

          alert(this.postId);
          alert(anguran2);
          console.warn('There was an error!', data);
        },
        error: error => {
          this.errorMessage = error.error.message;
          console.error('There was an error!', error);

          alert(this.errorMessage);
        },
      });
  }

  simpanstruktur() {
    // contohtampungankategoripekerjaan: any // contohtampunganappde: any, // contohtampungstatuskawain: any, // contohtampungancuref: any,
    const joint_income = document.getElementById('joint_income') as HTMLInputElement | any;
    const kode_fasilitas = document.getElementById('kode_fasilitas') as HTMLInputElement | any;
    const program = document.getElementById('program') as HTMLInputElement | any;
    const produk = document.getElementById('produk') as HTMLInputElement | any;
    const skema = document.getElementById('skema') as HTMLInputElement | any;
    const jangka_waktu = document.getElementById('jangka_waktu') as HTMLInputElement | any;
    const tipe_margin = document.getElementById('tipe_margin') as HTMLInputElement | any;
    const tujuan_pembiayaan = document.getElementById('tujuan_pembiayaan') as HTMLInputElement | any;
    const fasilitas_ke = document.getElementById('fasilitas_ke') as HTMLInputElement | any;
    const margin1 = document.getElementById('margin1') as HTMLInputElement | any;
    const harga_objek_pembiayaan = document.getElementById('harga_objek_pembiayaan') as HTMLInputElement | any;
    const uang_muka = document.getElementById('uang_muka') as HTMLInputElement | any;
    const angsuran = document.getElementById('angsuran') as HTMLInputElement | any;
    const angsurankiriman = document.getElementById('angsurankirim') as HTMLInputElement | any;
    const hasil_pembiayaan = document.getElementById('hasil_pembiayaan') as HTMLInputElement | any;
    const detail_objek_pembiayaan = document.getElementById('detail_objek_pembiayaan') as HTMLInputElement | any;
    const fee_based = document.getElementById('fee_based') as HTMLInputElement | any;
    const codekodefasilitas = document.getElementById('codekodefasilitas') as HTMLInputElement | any;
    const codeprogram = document.getElementById('codeprogram') as HTMLInputElement | any;
    const codeproduk = document.getElementById('codeproduk') as HTMLInputElement | any;
    const codeskemamaster = document.getElementById('codeskemamaster') as HTMLInputElement | any;
    const codeskemaid = document.getElementById('codeskemaid') as HTMLInputElement | any;
    const idstruktur = document.getElementById('idstruktur') as HTMLInputElement | any;

    var kirimanpotongkodefasilitas = kode_fasilitas.value.split('|');
    if (kode_fasilitas.value.indexOf('|') !== -1) {
      var kirimankodefasilitas = kirimanpotongkodefasilitas[0];
      var kirimankodefasilitasname = kirimanpotongkodefasilitas[1];
    } else {
      var kirimankodefasilitas = codekodefasilitas.value;
      var kirimankodefasilitasname = kode_fasilitas.value;
    }

    var kirimanpotongproduk = produk.value.split('|');
    if (produk.value.indexOf('|') !== -1) {
      var kirimanproduk = kirimanpotongproduk[0];
      var kirimanprodukname = kirimanpotongproduk[1];
    } else {
      var kirimanproduk = codeproduk.value;
      var kirimanprodukname = produk.value;
    }

    var kirimanpotongprogram = program.value.split('|');
    if (program.value.indexOf('|') !== -1) {
      var kirimprogram = kirimanpotongprogram[0];
      var kirimprogramname = kirimanpotongprogram[1];
    } else {
      var kirimprogram = codeprogram.value;
      var kirimprogramname = program.value;
    }

    var kirimanpotongskema = skema.value.split('|');
    if (skema.value.indexOf('|') !== -1) {
      var kirimanskema = kirimanpotongskema[0];
      var kirimanskemanama = kirimanpotongskema[2];
      var kirimanskemmaster = kirimanpotongskema[1];
    } else {
      var kirimanskema = codeskemaid.value;
      var kirimanskemanama = skema.value;
      var kirimanskemmaster = codeskemamaster.value;
    }

    var kirimanjangwaktunya = jangka_waktu.value.split('|');
    if (jangka_waktu.value.indexOf('|') !== -1) {
      var kirimanjangkawaktu = kirimanjangwaktunya[0];
    } else {
      var kirimanjangkawaktu = jangka_waktu.value;
    }

    if (this.daWa == 0) {
      alert('ini create');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_struktur_pembiayaan', {
          // headers: headers,
          angsuran: angsurankiriman.value,
          app_no_de: this.app_no_de,
          created_by: 'string',
          // created_date: "",
          curef: this.curef,
          detail_objek_pembiayaan: detail_objek_pembiayaan.value,
          fasilitas_ke: fasilitas_ke.value,
          fee_based: fee_based.value,
          harga_objek_pembiayaan: harga_objek_pembiayaan.value,
          // id: 0,
          jangka_waktu: kirimanjangkawaktu,
          joint_income: 'contoh',
          kode_fasilitas: kirimankodefasilitas,
          kode_fasilitas_name: kirimankodefasilitasname,
          margin: margin1.value,
          nilai_pembiayaan: hasil_pembiayaan.value,
          produk: kirimanproduk,
          produk_name: kirimanprodukname,
          program: kirimprogram,
          program_name: kirimprogramname,
          skema: kirimanskema,
          skema_master: kirimanskemmaster,
          skema_name: kirimanskemanama,
          tipe_margin: tipe_margin.value,
          tujuan_pembiayaan: tujuan_pembiayaan.value,
          uang_muka: uang_muka.value,
        })

        .subscribe({
          next: bawaan => {
            //           this.contohdata = bawaan.result.app_no_de;
            this.databawaan = bawaan.result.app_no_de;
            // alert('MASUKAJAHSUSAH');
            this.router.navigate(['/data-entry/emergency-contact'], {
              queryParams: {
                app_no_de: this.app_no_de,
                curef: this.curef,
              },
            });
          },
        });
    } else {
      alert('ini update');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_struktur_pembiayaan', {
          // headers: headers,
          angsuran: angsurankiriman.value,
          app_no_de: this.app_no_de,
          created_by: 'string',
          created_date: '',
          curef: this.curef,
          detail_objek_pembiayaan: detail_objek_pembiayaan.value,
          fasilitas_ke: fasilitas_ke.value,
          fee_based: fee_based.value,
          harga_objek_pembiayaan: harga_objek_pembiayaan.value,
          // id: idstruktur.value,
          jangka_waktu: kirimanjangkawaktu,
          joint_income: joint_income.value,
          kode_fasilitas: kirimankodefasilitas,
          kode_fasilitas_name: kirimankodefasilitasname,
          margin: margin1.value,
          nilai_pembiayaan: hasil_pembiayaan.value,
          produk: kirimanproduk,
          produk_name: kirimanprodukname,
          program: kirimprogram,
          program_name: kirimprogramname,
          skema: kirimanskema,
          skema_master: kirimanskemmaster,
          skema_name: kirimanskemanama,
          tipe_margin: tipe_margin.value,
          tujuan_pembiayaan: tujuan_pembiayaan.value,
          uang_muka: uang_muka.value,
        })

        .subscribe({
          next: bawaan => {
            //           this.contohdata = bawaan.result.app_no_de;
            this.databawaan = bawaan.result.app_no_de;
            // alert('MASUKAJAHSUSAH');
            this.router.navigate(['/data-entry/emergency-contact'], {
              queryParams: {
                app_no_de: this.app_no_de,
                curef: this.curef,
              },
            });
          },
        });
    }
  }
}
