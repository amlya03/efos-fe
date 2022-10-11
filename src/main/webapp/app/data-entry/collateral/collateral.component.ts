import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { colateralmodel } from './collateral-model';
import { any } from 'cypress/types/bluebird';
// import { count } from 'console';

export type EntityResponseDaWa = HttpResponse<colateralmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss'],
})
export class CollateralComponent implements OnInit {
  datakirimande: any;
  datakirimancuref: any;
  datakirimanakategoripekerjaan: any;
  datakirimanappde: any;
  daWa: any;
  datatipeagunan: any;
  tampungantipeagunan: any;
  tambahatautidak: any;
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
  constructor(
    private route: ActivatedRoute,
    protected datEntryService: DataEntryService,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimande = params['datakirimande'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimancuref = params['datakirimancuref'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getCollateralByCuref?sc=');
  protected apigettipeagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/list_tipe_agunan');
  protected apistatussertifikat = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_sertifikat'
  );
  protected apigetlistagunan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_developer');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.gettokendukcapil();

    alert('colalteral' + this.datakirimande);
    alert(this.datakirimancuref);
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('pasangan', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });

    this.gettipeagunan().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('pasangan', res);
        this.datatipeagunan = res.body?.result;
        this.tampungantipeagunan = 0;
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
    var kode_post = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
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
    var kode_post = document.getElementById('kode_pos_sesuai_sertifikat') as HTMLInputElement | any;
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

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimancuref, { params: options, observe: 'response' });
  }

  gettipeagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigettipeagunan, { params: options, observe: 'response' });
  }

  getstatussertifikat(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apistatussertifikat, { params: options, observe: 'response' });
  }
  getlistagunan(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.apigetlistagunan, { params: options, observe: 'response' });
  }

  changefom() {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  tambahcollateral() {
    // const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;
    alert('tambah');
    this.tambahatautidak = 'benar';
    $('#tambahdata').attr('hidden', 'hidden');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto() {
    // this.onResponseSuccess(res);
    alert('ke struktur ');
    alert(this.datakirimanakategoripekerjaan);
    console.warn('INI ADA GK SIH', this.datakirimancuref, this.datakirimande);
    this.router.navigate(['/data-entry/struktur-pembiayaan'], {
      queryParams: {
        datakirimanappde: this.datakirimande,
        datakirimiancure: this.datakirimancuref,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });

    // if(this.datakirimanstatus === 'Menikah'){
    //   this.router.navigate(['/data-pasangan'], { queryParams: { datakiriman:this.datakirimanappde } });
    //   alert(' ini NIKAH');
    //   console.warn(this.datakiriman);
    // }
    // else{
    //   alert('ini jomblo');
    //   this.router.navigate(['/collateral'], { queryParams: { datakiriman:this.datakirimanappde } });
    // }
  }

  gotoeditcollateral(idcollateral: any) {
    // this.onResponseSuccess(res);
    alert('ke editcollateral ');
    alert(this.datakirimanakategoripekerjaan);
    console.warn('INI ADA GK SIH', this.datakirimancuref, this.datakirimande);
    this.router.navigate(['/data-entry/editcollateral'], {
      queryParams: {
        datakirimanappde: this.datakirimande,
        datakirimiancure: this.datakirimancuref,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        datakirimanidcollateral: idcollateral,
      },
    });
  }

  createcollateral() {
    alert(this.datakirimande);
    alert(this.datakirimanappde);
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
    const ibaru = document.getElementById('ibaru') as HTMLInputElement | any;
    const isecond = document.getElementById('isecond') as HTMLInputElement | any;
    const ipks = document.getElementById('ipks') as HTMLInputElement | any;
    const inonpks = document.getElementById('inonpks') as HTMLInputElement | any;
    const iperorangan = document.getElementById('iperorangan') as HTMLInputElement | any;
    const developer_pks = document.getElementById('developer_pks') as HTMLInputElement | any;
    const developer_non_pks = document.getElementById('developer_non_pks') as HTMLInputElement | any;
    const nama_perumahan = document.getElementById('nama_perumahan') as HTMLInputElement | any;
    const status_jaminan_sebelumnya = document.getElementById('status_jaminan_sebelumnya') as HTMLInputElement | any;
    const hubungan_pemegang_hak = document.getElementById('hubungan_pemegang_hak') as HTMLInputElement | any;
    const tahun_buat = document.getElementById('tahun_buat') as HTMLInputElement | any;
    const status_sertifikat = document.getElementById('status_sertifikat') as HTMLInputElement | any;
    const nama_pemegang_hak = document.getElementById('nama_pemegang_hak') as HTMLInputElement | any;
    const no_handphone_cp = document.getElementById('no_handphone_cp') as HTMLInputElement | any;
    const no_id_pemegang_hak_sertifikat = document.getElementById('no_id_pemegang_hak_sertifikat') as HTMLInputElement | any;
    const nomor_sertifikat = document.getElementById('tanggal_terbit') as HTMLInputElement | any;
    const no_contact_person = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const nomor_identitas_pemegang_hak = document.getElementById('nomor_identitas_pemegang_hak') as HTMLInputElement | any;
    const tanggal_lahir = document.getElementById('tanggal_lahir') as HTMLInputElement | any;
    const tanggal_exipred = document.getElementById('tanggal_exipred') as HTMLInputElement | any;
    const tahun_buatbiasa = document.getElementById('tahun_buatbiasa') as HTMLInputElement | any;
    const alamat_agunan = document.getElementById('alamat_agunan') as HTMLInputElement | any;
    const provinsi_agunan = document.getElementById('provinsi_agunan') as HTMLInputElement | any;
    const kabkota_agunan = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
    const kecamatan_agunan = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
    const kelurahan_agunan = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    const kode_pos_agunan = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
    const rt_agunan = document.getElementById('rt_agunan') as HTMLInputElement | any;
    const rw_agunan = document.getElementById('rw_agunan') as HTMLInputElement | any;
    const iyaSama = document.getElementById('iyaSama') as HTMLInputElement | any;
    const takSama = document.getElementById('takSama') as HTMLInputElement | any;
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

    if (tipe_anggunan.value == 'Kendaraan') {
      var kirimanmerek = merk2.value;
      var kirimantipekendaraan = tipe_kendaraan2.value;
      var kirimanmodel = model2.value;
      var kirimanseri = seri2.value;
      var kirimannobpkb = nomor_bpkb2.value;
      var kirimannoplat = no_plat.value;
      var kirimanwarna = warna.value;
      var kirimannomesin = no_mesin.value;
      var kirimannorangka = no_rangka.value;
      var kirimannamabpkb = nama_bpkb.value;
      var kirimanalamatagunan = null;
      //  var kirimantanggalterbit=null;
      var kirimanalamat_sesuai_sertifikat = null;
      var kirimanblok_rumah = null;
      var kirimanharga_objek = null;
      var kirimanhubungan_pemegang_hak = null;
      var kirimanid_rumah = null;
      var kirimankabkota_agunan = null;
      var kirimankabkota_sesuai_sertifikat = null;
      var kirimankecamatan_agunan = null;
      var kirimankecamatan_sesuai_sertifikat = null;
      var kirimankelurahan_agunan = null;
      var kirimankelurahan_sesuai_sertifikat = null;
      var kirimankode_pos_agunan = null;
      var kirimankode_pos_sesuai_sertifikat = null;
      var kirimanluas_bangunan = null;
      var kirimannama_pemegang_hak = null;
      var kirimannama_perumahan = null;
      var kirimanno_handphone_cp = null;
      var kirimanno_id_pemegang_hak_sertifikat = null;
      var kirimannomor_rumah = null;
      var kirimanprovinsi_agunan = null;
      var kirimanprovinsi_sesuai_sertifikat = null;
      var kirimanrt = null;
      var kirimanrw = null;
      var kirimanrt_sertifikat = null;
      var kirimanrw_sertifikat = null;
      var kirimanstatus_jaminan_sebelumnya = null;
      var kirimanstatus_sertifikat = null;
      var kirimantahun_dibuat = null;
      var kirimantanggal_expired = null;
      var kirimantanggal_terbit = null;
      var kirimantipe_agunan = null;
      var kirimanno_sertifikat = null;
      var kirimantipe_properti = null;
    } else if (tipe_anggunan.value == 'Tanah dan Bangunan') {
      var kirimanmerek = null;
      var kirimantipekendaraan = null;
      var kirimanmodel = null;
      var kirimanseri = null;
      var kirimannobpkb = null;
      var kirimannoplat = null;
      var kirimanwarna = null;
      var kirimannomesin = null;
      var kirimannorangka = null;
      var kirimannamabpkb = null;
      var kirimanalamatagunan = null;
      //  var kirimantanggalterbit=null;
      var kirimanalamat_sesuai_sertifikat = null;
      var kirimanblok_rumah = null;
      var kirimanharga_objek = null;
      var kirimanhubungan_pemegang_hak = null;
      var kirimanid_rumah = null;
      var kirimankabkota_agunan = null;
      var kirimankabkota_sesuai_sertifikat = null;
      var kirimankecamatan_agunan = null;
      var kirimankecamatan_sesuai_sertifikat = null;
      var kirimankelurahan_agunan = null;
      var kirimankelurahan_sesuai_sertifikat = null;
      var kirimankode_pos_agunan = null;
      var kirimankode_pos_sesuai_sertifikat = null;
      var kirimanluas_bangunan = null;
      var kirimannama_pemegang_hak = null;
      var kirimannama_perumahan = null;
      var kirimanno_handphone_cp = null;
      var kirimanno_id_pemegang_hak_sertifikat = null;
      var kirimannomor_rumah = null;
      var kirimanprovinsi_agunan = null;
      var kirimanprovinsi_sesuai_sertifikat = null;
      var kirimanrt = null;
      var kirimanrw = null;
      var kirimanrt_sertifikat = null;
      var kirimanrw_sertifikat = null;
      var kirimanstatus_jaminan_sebelumnya = null;
      var kirimanstatus_sertifikat = null;
      var kirimantahun_dibuat = null;
      var kirimantanggal_expired = null;
      var kirimantanggal_terbit = null;
      var kirimantipe_agunan = null;
      var kirimanno_sertifikat = null;
      var kirimantipe_properti = null;
    } else if (tipe_anggunan.value == 'Tanah') {
      var kirimanmerek = null;
      var kirimantipekendaraan = null;
      var kirimanmodel = null;
      var kirimanseri = null;
      var kirimannobpkb = null;
      var kirimannoplat = null;
      var kirimanwarna = null;
      var kirimannomesin = null;
      var kirimannorangka = null;
      var kirimannamabpkb = null;
      var kirimanalamatagunan = null;
      //  var kirimantanggalterbit=null;
      var kirimanalamat_sesuai_sertifikat = null;
      var kirimanblok_rumah = null;
      var kirimanharga_objek = null;
      var kirimanhubungan_pemegang_hak = null;
      var kirimanid_rumah = null;
      var kirimankabkota_agunan = null;
      var kirimankabkota_sesuai_sertifikat = null;
      var kirimankecamatan_agunan = null;
      var kirimankecamatan_sesuai_sertifikat = null;
      var kirimankelurahan_agunan = null;
      var kirimankelurahan_sesuai_sertifikat = null;
      var kirimankode_pos_agunan = null;
      var kirimankode_pos_sesuai_sertifikat = null;
      var kirimanluas_bangunan = null;
      var kirimannama_pemegang_hak = null;
      var kirimannama_perumahan = null;
      var kirimanno_handphone_cp = null;
      var kirimanno_id_pemegang_hak_sertifikat = null;
      var kirimannomor_rumah = null;
      var kirimanprovinsi_agunan = null;
      var kirimanprovinsi_sesuai_sertifikat = null;
      var kirimanrt = null;
      var kirimanrw = null;
      var kirimanrt_sertifikat = null;
      var kirimanrw_sertifikat = null;
      var kirimanstatus_jaminan_sebelumnya = null;
      var kirimanstatus_sertifikat = null;
      var kirimantahun_dibuat = null;
      var kirimantanggal_expired = null;
      var kirimantanggal_terbit = null;
      var kirimantipe_agunan = null;
      var kirimanno_sertifikat = null;
      var kirimantipe_properti = null;
    } else if (tipe_anggunan.value == 'Bangunan') {
      var kirimanmerek = null;
      var kirimantipekendaraan = null;
      var kirimanmodel = null;
      var kirimanseri = null;
      var kirimannobpkb = null;
      var kirimannoplat = null;
      var kirimanwarna = null;
      var kirimannomesin = null;
      var kirimannorangka = null;
      var kirimannamabpkb = null;
      var kirimanalamatagunan = null;
      //  var kirimantanggalterbit=null;
      var kirimanalamat_sesuai_sertifikat = null;
      var kirimanblok_rumah = null;
      var kirimanharga_objek = null;
      var kirimanhubungan_pemegang_hak = null;
      var kirimanid_rumah = null;
      var kirimankabkota_agunan = null;
      var kirimankabkota_sesuai_sertifikat = null;
      var kirimankecamatan_agunan = null;
      var kirimankecamatan_sesuai_sertifikat = null;
      var kirimankelurahan_agunan = null;
      var kirimankelurahan_sesuai_sertifikat = null;
      var kirimankode_pos_agunan = null;
      var kirimankode_pos_sesuai_sertifikat = null;
      var kirimanluas_bangunan = null;
      var kirimannama_pemegang_hak = null;
      var kirimannama_perumahan = null;
      var kirimanno_handphone_cp = null;
      var kirimanno_id_pemegang_hak_sertifikat = null;
      var kirimannomor_rumah = null;
      var kirimanprovinsi_agunan = null;
      var kirimanprovinsi_sesuai_sertifikat = null;
      var kirimanrt = null;
      var kirimanrw = null;
      var kirimanrt_sertifikat = null;
      var kirimanrw_sertifikat = null;
      var kirimanstatus_jaminan_sebelumnya = null;
      var kirimanstatus_sertifikat = null;
      var kirimantahun_dibuat = null;
      var kirimantanggal_expired = null;
      var kirimantanggal_terbit = null;
      var kirimantipe_agunan = null;
      var kirimanno_sertifikat = null;
      var kirimantipe_properti = null;
    }

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_collateral', {
        // headers: headers,
        // alamat_perusahaan: alamat_perusahaan.value,

        alamat_agunan: kirimanalamatagunan,
        alamat_sesuai_sertifikat: kirimanalamat_sesuai_sertifikat,
        app_no_de: this.datakirimande,
        blok_rumah: kirimanblok_rumah,
        curef: this.datakirimancuref,
        developer: 'cekcontohdevloper',
        harga_objek: kirimanharga_objek,
        harga_objek_sertifikat: 'string',
        hubungan_pemegang_hak: kirimanhubungan_pemegang_hak,
        id_collateral: null,
        id_collateral_detail: null,
        id_rumah: kirimanid_rumah,
        // jenis_objek: 'string',
        kabkota_agunan: kirimankabkota_agunan,
        kabkota_sesuai_sertifikat: kirimankabkota_sesuai_sertifikat,
        kecamatan_agunan: kirimankecamatan_agunan,
        kecamatan_sesuai_sertifikat: kirimankecamatan_sesuai_sertifikat,
        kelurahan_agunan: kirimankelurahan_agunan,
        kelurahan_sesuai_sertifikat: kirimankelurahan_sesuai_sertifikat,
        kode_pos_agunan: kirimankode_pos_agunan,
        kode_pos_sesuai_sertifikat: kirimankode_pos_sesuai_sertifikat,
        luas_bangunan: kirimanluas_bangunan,
        luas_bangunan_sertifikat: 'string',
        luas_tanah: 'string',
        luas_tanah_sertifikat: 'string',
        merk: kirimanmerek,
        model: kirimanmodel,
        nama_bpkb: kirimannamabpkb,
        nama_pemegang_hak: kirimannama_pemegang_hak,
        nama_perumahan: kirimannama_perumahan,
        no_handphone_cp: kirimanno_handphone_cp,
        no_id_pemegang_hak_sertifikat: kirimanno_id_pemegang_hak_sertifikat,
        no_mesin: kirimannomesin,
        no_plat: kirimannoplat,
        no_rangka: kirimannorangka,
        no_sertifikat: kirimanno_sertifikat,
        nomor_bpkb: kirimannobpkb,
        nomor_rumah: kirimannomor_rumah,
        provinsi_agunan: kirimanprovinsi_agunan,
        provinsi_sesuai_sertifikat: kirimanprovinsi_sesuai_sertifikat,
        rt: kirimanrt,
        rt_sertifikat: kirimanrt_sertifikat,
        rw: kirimanrw,
        rw_sertifikat: kirimanrw_sertifikat,
        seri: kirimanseri,
        // status_active: 'string',
        // status_agunan: 'string',
        // status_developer: 'string',
        status_jaminan_sebelumnya: kirimanstatus_jaminan_sebelumnya,
        status_sertifikat: kirimanstatus_sertifikat,
        tahun_dibuat: kirimantahun_dibuat,
        tanggal_expired: kirimantanggal_expired,
        tanggal_terbit: kirimantanggal_terbit,
        tipe_agunan: kirimantipe_agunan,
        tipe_kendaraan: kirimantipekendaraan,
        tipe_properti: kirimantipe_properti,
        warna: kirimanwarna,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          // this.router.navigate(['/data-entry/job-info'], {
          //   // queryParams: {
          //   //   datakiriman: contohtampungancuref,
          //   //   datakirimanstatus: contohtampungstatuskawain,
          //   //   datakirimanappde: contohtampunganappde,
          //   //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
          //   // },
          // });
          window.location.reload();
        },
      });
  }
}
