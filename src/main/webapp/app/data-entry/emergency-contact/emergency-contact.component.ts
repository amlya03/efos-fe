import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { LocalStorageService } from 'ngx-webstorage';

// export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  curef: any;
  datakiriman: any;
  app_no_de: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  databawaan: any;
  daWaprof: any;
  postId: any;
  daWakota: any;
  kecamatan: any;
  daWakodepos: any;
  kelurahan: any;
  gethubunganemergency1: any;
  keteranganstatusnikah: any;
  untukSessionRole: any;
  untukprovinsi: any;
  untukkobkota: any;
  untukkecamatan: any;
  untukkelurahan: any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  protected apigethubungan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_hubungan_emergency'
  );

  protected apiuntukgetsemuadataebrdasarkande = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd='
  );

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getEmergencyByCuref?sc=');

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.load();
  }

  load() {
    this.getstatuspernikahan();
    this.gettokendukcapil();

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('emergency', res);

        if (res.body?.result == null) {
          this.daWa = 0;
        } else {
          this.daWa = res.body?.result;

          this.untukprovinsi = res.body?.result.provinsi;
          this.untukkobkota = res.body?.result.kabkota;
          this.untukkecamatan = res.body?.result.kecamatan;
          this.untukkelurahan = res.body?.result.kelurahan;
        }
      },
    });

    this.gethubunganemergency().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('hubungan', res.body?.result);
        this.gethubunganemergency1 = res.body?.result;
      },
    });
  }

  getstatuspernikahan(): void {
    this.getsemuadataberdasarkanappde().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('cekstatuspernikahan', res.body?.result);
        this.keteranganstatusnikah = res.body?.result.kategori_pekerjaan;
        // alert(this.keteranganstatusnikah);
      },
    });
  }

  getsemuadataberdasarkanappde(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apiuntukgetsemuadataebrdasarkande + this.app_no_de, {
      params: options,
      observe: 'response',
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
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;

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
    const provinsi_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
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

    const provinsi_cabang = document.getElementById('kecamatan') as HTMLInputElement | any;
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
    const provinsi_cabang = document.getElementById('kelurahan') as HTMLInputElement | any;
    var kode_post = document.getElementById('kode_pos') as HTMLInputElement | any;
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

  gethubunganemergency(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apigethubungan, { params: options, observe: 'response' });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.curef, { params: options, observe: 'response' });
  }

  goto(appde: any) {
    if (this.keteranganstatusnikah === 'Fix Income') {
      // alert('ini fix');
      // alert(this.app_no_de);
      this.router.navigate(['/data-entry/call-report'], {
        queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.curef },
      });
    } else {
      // alert('ini non fix');
      // alert(this.app_no_de);
      // alert(this.datakirimanakategoripekerjaan);
      this.router.navigate(['/data-entry/call-report-non'], {
        queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.curef },
      });
    }
    // this.onResponseSuccess(res);
    // alert('ke call-report');
    // this.router.navigate(['/call-report'], { queryParams: { datakiriman:this.datakirimiancure , datakirimiancure:this.datakiriman } });
  }

  simpanemergency() {
    // contohtampungankategoripekerjaan: any // contohtampunganappde: any, // contohtampungstatuskawain: any, // contohtampungancuref: any,
    const id = document.getElementById('id') as HTMLInputElement | any;
    const nama = document.getElementById('nama') as HTMLInputElement | any;
    const alamat = document.getElementById('alamat') as HTMLInputElement | any;
    const provinsi_cabang = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota_cabang = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_telepon = document.getElementById('no_telepon') as HTMLInputElement | any;
    const hubungan = document.getElementById('hubungan') as HTMLInputElement | any;
    const email = document.getElementById('email') as HTMLInputElement | any;
    // const angsuran = document.getElementById('angsuran') as HTMLInputElement | any;
    // const hasil_pembiayaan = document.getElementById('hasil_pembiayaan') as HTMLInputElement | any;
    // const detail_objek_pembiayaan = document.getElementById('detail_objek_pembiayaan') as HTMLInputElement | any;
    // const fee_based = document.getElementById('fee_based') as HTMLInputElement | any;

    var potonganprovinsi = provinsi_cabang.value.split('|');
    if (provinsi_cabang.value.indexOf('|') !== -1) {
      var kirimanprov = potonganprovinsi[1];
    } else {
      var kirimanprov = provinsi_cabang.value;
    }
    var potongankabkota = kabkota_cabang.value.split('|');
    if (kabkota_cabang.value.indexOf('|') !== -1) {
      var kirimankabkota = potongankabkota[1];
    } else {
      var kirimankabkota = kabkota_cabang.value;
    }
    var potongankecamatan = kecamatan.value.split('|');
    if (kecamatan.value.indexOf('|') !== -1) {
      var kirimamnkecamatan = potongankecamatan[1];
    } else {
      var kirimamnkecamatan = kecamatan.value;
    }
    var potongankelurahan = kelurahan.value.split('|');
    if (kelurahan.value.indexOf('|') !== -1) {
      var kirimankelurahan = potongankelurahan[1];
    } else {
      var kirimankelurahan = kelurahan.value;
    }

    if (this.daWa == 0) {
      // alert('ini create');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_emergency_contact', {
          // headers: headers,
          id: '',
          curef: this.curef,
          nama: nama.value,
          alamat: alamat.value,
          provinsi: kirimanprov,
          kabkota: kirimankabkota,
          kecamatan: kirimamnkecamatan,
          kelurahan: kirimankelurahan,
          kode_pos: kode_pos.value,
          rt: rt.value,
          rw: rw.value,
          // joint_income: joint_income.value,
          no_telepon: no_telepon.value,
          email: email.value,
          hubungan: hubungan.value,
          // created_by: hasil_pembiayaan.value,
          // produk: kirimanpotongproduk[0],
          // produk_name: kirimanpotongproduk[1],
          // program: kirimanpotongprogram[0],
          // program_name: kirimanpotongprogram[1],
          // skema: kirimanpotongskema[0],
          // skema_master: kirimanpotongskema[1],
          // skema_name:kirimanpotongskema[2],
          // tipe_margin: tipe_margin.value,
          // tujuan_pembiayaan:tujuan_pembiayaan.value,
          // uang_muka: uang_muka.value,
        })

        .subscribe({
          next: bawaan => {
            if (this.datakirimanakategoripekerjaan === 'Fix Income') {
              // alert('ini fix');
              // alert(this.app_no_de);
              this.router.navigate(['/data-entry/call-report'], {
                queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.curef },
              });
            } else {
              // alert('ini non fix');
              // alert(this.app_no_de);
              // alert(this.datakirimanakategoripekerjaan);
              this.router.navigate(['/data-entry/call-report-non'], {
                queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.curef },
              });
            }
          },
        });
    } else {
      // alert('ini update');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_emergency_contact', {
          // headers: headers,
          id: id.value,
          curef: this.curef,
          nama: nama.value,
          alamat: alamat.value,
          provinsi: kirimanprov,
          kabkota: kirimankabkota,
          kecamatan: kirimamnkecamatan,
          kelurahan: kirimankelurahan,
          kode_pos: kode_pos.value,
          rt: rt.value,
          rw: rw.value,
          // joint_income: joint_income.value,
          no_telepon: no_telepon.value,
          email: email.value,
          hubungan: hubungan.value,
          // created_by: hasil_pembiayaan.value,
        })

        .subscribe({
          next: bawaan => {
            if (this.datakirimanakategoripekerjaan === 'Fix Income') {
              // alert('ini fix');
              // alert(this.app_no_de);
              this.router.navigate(['/data-entry/call-report'], {
                queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.curef },
              });
            } else {
              // alert('ini non fix');
              // alert(this.app_no_de);
              // alert(this.datakirimanakategoripekerjaan);
              this.router.navigate(['/data-entry/call-report-non'], {
                queryParams: { app_no_de: this.app_no_de, datakirimiancure: this.curef },
              });
            }
          },
        });
    }
  }

  carimenggunakankodepos(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.untukprovinsi = res.body?.result.provKec.nm_prov;
        this.untukkobkota = res.body?.result.provKec.nm_kota;
        this.untukkecamatan = res.body?.result.provKec.nm_kec;
        this.untukkelurahan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_cabang option:first').text(this.untukprovinsi);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_cabang option:first').text(this.untukkobkota);
        // $('#kabkota_cabang').attr('selected', 'selected').val(this.kabkota_cabangkode + '|' +    this.kabkota_cabang);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan option:first').text(this.untukkecamatan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan option:first').text(this.untukkelurahan);
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
