import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { LocalStorageService } from 'ngx-webstorage';
// import { colateralmodel } from './collateral-model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral-edit',
  templateUrl: './collateral-edit.component.html',
  styleUrls: ['./collateral-edit.component.scss'],
})
export class CollateralEditComponent implements OnInit {
  datakirimanidcollateral: any;
  app_no_de: any;
  datakirimiancure: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  tambahatautidak: any;
  tampungantipeagunan: any;
  datatipeagunan: any;
  untukstatusdev: any;
  pemisahuntukdevloper: any;
  statussertifikat: any;
  listagunan: any;
  postId: any;
  daWaprof: any;
  daWakota: any;
  daWakotas: any;
  kecamatan: any;
  kecamatans: any;
  kelurahan: any;
  kelurahans: any;
  daWakodepos: any;
  untukstatusagunan: any;
  untukstatusdevini: any;
  untukjaminansebelum: any;
  untukstatussertifikat: any;
  curef: any;
  status_developer: any;
  idcollateralnyadetail: any;
  idcollateral: any;
  untukSessionRole: any;
  kirimandatadevloper: any;
  getlistkendaraan: any;
  listhubunganagunan: any;

  kirimanid_rumah:any;
  kirimannama_perumahan:any
  kirimanalamatagunan:any;
  kirimanalamat_sesuai_sertifikat:any
  kirimanblok_rumah:any;
  kirimanharga_objek:any;
  kirimanhubungan_pemegang_hak:any;
  kirimanjenisobjek:any;
  kirimankabkota_agunan:any;
  kirimankabkota_sesuai_sertifikat:any;
  kirimankecamatan_agunan:any;
  kirimankecamatan_sesuai_sertifikat:any;
  kirimankelurahan_agunan:any;
  kirimankelurahan_sesuai_sertifikat:any;
  kirimankode_pos_agunan:any;
  kirimankode_pos_sesuai_sertifikat:any;
  kirimanluas_bangunan:any;
  kirimanluas_tanah:any;
  kirimanmerek:any;
  kirimanmodel:any;
  kirimannamabpkb:any;
  kirimannama_pemegang_hak:any;
  kirimanno_handphone_cp:any;
  kirimanno_id_pemegang_hak_sertifikat:any;
  kirimannomesin:any;
  kirimannoplat:any;
  kirimannorangka:any;
  kirimanno_sertifikat:any;
  kirimannobpkb:any;
  kirimannomor_rumah:any;
  kirimanprovinsi_agunan:any;
  kirimanprovinsi_sesuai_sertifikat:any;
  kirimanrt:any;
  kirimanrt_sertifikat:any;
  kirimanrw:any;
  kirimanrw_sertifikat:any;
  kirimanseri:any;
  kirimanstatus_agunan:any;
  kirimanstatus_developer:any;
  kirimanstatus_jaminan_sebelumnya:any;
  kirimanstatus_sertifikat:any;
  kirimantahun_dibuat:any;
  kirimantanggal_expired:any;
  kirimantanggal_terbit:any;
  kirimantipe_agunan:any;
  kirimantipekendaraan:any;
  kirimantipe_properti:any;
  kirimanwarna:any;

  constructor(
    protected datEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimanidcollateral = params['datakirimanidcollateral'];
    });
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
  protected apistatussertifikat = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_sertifikat'
  );
  protected apigetlistkendraan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-ref/list_tipe_kendaraan'
  );
  protected apigethubunganagunan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-ref/list_hubungan_agunan'
  );

  protected apigettipeagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/list_tipe_agunan');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getCollateralById?si=');
  protected apigetlistagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-ref/list_developer');
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.gettokendukcapil();

    // alert('123' + this.app_no_de);
    // alert('321' + this.app_no_de);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('editcollateral', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        this.tampungantipeagunan = res.body?.result.tipe_agunan;
        this.untukstatusdev = res.body?.result.status_agunan;
        this.idcollateralnyadetail = res.body?.result.id_collateral_detail;
        this.idcollateral = res.body?.result.id_collateral;
        this.pemisahuntukdevloper = res.body?.result.status_developer;
        // this.status_developer=res.body?.result.status_agunan;
        alert(this.tampungantipeagunan);
        alert(this.untukstatusdev);
        // this.onResponseSuccess(res);
      },
    });
    this.gettipeagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('pasangan', res);
        this.datatipeagunan = res.body?.result;
        // this.tampungantipeagunan = 0;
      },
    });

    this.getstatussertifikat().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('statussertifikat', res);
        this.statussertifikat = res.body?.result;
        this.tampungantipeagunan = 0;
      },
    });

    this.getlistagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('listagunan', res);
        this.listagunan = res.body?.result;
        this.tampungantipeagunan = 0;
      },
    });

    this.getlistkendaraanload().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('kendaraan', res.body?.result);
        this.getlistkendaraan = res.body?.result;
      },
    });

    this.gethubunganagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('hubunganagunana', res);
        this.listhubunganagunan = res.body?.result;
        this.tampungantipeagunan = 0;
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
            },
          });
        },
      });
  }

  gethubunganagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.apigethubunganagunan, { params: options, observe: 'response' });
  }

  getlistkendaraanload(req1?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req1);
    return this.http.get<ApiResponse>(this.apigetlistkendraan, { params: options, observe: 'response' });
  }

  onChange(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_agunan') as HTMLInputElement | any;

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
  onChanges(selectedStatus: any) {
    const provinsi_cabang = document.getElementById('provinsi_sesuai_sertifikat') as HTMLInputElement | any;

    // alert(this.postId);
    console.log('kode' + selectedStatus);
    this.datEntryService.getkabkota(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kota', res);

        this.daWakotas = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
  }
  onChangekota(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
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
  onChangekotas(selectedStatus: any) {
    // alert(this.postId);
    const provinsi_cabang = document.getElementById('kabkota_sesuai_sertifikat') as HTMLInputElement | any;
    this.datEntryService.getkecamatan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kecamata', res);

        this.kecamatans = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }
  onChangekecamatan(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
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
  onChangekecamatans(selectedStatus: any) {
    // alert(this.postId);

    const provinsi_cabang = document.getElementById('kecamatan_sesuai_sertifikat') as HTMLInputElement | any;
    this.datEntryService.getkelurahan(this.postId, provinsi_cabang.value).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kelurahan', res);

        this.kelurahans = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
      },
    });
    console.log(selectedStatus);
  }
  onChangekelurahan(selectedStatus: any) {
    // alert(this.postId);
    alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    const kode_post = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodepos;
    alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }
  onChangekelurahans(selectedStatus: any) {
    // alert(this.postId);
    alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_sesuai_sertifikat') as HTMLInputElement | any;
    const kode_post = document.getElementById('kode_pos_sesuai_sertifikat') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    alert(this.daWakodepos);
    // kode_post.innerHTML=this.daWakodepos ;
    kode_post.value = this.daWakodepos;
    alert('kodepos' + kode_post);
    // document.getElementById('kode_pos').value=this.daWakodepos;
    // alert(this.daWakodepos);
    // this.onResponseSuccess(res);
  }

  getstatussertifikat(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
   
    return this.http.get<ApiResponse>(this.apistatussertifikat, { params: options, observe: 'response' });
  }

  getlistagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    
    return this.http.get<ApiResponse>(this.apigetlistagunan, { params: options, observe: 'response' });
  }

  changefom() {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  gettipeagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
   
    return this.http.get<ApiResponse>(this.apigettipeagunan, { params: options, observe: 'response' });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanidcollateral, { params: options, observe: 'response' });
  }

  updatecollateral() {
    // this.onResponseSuccess(res);
    // alert('ke editcollateral ');
    // alert(this.datakirimanakategoripekerjaan);
    // console.warn('INI ADA GK SIH', this.curef, this.app_no_de);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        app_no_de: this.app_no_de,
        curef: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        // datakirimanidcollateral:idcollateral,
      },
    });
  }

  goto() {
    // this.onResponseSuccess(res);
    // alert('ke editcollateral ');
    // alert(this.datakirimanakategoripekerjaan);
    // console.warn('INI ADA GK SIH', this.curef, this.app_no_de);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        app_no_de: this.app_no_de,
        curef: this.datakirimiancure,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        // datakirimanidcollateral:idcollateral,
      },
    });
  }

  radiobbuttonbaru() {
    this.untukstatusdev = 'baru';
  }
  radiobbuttonsecon() {
    this.untukstatusdev = 'secon';
  }

  radiobbuttonpks() {
    this.pemisahuntukdevloper = 'pks';
  }
  radiobbuttonnonpks() {
    this.pemisahuntukdevloper = 'non pks';
  }
  radiobbuttonorang() {
    this.pemisahuntukdevloper = 'perorang';
  }

  updatecollateralnih() {
    const tipe_anggunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;
    const tipe_kendaraan2 = document.getElementById('tipe_kendaraan2') as HTMLInputElement | any;
    const merk2 = document.getElementById('merk2') as HTMLInputElement | any;
    const model2 = document.getElementById('model2') as HTMLInputElement | any;
    const seri2 = document.getElementById('seri2') as HTMLInputElement | any;
    const nomor_bpkb2 = document.getElementById('nomor_bpkb2') as HTMLInputElement | any;
    const no_plat = document.getElementById('no_plat') as HTMLInputElement | any;
    const warna = document.getElementById('warna') as HTMLInputElement | any;
    const no_mesin = document.getElementById('no_mesin') as HTMLInputElement | any;
    const no_rangka = document.getElementById('no_rangka') as HTMLInputElement | any;
    const nama_bpkb = document.getElementById('nama_bpkb') as HTMLInputElement | any;
    const tanggal_terbit = document.getElementById('tanggal_terbit') as HTMLInputElement | any;
    const tipe_properti = document.getElementById('tipe_properti') as HTMLInputElement | any;
    const nomor_sertifikat = document.getElementById('nomor_sertifikat') as HTMLInputElement | any;
    // const isecond = document.getElementById('isecond') as HTMLInputElement | any;
    // const ipks = document.getElementById('ipks') as HTMLInputElement | any;
    // const inonpks = document.getElementById('inonpks') as HTMLInputElement | any;
    // const iperorangan = document.getElementById('iperorangan') as HTMLInputElement | any;
    // const developer_pks = document.getElementById('developer_pks') as HTMLInputElement | any;
    // const developer_non_pks = document.getElementById('developer_non_pks') as HTMLInputElement | any;
    const nama_perumahan = document.getElementById('nama_perumahan') as HTMLInputElement | any;
    // const status_jaminan_sebelumnya = document.getElementById('status_jaminan_sebelumnya') as HTMLInputElement | any;
    const hubungan_pemegang_hak = document.getElementById('hubungan_pemegang_hak') as HTMLInputElement | any;
    const tahun_buat = document.getElementById('tahun_buat') as HTMLInputElement | any;
    const status_sertifikat = document.getElementById('status_sertifikat') as HTMLInputElement | any;
    const nama_pemegang_hak = document.getElementById('nama_pemegang_hak') as HTMLInputElement | any;
    const no_handphone_cp = document.getElementById('no_handphone_cp') as HTMLInputElement | any;
    const no_id_pemegang_hak_sertifikat = document.getElementById('no_id_pemegang_hak_sertifikat') as HTMLInputElement | any;
    // const tanggal_terbit = document.getElementById('tanggal_terbit') as HTMLInputElement | any;
    // const no_contact_person = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const nomor_identitas_pemegang_hak = document.getElementById('nomor_identitas_pemegang_hak') as HTMLInputElement | any;
    // const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const tanggal_exipred = document.getElementById('tanggal_expired') as HTMLInputElement | any;
    const tanggal_exipredd = document.getElementById('tanggal_exipred') as HTMLInputElement | any;
    const alamat_agunan = document.getElementById('alamat_agunan') as HTMLInputElement | any;
    const provinsi_agunan = document.getElementById('provinsi_agunan') as HTMLInputElement | any;
    const kabkota_agunan = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
    const kecamatan_agunan = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
    const kelurahan_agunan = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    const kode_pos_agunan = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
    const rt_agunan = document.getElementById('rt_agunan') as HTMLInputElement | any;
    const rw_agunan = document.getElementById('rw_agunan') as HTMLInputElement | any;
    // const iyaSama = document.getElementById('iyaSama') as HTMLInputElement | any;
    // const takSama = document.getElementById('takSama') as HTMLInputElement | any;
    const luas_bangunan_anggunan = document.getElementById('luas_bangunan_anggunan') as HTMLInputElement | any;
    const luas_tanah_anggunan = document.getElementById('luas_tanah_anggunan') as HTMLInputElement | any;
    const harga_objek = document.getElementById('harga_objek') as HTMLInputElement | any;
    const alamat_sesuai_sertifikat = document.getElementById('alamat_sesuai_sertifikat') as HTMLInputElement | any;
    const provinsi_sesuai_sertifikat = document.getElementById('provinsi_sesuai_sertifikat') as HTMLInputElement | any;
    const kabkota_sesuai_sertifikat = document.getElementById('kabkota_sesuai_sertifikat') as HTMLInputElement | any;
    const kecamatan_sesuai_sertifikat = document.getElementById('kecamatan_sesuai_sertifikat') as HTMLInputElement | any;
    const kelurahan_sesuai_sertifikat = document.getElementById('kelurahan_sesuai_sertifikat') as HTMLInputElement | any;
    const kode_pos_sesuai_sertifikat = document.getElementById('kode_pos_sesuai_sertifikat') as HTMLInputElement | any;
    const rt_sertifikat = document.getElementById('rt_sertifikat') as HTMLInputElement | any;
    const rw_sertifikat = document.getElementById('rw_sertifikat') as HTMLInputElement | any;
    const id_rumah = document.getElementById('id_rumah') as HTMLInputElement | any;
    const blok_rumah = document.getElementById('blok_rumah') as HTMLInputElement | any;
    const no_rumah = document.getElementById('no_rumah') as HTMLInputElement | any;
    const no_sertifikat = document.getElementById('no_sertifikat') as HTMLInputElement | any;
    // const blok_rumah = document.getElementById('blok_rumah') as HTMLInputElement | any;
    // const blok_rumah = document.getElementById('blok_rumah') as HTMLInputElement | any;
    // const blok_rumah = document.getElementById('blok_rumah') as HTMLInputElement | any;
    // alert(id.value);
    // alert(jenis_kelamin.value);

    if (tipe_anggunan.value == 'Tanah') {
      const statussertifikatia = (<HTMLInputElement>document.getElementById('iyaSama')).checked;
      const statussertifikattidak = (<HTMLInputElement>document.getElementById('takSama')).checked;

      if (statussertifikatia == true) {
        this.untukstatussertifikat = 'iya';
      } else if (statussertifikattidak == true) {
        this.untukstatussertifikat = 'tidak';
      } else {
        this.untukstatussertifikat = 9;
      }
    } else if (tipe_anggunan.value == 'Kendaraan') {
    } else if (tipe_anggunan.value == 'Bangunan') {
      const statusagunanbaru = (<HTMLInputElement>document.getElementById('ibaru')).checked;
      const statusagunansecon = (<HTMLInputElement>document.getElementById('isecond')).checked;
      const statusdevpks = (<HTMLInputElement>document.getElementById('ipks')).checked;
      const statusdevnonpks = (<HTMLInputElement>document.getElementById('inonpks')).checked;
      const statusdevorang = (<HTMLInputElement>document.getElementById('iperorangan')).checked;
      const statusjaminansebelumia = (<HTMLInputElement>document.getElementById('status_jaminan_sebelumnyaia')).checked;
      const statusjaminansebelumtidak = (<HTMLInputElement>document.getElementById('status_jaminan_sebelumnyatidak')).checked;

      const statussertifikatia = (<HTMLInputElement>document.getElementById('iyaSama')).checked;
      const statussertifikattidak = (<HTMLInputElement>document.getElementById('takSama')).checked;

      if (statussertifikatia == true) {
        this.untukstatussertifikat = 'iya';
      } else if (statussertifikattidak == true) {
        this.untukstatussertifikat = 'tidak';
      } else {
        this.untukstatussertifikat = 9;
      }

      if (statusagunanbaru == true) {
        this.untukstatusagunan = 'baru';
      } else if (statusagunansecon == true) {
        this.untukstatusagunan = 'secon';
      } else {
        this.untukstatusagunan = 9;
      }

      if (statusdevnonpks == true) {
        this.untukstatusdevini = 'non pks';
        const developer_non_pks = document.getElementById('developer_non_pks') as HTMLInputElement | any;
        this.kirimandatadevloper = developer_non_pks.value;
      } else if (statusdevpks == true) {
        this.untukstatusdevini = 'pks';
        const developer_pks = document.getElementById('developer_pks') as HTMLInputElement | any;
        this.kirimandatadevloper = developer_pks.value;
      } else if (statusdevorang == true) {
        this.untukstatusdevini = 'perseorangan';
      } else {
        this.untukstatusdevini = 9;
      }

      if (statusjaminansebelumia == true) {
        this.untukjaminansebelum = 'iya';
      } else if (statusjaminansebelumtidak == true) {
        this.untukjaminansebelum = 'tidak';
      } else {
        this.untukjaminansebelum = 9;
      }
    } else if (tipe_anggunan.value == 'Tanah dan Bangunan') {
      const statusagunanbaru = (<HTMLInputElement>document.getElementById('ibaru')).checked;
      const statusagunansecon = (<HTMLInputElement>document.getElementById('isecond')).checked;
      const statusdevpks = (<HTMLInputElement>document.getElementById('ipks')).checked;
      const statusdevnonpks = (<HTMLInputElement>document.getElementById('inonpks')).checked;
      const statusdevorang = (<HTMLInputElement>document.getElementById('iperorangan')).checked;
      const statusjaminansebelumia = (<HTMLInputElement>document.getElementById('status_jaminan_sebelumnyaia')).checked;
      const statusjaminansebelumtidak = (<HTMLInputElement>document.getElementById('status_jaminan_sebelumnyatidak')).checked;

      const statussertifikatia = (<HTMLInputElement>document.getElementById('iyaSama')).checked;
      const statussertifikattidak = (<HTMLInputElement>document.getElementById('takSama')).checked;

      if (statussertifikatia == true) {
        this.untukstatussertifikat = 'iya';
      } else if (statussertifikattidak == true) {
        this.untukstatussertifikat = 'tidak';
      } else {
        this.untukstatussertifikat = 9;
      }

      if (statusagunanbaru == true) {
        this.untukstatusagunan = 'baru';
      } else if (statusagunansecon == true) {
        this.untukstatusagunan = 'secon';
      } else {
        this.untukstatusagunan = 9;
      }

      if (statusdevnonpks == true) {
        this.untukstatusdevini = 'non pks';
        const developer_non_pks = document.getElementById('developer_non_pks') as HTMLInputElement | any;
        this.kirimandatadevloper = developer_non_pks.value;
      } else if (statusdevpks == true) {
        this.untukstatusdevini = 'pks';
        const developer_pks = document.getElementById('developer_pks') as HTMLInputElement | any;
        this.kirimandatadevloper = developer_pks.value;
      } else if (statusdevorang == true) {
        this.untukstatusdevini = 'perseorangan';
      } else {
        this.untukstatusdevini = 9;
      }

      if (statusjaminansebelumia == true) {
        this.untukjaminansebelum = 'iya';
      } else if (statusjaminansebelumtidak == true) {
        this.untukjaminansebelum = 'tidak';
      } else {
        this.untukjaminansebelum = 9;
      }
    }

    if (tipe_anggunan.value == 'Kendaraan') {
      this.kirimanmerek = merk2.value;
      this.kirimantipekendaraan = tipe_kendaraan2.value;
      this.kirimanmodel = model2.value;
      this.kirimanseri = seri2.value;
      this.kirimannobpkb = nomor_bpkb2.value;
      this.kirimannoplat = no_plat.value;
      this.kirimanwarna = warna.value;
      this.kirimannomesin = no_mesin.value;
      this.kirimannorangka = no_rangka.value;
      this.kirimannamabpkb = nama_bpkb.value;
      this.kirimanalamatagunan = null;
      //  this.kirimantanggalterbit=null;
      this.kirimanalamat_sesuai_sertifikat = null;
      this.kirimanblok_rumah = null;
      this.kirimanharga_objek = null;
      this.kirimanhubungan_pemegang_hak = null;
      this.kirimanid_rumah = null;
      this.kirimankabkota_agunan = null;
      this.kirimankabkota_sesuai_sertifikat = null;
      this.kirimankecamatan_agunan = null;
      this.kirimankecamatan_sesuai_sertifikat = null;
      this.kirimankelurahan_agunan = null;
      this.kirimankelurahan_sesuai_sertifikat = null;
      this.kirimankode_pos_agunan = null;
      this.kirimankode_pos_sesuai_sertifikat = null;
      this.kirimanluas_bangunan = null;
      this.kirimannama_pemegang_hak = null;
       this.kirimannama_perumahan = null;
      this.kirimanno_handphone_cp = null;
      this.kirimanno_id_pemegang_hak_sertifikat = null;
      this.kirimannomor_rumah = null;
      this.kirimanprovinsi_agunan = null;
      this.kirimanprovinsi_sesuai_sertifikat = null;
      this.kirimanrt = null;
      this.kirimanrw = null;
      this.kirimanrt_sertifikat = null;
      this.kirimanrw_sertifikat = null;
      this.kirimanstatus_jaminan_sebelumnya = null;
      this.kirimanstatus_sertifikat = null;
      this.kirimantahun_dibuat = null;
      this.kirimantanggal_expired = null;
      this.kirimantanggal_terbit = tanggal_terbit.value;
      this.kirimantipe_agunan = tipe_anggunan.value;
      this.kirimanno_sertifikat = null;
      this.kirimantipe_properti = null;
      this.kirimanstatus_agunan = null;
      this.kirimanstatus_developer = null;
    } else if (tipe_anggunan.value == 'Tanah dan Bangunan') {
      this.kirimanmerek = null;
      this.kirimantipekendaraan = null;
      this.kirimanmodel = null;
      this.kirimanseri = null;
      this.kirimannobpkb = null;
      this.kirimannoplat = null;
      this.kirimanwarna = null;
      this.kirimannomesin = null;
      this.kirimannorangka = null;
      this.kirimannamabpkb = null;
      this.kirimanalamatagunan = alamat_agunan.value;
      //  this.kirimantanggalterbit=null;
      this.kirimanalamat_sesuai_sertifikat = alamat_sesuai_sertifikat.value;
      this.kirimanblok_rumah = blok_rumah.value;
      this.kirimanharga_objek = harga_objek.value;
      this.kirimanhubungan_pemegang_hak = hubungan_pemegang_hak.value;
      this.kirimanid_rumah = id_rumah.value;
      this.kirimankabkota_agunan = kabkota_agunan.value;
      this.kirimankabkota_sesuai_sertifikat = kabkota_sesuai_sertifikat.value;
      this.kirimankecamatan_agunan = kecamatan_agunan.value;
      this.kirimankecamatan_sesuai_sertifikat = kecamatan_sesuai_sertifikat.value;
      this.kirimankelurahan_agunan = kelurahan_agunan.value;
      this.kirimankelurahan_sesuai_sertifikat = kelurahan_sesuai_sertifikat.value;
      this.kirimankode_pos_agunan = kode_pos_agunan.value;
      this.kirimankode_pos_sesuai_sertifikat = kode_pos_sesuai_sertifikat.value;
      this.kirimanluas_bangunan = luas_bangunan_anggunan.value;
      // this.kirimanluas_bangunan_sertifikat=;
      this.kirimanluas_tanah = luas_tanah_anggunan.value;
      // this.kirimanluas_tanah_sertifikat=;
      this.kirimannama_pemegang_hak = nama_pemegang_hak.value;
      this.kirimannama_perumahan = nama_perumahan.value;
      this.kirimanno_handphone_cp = no_handphone_cp.value;
      this.kirimanno_id_pemegang_hak_sertifikat = no_id_pemegang_hak_sertifikat.value;
      this.kirimannomor_rumah = no_rumah.value;
      this.kirimanprovinsi_agunan = provinsi_agunan.value;
      this.kirimanprovinsi_sesuai_sertifikat = provinsi_sesuai_sertifikat.value;
      this.kirimanrt = rt_agunan.value;
      this.kirimanrw = rw_agunan.value;
      this.kirimanrt_sertifikat = rt_sertifikat.value;
      this.kirimanrw_sertifikat = rw_sertifikat.value;
      // this.kirimanstatus_jaminan_sebelumnya = null;
      this.kirimanstatus_sertifikat = this.untukstatussertifikat;
      this.kirimantahun_dibuat = tahun_buat.value;
      this.kirimantanggal_expired = tanggal_exipred.value;
      this.kirimantanggal_terbit = tanggal_terbit.value;
      this.kirimantipe_agunan = tipe_anggunan.value;
      this.kirimanno_sertifikat = no_sertifikat.value;
      this.kirimantipe_properti = tipe_properti.value;
      this.kirimanstatus_agunan = this.untukstatusagunan;
      this.kirimanstatus_developer = this.untukstatusdevini;
      this.kirimanstatus_jaminan_sebelumnya = this.untukjaminansebelum;
    } else if (tipe_anggunan.value == 'Tanah') {
      this.kirimanmerek = null;
      this.kirimantipekendaraan = null;
      this.kirimanmodel = null;
      this.kirimanseri = null;
      this.kirimannobpkb = null;
      this.kirimannoplat = null;
      this.kirimanwarna = null;
      this.kirimannomesin = null;
      this.kirimannorangka = null;
      this.kirimannamabpkb = null;
      this.kirimanalamatagunan = alamat_agunan.value;
      //  this.kirimantanggalterbit=null;
      this.kirimanalamat_sesuai_sertifikat = alamat_sesuai_sertifikat.value;
     this.kirimanblok_rumah = blok_rumah.value;
      this.kirimanharga_objek = harga_objek.value;
      this.kirimanhubungan_pemegang_hak = hubungan_pemegang_hak.value;
      this.kirimanid_rumah = id_rumah.value;
      this.kirimankabkota_agunan = kabkota_agunan.value;
      this.kirimankabkota_sesuai_sertifikat = kabkota_sesuai_sertifikat.value;
      this.kirimankecamatan_agunan = kecamatan_agunan.value;
      this.kirimankecamatan_sesuai_sertifikat = kecamatan_sesuai_sertifikat.value;
      this.kirimankelurahan_agunan = kelurahan_agunan.value;
      this.kirimankelurahan_sesuai_sertifikat = kelurahan_sesuai_sertifikat.value;
      this.kirimankode_pos_agunan = kode_pos_agunan.value;
      this.kirimankode_pos_sesuai_sertifikat = kode_pos_sesuai_sertifikat.value;
      this.kirimanluas_bangunan = luas_bangunan_anggunan.value;
      // this.kirimanluas_bangunan_sertifikat=;
      this.kirimanluas_tanah = luas_tanah_anggunan.value;
      // this.kirimanluas_tanah_sertifikat=;
      this.kirimannama_pemegang_hak = nama_pemegang_hak.value;
      this.kirimannama_perumahan = null;
      this.kirimanno_handphone_cp = no_handphone_cp.value;
      this.kirimanno_id_pemegang_hak_sertifikat = nomor_identitas_pemegang_hak.value;
      this.kirimannomor_rumah = no_rumah.value;
      this.kirimanprovinsi_agunan = provinsi_agunan.value;
      this.kirimanprovinsi_sesuai_sertifikat = provinsi_sesuai_sertifikat.value;
      this.kirimanrt = rt_agunan.value;
      this.kirimanrw = rw_agunan.value;
      this.kirimanrt_sertifikat = rt_sertifikat.value;
      this.kirimanrw_sertifikat = rw_sertifikat.value;
      this.kirimanstatus_jaminan_sebelumnya = null;
      this.kirimanstatus_sertifikat = status_sertifikat.value;
      this.kirimantahun_dibuat = null;
      this.kirimantanggal_expired = tanggal_exipredd.value;
      this.kirimantanggal_terbit = tanggal_terbit.value;
      this.kirimantipe_agunan = tipe_anggunan.value;
      this.kirimanno_sertifikat = nomor_sertifikat.value;
      this.kirimanstatus_agunan = null;
      this.kirimanstatus_developer = null;
      this.kirimantipe_properti = null;
    } else if (tipe_anggunan.value == 'Bangunan') {
      this.kirimanmerek = null;
      this.kirimantipekendaraan = null;
      this.kirimanmodel = null;
      this.kirimanseri = null;
      this.kirimannobpkb = null;
      this.kirimannoplat = null;
      this.kirimanwarna = null;
      this.kirimannomesin = null;
      this.kirimannorangka = null;
      this.kirimannamabpkb = null;
      this.kirimanalamatagunan = alamat_agunan.value;
      //  this.kirimantanggalterbit=null;
      this.kirimanalamat_sesuai_sertifikat = alamat_sesuai_sertifikat.value;
      this.kirimanblok_rumah = blok_rumah.value;
      this.kirimanharga_objek = harga_objek.value;
      this.kirimanhubungan_pemegang_hak = hubungan_pemegang_hak.value;
      this.kirimanid_rumah = id_rumah.value;
      this.kirimankabkota_agunan = kabkota_agunan.value;
      this.kirimankabkota_sesuai_sertifikat = kabkota_sesuai_sertifikat.value;
      this.kirimankecamatan_agunan = kecamatan_agunan.value;
      this.kirimankecamatan_sesuai_sertifikat = kecamatan_sesuai_sertifikat.value;
      this.kirimankelurahan_agunan = kelurahan_agunan.value;
      this.kirimankelurahan_sesuai_sertifikat = kelurahan_sesuai_sertifikat.value;
      this.kirimankode_pos_agunan = kode_pos_agunan.value;
      this.kirimankode_pos_sesuai_sertifikat = kode_pos_sesuai_sertifikat.value;
      // this.kirimanluas_bangunan_sertifikat=;
      this.kirimanluas_tanah = luas_tanah_anggunan.value;
      // this.kirimanluas_tanah_sertifikat=;

      this.kirimanluas_bangunan = luas_bangunan_anggunan.value;
      this.kirimannama_pemegang_hak = nama_pemegang_hak.value;
      this.kirimannama_perumahan = nama_perumahan.value;
      this.kirimanno_handphone_cp = no_handphone_cp.value;
      this.kirimanno_id_pemegang_hak_sertifikat = no_id_pemegang_hak_sertifikat.value;
      this.kirimannomor_rumah = no_rumah.value;
      this.kirimanprovinsi_agunan = provinsi_agunan.value;
      this.kirimanprovinsi_sesuai_sertifikat = provinsi_sesuai_sertifikat.value;
      this.kirimanrt = rt_agunan.value;
      this.kirimanrw = rw_agunan.value;
      this.kirimanrt_sertifikat = rt_sertifikat.value;
      this.kirimanrw_sertifikat = rw_sertifikat.value;
      // this.kirimanstatus_jaminan_sebelumnya = null;
      this.kirimanstatus_sertifikat = this.untukstatussertifikat;
      this.kirimantahun_dibuat = tahun_buat.value;
      this.kirimantanggal_expired = tanggal_exipred.value;
      this.kirimantanggal_terbit = tanggal_terbit.value;
      this.kirimantipe_agunan = tipe_anggunan.value;
      this.kirimanno_sertifikat = no_sertifikat.value;
      this.kirimantipe_properti = tipe_properti.value;
      this.kirimanstatus_agunan = this.untukstatusagunan;
      this.kirimanstatus_developer = this.untukstatusdevini;
      this.kirimanstatus_jaminan_sebelumnya = this.untukjaminansebelum;
    }

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_collateral', {
        // headers: headers,
        // alamat_perusahaan: alamat_perusahaan.value,

        alamat_agunan: this.kirimanalamatagunan,
        alamat_sesuai_sertifikat: this.kirimanalamat_sesuai_sertifikat,
        app_no_de: this.app_no_de,
        blok_rumah: this.kirimanblok_rumah,
        curef: this.curef,
        developer: this.kirimandatadevloper,
        harga_objek: this.kirimanharga_objek,
        harga_objek_sertifikat: 'hardcode',
        hubungan_pemegang_hak: this.kirimanhubungan_pemegang_hak,
        id_collateral: this.idcollateral,
        id_collateral_detail: this.idcollateralnyadetail,
        id_rumah: this.kirimanid_rumah,
        // jenis_objek: 'string',
        kabkota_agunan: this.kirimankabkota_agunan,
        kabkota_sesuai_sertifikat: this.kirimankabkota_sesuai_sertifikat,
        kecamatan_agunan: this.kirimankecamatan_agunan,
        kecamatan_sesuai_sertifikat: this.kirimankecamatan_sesuai_sertifikat,
        kelurahan_agunan: this.kirimankelurahan_agunan,
        kelurahan_sesuai_sertifikat: this.kirimankelurahan_sesuai_sertifikat,
        kode_pos_agunan: this.kirimankode_pos_agunan,
        kode_pos_sesuai_sertifikat: this.kirimankode_pos_sesuai_sertifikat,
        luas_bangunan: this.kirimanluas_bangunan,
        // luas_bangunan_sertifikat: 'string',
        luas_tanah: this.kirimanluas_tanah,
        // luas_tanah_sertifikat: 'string',
        merk: this.kirimanmerek,
        model: this.kirimanmodel,
        nama_bpkb: this.kirimannamabpkb,
        nama_pemegang_hak: this.kirimannama_pemegang_hak,
        nama_perumahan: this.kirimannama_perumahan,
        no_handphone_cp: this.kirimanno_handphone_cp,
        no_id_pemegang_hak_sertifikat: this.kirimanno_id_pemegang_hak_sertifikat,
        no_mesin: this.kirimannomesin,
        no_plat: this.kirimannoplat,
        no_rangka: this.kirimannorangka,
        no_sertifikat: this.kirimanno_sertifikat,
        nomor_bpkb: this.kirimannobpkb,
        nomor_rumah: this.kirimannomor_rumah,
        provinsi_agunan: this.kirimanprovinsi_agunan,
        provinsi_sesuai_sertifikat: this.kirimanprovinsi_sesuai_sertifikat,
        rt: this.kirimanrt,
        rt_sertifikat: this.kirimanrt_sertifikat,
        rw: this.kirimanrw,
        rw_sertifikat: this.kirimanrw_sertifikat,
        seri: this.kirimanseri,
        // status_active: 'string',
        status_agunan: this.kirimanstatus_agunan,
        status_developer: this.kirimanstatus_developer,
        status_jaminan_sebelumnya: this.kirimanstatus_jaminan_sebelumnya,
        status_sertifikat: this.kirimanstatus_sertifikat,
        tahun_dibuat: this.kirimantahun_dibuat,
        tanggal_expired: this.kirimantanggal_expired,
        tanggal_terbit: this.kirimantanggal_terbit,
        tipe_agunan: this.kirimantipe_agunan,
        tipe_kendaraan:this.kirimantipekendaraan,
        tipe_properti: this.kirimantipe_properti,
        warna: this.kirimanwarna,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          // this.router.navigate(['/data-entry/job-info'], {
          //   // queryParams: {
          //   //   datakiriman: contohtampungancuref,
          //   //   statusPerkawinan: contohtampungstatuskawain,
          //   //   app_no_de: contohtampunganappde,
          //   //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
          //   // },
          // });

          this.router.navigate(['/data-entry/collateral'], {
            queryParams: {
              app_no_de: this.app_no_de,
              curef: this.curef,
              datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
              // datakirimanidcollateral:idcollateral,
            },
          });

          // window.location.reload();
        },
      });
  }
}
