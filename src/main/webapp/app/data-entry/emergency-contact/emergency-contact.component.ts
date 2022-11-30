import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fetchAllDe } from '../../upload-document/services/config/fetchAllDe.model';
import { getEmergencyByCurefModel } from '../services/config/getEmergencyByCurefModel.model';

// export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  emergencyForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  curef: string | undefined;
  statusPerkawinan: string | undefined;
  app_no_de: string | undefined;
  datakirimanakategoripekerjaan: any;
  daWa: getEmergencyByCurefModel = new getEmergencyByCurefModel();
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
    private formBuilder: FormBuilder,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });

    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params['statusPerkawinan'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.emergencyForm = this.formBuilder.group({
      nama: '',
      alamat: '',
      kode_pos: '',
      rt: '',
      rw: '',
      no_telepon: '',
      hubungan: '',
      email: '',
    });
  }

  load() {
    this.gettokendukcapil();
    this.datEntryService.getFetchEmergencyByCuref(this.curef).subscribe(de => {
      this.daWa = de.result;

      this.untukprovinsi = de.result.provinsi;
      this.untukkobkota = de.result.kabkota;
      this.untukkecamatan = de.result.kecamatan;
      this.untukkelurahan = de.result.kelurahan;
      this.keteranganstatusnikah = de.result.kategori_pekerjaan;
      const retriveEmergency = {
        nama: this.daWa.nama,
        alamat: this.daWa.alamat,
        kode_pos: this.daWa.kode_pos,
        rt: this.daWa.rt,
        rw: this.daWa.rw,
        no_telepon: this.daWa.no_telepon,
        hubungan: this.daWa.hubungan,
        email: this.daWa.email,
      };
      this.emergencyForm.setValue(retriveEmergency);
    });

    this.datEntryService.getFetchListEmergency().subscribe(emer => {
      this.gethubunganemergency1 = emer.result;
    });
    this.datEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(de => {
      this.dataEntry = de.result;
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

  goto(appde: any) {
    this.router.navigate(['/data-entry/call-report'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
      },
    });
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

    if (this.daWa === null) {
      // alert('ini create');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_emergency_contact', {
          id: '',
          curef: this.curef,
          nama: this.emergencyForm.get('nama')?.value,
          alamat: this.emergencyForm.get('alamat')?.value,
          provinsi: kirimanprov,
          kabkota: kirimankabkota,
          kecamatan: kirimamnkecamatan,
          kelurahan: kirimankelurahan,
          kode_pos: this.emergencyForm.get('kode_pos')?.value,
          rt: this.emergencyForm.get('rt')?.value,
          rw: this.emergencyForm.get('rw')?.value,
          no_telepon: this.emergencyForm.get('no_telepon')?.value,
          email: this.emergencyForm.get('email')?.value,
          hubungan: this.emergencyForm.get('hubungan')?.value,
          created_by: this.SessionStorageService.retrieve('sessionUserName'),
          created_date: '',
        })

        .subscribe({
          next: bawaan => {
            this.router.navigate(['/data-entry/call-report'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
        });
    } else {
      // alert('ini update');
      const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_emergency_contact', {
          id: this.daWa.id,
          curef: this.curef,
          nama: this.emergencyForm.get('nama')?.value,
          alamat: this.emergencyForm.get('alamat')?.value,
          provinsi: kirimanprov,
          kabkota: kirimankabkota,
          kecamatan: kirimamnkecamatan,
          kelurahan: kirimankelurahan,
          kode_pos: this.emergencyForm.get('kode_pos')?.value,
          rt: this.emergencyForm.get('rt')?.value,
          rw: this.emergencyForm.get('rw')?.value,
          no_telepon: this.emergencyForm.get('no_telepon')?.value,
          email: this.emergencyForm.get('email')?.value,
          hubungan: this.emergencyForm.get('hubungan')?.value,
          updated_by: this.SessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
        })
        .subscribe({
          next: bawaan => {
            this.router.navigate(['/data-entry/call-report'], {
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
