import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';

import { createRequestOption } from 'app/core/request/request-util';
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-initial-data-entry-fix-edit',
  templateUrl: './initial-data-entry-fix-edit.component.html',
  styleUrls: ['./initial-data-entry-fix-edit.component.scss'],
})
export class InitialDataEntryFixEditComponent implements OnInit {
  datakiriman: any;
  datakirimanidcustomer: any;
  daWa: any;
  daWajob: any;
  daWaprof: any;
  postId: any;
  daWakota: any;


  provinsi_cabang: any;
  daWakecamatan: any;
  daWakelurahan: any;
  daWakodepos: any;
  provinsifix: any;
  kabkotafix: any;
  kecamatanfix: any;
  kelurahanfix: any;
  daWaprofpasangan: any;
  daWakodepospasangan: any;
  daWakecamatanpasangan: any;
  daWakelurahanpasangan: any;
  daWakotapasangan: any;
  provinsifixpasangan: any;
  kabkotafixpasangan: any;
  kecamatanfixpasangan: any;
  kelurahanfixpasangan: any;
  contohdata: any;
  app_no_ide: any;
  tanggal_lahir: any;
  idcustomer: any;

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
        console.warn('EDITFIX job', res.body?.result.job);
        console.warn('EDITFIX job', res.body?.result.customer);
        console.warn('EDITFIX job', res.body?.result.customer.status_perkawinan);
        this.daWa = res.body?.result.customer;
        this.idcustomer = res.body?.result.customer.id;
        this.daWakodepos =  res.body?.result.customer.kode_pos;
        this.daWakodepospasangan =res.body?.result.customer.kode_pos_pasangan;

        this.provinsifix=res.body?.result.customer.provinsi;
        this.kabkotafix=res.body?.result.customer.kabkota;
        this.kecamatanfix=res.body?.result.customer.kecamatan;
        this.kelurahanfix=res.body?.result.customer.kelurahan;


        this.provinsifixpasangan=res.body?.result.customer.provinsi_pasangan;
        this.kabkotafixpasangan=res.body?.result.customer.kabkota_pasangan;
        this.kecamatanfixpasangan=res.body?.result.customer.kecamatan_pasangan;
        this.kelurahanfixpasangan=res.body?.result.customer.kelurahan_pasangan;


        this.daWajob = res.body?.result.customer;

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

          console.warn(data.result.token);
          console.warn(this.postId);
          // this.router.navigate(['/daftaraplikasiide'], {
          //   queryParams: {},
          // });
          // alert('dapetnih');

          this.getprovinsi(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);
              this.daWaprof = res.body?.result;
            },
          });

          this.getprovinsipasangan(this.postId).subscribe({
            next: (res: EntityArrayResponseDaWa) => {
              console.warn('PROVINSI', res);
              this.daWaprofpasangan = res.body?.result;
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
     alert(selectedStatus.value);
    this.getkabkota(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);
        this.daWakota = res.body?.result;
      },
    });
    console.log(selectedStatus);
  }


  onChangepasangan(selectedStatus: any) {
    alert(selectedStatus.value);
   this.getkabkotapasangan(this.postId, selectedStatus.value).subscribe({
     next: (res: EntityArrayResponseDaWa) => {
       console.warn('kota', res);
       this.daWakotapasangan = res.body?.result;
     },
   });
   console.log(selectedStatus);
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
        console.warn('kecamata', res);

        this.daWakecamatan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekotapasangan(selectedStatus: any) {
    // alert(this.postId);
    this.getkecamatanpasangan(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.daWakecamatanpasangan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
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
        console.warn('kelurahan', res);

        this.daWakelurahan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }

  onChangekecamatanpasangan(selectedStatus: any) {
    // alert(this.postId);
    this.getkelurahanpasangan(this.postId, selectedStatus.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.daWakelurahanpasangan = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
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
    console.log(selectedStatus);
  }

  onChangekelurahanpasangan(selectedStatus: any) {
    const datakodepos = selectedStatus.value.split('|');
    this.daWakodepospasangan = datakodepos[0];
    console.log(selectedStatus);
  }

  carimenggunakankodepost(kodepost:any,req:any){

    this.getkodepostnya(kodepost.value, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsifix=res.body?.result.provKec.nm_prov;
        // this.provinsi_cabangkode=res.body?.result.provKec.kd_prov;
        this.kabkotafix=res.body?.result.provKec.nm_kota;
        // this.kabkota_cabangkode=res.body?.result.provKec.kd_kota;
        this.kecamatanfix=res.body?.result.provKec.nm_kec;
        // this.kecamatankode=res.body?.result.provKec.kd_kec;
        this.kelurahanfix=res.body?.result.provKec.nm_kel;
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

    console.log(req);


  }



  carimenggunakankodepospasangan(kodepost:any,req:any){

    this.getkodepostnya(kodepost.value, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.provinsifixpasangan=res.body?.result.provKec.nm_prov;
        // this.provinsi_cabangkode=res.body?.result.provKec.kd_prov;
        this.kabkotafixpasangan=res.body?.result.provKec.nm_kota;
        // this.kabkota_cabangkode=res.body?.result.provKec.kd_kota;
        this.kecamatanfixpasangan=res.body?.result.provKec.nm_kec;
        // this.kecamatankode=res.body?.result.provKec.kd_kec;
        this.kelurahanfixpasangan=res.body?.result.provKec.nm_kel;
        // this.kelurahankode=res.body?.result.provKec.kd_kel;


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

    console.log(req);


  }



  getkodepostnya(kodepst:any,req:any){

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
    const contoh2 = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;


      var Q4A = "";
      var Bdate = contoh.value;
      var Bday = +new Date(Bdate);
      Q4A += +~~((Date.now() - Bday) / (31557600000));
      var theBday = document.getElementById('umur');
      $('#umur').val(Q4A);
}


gotoprescreaning(getappide: any, kodeposget: any, getcuref: any,kodeposgetp:any): void {
  const nama = document.getElementById('nama') as HTMLInputElement | any;
  const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
  const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
  const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
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


  const nama_pasangan = document.getElementById('nama_pasangan') as HTMLInputElement | any;
  const jenis_kelamin_pasangan = document.getElementById('jenis_kelamin_pasangan') as HTMLInputElement | any;
  const tanggal_lahir_pasangan = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;
  const tempat_lahir_pasangan = document.getElementById('tempat_lahir_pasangan') as HTMLInputElement | any;
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
  const no_ktp_pasangan = document.getElementById('no_ktp_pasangan') as HTMLInputElement | any;
  const tanggal_terbit_ktp_pasangan = document.getElementById('tanggal_terbit_ktp_pasangan') as HTMLInputElement | any;
  const tanggal_exp_ktp_pasangan = document.getElementById('tanggal_exp_ktp_pasangan') as HTMLInputElement | any;
  const no_handphone_pasangan = document.getElementById('no_handphone_pasangan') as HTMLInputElement | any;




  if( status_perkawinan.value =='Menikah'){
    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    const kirimanprovinsi = provinsi_cabang.value.split('|');
    if ( provinsi_cabang.value.indexOf('|') !== -1) {
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
      var kirimankecamatanid =kecamatan.value;
    }
    const kirimankelurahan =kelurahan.value.split('|');
    if (kelurahan.value.indexOf('|') !== -1) {
      var kirimankelurahanid = kirimankelurahan[1];
    } else {
      var kirimankelurahanid = kelurahan.value;
    }



    const kirimanprovinsipasangan = provinsi_cabang_pasangan.value.split('|');
    if (provinsi_cabang_pasangan.value.indexOf('|') !== -1) {
      var kirimanprovinsidpasangan = kirimanprovinsipasangan[1];
    } else {
      var kirimanprovinsidpasangan = provinsi_cabang_pasangan.value;
    }
    const kirimankabkotapasangan =kabkota_cabang_pasangan.value.split('|');
    if (kabkota_cabang_pasangan.value.indexOf('|') !== -1) {
      var kirimankabkotaidpasangan = kirimankabkotapasangan[1];
    } else {
      var kirimankabkotaidpasangan = kabkota_cabang_pasangan.value;
    }
    const kirimankecamatanpasangan = kecamatan_pasangan.value.split('|');
    if (kecamatan_pasangan.value.indexOf('|') !== -1) {
      var kirimankecamatanidpasangan = kirimankecamatanpasangan[1];
    } else {
      var kirimankecamatanidpasangan =kecamatan_pasangan.value;
    }
    const kirimankelurahanpasangan = kelurahan_pasangan.value.split('|');
    if ( kelurahan_pasangan.value.indexOf('|') !== -1) {
      var kirimankelurahanidpasangan = kirimankelurahanpasangan[1];
    } else {
      var kirimankelurahanidpasangan = kelurahan_pasangan.value;
    }
    const umur = document.getElementById('umur') as HTMLInputElement | any;
    const kodepos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const kodepospasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;
    // alert(kirimanprovinsipasangan);
    // alert(kirimanprovinsipasangan.indexOf('|') !== -1);
    this.http
    .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
      headers: headers,
      nama: nama.value,
      nama_pasangan: nama_pasangan.value,
      kategori_pekerjaan: 'Fix Income',
      curef: getcuref,
      jenis_kelamin: jenis_kelamin.value,
      jenis_kelamin_pasangan: jenis_kelamin_pasangan.value,
      usia: umur.value,
      app_no_ide: getappide,
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
      provinsi_pasangan: kirimanprovinsidpasangan,
      kabkota: kirimankabkotaid,
      kabkota_domisili: '',
      kabkota_pasangan:kirimankabkotaidpasangan,
      kecamatan: kirimankecamatanid,
      kecamatan_domisili: '',
      kecamatan_pasangan: kirimankecamatanidpasangan,
      kelurahan: kirimankelurahanid,
      kelurahan_domisili: '',
      kelurahan_pasangan:  kirimankelurahanidpasangan,
      kode_pos: kodepos.value,
      kode_pos_domisili: '',
      kode_pos_pasangan: kodepospasangan.value,
      lama_menetap: '',
      cabang: '',
      created_by: '',
      created_date: '',
      email: '',
      email_pasangan: '',
      id: 0,
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

  }else{
    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const umur = document.getElementById('umur') as HTMLInputElement | any;
    const kodepos = document.getElementById('kode_pos') as HTMLInputElement | any;

    const nama = document.getElementById('nama') as HTMLInputElement | any;
    const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
    const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
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

    const kirimanprovinsi = provinsi_cabang.value.split('|');
    if ( provinsi_cabang.value.indexOf('|') !== -1) {
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
      var kirimankecamatanid =kecamatan.value;
    }
    const kirimankelurahan =kelurahan.value.split('|');
    if (kelurahan.value.indexOf('|') !== -1) {
      var kirimankelurahanid = kirimankelurahan[1];
    } else {
      var kirimankelurahanid = kelurahan.value;
    }

  // alert(this.umur);
    this.http
    .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/create_app_ide', {
      headers: headers,
      nama: nama.value,
      nama_pasangan: '',
      kategori_pekerjaan: 'Fix Income',
      curef: getcuref,
      jenis_kelamin: jenis_kelamin.value,
      jenis_kelamin_pasangan: '',
      usia: umur.value,
      app_no_ide: getappide,
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
      provinsi_pasangan:'' ,
      kabkota: kirimankabkotaid,
      kabkota_domisili: '',
      kabkota_pasangan:'',
      kecamatan: kirimankecamatanid,
      kecamatan_domisili: '',
      kecamatan_pasangan:'' ,
      kelurahan: kirimankelurahanid,
      kelurahan_domisili: '',
      kelurahan_pasangan: '',
      kode_pos: kodepos.value,
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
    }


    gotodaftaraplikasiide(getappide: any, kodeposget: any, getcuref: any,kodeposgetp:any): void {
      const nama = document.getElementById('nama') as HTMLInputElement | any;
      const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
      const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
      const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
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


      const nama_pasangan = document.getElementById('nama_pasangan') as HTMLInputElement | any;
      const jenis_kelamin_pasangan = document.getElementById('jenis_kelamin_pasangan') as HTMLInputElement | any;
      const tanggal_lahir_pasangan = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;
      const tempat_lahir_pasangan = document.getElementById('tempat_lahir_pasangan') as HTMLInputElement | any;
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
      const no_ktp_pasangan = document.getElementById('no_ktp_pasangan') as HTMLInputElement | any;
      const tanggal_terbit_ktp_pasangan = document.getElementById('tanggal_terbit_ktp_pasangan') as HTMLInputElement | any;
      const tanggal_exp_ktp_pasangan = document.getElementById('tanggal_exp_ktp_pasangan') as HTMLInputElement | any;
      const no_handphone_pasangan = document.getElementById('no_handphone_pasangan') as HTMLInputElement | any;




      if( status_perkawinan.value =='Menikah'){
        const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

        const kirimanprovinsi = provinsi_cabang.value.split('|');
        if ( provinsi_cabang.value.indexOf('|') !== -1) {
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
          var kirimankecamatanid =kecamatan.value;
        }
        const kirimankelurahan =kelurahan.value.split('|');
        if (kelurahan.value.indexOf('|') !== -1) {
          var kirimankelurahanid = kirimankelurahan[1];
        } else {
          var kirimankelurahanid = kelurahan.value;
        }



        const kirimanprovinsipasangan = provinsi_cabang_pasangan.value.split('|');
        if (provinsi_cabang_pasangan.value.indexOf('|') !== -1) {
          var kirimanprovinsidpasangan = kirimanprovinsipasangan[1];
        } else {
          var kirimanprovinsidpasangan = provinsi_cabang_pasangan.value;
        }
        const kirimankabkotapasangan =kabkota_cabang_pasangan.value.split('|');
        if (kabkota_cabang_pasangan.value.indexOf('|') !== -1) {
          var kirimankabkotaidpasangan = kirimankabkotapasangan[1];
        } else {
          var kirimankabkotaidpasangan = kabkota_cabang_pasangan.value;
        }
        const kirimankecamatanpasangan = kecamatan_pasangan.value.split('|');
        if (kecamatan_pasangan.value.indexOf('|') !== -1) {
          var kirimankecamatanidpasangan = kirimankecamatanpasangan[1];
        } else {
          var kirimankecamatanidpasangan =kecamatan_pasangan.value;
        }
        const kirimankelurahanpasangan = kelurahan_pasangan.value.split('|');
        if ( kelurahan_pasangan.value.indexOf('|') !== -1) {
          var kirimankelurahanidpasangan = kirimankelurahanpasangan[1];
        } else {
          var kirimankelurahanidpasangan = kelurahan_pasangan.value;
        }
        const umur = document.getElementById('umur') as HTMLInputElement | any;
        const kodepos = document.getElementById('kode_pos') as HTMLInputElement | any;
        const kodepospasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;

        // alert(kirimanprovinsipasangan);
        // alert(kirimanprovinsipasangan.indexOf('|') !== -1);
        this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
          headers: headers,
          nama: nama.value,
          nama_pasangan: nama_pasangan.value,
          kategori_pekerjaan: 'Fix Income',
          curef: getcuref,
          jenis_kelamin: jenis_kelamin.value,
          jenis_kelamin_pasangan: jenis_kelamin_pasangan.value,
          usia: umur.value,
          app_no_ide: getappide,
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
          provinsi_pasangan: kirimanprovinsidpasangan,
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan:kirimankabkotaidpasangan,
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan: kirimankecamatanidpasangan,
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan:  kirimankelurahanidpasangan,
          kode_pos: kodepos.value,
          kode_pos_domisili: '',
          kode_pos_pasangan: kodepospasangan.value,
          lama_menetap: '',
          cabang: '',
          created_by: '',
          created_date: '',
          email: '',
          email_pasangan: '',
          id: 0,
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
        .subscribe({
          next: data => {
            this.contohdata = data.result.id;
            this.app_no_ide = data.result.app_no_ide;
            this.tanggal_lahir = data.result.tanggal_lahir;

            this.router.navigate(['/daftaraplikasiide'], {
              // queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
            });

            alert(this.contohdata);
          },
        });

      }else{

        alert( this.idcustomer);
        const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
        const umur = document.getElementById('umur') as HTMLInputElement | any;


        const nama = document.getElementById('nama') as HTMLInputElement | any;
        const jenis_kelamin = document.getElementById('jenis_kelamin') as HTMLInputElement | any;
        const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
        const tempat_lahir = document.getElementById('tempat_lahir') as HTMLInputElement | any;
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

        const kirimanprovinsi = provinsi_cabang.value.split('|');
        if ( provinsi_cabang.value.indexOf('|') !== -1) {
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
          var kirimankecamatanid =kecamatan.value;
        }
        const kirimankelurahan =kelurahan.value.split('|');
        if (kelurahan.value.indexOf('|') !== -1) {
          var kirimankelurahanid = kirimankelurahan[1];
        } else {
          var kirimankelurahanid = kelurahan.value;
        }

        const kodepos = document.getElementById('kode_pos') as HTMLInputElement | any;

      // alert(this.umur);
        this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-ide/update_app_ide', {
          headers: headers,
          nama: nama.value,
          nama_pasangan: '',
          kategori_pekerjaan: 'Fix Income',
          curef: getcuref,
          jenis_kelamin: jenis_kelamin.value,
          jenis_kelamin_pasangan: '',
          usia: umur.value,
          app_no_ide: getappide,
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
          provinsi_pasangan:'' ,
          kabkota: kirimankabkotaid,
          kabkota_domisili: '',
          kabkota_pasangan:'',
          kecamatan: kirimankecamatanid,
          kecamatan_domisili: '',
          kecamatan_pasangan:'' ,
          kelurahan: kirimankelurahanid,
          kelurahan_domisili: '',
          kelurahan_pasangan: '',
          kode_pos: kodepos.value,
          kode_pos_domisili: '',
          kode_pos_pasangan: '',
          lama_menetap: '',
          cabang: '',
          created_by: '',
          created_date: '',
          email: '',
          email_pasangan: '',
          id:  this.idcustomer,
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
        .subscribe({
          next: data => {
            this.contohdata = data.result.id;
            this.app_no_ide = data.result.app_no_ide;
            this.tanggal_lahir = data.result.tanggal_lahir;

            this.router.navigate(['/daftaraplikasiide'], {
              // queryParams: { datakirimanid: this.contohdata, datakirimantgllahir: this.tanggal_lahir, datakirimanappide: this.app_no_ide },
            });

            alert(this.contohdata);
          },
        });

      }
        }





}
