import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';

import { createRequestOption } from 'app/core/request/request-util';
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-non-edit',
  templateUrl: './initial-data-entry-non-edit.component.html',
  styleUrls: ['./initial-data-entry-non-edit.component.scss'],
})
export class InitialDataEntryNonEditComponent implements OnInit {
  datakiriman: any;
  datakirimanidcustomer: any;
  daWa: any;
  daWajob: any;
  daWaprof: any;
  daWaprofpasangan: any;
  postId: any;
  daWakota: any;
  daWakecamatan: any;
  daWakelurahan: any;
  daWakodepos: any;
  daWakodepospasangan: any;
  provinsifix: any;
  kabkotafix: any;
  kecamatanfix: any;
  kelurahanfix: any;
  daWaprofjob: any;
  daWakecamatanjob: any;
  daWakecamatanpasangan: any;
  daWakelurahanpasangan: any;
  daWakelurahanjob: any;
  daWakodeposjob: any;
  daWakotajob: any;
  daWakotapasangan: any;
  provinsifixjob: any;
  kabkotafixjob: any;
  kecamatanfixjob: any;
  kelurahanfixjob: any;
  provinsifixpasangan: any;
  kabkotafixpasangan: any;
  kecamatanfixpasangan: any;
  kelurahanfixpasangan: any;
  customerappnoide: any;
  customercuref: any;
  contohdata: any;
  tanggal_lahir: any;
  app_no_ide: any;
  daWajobid: any;
  customerid: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimanidcustomer = params['datakirimanidcustomer'];
    });
  }
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ide/getCustomerByAppId?sc=');
  ngOnInit(): void {
    this.load();
  }
  load() {
    this.postUpdateStatus();

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        // console.warn('EDITFIX job', res.body?.result);
        // console.warn('EDITFIX job', res.body?.result.jobinfo);
        // console.warn('EDITFIX', res.body?.result.customer);

        this.daWa = res.body?.result.customer;
        this.customerappnoide = res.body?.result.customer.app_no_ide;
        this.customercuref = res.body?.result.customer.curef;
        this.customerid = res.body?.result.customer.id;

        this.daWakodepos = res.body?.result.customer.kode_pos;
        this.daWakodepospasangan = res.body?.result.customer.kode_pos_pasangan;

        this.provinsifix = res.body?.result.customer.provinsi;
        this.kabkotafix = res.body?.result.customer.kabkota;
        this.kecamatanfix = res.body?.result.customer.kecamatan;
        this.kelurahanfix = res.body?.result.customer.kelurahan;

        this.provinsifixpasangan = res.body?.result.customer.provinsi_pasangan;
        this.kabkotafixpasangan = res.body?.result.customer.kabkota_pasangan;
        this.kecamatanfixpasangan = res.body?.result.customer.kecamatan_pasangan;
        this.kelurahanfixpasangan = res.body?.result.customer.kelurahan_pasangan;
        this.daWajob = res.body?.result.jobinfo;

        this.provinsifixjob = this.daWajob.provinsi;
        this.kabkotafixjob = this.daWajob.kabkota;
        this.kecamatanfixjob = this.daWajob.kecamatan;
        this.kelurahanfixjob = this.daWajob.kelurahan;
        this.daWakodeposjob = this.daWajob.kode_pos;
        this.daWajobid = res.body?.result.jobinfo.id;
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanidcustomer, { params: options, observe: 'response' });
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

          // console.warn(data.result.token);
          // console.warn(this.postId);
          // this.router.navigate(['/daftaraplikasiide'], {
          //   queryParams: {},
          // });
          // alert('dapetnih');

          this.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              // console.warn('PROVINSI', res);
              this.daWaprof = res.body?.result;
            },
          });

          this.getprovinsipasangan(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              // console.warn('PROVINSI', res);
              this.daWaprofpasangan = res.body?.result;
            },
          });

          this.getprovinsipasangan(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              // console.warn('PROVINSI', res);
              this.daWaprofjob = res.body?.result;
            },
          });

          // this.getdataentry1p(this.postId).subscribe({
          //   next: (res: EntityArrayResponseDaWa) => {
          //     console.warn('PROVINSI', res);

          //     this.daWaprofp = res.body?.result;

          //     // alert(this.postId);
          //     // this.onResponseSuccess(res);
          //   },
          // });

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

  getprovinsi(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  getprovinsipasangan(token: any, req?: any): Observable<EntityArrayResponseDaWa> {
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

  onChange(selectedStatus: any) {
    // alert(selectedStatus.value);
    this.getkabkota(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kota', res);
        this.daWakota = res.body?.result;
      },
    });
    // console.log(selectedStatus);
  }

  onChangejob(selectedStatus: any) {
    // alert(selectedStatus.value);
    this.getkabkotajob(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kota', res);
        this.daWakotajob = res.body?.result;
      },
    });
    // console.log(selectedStatus);
  }

  onChangepasangan(selectedStatus: any) {
    // alert(selectedStatus.value);
    this.getkabkotajob(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kota', res);
        this.daWakotapasangan = res.body?.result;
      },
    });
    // console.log(selectedStatus);
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
  }
  getkabkotajob(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
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
  }

  getkabkotapasangan(token: any, kodekota: any, req?: any): Observable<EntityArrayResponseDaWa> {
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
  }

  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatan(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kecamata', res);

        this.daWakecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    // console.log(selectedStatus);
  }

  onChangekotajob(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatanjob(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kecamatajob', res);

        this.daWakecamatanjob = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    // console.log(selectedStatus);
  }

  onChangekotapasangan(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatanpasangan(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kecamata', res);

        this.daWakecamatanpasangan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    // console.log(selectedStatus);
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
  }
  getkecamatanjob(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
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
  }
  getkecamatanpasangan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
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
  }

  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahan(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kelurahan', res);

        this.daWakelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    // console.log(selectedStatus);
  }

  onChangekecamatanjob(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahanjob(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kelurahan', res);

        this.daWakelurahanjob = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    // console.log(selectedStatus);
  }

  onChangekecamatanpasangan(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahanpasangan(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kelurahan', res);

        this.daWakelurahanpasangan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    // console.log(selectedStatus);
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
  }

  getkelurahanjob(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
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
  }

  getkelurahanpasangan(token: any, kodekecamatan: any, req?: any): Observable<EntityArrayResponseDaWa> {
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
  }

  onChangekelurahan(selectedStatus: any) {
    const datakodepos = selectedStatus.value.split('|');
    this.daWakodepos = datakodepos[0];
    // console.log(selectedStatus);
  }

  onChangekelurahanjob(selectedStatus: any) {
    const datakodepos = selectedStatus.value.split('|');
    this.daWakodeposjob = datakodepos[0];
    // console.log(selectedStatus);
  }

  onChangekelurahanpasangan(selectedStatus: any) {
    const datakodepos = selectedStatus.value.split('|');
    this.daWakodepospasangan = datakodepos[0];
    // console.log(selectedStatus);
  }

  carimenggunakankodepost(kodepost: any, req: any) {
    this.getkodepostnya(kodepost.value, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsifix = res.body?.result.provKec.nm_prov;
        // this.provinsi_cabangkode=res.body?.result.provKec.kd_prov;
        this.kabkotafix = res.body?.result.provKec.nm_kota;
        // this.kabkota_cabangkode=res.body?.result.provKec.kd_kota;
        this.kecamatanfix = res.body?.result.provKec.nm_kec;
        // this.kecamatankode=res.body?.result.provKec.kd_kec;
        this.kelurahanfix = res.body?.result.provKec.nm_kel;
        // this.kelurahankode=res.body?.result.provKec.kd_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang option:first').text(this.provinsifix);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang option:first').text(this.kabkotafix);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan option:first').text(this.kecamatanfix);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan option:first').text(this.kelurahanfix);
        // alert(this.provinsi_cabang)
      },
    });

    // console.log(req);
  }

  carimenggunakankodeposjob(kodepost: any, req: any) {
    this.getkodepostnya(kodepost.value, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kodepost', res);

        this.provinsifixjob = res.body?.result.provKec.nm_prov;
        this.kabkotafixjob = res.body?.result.provKec.nm_kota;
        this.kecamatanfixjob = res.body?.result.provKec.nm_kec;
        this.kelurahanfixjob = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_perusahaan option:first').text(this.provinsifixjob);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_perusahaan option:first').text(this.kabkotafixjob);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_perusahaan option:first').text(this.kecamatanfixjob);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_perusahaan option:first').text(this.kelurahanfixjob);
        // alert(this.provinsi_cabang)
      },
    });

    // console.log(req);
  }

  carimenggunakankodepospasangan(kodepost: any, req: any) {
    this.getkodepostnya(kodepost.value, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.warn('kodepost', res);

        this.provinsifixpasangan = res.body?.result.provKec.nm_prov;
        this.kabkotafixpasangan = res.body?.result.provKec.nm_kota;
        this.kecamatanfixpasangan = res.body?.result.provKec.nm_kec;
        this.kelurahanfixpasangan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang_pasangan option:first').text(this.provinsifixpasangan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang_pasangan option:first').text(this.kabkotafixpasangan);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_pasangan option:first').text(this.kecamatanfixpasangan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_pasangan option:first').text(this.kelurahanfixpasangan);
        // alert(this.provinsi_cabang)
      },
    });

    // console.log(req);
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
    // alert('CONTOHkota');
    // alert(kodepotongan[0]);
  }

  submitBday() {
    const contoh = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const contoh2 = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    var Q4A = '';
    var Bdate = contoh.value;
    var Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    var theBday = document.getElementById('umur');
    $('#umur').val(Q4A);
  }

  submitBdayp() {
    const contoh = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;

    var Q4A = '';
    var Bdate = contoh.value;
    var Bday = +new Date(Bdate);
    Q4A += +~~((Date.now() - Bday) / 31557600000);
    var theBday = document.getElementById('umur');
    $('#umurpasangan').val(Q4A);
  }

  gotoprescreaning() {
    // alert('cekcuref'+curef)
    const nama = document.getElementById('nama') as HTMLInputElement | any;
    const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
    const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
    const umur = document.getElementById('umur') as HTMLInputElement | any;
    const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    const agama = document.getElementById('agama') as HTMLInputElement | any;
    const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
    const kewarganegaraan = document.getElementById('kewarganegaraan') as HTMLInputElement | any;
    const nama_ibu_kandung = document.getElementById('nama_ibu_kandung') as HTMLInputElement | any;
    const npwp = document.getElementById('npwp') as HTMLInputElement | any;
    const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_ktp = document.getElementById('no_ktp') as HTMLInputElement | any;
    const tanggal_terbit_ktp = document.getElementById('tanggal_terbit_ktp') as HTMLInputElement | any;
    const tanggal_exp_ktp = document.getElementById('tanggal_exp_ktp') as HTMLInputElement | any;
    const no_handphone = document.getElementById('no_handphone') as HTMLInputElement | any;

    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const kepemilikan_perusahaan = document.getElementById('kepemilikan_perusahaan') as HTMLInputElement | any;
    const pemilik_usaha = document.getElementById('pemilik_usaha') as HTMLInputElement | any;
    const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const jenis_sektor = document.getElementById('jenis_sektor') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const provinsi_perusahaan = document.getElementById('provinsi_perusahaan') as HTMLInputElement | any;
    const kabkota_perusahaan = document.getElementById('kabkota_perusahaan') as HTMLInputElement | any;
    const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
    const kelurahan_perusahaan = document.getElementById('kelurahan_perusahaan') as HTMLInputElement | any;
    const kode_posjob = document.getElementById('kode_posjob') as HTMLInputElement | any;
    const rt_perusahaan = document.getElementById('rt_perusahaan') as HTMLInputElement | any;
    const rw_perusahaan = document.getElementById('rw_perusahaan') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('npwp_perusahaan') as HTMLInputElement | any;
    const npwp_perusahaan = document.getElementById('rt') as HTMLInputElement | any;
    const bulan_berdiri_perusahaan = document.getElementById('bulan_berdiri_perusahaan') as HTMLInputElement | any;
    const tahun_berdiri_perusahaan = document.getElementById('tahun_berdiri_perusahaan') as HTMLInputElement | any;
    const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
    const barang_jasa = document.getElementById('barang_jasa') as HTMLInputElement | any;
    const nama_perusahaan_sebelum = document.getElementById('nama_perusahaan_sebelum') as HTMLInputElement | any;
    const tipe_perusahaan_sebelum = document.getElementById('tipe_perusahaan_sebelum') as HTMLInputElement | any;
    const tipe_pekerjaan_sebelum = document.getElementById('tipe_pekerjaan_sebelum') as HTMLInputElement | any;
    const alamat_pekerjaan_sebelum = document.getElementById('alamat_pekerjaan_sebelum') as HTMLInputElement | any;
    const jenis_bidang_sebelum = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
    const jenis_sektor_sebelum = document.getElementById('jenis_sektor_sebelum') as HTMLInputElement | any;
    const bulan_berdiri_perusahaan_sebelum = document.getElementById('bulan_berdiri_perusahaan_sebelum') as HTMLInputElement | any;
    const tahun_berdiri_perusahaan_sebelum = document.getElementById('tahun_berdiri_perusahaan_sebelum') as HTMLInputElement | any;

    const nama_pasangan = document.getElementById('nama_pasangan') as HTMLInputElement | any;
    const jenis_kelamin_pasangan = document.getElementById('jenis_kelamin_pasangan') as HTMLInputElement | any;
    const tanggal_lahir_pasangan = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;
    const tempat_lahir_pasangan = document.getElementById('tempat_lahir_pasangan') as HTMLInputElement | any;
    const umur_pasangan = document.getElementById('umur_pasangan') as HTMLInputElement | any;
    const status_perkawinan_pasangan = document.getElementById('status_perkawinan_pasangan') as HTMLInputElement | any;
    const agama_pasangan = document.getElementById('agama_pasangan') as HTMLInputElement | any;
    const pendidikan_pasangan = document.getElementById('pendidikan_pasangan') as HTMLInputElement | any;
    const kewarganegaraan_pasangan = document.getElementById('kewarganegaraan_pasangan') as HTMLInputElement | any;
    const nama_ibu_kandung_pasangan = document.getElementById('nama_ibu_kandung_pasangan') as HTMLInputElement | any;
    const npwp_pasangan = document.getElementById('npwp_pasangan') as HTMLInputElement | any;
    const alamat_ktp_pasangan = document.getElementById('alamat_ktp_pasangan') as HTMLInputElement | any;
    const provinsi_cabang_pasangan = document.getElementById('provinsi_cabang_pasangan') as HTMLInputElement | any;
    const kabkota_cabang_pasangan = document.getElementById('kabkota_cabang_pasangan') as HTMLInputElement | any;
    const kecamatan_pasangan = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    const kelurahan_pasangan = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    const kode_pos_pasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;
    const rt_pasangan = document.getElementById('rt_pasangan') as HTMLInputElement | any;
    const rw_pasangan = document.getElementById('rw_pasangan') as HTMLInputElement | any;
    const no_ktp_pasangan = document.getElementById('no_ktp') as HTMLInputElement | any;
    const tanggal_terbit_ktp_pasangan = document.getElementById('tanggal_terbit_ktp_pasangan') as HTMLInputElement | any;
    const tanggal_exp_ktp_pasangan = document.getElementById('tanggal_exp_ktp_pasangan') as HTMLInputElement | any;
    const no_handphone_pasangan = document.getElementById('no_handphone_pasangan') as HTMLInputElement | any;

    // alert(status_perkawinan.value);
    if (status_perkawinan.value == 'Menikah') {
      const kirimanprovinsi = provinsi_cabang.value.split('|');
      if (provinsi_cabang.value.indexOf('|') !== -1) {
        var kirimanprovinsid = kirimanprovinsi[1];
      } else {
        var kirimanprovinsid = provinsi_cabang.value;
      }
      const kirimankabkota = kabkota_cabang.value.split('|');
      if (kabkota_cabang.value.indexOf('|') !== -1) {
        var kirimankabkotaid = kirimankabkota[1];
      } else {
        var kirimankabkotaid = kabkota_cabang.value;
      }
      const kirimankecamatan = kecamatan.value.split('|');
      if (kecamatan.value.indexOf('|') !== -1) {
        var kirimankecamatanid = kirimankecamatan[1];
      } else {
        var kirimankecamatanid = kecamatan.value;
      }
      const kirimankelurahan = kelurahan.value.split('|');
      if (kelurahan.value.indexOf('|') !== -1) {
        var kirimankelurahanid = kirimankelurahan[1];
      } else {
        var kirimankelurahanid = kelurahan.value;
      }

      const kirimanprovinsipsng = provinsi_cabang_pasangan.value.split('|');
      if (provinsi_cabang_pasangan.value.indexOf('|') !== -1) {
        var kirimanprovpsg = kirimanprovinsipsng[1];
      } else {
        var kirimanprovpsg = provinsi_cabang_pasangan.value;
      }
      const kirimankabkotapsng = kabkota_cabang_pasangan.value.split('|');
      if (kabkota_cabang_pasangan.value.indexOf('|') !== -1) {
        var kirimankotapsg = kirimankabkotapsng[1];
      } else {
        var kirimankotapsg = kabkota_cabang_pasangan.value;
      }
      const kirimankecamatanpsng = kecamatan_pasangan.value.split('|');
      if (kecamatan_pasangan.value.indexOf('|') !== -1) {
        var kirimankecamatanpsg = kirimankecamatanpsng[1];
      } else {
        var kirimankecamatanpsg = kecamatan_pasangan.value;
      }
      const kirimankelurahanpsng = kelurahan_pasangan.value.split('|');
      if (kelurahan_pasangan.value.indexOf('|') !== -1) {
        var kirimankelurahanpsg = kirimankelurahanpsng[1];
      } else {
        var kirimankelurahanpsg = kelurahan_pasangan.value;
      }

      const kirimanprovinsijob = provinsi_perusahaan.value.split('|');
      if (provinsi_perusahaan.value.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = provinsi_perusahaan.value;
      }
      const kirimankabkotajob = kabkota_perusahaan.value.split('|');
      if (kabkota_perusahaan.value.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = kirimankabkotajob.value;
      }
      const kirimankecamatanjob = kecamatan_perusahaan.value.split('|');
      if (kecamatan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = kecamatan_perusahaan.value;
      }
      const kirimankelurahanjob = kelurahan_perusahaan.value.split('|');
      if (kelurahan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = kelurahan_perusahaan.value;
      }

      const httpOptions = {
        'Content-Type': 'text/plain',
      };

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
          headers: headers,
          nama: nama.value,
          nama_pasangan: nama_pasangan.value,
          kategori_pekerjaan: 'Non Fix Income',
          curef: this.customercuref,
          jenis_kelamin: jenis_kelamin.value,
          jenis_kelamin_pasangan: jenis_kelamin_pasangan.value,
          usia: umur.value,
          app_no_ide: this.customerappnoide,
          tanggal_lahir: tanggal_lahir.value,
          tanggal_lahir_pasangan: tanggal_lahir_pasangan.value,
          tempat_lahir: tempat_lahir.value,
          tempat_lahir_pasangan: tempat_lahir_pasangan.value,
          status_perkawinan: status_perkawinan.value,
          status_alamat: '',
          status_kendaraan: '',
          status_ktp: '',
          status_ktp_pasangan: '',
          status_rumah: '',
          agama: agama.value,
          agama_pasangan: agama_pasangan.value,
          pendidikan: pendidikan.value,
          pendidikan_pasangan: pendidikan_pasangan.value,
          kewarganegaraan: kewarganegaraan.value,
          kewarganegaraan_pasangan: kewarganegaraan_pasangan.value,
          nama_ibu_kandung: nama_ibu_kandung.value,
          nama_ibu_kandung_pasangan: nama_ibu_kandung_pasangan.value,
          npwp: npwp.value,
          npwp_pasangan: npwp_pasangan.value,
          alamat_ktp: alamat_ktp.value,
          alamat_ktp_pasangan: alamat_ktp_pasangan.value,
          alamat_domisili: '',
          provinsi: kirimanprovinsid,
          provinsi_domisili: '',
          provinsi_pasangan: kirimanprovpsg,
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: kirimankotapsg,
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: kirimankecamatanpsg,
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: kirimankelurahanpsg,
          kode_pos: '',
          kode_pos_domisili: '',
          kode_pos_pasangan: '',
          lama_menetap: '',
          cabang: '',
          created_by: '',
          created_date: '',
          email: '',
          email_pasangan: '',
          id: this.customerid,
          jumlah_anak: '',
          rt: rt.value,
          rt_domisili: '',
          rt_pasangan: rt_pasangan.value,
          rw: rw.value,
          rw_domisili: '',
          rw_pasangan: rw_pasangan.value,
          no_ktp: no_ktp.value,
          no_ktp_pasangan: no_ktp_pasangan.value,
          tanggal_terbit_ktp: tanggal_terbit_ktp.value,
          tanggal_terbit_ktp_pasangan: tanggal_terbit_ktp_pasangan.value,
          tanggal_exp_ktp: tanggal_exp_ktp.value,
          tanggal_exp_ktp_pasangan: tanggal_exp_ktp_pasangan.value,
          tipe_kendaraan: '',
          no_handphone: no_handphone.value,
          no_handphone_pasangan: no_handphone_pasangan.value,
          no_telepon: '',
          updated_by: '',
          updated_date: '',
          usia_pasangan: '',
        })
        .subscribe(resposne => {
          this.contohdata = resposne.result.id;

          // console.log(resposne);
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
              headers: headers,
              alamat_perusahaan: alamat_perusahaan.value,
              barang_jasa: barang_jasa.value,
              bulan_berdiri: bulan_berdiri_perusahaan.value,
              bulan_berdiri_sebelum: bulan_berdiri_perusahaan_sebelum.value,
              created_by: '',
              created_date: '',
              curef: this.customercuref,
              id: this.daWajobid,
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: jenis_bidang.value,
              jenis_bidang_sebelum: jenis_bidang_sebelum.value,
              jenis_pekerjaan: status_perkawinan.value,
              jenis_pekerjaan_sebelum: '',
              jumlah_karyawan: jumlah_karyawan.value,
              jumlah_karyawan_sebelum: '',
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: agama.value,
              kategori_pekerjaan_sebelum: '',
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: kepemilikan_perusahaan.value,
              kode_pos: '',
              kode_pos_sebelum: '',
              lama_bekerja_tahun: '',
              lama_bekerja_bulan_sebelum: alamat_ktp.value,
              lama_bekerja_tahun_sebelum: '',
              nama_perusahaan: nama_perusahaan.value,
              nama_perusahaan_sebelum: nama_perusahaan_sebelum.value,
              no_siup: no_siup.value,
              no_telepon: no_telepon.value,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: pemilik_usaha.value,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: rt_perusahaan.value,
              rt_sebelum: '',
              rw: rw_perusahaan.value,
              rw_sebelum: '',
              sektor_ekonomi: jenis_sektor.value,
              sektor_ekonomi_sebelum: jenis_sektor_sebelum.value,
              status_active: '',
              tahun_berdiri: tahun_berdiri_perusahaan.value,
              tahun_berdiri_sebelum: tahun_berdiri_perusahaan_sebelum.value,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: tipe_pekerjaan.value,
              tipe_pekerjaan_sebelum: tipe_pekerjaan_sebelum.value,
              tipe_perusahaan: tipe_perusahaan.value,
              tipe_perusahaan_sebelum: tipe_perusahaan_sebelum.value,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = this.customerappnoide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                // alert(this.app_no_ide);
                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    datakirimanid: this.contohdata,
                    datakirimantgllahir: this.tanggal_lahir,
                    datakirimanappide: this.app_no_ide,
                  },
                });
              },
            });
        });

      // this.router.navigate(['/hasilprescreening'], {
      //   queryParams: {},
      // });
    } else {
      const nama = document.getElementById('nama') as HTMLInputElement | any;
      const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
      const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
      const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
      // const umur = document.getElementById('umur') as HTMLInputElement | any;
      const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
      const agama = document.getElementById('agama') as HTMLInputElement | any;
      const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
      const kewarganegaraan = document.getElementById('kewarganegaraan') as HTMLInputElement | any;
      const nama_ibu_kandung = document.getElementById('nama_ibu_kandung') as HTMLInputElement | any;
      const npwp = document.getElementById('npwp') as HTMLInputElement | any;
      const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
      const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
      const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
      const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
      const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
      const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
      const rt = document.getElementById('rt') as HTMLInputElement | any;
      const rw = document.getElementById('rw') as HTMLInputElement | any;
      const no_ktp = document.getElementById('no_ktp') as HTMLInputElement | any;
      const tanggal_terbit_ktp = document.getElementById('tanggal_terbit_ktp') as HTMLInputElement | any;
      const tanggal_exp_ktp = document.getElementById('tanggal_exp_ktp') as HTMLInputElement | any;
      const no_handphone = document.getElementById('no_handphone') as HTMLInputElement | any;

      const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
      const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
      const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
      const kepemilikan_perusahaan = document.getElementById('kepemilikan_perusahaan') as HTMLInputElement | any;
      const pemilik_usaha = document.getElementById('pemilik_usaha') as HTMLInputElement | any;
      const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
      const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
      const jenis_sektor = document.getElementById('jenis_sektor') as HTMLInputElement | any;
      const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
      const provinsi_perusahaan = document.getElementById('provinsi_perusahaan') as HTMLInputElement | any;
      const kabkota_perusahaan = document.getElementById('kabkota_perusahaan') as HTMLInputElement | any;
      const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
      const kelurahan_perusahaan = document.getElementById('kelurahan_perusahaan') as HTMLInputElement | any;
      const kode_posjob = document.getElementById('kode_posjob') as HTMLInputElement | any;
      const rt_perusahaan = document.getElementById('rt_perusahaan') as HTMLInputElement | any;
      const rw_perusahaan = document.getElementById('rw_perusahaan') as HTMLInputElement | any;
      const jumlah_karyawan = document.getElementById('npwp_perusahaan') as HTMLInputElement | any;
      const npwp_perusahaan = document.getElementById('rt') as HTMLInputElement | any;
      const bulan_berdiri_perusahaan = document.getElementById('bulan_berdiri_perusahaan') as HTMLInputElement | any;
      const tahun_berdiri_perusahaan = document.getElementById('tahun_berdiri_perusahaan') as HTMLInputElement | any;
      const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
      const barang_jasa = document.getElementById('barang_jasa') as HTMLInputElement | any;
      const nama_perusahaan_sebelum = document.getElementById('nama_perusahaan_sebelum') as HTMLInputElement | any;
      const tipe_perusahaan_sebelum = document.getElementById('tipe_perusahaan_sebelum') as HTMLInputElement | any;
      const tipe_pekerjaan_sebelum = document.getElementById('tipe_pekerjaan_sebelum') as HTMLInputElement | any;
      const alamat_pekerjaan_sebelum = document.getElementById('alamat_pekerjaan_sebelum') as HTMLInputElement | any;
      const jenis_bidang_sebelum = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
      const jenis_sektor_sebelum = document.getElementById('jenis_sektor_sebelum') as HTMLInputElement | any;
      const bulan_berdiri_perusahaan_sebelum = document.getElementById('bulan_berdiri_perusahaan_sebelum') as HTMLInputElement | any;
      const tahun_berdiri_perusahaan_sebelum = document.getElementById('tahun_berdiri_perusahaan_sebelum') as HTMLInputElement | any;

      const kirimanprovinsi = provinsi_cabang.value.split('|');
      if (provinsi_cabang.value.indexOf('|') !== -1) {
        var kirimanprovinsid = kirimanprovinsi[1];
      } else {
        var kirimanprovinsid = provinsi_cabang.value;
      }
      const kirimankabkota = kabkota_cabang.value.split('|');
      if (kabkota_cabang.value.indexOf('|') !== -1) {
        var kirimankabkotaid = kirimankabkota[1];
      } else {
        var kirimankabkotaid = kabkota_cabang.value;
      }
      const kirimankecamatan = kecamatan.value.split('|');
      if (kecamatan.value.indexOf('|') !== -1) {
        var kirimankecamatanid = kirimankecamatan[1];
      } else {
        var kirimankecamatanid = kecamatan.value;
      }
      const kirimankelurahan = kelurahan.value.split('|');
      if (kelurahan.value.indexOf('|') !== -1) {
        var kirimankelurahanid = kirimankelurahan[1];
      } else {
        var kirimankelurahanid = kelurahan.value;
      }

      const kirimanprovinsijob = provinsi_perusahaan.value.split('|');
      if (provinsi_perusahaan.value.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = provinsi_perusahaan.value;
      }
      const kirimankabkotajob = kabkota_perusahaan.value.split('|');
      if (kabkota_perusahaan.value.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = kirimankabkotajob.value;
      }
      const kirimankecamatanjob = kecamatan_perusahaan.value.split('|');
      if (kecamatan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = kecamatan_perusahaan.value;
      }
      const kirimankelurahanjob = kelurahan_perusahaan.value.split('|');
      if (kelurahan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = kelurahan_perusahaan.value;
      }

      // const httpOptions = {
      //   'Content-Type': 'text/plain',
      // };

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
      const umur = document.getElementById('umur') as HTMLInputElement | any;

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
          headers: headers,
          nama: nama.value,
          nama_pasangan: '',
          kategori_pekerjaan: 'Non Fix Income',
          curef: this.customercuref,
          jenis_kelamin: jenis_kelamin.value,
          jenis_kelamin_pasangan: '',
          usia: umur.value,
          app_no_ide: this.customerappnoide,
          tanggal_lahir: tanggal_lahir.value,
          tanggal_lahir_pasangan: '',
          tempat_lahir: tempat_lahir.value,
          tempat_lahir_pasangan: '',
          status_perkawinan: status_perkawinan.value,
          status_alamat: '',
          status_kendaraan: '',
          status_ktp: '',
          status_ktp_pasangan: '',
          status_rumah: '',
          agama: agama.value,
          agama_pasangan: '',
          pendidikan: pendidikan.value,
          pendidikan_pasangan: '',
          kewarganegaraan: kewarganegaraan.value,
          kewarganegaraan_pasangan: '',
          nama_ibu_kandung: nama_ibu_kandung.value,
          nama_ibu_kandung_pasangan: '',
          npwp: npwp.value,
          npwp_pasangan: '',
          alamat_ktp: alamat_ktp.value,
          alamat_ktp_pasangan: '',
          alamat_domisili: '',
          provinsi: kirimanprovinsid,
          provinsi_domisili: '',
          provinsi_pasangan: '',
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: '',
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: '',
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: '',
          kode_pos: '',
          kode_pos_domisili: '',
          kode_pos_pasangan: '',
          lama_menetap: '',
          cabang: '',
          created_by: '',
          created_date: '',
          email: '',
          email_pasangan: '',
          id: this.customerid,
          jumlah_anak: '',
          rt: rt.value,
          rt_domisili: '',
          rt_pasangan: '',
          rw: rw.value,
          rw_domisili: '',
          rw_pasangan: '',
          no_ktp: no_ktp.value,
          no_ktp_pasangan: '',
          tanggal_terbit_ktp: tanggal_terbit_ktp.value,
          tanggal_terbit_ktp_pasangan: '',
          tanggal_exp_ktp: tanggal_exp_ktp.value,
          tanggal_exp_ktp_pasangan: '',
          tipe_kendaraan: '',
          no_handphone: no_handphone.value,
          no_handphone_pasangan: '',
          no_telepon: '',
          updated_by: '',
          updated_date: '',
          usia_pasangan: '',
        })

        .subscribe(resposne => {
          // console.log(resposne);
          this.contohdata = resposne.result.id;

          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
              headers: headers,
              alamat_perusahaan: alamat_perusahaan.value,
              barang_jasa: barang_jasa.value,
              bulan_berdiri: bulan_berdiri_perusahaan.value,
              bulan_berdiri_sebelum: bulan_berdiri_perusahaan_sebelum.value,
              created_by: '',
              created_date: '',
              curef: this.customercuref,
              id: this.daWajobid,
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: jenis_bidang.value,
              jenis_bidang_sebelum: jenis_bidang_sebelum.value,
              jenis_pekerjaan: status_perkawinan.value,
              jenis_pekerjaan_sebelum: nama.value,
              jumlah_karyawan: jumlah_karyawan.value,
              jumlah_karyawan_sebelum: nama.value,
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: agama.value,
              kategori_pekerjaan_sebelum: nama.value,
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: kepemilikan_perusahaan.value,
              kode_pos: '',
              kode_pos_sebelum: '',
              lama_bekerja_tahun: nama.value,
              lama_bekerja_bulan_sebelum: alamat_ktp.value,
              lama_bekerja_tahun_sebelum: nama.value,
              nama_perusahaan: nama.value,
              nama_perusahaan_sebelum: '',
              no_siup: no_siup.value,
              no_telepon: no_telepon.value,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: pemilik_usaha.value,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: rt_perusahaan.value,
              rt_sebelum: '',
              rw: rw_perusahaan.value,
              rw_sebelum: '',
              sektor_ekonomi: jenis_sektor.value,
              sektor_ekonomi_sebelum: jenis_sektor_sebelum.value,
              status_active: '',
              tahun_berdiri: tahun_berdiri_perusahaan.value,
              tahun_berdiri_sebelum: tahun_berdiri_perusahaan_sebelum.value,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: tipe_pekerjaan.value,
              tipe_pekerjaan_sebelum: tipe_pekerjaan_sebelum.value,
              tipe_perusahaan: tipe_perusahaan.value,
              tipe_perusahaan_sebelum: tipe_perusahaan_sebelum.value,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = data.result.app_no_ide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                this.router.navigate(['/hasilprescreening'], {
                  queryParams: {
                    datakirimanid: this.contohdata,
                    datakirimantgllahir: this.tanggal_lahir,
                    datakirimanappide: this.app_no_ide,
                  },
                });

                // alert(this.contohdata);
              },
            });
        });
    }
  }

  gotodaftaraplikasiide() {
    // alert('cekcuref'+curef)
    const nama = document.getElementById('nama') as HTMLInputElement | any;
    const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
    const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
    const umur = document.getElementById('umur') as HTMLInputElement | any;
    const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
    const agama = document.getElementById('agama') as HTMLInputElement | any;
    const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
    const kewarganegaraan = document.getElementById('kewarganegaraan') as HTMLInputElement | any;
    const nama_ibu_kandung = document.getElementById('nama_ibu_kandung') as HTMLInputElement | any;
    const npwp = document.getElementById('npwp') as HTMLInputElement | any;
    const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_ktp = document.getElementById('no_ktp') as HTMLInputElement | any;
    const tanggal_terbit_ktp = document.getElementById('tanggal_terbit_ktp') as HTMLInputElement | any;
    const tanggal_exp_ktp = document.getElementById('tanggal_exp_ktp') as HTMLInputElement | any;
    const no_handphone = document.getElementById('no_handphone') as HTMLInputElement | any;

    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const kepemilikan_perusahaan = document.getElementById('kepemilikan_perusahaan') as HTMLInputElement | any;
    const pemilik_usaha = document.getElementById('pemilik_usaha') as HTMLInputElement | any;
    const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const jenis_sektor = document.getElementById('jenis_sektor') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const provinsi_perusahaan = document.getElementById('provinsi_perusahaan') as HTMLInputElement | any;
    const kabkota_perusahaan = document.getElementById('kabkota_perusahaan') as HTMLInputElement | any;
    const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
    const kelurahan_perusahaan = document.getElementById('kelurahan_perusahaan') as HTMLInputElement | any;
    const kode_posjob = document.getElementById('kode_posjob') as HTMLInputElement | any;
    const rt_perusahaan = document.getElementById('rt_perusahaan') as HTMLInputElement | any;
    const rw_perusahaan = document.getElementById('rw_perusahaan') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('npwp_perusahaan') as HTMLInputElement | any;
    const npwp_perusahaan = document.getElementById('rt') as HTMLInputElement | any;
    const bulan_berdiri_perusahaan = document.getElementById('bulan_berdiri_perusahaan') as HTMLInputElement | any;
    const tahun_berdiri_perusahaan = document.getElementById('tahun_berdiri_perusahaan') as HTMLInputElement | any;
    const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
    const barang_jasa = document.getElementById('barang_jasa') as HTMLInputElement | any;
    const nama_perusahaan_sebelum = document.getElementById('nama_perusahaan_sebelum') as HTMLInputElement | any;
    const tipe_perusahaan_sebelum = document.getElementById('tipe_perusahaan_sebelum') as HTMLInputElement | any;
    const tipe_pekerjaan_sebelum = document.getElementById('tipe_pekerjaan_sebelum') as HTMLInputElement | any;
    const alamat_pekerjaan_sebelum = document.getElementById('alamat_pekerjaan_sebelum') as HTMLInputElement | any;
    const jenis_bidang_sebelum = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
    const jenis_sektor_sebelum = document.getElementById('jenis_sektor_sebelum') as HTMLInputElement | any;
    const bulan_berdiri_perusahaan_sebelum = document.getElementById('bulan_berdiri_perusahaan_sebelum') as HTMLInputElement | any;
    const tahun_berdiri_perusahaan_sebelum = document.getElementById('tahun_berdiri_perusahaan_sebelum') as HTMLInputElement | any;

    const nama_pasangan = document.getElementById('nama_pasangan') as HTMLInputElement | any;
    const jenis_kelamin_pasangan = document.getElementById('jenis_kelamin_pasangan') as HTMLInputElement | any;
    const tanggal_lahir_pasangan = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;
    const tempat_lahir_pasangan = document.getElementById('tempat_lahir_pasangan') as HTMLInputElement | any;
    const umur_pasangan = document.getElementById('umurpasangan') as HTMLInputElement | any;
    const status_perkawinan_pasangan = document.getElementById('status_perkawinan_pasangan') as HTMLInputElement | any;
    const agama_pasangan = document.getElementById('agama_pasangan') as HTMLInputElement | any;
    const pendidikan_pasangan = document.getElementById('pendidikan_pasangan') as HTMLInputElement | any;
    const kewarganegaraan_pasangan = document.getElementById('kewarganegaraan_pasangan') as HTMLInputElement | any;
    const nama_ibu_kandung_pasangan = document.getElementById('nama_ibu_kandung_pasangan') as HTMLInputElement | any;
    const npwp_pasangan = document.getElementById('npwp_pasangan') as HTMLInputElement | any;
    const alamat_ktp_pasangan = document.getElementById('alamat_ktp_pasangan') as HTMLInputElement | any;
    const provinsi_cabang_pasangan = document.getElementById('provinsi_cabang_pasangan') as HTMLInputElement | any;
    const kabkota_cabang_pasangan = document.getElementById('kabkota_cabang_pasangan') as HTMLInputElement | any;
    const kecamatan_pasangan = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    const kelurahan_pasangan = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    const kode_pos_pasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;
    const rt_pasangan = document.getElementById('rt_pasangan') as HTMLInputElement | any;
    const rw_pasangan = document.getElementById('rw_pasangan') as HTMLInputElement | any;
    const no_ktp_pasangan = document.getElementById('no_ktp') as HTMLInputElement | any;
    const tanggal_terbit_ktp_pasangan = document.getElementById('tanggal_terbit_ktp_pasangan') as HTMLInputElement | any;
    const tanggal_exp_ktp_pasangan = document.getElementById('tanggal_exp_ktp_pasangan') as HTMLInputElement | any;
    const no_handphone_pasangan = document.getElementById('no_handphone_pasangan') as HTMLInputElement | any;

    if (status_perkawinan.value == 'Menikah') {
      const kirimanprovinsi = provinsi_cabang.value.split('|');
      if (provinsi_cabang.value.indexOf('|') !== -1) {
        var kirimanprovinsid = kirimanprovinsi[1];
      } else {
        var kirimanprovinsid = provinsi_cabang.value;
      }
      const kirimankabkota = kabkota_cabang.value.split('|');
      if (kabkota_cabang.value.indexOf('|') !== -1) {
        var kirimankabkotaid = kirimankabkota[1];
      } else {
        var kirimankabkotaid = kabkota_cabang.value;
      }
      const kirimankecamatan = kecamatan.value.split('|');
      if (kecamatan.value.indexOf('|') !== -1) {
        var kirimankecamatanid = kirimankecamatan[1];
      } else {
        var kirimankecamatanid = kecamatan.value;
      }
      const kirimankelurahan = kelurahan.value.split('|');
      if (kelurahan.value.indexOf('|') !== -1) {
        var kirimankelurahanid = kirimankelurahan[1];
      } else {
        var kirimankelurahanid = kelurahan.value;
      }

      const kirimanprovinsipsng = provinsi_cabang_pasangan.value.split('|');
      if (provinsi_cabang_pasangan.value.indexOf('|') !== -1) {
        var kirimanprovpsg = kirimanprovinsipsng[1];
      } else {
        var kirimanprovpsg = provinsi_cabang_pasangan.value;
      }
      const kirimankabkotapsng = kabkota_cabang_pasangan.value.split('|');
      if (kabkota_cabang_pasangan.value.indexOf('|') !== -1) {
        var kirimankotapsg = kirimankabkotapsng[1];
      } else {
        var kirimankotapsg = kabkota_cabang_pasangan.value;
      }
      const kirimankecamatanpsng = kecamatan_pasangan.value.split('|');
      if (kecamatan_pasangan.value.indexOf('|') !== -1) {
        var kirimankecamatanpsg = kirimankecamatanpsng[1];
      } else {
        var kirimankecamatanpsg = kecamatan_pasangan.value;
      }
      const kirimankelurahanpsng = kelurahan_pasangan.value.split('|');
      if (kelurahan_pasangan.value.indexOf('|') !== -1) {
        var kirimankelurahanpsg = kirimankelurahanpsng[1];
      } else {
        var kirimankelurahanpsg = kelurahan_pasangan.value;
      }

      const kirimanprovinsijob = provinsi_perusahaan.value.split('|');
      if (provinsi_perusahaan.value.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = provinsi_perusahaan.value;
      }
      const kirimankabkotajob = kabkota_perusahaan.value.split('|');
      if (kabkota_perusahaan.value.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = kabkota_perusahaan.value;
      }
      const kirimankecamatanjob = kecamatan_perusahaan.value.split('|');
      if (kecamatan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = kecamatan_perusahaan.value;
      }
      const kirimankelurahanjob = kelurahan_perusahaan.value.split('|');
      if (kelurahan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = kelurahan_perusahaan.value;
      }

      const httpOptions = {
        'Content-Type': 'text/plain',
      };

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
          headers: headers,
          nama: nama.value,
          nama_pasangan: nama_pasangan.value,
          kategori_pekerjaan: 'Non Fix Income',
          curef: this.customercuref,
          jenis_kelamin: jenis_kelamin.value,
          jenis_kelamin_pasangan: jenis_kelamin_pasangan.value,
          usia: umur.value,
          app_no_ide: this.customerappnoide,
          tanggal_lahir: tanggal_lahir.value,
          tanggal_lahir_pasangan: tanggal_lahir_pasangan.value,
          tempat_lahir: tempat_lahir.value,
          tempat_lahir_pasangan: tempat_lahir_pasangan.value,
          status_perkawinan: status_perkawinan.value,
          status_alamat: '',
          status_kendaraan: '',
          status_ktp: '',
          status_ktp_pasangan: '',
          status_rumah: '',
          agama: agama.value,
          agama_pasangan: agama_pasangan.value,
          pendidikan: pendidikan.value,
          pendidikan_pasangan: pendidikan_pasangan.value,
          kewarganegaraan: kewarganegaraan.value,
          kewarganegaraan_pasangan: kewarganegaraan_pasangan.value,
          nama_ibu_kandung: nama_ibu_kandung.value,
          nama_ibu_kandung_pasangan: nama_ibu_kandung_pasangan.value,
          npwp: npwp.value,
          npwp_pasangan: npwp_pasangan.value,
          alamat_ktp: alamat_ktp.value,
          alamat_ktp_pasangan: alamat_ktp_pasangan.value,
          alamat_domisili: '',
          provinsi: kirimanprovinsid,
          provinsi_domisili: '',
          provinsi_pasangan: kirimanprovpsg,
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: kirimankotapsg,
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: kirimankecamatanpsg,
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: kirimankelurahanpsg,
          kode_pos: kode_pos.value,
          kode_pos_domisili: '',
          kode_pos_pasangan: kode_pos_pasangan.value,
          lama_menetap: '',
          cabang: '',
          created_by: '',
          created_date: '',
          email: '',
          email_pasangan: '',
          id: this.customerid,
          jumlah_anak: '',
          rt: rt.value,
          rt_domisili: '',
          rt_pasangan: rt_pasangan.value,
          rw: rw.value,
          rw_domisili: '',
          rw_pasangan: rw_pasangan.value,
          no_ktp: no_ktp.value,
          no_ktp_pasangan: no_ktp_pasangan.value,
          tanggal_terbit_ktp: tanggal_terbit_ktp.value,
          tanggal_terbit_ktp_pasangan: tanggal_terbit_ktp_pasangan.value,
          tanggal_exp_ktp: tanggal_exp_ktp.value,
          tanggal_exp_ktp_pasangan: tanggal_exp_ktp_pasangan.value,
          tipe_kendaraan: '',
          no_handphone: no_handphone.value,
          no_handphone_pasangan: no_handphone_pasangan.value,
          no_telepon: '',
          updated_by: '',
          updated_date: '',
          usia_pasangan: umur_pasangan.value,
        })
        .subscribe(resposne => {
          this.contohdata = resposne.result.id;

          // console.log(resposne);
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
              headers: headers,
              alamat_perusahaan: alamat_perusahaan.value,
              barang_jasa: barang_jasa.value,
              bulan_berdiri: bulan_berdiri_perusahaan.value,
              bulan_berdiri_sebelum: bulan_berdiri_perusahaan_sebelum.value,
              created_by: '',
              created_date: '',
              curef: this.customercuref,
              id: this.daWajobid,
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: jenis_bidang.value,
              jenis_bidang_sebelum: jenis_bidang_sebelum.value,
              jenis_pekerjaan: status_perkawinan.value,
              jenis_pekerjaan_sebelum: '',
              jumlah_karyawan: jumlah_karyawan.value,
              jumlah_karyawan_sebelum: '',
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: agama.value,
              kategori_pekerjaan_sebelum: '',
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: kepemilikan_perusahaan.value,
              kode_pos: kode_posjob.value,
              kode_pos_sebelum: '',
              lama_bekerja_tahun: '',
              lama_bekerja_bulan_sebelum: alamat_ktp.value,
              lama_bekerja_tahun_sebelum: '',
              nama_perusahaan: nama_perusahaan.value,
              nama_perusahaan_sebelum: nama_perusahaan_sebelum.value,
              no_siup: no_siup.value,
              no_telepon: no_telepon.value,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: pemilik_usaha.value,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: rt_perusahaan.value,
              rt_sebelum: '',
              rw: rw_perusahaan.value,
              rw_sebelum: '',
              sektor_ekonomi: jenis_sektor.value,
              sektor_ekonomi_sebelum: jenis_sektor_sebelum.value,
              status_active: '',
              tahun_berdiri: tahun_berdiri_perusahaan.value,
              tahun_berdiri_sebelum: tahun_berdiri_perusahaan_sebelum.value,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: tipe_pekerjaan.value,
              tipe_pekerjaan_sebelum: tipe_pekerjaan_sebelum.value,
              tipe_perusahaan: tipe_perusahaan.value,
              tipe_perusahaan_sebelum: tipe_perusahaan_sebelum.value,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = data.result.app_no_ide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                this.router.navigate(['/daftaraplikasiide'], {
                  queryParams: {},
                });
              },
            });
        });
    } else {
      const nama = document.getElementById('nama') as HTMLInputElement | any;
      const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
      const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
      const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
      // const umur = document.getElementById('umur') as HTMLInputElement | any;
      const status_perkawinan = document.getElementById('status_perkawinan') as HTMLInputElement | any;
      const agama = document.getElementById('agama') as HTMLInputElement | any;
      const pendidikan = document.getElementById('pendidikan') as HTMLInputElement | any;
      const kewarganegaraan = document.getElementById('kewarganegaraan') as HTMLInputElement | any;
      const nama_ibu_kandung = document.getElementById('nama_ibu_kandung') as HTMLInputElement | any;
      const npwp = document.getElementById('npwp') as HTMLInputElement | any;
      const alamat_ktp = document.getElementById('alamat_ktp') as HTMLInputElement | any;
      const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
      const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
      const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
      const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
      const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
      const rt = document.getElementById('rt') as HTMLInputElement | any;
      const rw = document.getElementById('rw') as HTMLInputElement | any;
      const no_ktp = document.getElementById('no_ktp') as HTMLInputElement | any;
      const tanggal_terbit_ktp = document.getElementById('tanggal_terbit_ktp') as HTMLInputElement | any;
      const tanggal_exp_ktp = document.getElementById('tanggal_exp_ktp') as HTMLInputElement | any;
      const no_handphone = document.getElementById('no_handphone') as HTMLInputElement | any;

      const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
      const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
      const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
      const kepemilikan_perusahaan = document.getElementById('kepemilikan_perusahaan') as HTMLInputElement | any;
      const pemilik_usaha = document.getElementById('pemilik_usaha') as HTMLInputElement | any;
      const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
      const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
      const jenis_sektor = document.getElementById('jenis_sektor') as HTMLInputElement | any;
      const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
      const provinsi_perusahaan = document.getElementById('provinsi_perusahaan') as HTMLInputElement | any;
      const kabkota_perusahaan = document.getElementById('kabkota_perusahaan') as HTMLInputElement | any;
      const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
      const kelurahan_perusahaan = document.getElementById('kelurahan_perusahaan') as HTMLInputElement | any;
      const kode_posjob = document.getElementById('kode_posjob') as HTMLInputElement | any;
      const rt_perusahaan = document.getElementById('rt_perusahaan') as HTMLInputElement | any;
      const rw_perusahaan = document.getElementById('rw_perusahaan') as HTMLInputElement | any;
      const jumlah_karyawan = document.getElementById('npwp_perusahaan') as HTMLInputElement | any;
      const npwp_perusahaan = document.getElementById('rt') as HTMLInputElement | any;
      const bulan_berdiri_perusahaan = document.getElementById('bulan_berdiri_perusahaan') as HTMLInputElement | any;
      const tahun_berdiri_perusahaan = document.getElementById('tahun_berdiri_perusahaan') as HTMLInputElement | any;
      const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
      const barang_jasa = document.getElementById('barang_jasa') as HTMLInputElement | any;
      const nama_perusahaan_sebelum = document.getElementById('nama_perusahaan_sebelum') as HTMLInputElement | any;
      const tipe_perusahaan_sebelum = document.getElementById('tipe_perusahaan_sebelum') as HTMLInputElement | any;
      const tipe_pekerjaan_sebelum = document.getElementById('tipe_pekerjaan_sebelum') as HTMLInputElement | any;
      const alamat_pekerjaan_sebelum = document.getElementById('alamat_pekerjaan_sebelum') as HTMLInputElement | any;
      const jenis_bidang_sebelum = document.getElementById('jenis_bidang_sebelum') as HTMLInputElement | any;
      const jenis_sektor_sebelum = document.getElementById('jenis_sektor_sebelum') as HTMLInputElement | any;
      const bulan_berdiri_perusahaan_sebelum = document.getElementById('bulan_berdiri_perusahaan_sebelum') as HTMLInputElement | any;
      const tahun_berdiri_perusahaan_sebelum = document.getElementById('tahun_berdiri_perusahaan_sebelum') as HTMLInputElement | any;

      const kirimanprovinsi = provinsi_cabang.value.split('|');
      if (provinsi_cabang.value.indexOf('|') !== -1) {
        var kirimanprovinsid = kirimanprovinsi[1];
      } else {
        var kirimanprovinsid = provinsi_cabang.value;
      }
      const kirimankabkota = kabkota_cabang.value.split('|');
      if (kabkota_cabang.value.indexOf('|') !== -1) {
        var kirimankabkotaid = kirimankabkota[1];
      } else {
        var kirimankabkotaid = kabkota_cabang.value;
      }
      const kirimankecamatan = kecamatan.value.split('|');
      if (kecamatan.value.indexOf('|') !== -1) {
        var kirimankecamatanid = kirimankecamatan[1];
      } else {
        var kirimankecamatanid = kecamatan.value;
      }
      const kirimankelurahan = kelurahan.value.split('|');
      if (kelurahan.value.indexOf('|') !== -1) {
        var kirimankelurahanid = kirimankelurahan[1];
      } else {
        var kirimankelurahanid = kelurahan.value;
      }

      const kirimanprovinsijob = provinsi_perusahaan.value.split('|');
      if (provinsi_perusahaan.value.indexOf('|') !== -1) {
        var kirimanprovjob = kirimanprovinsijob[1];
      } else {
        var kirimanprovjob = provinsi_perusahaan.value;
      }
      const kirimankabkotajob = kabkota_perusahaan.value.split('|');
      if (kabkota_perusahaan.value.indexOf('|') !== -1) {
        var kirimankabkotajobn = kirimankabkotajob[1];
      } else {
        var kirimankabkotajobn = kirimankabkotajobn.value;
      }
      const kirimankecamatanjob = kecamatan_perusahaan.value.split('|');
      if (kecamatan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankecamatanjobn = kirimankecamatanjob[1];
      } else {
        var kirimankecamatanjobn = kecamatan_perusahaan.value;
      }
      const kirimankelurahanjob = kelurahan_perusahaan.value.split('|');
      if (kelurahan_perusahaan.value.indexOf('|') !== -1) {
        var kirimankelurahanjobn = kirimankelurahanjob[1];
      } else {
        var kirimankelurahanjobn = kelurahan_perusahaan.value;
      }

      // const httpOptions = {
      //   'Content-Type': 'text/plain',
      // };

      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
      const umur = document.getElementById('umur') as HTMLInputElement | any;

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
          headers: headers,
          nama: nama.value,
          nama_pasangan: '',
          kategori_pekerjaan: 'Non Fix Income',
          curef: this.customercuref,
          jenis_kelamin: jenis_kelamin.value,
          jenis_kelamin_pasangan: '',
          usia: umur.value,
          app_no_ide: this.customerappnoide,
          tanggal_lahir: tanggal_lahir.value,
          tanggal_lahir_pasangan: '',
          tempat_lahir: tempat_lahir.value,
          tempat_lahir_pasangan: '',
          status_perkawinan: status_perkawinan.value,
          status_alamat: '',
          status_kendaraan: '',
          status_ktp: '',
          status_ktp_pasangan: '',
          status_rumah: '',
          agama: agama.value,
          agama_pasangan: '',
          pendidikan: pendidikan.value,
          pendidikan_pasangan: '',
          kewarganegaraan: kewarganegaraan.value,
          kewarganegaraan_pasangan: '',
          nama_ibu_kandung: nama_ibu_kandung.value,
          nama_ibu_kandung_pasangan: '',
          npwp: npwp.value,
          npwp_pasangan: '',
          alamat_ktp: alamat_ktp.value,
          alamat_ktp_pasangan: '',
          alamat_domisili: '',
          provinsi: kirimanprovinsid,
          provinsi_domisili: '',
          provinsi_pasangan: '',
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan: '',
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: '',
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: '',
          kode_pos: kode_pos.value,
          kode_pos_domisili: '',
          kode_pos_pasangan: '',
          lama_menetap: '',
          cabang: '',
          created_by: '',
          created_date: '',
          email: '',
          email_pasangan: '',
          id: this.customerid,
          jumlah_anak: '',
          rt: rt.value,
          rt_domisili: '',
          rt_pasangan: '',
          rw: rw.value,
          rw_domisili: '',
          rw_pasangan: '',
          no_ktp: no_ktp.value,
          no_ktp_pasangan: '',
          tanggal_terbit_ktp: tanggal_terbit_ktp.value,
          tanggal_terbit_ktp_pasangan: '',
          tanggal_exp_ktp: tanggal_exp_ktp.value,
          tanggal_exp_ktp_pasangan: '',
          tipe_kendaraan: '',
          no_handphone: no_handphone.value,
          no_handphone_pasangan: '',
          no_telepon: '',
          updated_by: '',
          updated_date: '',
          usia_pasangan: '',
        })

        .subscribe(resposne => {
          // console.log(resposne);
          this.contohdata = resposne.result.id;

          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_job_info', {
              headers: headers,
              alamat_perusahaan: alamat_perusahaan.value,
              barang_jasa: barang_jasa.value,
              bulan_berdiri: bulan_berdiri_perusahaan.value,
              bulan_berdiri_sebelum: bulan_berdiri_perusahaan_sebelum.value,
              created_by: '',
              created_date: '',
              curef: this.customercuref,
              id: this.daWajobid,
              jabatan: '',
              jabatan_sebelum: '',
              jenis_bidang: jenis_bidang.value,
              jenis_bidang_sebelum: jenis_bidang_sebelum.value,
              jenis_pekerjaan: status_perkawinan.value,
              jenis_pekerjaan_sebelum: nama.value,
              jumlah_karyawan: jumlah_karyawan.value,
              jumlah_karyawan_sebelum: nama.value,
              kabkota_sebelum: '',
              kabkota: kirimankabkotajobn,
              kategori_pekerjaan: agama.value,
              kategori_pekerjaan_sebelum: nama.value,
              kecamatan: kirimankecamatanjobn,
              kecamatan_sebelum: '',
              kelurahan: kirimankelurahanjobn,
              kelurahan_sebelum: '',
              kepemilikan_perusahaan: kepemilikan_perusahaan.value,
              kode_pos: kode_posjob.value,
              kode_pos_sebelum: '',
              lama_bekerja_tahun: nama.value,
              lama_bekerja_bulan_sebelum: alamat_ktp.value,
              lama_bekerja_tahun_sebelum: nama.value,
              nama_perusahaan: nama.value,
              nama_perusahaan_sebelum: '',
              no_siup: no_siup.value,
              no_telepon: no_telepon.value,
              npwp: '',
              payroll: '',
              payroll_sebelum: '',
              pemilik_usaha: pemilik_usaha.value,
              pendapatan: '',
              pendapatan_lain: '',
              posisi: '',
              posisi_sebelum: '',
              provinsi: kirimanprovjob,
              provinsi_sebelum: '',
              rt: rt_perusahaan.value,
              rt_sebelum: '',
              rw: rw_perusahaan.value,
              rw_sebelum: '',
              sektor_ekonomi: jenis_sektor.value,
              sektor_ekonomi_sebelum: jenis_sektor_sebelum.value,
              status_active: '',
              tahun_berdiri: tahun_berdiri_perusahaan.value,
              tahun_berdiri_sebelum: tahun_berdiri_perusahaan_sebelum.value,
              tipe_kepegawaian: '',
              tipe_kepegawaian_sebelum: '',
              tipe_pekerjaan: tipe_pekerjaan.value,
              tipe_pekerjaan_sebelum: tipe_pekerjaan_sebelum.value,
              tipe_perusahaan: tipe_perusahaan.value,
              tipe_perusahaan_sebelum: tipe_perusahaan_sebelum.value,
              total_pendapatan: '',
              tunjangan: '',
              umur_pensiun: '',
              umur_pensiun_sebelum: '',
            })
            .subscribe({
              next: data => {
                // this.contohdata = data.result.id;
                this.app_no_ide = data.result.app_no_ide;
                this.tanggal_lahir = data.result.tanggal_lahir;

                this.router.navigate(['/daftaraplikasiide'], {
                  queryParams: {},
                });
              },
            });
        });
    }
  }
}
