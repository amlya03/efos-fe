import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { DatePipe } from '@angular/common';
// import { count } from 'console';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-hasil-prescreening',
  templateUrl: './hasil-prescreening.component.html',
  styleUrls: ['./hasil-prescreening.component.scss'],
})
export class HasilPrescreeningComponent implements OnInit {
  daWa: any;
  datakirimanid: any;
  hasildhn: any;
  datakirimantgllahir: any;
  datakirimanappide: any;
  dataif: any;
  datadukcapil: any;
  contohdata: any;
  potongankakotanih: any;
  statusnikah: any;
  datadukcapilusername: any;
  datadukcapilpasangan: any;
  dawastatuspernikaham: any;
  dataslik: any;
  dataslikp: any;
  nama: any;
  ktp: any;
  duplikate: any;
  potongankakotanihpasangan: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimanid = params['datakirimanid'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimantgllahir = params['datakirimantgllahir'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappide = params['datakirimanappide'];
    });
  }

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getCustomerByAppId?sc=');
  protected getdhn = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/cekDhn');
  protected apigetslit = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/fetchDataSlik?sd=');
  protected apigetduplikat = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getDuplicateCheck?sk=');


  ngOnInit(): void {
    this.load();
  }

  load() {
    this.postUpdateStatus();

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('tabel', res);
        this.daWa = res.body?.result.customer;
        this.nama = res.body?.result.customer.nama;
        this.ktp = res.body?.result.customer.no_ktp;
        this.dawastatuspernikaham=res.body?.result.customer.status_perkawinan;
        console.warn('customer', res.body?.result.customer);
        alert( this.dawastatuspernikaham);
        // this.onResponseSuccess(res);
      ;
        const tglLahir = this.daWa.tanggal_lahir;
        const tglLahirpasangan = this.daWa.tanggal_lahir_pasangan;
        this.cekdukcapil(tglLahir, tglLahirpasangan);

        this.getduplikatc( this.ktp, this.nama).subscribe({
          next: (res: EntityArrayResponseDaWa) => {
           this.duplikate = res.body?.result;
            console.warn('duplikat', this.dataslik);
            console.warn('duplikat',res);
          },
        });

      },
    });

    this.getdataslik().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
 this.dataslik = res.body?.result.dataSlikResult;
        console.warn('sliknih', this.dataslik);
        console.warn('sliknih',res);
      },
    });

    this.getdataslikp().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
 this.dataslikp = res.body?.result.dataSlikResult;
        console.warn('sliknih', this.dataslik);
        console.warn('sliknih',res);
      },
    });



  }

  getdataslik(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigetslit + 'app_20221017_667', { params: options, observe: 'response' });
  }

  getdataslikp(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigetslit + 'app_20221017_667', { params: options, observe: 'response' });
  }


  getduplikatc(noktp:any,nama:any,req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigetduplikat + noktp +'&sn='+nama, { params: options, observe: 'response' });
  }


  cekdukcapil(tglLahir: any, tglLahirpasangan: any) {
    // let dateTime = new Date()
    let dateTime = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    var str1 = new Date();
    var str = new Date().setSeconds(0, 0);
    var dt = new Date(str1).toISOString();

    var str2 = new Date().setSeconds(0, 0);
    var dt2 = new Date(str2).toISOString().replace(/-/g, '');
    var stringhapustitik = dt2.replace(/T/g, '');
    var stringhilangz = stringhapustitik.replace(/Z/g, '');
    var stringhilangtitik = stringhilangz.replace(/'.'/g, '');
    var finalhasil = stringhilangtitik.replace(/:/g, '');
    var finalhasil2 = stringhilangtitik.replace(/./g, '');
    var d = new Date();
    var Datenih = new Date();
    var pipe = new DatePipe('en-US');
    var datee = tglLahir;
    var dateepasangan = tglLahirpasangan;

    const str4 = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    var timestamp = pipe.transform(Date.now(), 'yyyy-mm-dd HH:mm:ss');
    var tgllahirkirim = pipe.transform(datee, 'dd-MM-yyyy');
    var tgllahirkirimpasangan = pipe.transform(dateepasangan, 'dd-MM-yyyy');
    var hasilmiripdongbanyak = pipe.transform(datee, 'yyyy:MM:dd ');
    var hasilmiripdong = pipe.transform(Date.now(), 'yyyy:mm:ddHH:mm:ss');
    //  var hasilmiripdong1 = hasilmiripdong?.replace(/|/g,'');
    var hasilmiripdongfinal = hasilmiripdong?.replace(/:/g, '');
    // yyyy/mm/dd HH:mm:ss

    var datanih = d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

    var strnih = ['-', ':', '.', 'T'];
    var rplc = ['', '', '', ''];
    // var hasilakhirlelah=dt.replace(strnih,rplc);
    console.log('makantuh' + finalhasil);
    console.log(finalhasil2);
    console.log(datanih);
    console.log('benar' + dt);
    console.log('data' + str4);
    console.log(hasilmiripdong);
    console.log(hasilmiripdongfinal);
    console.log('tgl ini bener ' + tgllahirkirim);
    console.log('tgllahir' + datee);
    console.log('tgllahir' + hasilmiripdongbanyak);
    const reffNumber = 'aaa';
    // const timestamp = 'aaa';
    const local = 'aaa';
    const now = 'aaa';

    const kirimanprovinsi = this.daWa.provinsi.split('|');
    const kirimankabkota = this.daWa.kabkota.split('|');
    const kirimankecamatan = this.daWa.kecamatan.split('|');
    const kirimankelurahan = this.daWa.kelurahan.split('|');

    if (this.daWa.kabkota.indexOf(' ')) {
      this.potongankakotanih = this.daWa.kabkota.replace('Kota ', '');
    }

    if (this.daWa.kabkota_pasangan.indexOf(' ')) {
      this.potongankakotanihpasangan = this.daWa.kabkota.replace('Kota ', '');
    }
    if (this.daWa.status_perkawinan === 'Menikah') {
      this.statusnikah = 'KAWIN';
    } else {
      this.statusnikah = 'BELUM KAWIN';
    }

    if (this.daWa.status_perkawinan === 'Menikah') {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
          no_id: this.datakirimanappide,
          tanggal_lahir: this.datakirimanappide,

          reffNumber: hasilmiripdongfinal,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.daWa.no_ktp,
          noKK: '',
          namaLengkap: this.daWa.nama,
          jenisKelamin: this.daWa.jenis_kelamin,
          tempatLahir: '',
          tglLahir: tgllahirkirim,
          createdBy: '',
          appNoIde: this.daWa.app_no_ide,
          pendidikan: '',
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: '',
          statusHubKeluarga: '',
          alamat: this.daWa.alamat_ktp,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.daWa.provinsi,
          namaKabupaten: this.potongankakotanih,
          namaKecamatan: this.daWa.kecamatan,
          namaKelurahan: this.daWa.kelurahan,
          noRW: this.daWa.rw,
          noRT: this.daWa.rt,
          // password_dukcapil: '3foWeb@pp',
        })
        .subscribe({
          next: data => {
            const codeverifducapilapi = data.code;
            console.warn(codeverifducapilapi);

            if (codeverifducapilapi != 200) {
              alert('gagal !200');
            } else {
              if (data.result.responseCode != '00') {
                alert('ini gagal');
                alert(data.result.responseDesc);
                this.datadukcapil = null;
                console.warn('dukcapil' + this.datadukcapil);
                this.datadukcapilusername = null;
              } else {
                this.datadukcapil = data.result;
                console.warn('dukcapil' + this.datadukcapil);
                this.dataif = data.result.responseCode;
                alert('berhasil ');
              }
            }
          },
        });

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
          no_id: this.datakirimanappide,
          tanggal_lahir: this.datakirimanappide,

          reffNumber: hasilmiripdongfinal,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.daWa.no_ktp_pasangan,
          noKK: '',
          namaLengkap: this.daWa.nama_pasangan,
          jenisKelamin: this.daWa.jenis_kelamin_pasangan,
          tempatLahir: '',
          tglLahir: tgllahirkirimpasangan,
          createdBy: '',
          appNoIde: this.daWa.app_no_ide,
          pendidikan: '',
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: '',
          statusHubKeluarga: '',
          alamat: this.daWa.alamat_ktp_pasangan,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.daWa.provinsi_pasangan,
          namaKabupaten:  this.potongankakotanihpasangan,
          namaKecamatan: this.daWa.kecamatan_pasangan,
          namaKelurahan: this.daWa.kelurahan_pasangan,
          noRW: this.daWa.rw_pasangan,
          noRT: this.daWa.rt_pasangan,
          // password_dukcapil: '3foWeb@pp',
        })
        .subscribe({
          next: data => {
            const codeverifducapilapi = data.code;
            console.warn(codeverifducapilapi);

            if (codeverifducapilapi != 200) {
              alert('gagal !200');
            } else {
              if (data.result.responseCode != '00') {
                alert('ini gagal');
                alert(data.result.responseDesc);
                this.datadukcapilpasangan = null;
                console.warn('dukcapil' + this.datadukcapilpasangan);
                this.datadukcapilusername = null;
              } else {
                this.datadukcapilpasangan = data.result;
                console.warn('dukcapil' + this.datadukcapilpasangan);
                this.dataif = data.result.responseCode;
                alert('berhasil ');
              }
            }
          },
        });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/dukcapil_verify', {
          no_id: this.datakirimanappide,
          tanggal_lahir: this.datakirimanappide,

          reffNumber: hasilmiripdongfinal,
          timestamp: timestamp,
          channelID: 'EFOS',
          NIK: this.daWa.no_ktp,
          noKK: '',
          namaLengkap: this.daWa.nama,
          jenisKelamin: this.daWa.jenis_kelamin,
          tempatLahir: '',
          tglLahir: tgllahirkirim,
          createdBy: '',
          appNoIde: this.daWa.app_no_ide,
          pendidikan: '',
          pekerjaan: '',
          statusPerkawinan: this.statusnikah,
          namaIbuKandung: '',
          statusHubKeluarga: '',
          alamat: this.daWa.alamat_ktp,
          kodePropinsi: '',
          kodeKabupaten: '',
          kodeKecamatan: '',
          kodeKelurahan: '',
          namaPropinsi: this.daWa.provinsi,
          namaKabupaten: this.potongankakotanih,
          namaKecamatan: this.daWa.kecamatan,
          namaKelurahan: this.daWa.kelurahan,
          noRW: this.daWa.rw,
          noRT: this.daWa.rt,
          // password_dukcapil: '3foWeb@pp',
        })
        .subscribe({
          next: data => {
            const codeverifducapilapi = data.code;
            console.warn(codeverifducapilapi);

            if (codeverifducapilapi != 200) {
              alert('gagal !200');
            } else {
              if (data.result.responseCode != '00') {
                alert('ini gagal');
                alert(data.result.responseDesc);
                this.datadukcapil = null;
                console.warn('dukcapil' + this.datadukcapil);
                this.datadukcapilusername = null;
              } else {
                this.datadukcapil = data.result;
                console.warn('dukcapil' + this.datadukcapil);
                this.dataif = data.result.responseCode;
                alert('berhasil ');
              }
            }
          },
        });
    }
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanid, { params: options, observe: 'response' });
  }

  gotopersonalinfo(app_no_ide: any, curef: any) {
    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_app_de', {
        headers: headers,
        app_no_ide: app_no_ide,
        curef: curef,
        app_no_de: '',
        cabang: '',
        created_by: '',
        created_date: '',
        flag_tab: '',
        id: 0,
        status_aplikasi: '',
      })
      .subscribe({
        next: data => {
          this.contohdata = data.result.app_no_de;

          this.router.navigate(['/data-entry/personalinfo'], {
            queryParams: { app_no_de: this.contohdata },
          });
        },
      });

    // this.router.navigate(['/daftaraplikasiide'], {
    //     queryParams: {datakirimanid: this.datakirimanid},
    // });
  }

  postUpdateStatus(): void {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/cekDhn', {
        no_id: this.datakirimanappide,
        tanggal_lahir: this.datakirimanappide,
        // password_dukcapil: '3foWeb@pp',
      })
      .subscribe({
        next: data => {
          this.hasildhn = data.result.token;
          // this.postId.open(ChildComponent, {data : {responseDataParameter: this.postId.Data}});
          // return this.postId;

          console.warn(data.result.token);
          console.warn(this.hasildhn);
        },
      });
  }
  backtoide(): void {
    this.router.navigate(['/daftaraplikasiide'], {
      queryParams: {},
    });
  }

}
