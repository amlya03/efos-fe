import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataEntryService } from '../services/data-entry.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormBuilder } from '@angular/forms';
import { refListTipeProperti } from 'app/verification/service/config/refListTipeProperti.model';
import Swal from 'sweetalert2';
import { listAgunan } from '../services/config/listAgunan.model';
import { refListDeveloper } from '../services/config/refListDeveloper.model';
import { refListJumlahKaryawan } from '../services/config/refListJumlahKaryawan.model';
import { refObjekAgunan } from '../services/config/refObjekAgunan.model';
import { refStatusSertifikat } from '../services/config/refStatusSertifikat.model';
import { refTipeAgunan } from '../services/config/refTipeAgunan.model';
// import { colateralmodel } from './collateral-model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral-edit',
  templateUrl: './collateral-edit.component.html',
  styleUrls: ['./collateral-edit.component.scss'],
})
export class CollateralEditComponent implements OnInit {
  editCollateralForm!: FormGroup;
  pemegangHak: refListJumlahKaryawan[] = [];
  listTipeAgunan: refTipeAgunan[] = [];
  tipeProperti: refListTipeProperti[] = [];
  objekAgunan: refObjekAgunan[] = [];
  listDeveloper: refListDeveloper[] = [];
  listSertif: refStatusSertifikat[] = [];
  listKendaraan: refListJumlahKaryawan[] = [];
  tableAgunan: listAgunan = new listAgunan();

  app_no_de: any;
  curef: any;
  statusPerkawinan: any;
  datakirimanid: any;

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
  untukstatusdev: any;
  pemisahuntukdevloper: any;
  untukstatusagunan: any;
  untukstatusdevini: any;
  untukjaminansebelum: any;
  untukstatussertifikat: any;
  kirimandatadevloper: any;
  untukSessionRole: any;
  getjenisobjek: any;
  getlistkendaraan: any;
  listhubunganagunan: any;
  untukprovinsiagunan: any;
  untukkobkotaagunan: any;
  untukkecamatanagunan: any;
  untukkelurahanagunan: any;
  untukKodeProvinsiAgunan: any;
  untukKodeKobkotAagunan: any;
  untukKodeKecamatanAgunan: any;
  untukKodeKelurahanAgunan: any;

  kirimanid_rumah: any;
  kirimannama_perumahan: any;
  kirimanalamatagunan: any;
  kirimanalamat_sesuai_sertifikat: any;
  kirimanblok_rumah: any;
  kirimanharga_objek: any;
  kirimanhubungan_pemegang_hak: any;
  kirimanjenisobjek: any;
  kirimankabkota_agunan: any;
  kirimankabkota_sesuai_sertifikat: any;
  kirimankecamatan_agunan: any;
  kirimankecamatan_sesuai_sertifikat: any;
  kirimankelurahan_agunan: any;
  kirimankelurahan_sesuai_sertifikat: any;
  kirimankode_pos_agunan: any;
  kirimankode_pos_sesuai_sertifikat: any;
  kirimanluas_bangunan: any;
  kirimanluas_tanah: any;
  kirimanmerek: any;
  kirimanmodel: any;
  kirimannamabpkb: any;
  kirimannama_pemegang_hak: any;
  kirimanno_handphone_cp: any;
  kirimanno_id_pemegang_hak_sertifikat: any;
  kirimannomesin: any;
  kirimannoplat: any;
  kirimannorangka: any;
  kirimanno_sertifikat: any;
  kirimannobpkb: any;
  kirimannomor_rumah: any;
  kirimanprovinsi_agunan: any;
  kirimanprovinsi_sesuai_sertifikat: any;
  kirimanrt: any;
  kirimanrt_sertifikat: any;
  kirimanrw: any;
  kirimanrw_sertifikat: any;
  kirimanseri: any;
  kirimanstatus_agunan: any;
  kirimanstatus_developer: any;
  kirimanstatus_jaminan_sebelumnya: any;
  kirimanstatus_sertifikat: any;
  kirimantahun_dibuat: any;
  kirimantanggal_expired: any;
  kirimantanggal_terbit: any;
  kirimantipe_agunan: any;
  kirimantipekendaraan: any;
  kirimantipe_properti: any;
  kirimanwarna: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    protected datEntryService: DataEntryService,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params['statusPerkawinan'];
      this.datakirimanid = params['datakirimanid'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();
    //////////////////////////// validasi /////////////////////////////////////////
    this.editCollateralForm = this.formBuilder.group({
      tipe_agunan: { value: '', disabled: true },
      jenis_objek: '',
      tipe_kendaraan: '',
      merk: '',
      model: '',
      seri: '',
      nomor_bpkb: '',
      no_plat: '',
      warna: '',
      no_mesin: '',
      no_rangka: '',
      nama_bpkb: '',
      hubungan_pemegang_hak: '',
      tipe_properti: '',
      status_agunan: '',
      status_developer: '',
      developer: '',
      status_jaminan_sebelumnya: '',
      tahun_dibuat: '',
      status_sertifikat: '',
      no_sertifikat: '',
      nama_pemegang_hak: '',
      no_handphone_cp: '',
      no_id_pemegang_hak_sertifikat: '',
      alamat_agunan: '',
      kode_pos_agunan: '',
      rt: '',
      rw: '',
      luas_tanah: '',
      luas_bangunan: '',
      harga_objek: '',
      alamat_sesuai_sertifikat: '',
      kode_pos_sesuai_sertifikat: '',
      rt_sertifikat: '',
      rw_sertifikat: '',
      id_rumah: '',
      blok_rumah: '',
      nomor_rumah: '',
      tanggal_terbit: '',
      tanggal_expired: '',
    });
  }

  load() {
    ///////////////// REF ////////////////////////////////////////
    this.datEntryService.getFetchListPemegangHak().subscribe(data => {
      this.pemegangHak = data.result;
    });
    this.datEntryService.getFetchListTipeAgunan().subscribe(agunan => {
      this.listTipeAgunan = agunan.result;
    });
    this.datEntryService.getFetchListObjekAgunan().subscribe(objek => {
      this.objekAgunan = objek.result;
    });
    this.datEntryService.getFetchListDeveloper().subscribe(dev => {
      this.listDeveloper = dev.result;
    });
    this.datEntryService.getFetchListSertifikat().subscribe(sertif => {
      this.listSertif = sertif.result;
    });
    this.datEntryService.getFetchListKendaraan().subscribe(kendaraan => {
      this.listKendaraan = kendaraan.result;
    });
    ///////////////// REF ////////////////////////////////////////
    this.gettokendukcapil();

    this.datEntryService.getFetchListAgunanById(this.datakirimanid).subscribe(table => {
      this.tableAgunan = table.result;
      // alert(this.tableAgunan.provinsi_agunan)
      if (this.tableAgunan.tipe_agunan == 'Kendaraan') {
        var tipeAgunan = 'C01';
      } else if (this.tableAgunan.tipe_agunan == 'Emas') {
        var tipeAgunan = 'E01';
      } else if (this.tableAgunan.tipe_agunan == 'Tanah') {
        var tipeAgunan = 'H01';
      } else if (this.tableAgunan.tipe_agunan == 'Bangunan') {
        var tipeAgunan = 'H02';
      } else {
        var tipeAgunan = 'H03';
      }
      this.datEntryService.getFetchListTipeProperti(tipeAgunan).subscribe(data => {
        this.tipeProperti = data.result;
      });
      let retriveAgunan = {
        tipe_agunan: tipeAgunan,
        jenis_objek: this.tableAgunan.jenis_objek,
        tipe_kendaraan: this.tableAgunan.tipe_kendaraan,
        merk: this.tableAgunan.merk,
        model: this.tableAgunan.model,
        seri: this.tableAgunan.seri,
        nomor_bpkb: this.tableAgunan.nomor_bpkb,
        no_plat: this.tableAgunan.no_plat,
        warna: this.tableAgunan.warna,
        no_mesin: this.tableAgunan.no_mesin,
        no_rangka: this.tableAgunan.no_rangka,
        nama_bpkb: this.tableAgunan.nama_bpkb,
        hubungan_pemegang_hak: this.tableAgunan.hubungan_pemegang_hak,
        tipe_properti: this.tableAgunan.tipe_properti,
        status_agunan: this.tableAgunan.status_agunan,
        status_developer: this.tableAgunan.status_developer,
        developer: this.tableAgunan.developer,
        status_jaminan_sebelumnya: this.tableAgunan.status_jaminan_sebelumnya,
        tahun_dibuat: this.tableAgunan.tahun_dibuat,
        status_sertifikat: this.tableAgunan.status_sertifikat,
        no_sertifikat: this.tableAgunan.no_sertifikat,
        nama_pemegang_hak: this.tableAgunan.nama_pemegang_hak,
        no_handphone_cp: this.tableAgunan.no_handphone_cp,
        no_id_pemegang_hak_sertifikat: this.tableAgunan.no_id_pemegang_hak_sertifikat,
        alamat_agunan: this.tableAgunan.alamat_agunan,
        kode_pos_agunan: this.tableAgunan.kode_pos_agunan,
        rt: this.tableAgunan.rt,
        rw: this.tableAgunan.rw,
        luas_tanah: this.tableAgunan.luas_tanah,
        luas_bangunan: this.tableAgunan.luas_bangunan,
        harga_objek: this.tableAgunan.harga_objek,
        alamat_sesuai_sertifikat: this.tableAgunan.alamat_sesuai_sertifikat,
        kode_pos_sesuai_sertifikat: this.tableAgunan.kode_pos_sesuai_sertifikat,
        rt_sertifikat: this.tableAgunan.rt_sertifikat,
        rw_sertifikat: this.tableAgunan.rw_sertifikat,
        id_rumah: this.tableAgunan.id_rumah,
        blok_rumah: this.tableAgunan.blok_rumah,
        nomor_rumah: this.tableAgunan.nomor_rumah,
        tanggal_terbit: this.tableAgunan.tanggal_terbit,
        tanggal_expired: this.tableAgunan.tanggal_expired,
      };
      this.editCollateralForm.setValue(retriveAgunan);
    });
  }
  agunanChange(code: any) {
    this.datEntryService.getFetchListTipeProperti(code).subscribe(data => {
      this.tipeProperti = data.result;
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
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    const kode_post = document.getElementById('kode_pos_agunan') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];

    kode_post.value = this.daWakodepos;
  }
  onChangekelurahans(selectedStatus: any) {
    // alert(this.postId);
    // alert('ganti');
    const provinsi_cabang = document.getElementById('kelurahan_sesuai_sertifikat') as HTMLInputElement | any;
    const kode_post = document.getElementById('kode_pos_sesuai_sertifikat') as HTMLInputElement | any;
    const datakodepos = provinsi_cabang.value.split('|');

    this.daWakodepos = datakodepos[0];
    kode_post.value = this.daWakodepos;
  }

  changefom() {
    const pilihantipeagunan = document.getElementById('tipe_anggunan') as HTMLInputElement | any;

    this.tampungantipeagunan = pilihantipeagunan.value;
  }

  tambahcollateral() {
    this.tambahatautidak = 'benar';
    $('#tambahdata').attr('hidden', 'hidden');
  }

  goto() {
    this.router.navigate(['/data-entry/struktur-pembiayaan'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
      },
    });
  }

  gotoeditcollateral(idcollateral: any) {
    this.router.navigate(['/data-entry/editcollateral'], {
      queryParams: {
        curef: this.curef,
        statusPerkawinan: this.statusPerkawinan,
        app_no_de: this.app_no_de,
        datakirimanid: idcollateral,
      },
    });
  }

  createcollateral(
    provinsi_agunan: any,
    kabkota_agunan: any,
    kecamatan_agunan: any,
    kelurahan_agunan: any,
    provinsi_sesuai_sertifikat: any,
    kabkota_sesuai_sertifikat: any,
    kecamatan_sesuai_sertifikat: any,
    kelurahan_sesuai_sertifikat: any
  ) {
    let provinsiSplit = provinsi_agunan.split('|');
    let kotaSplit = kabkota_agunan.split('|');
    let kecSplit = kecamatan_agunan.split('|');
    let kelSplit = kelurahan_agunan.split('|');
    let provSerSplit = provinsi_sesuai_sertifikat.split('|');
    let kotaSerSplit = kabkota_sesuai_sertifikat.split('|');
    let kecSerSplit = kecamatan_sesuai_sertifikat.split('|');
    let kelSerSplit = kelurahan_sesuai_sertifikat.split('|');

    if (this.editCollateralForm.get('tipe_agunan')?.value == 'C01') {
      var tipeAgunan = 'Kendaraan';
    } else if (this.editCollateralForm.get('tipe_agunan')?.value == 'E01') {
      var tipeAgunan = 'Emas';
    } else if (this.editCollateralForm.get('tipe_agunan')?.value == 'H01') {
      var tipeAgunan = 'Tanah';
    } else if (this.editCollateralForm.get('tipe_agunan')?.value == 'H02') {
      var tipeAgunan = 'Bangunan';
    } else {
      var tipeAgunan = 'Tanah dan Bangunan';
    }

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_collateral', {
        tipe_agunan: tipeAgunan,
        jenis_objek: this.editCollateralForm.get('jenis_objek')?.value,
        tipe_kendaraan: this.editCollateralForm.get('tipe_kendaraan')?.value,
        merk: this.editCollateralForm.get('merk')?.value,
        model: this.editCollateralForm.get('model')?.value,
        seri: this.editCollateralForm.get('seri')?.value,
        nomor_bpkb: this.editCollateralForm.get('nomor_bpkb')?.value,
        no_plat: this.editCollateralForm.get('no_plat')?.value,
        warna: this.editCollateralForm.get('warna')?.value,
        no_mesin: this.editCollateralForm.get('no_mesin')?.value,
        no_rangka: this.editCollateralForm.get('no_rangka')?.value,
        nama_bpkb: this.editCollateralForm.get('nama_bpkb')?.value,
        hubungan_pemegang_hak: this.editCollateralForm.get('hubungan_pemegang_hak')?.value,
        tipe_properti: this.editCollateralForm.get('tipe_properti')?.value,
        status_agunan: this.editCollateralForm.get('status_agunan')?.value,
        status_developer: this.editCollateralForm.get('status_developer')?.value,
        developer: this.editCollateralForm.get('developer')?.value,
        status_jaminan_sebelumnya: this.editCollateralForm.get('status_jaminan_sebelumnya')?.value,
        tahun_dibuat: this.editCollateralForm.get('tahun_dibuat')?.value,
        status_sertifikat: this.editCollateralForm.get('status_sertifikat')?.value,
        no_sertifikat: this.editCollateralForm.get('no_sertifikat')?.value,
        nama_pemegang_hak: this.editCollateralForm.get('nama_pemegang_hak')?.value,
        no_handphone_cp: this.editCollateralForm.get('no_handphone_cp')?.value,
        no_id_pemegang_hak_sertifikat: this.editCollateralForm.get('no_id_pemegang_hak_sertifikat')?.value,
        alamat_agunan: this.editCollateralForm.get('alamat_agunan')?.value,
        kode_pos_agunan: this.editCollateralForm.get('kode_pos_agunan')?.value,
        rt: this.editCollateralForm.get('rt')?.value,
        rw: this.editCollateralForm.get('rw')?.value,
        alamat_sesuai_sertifikat: this.editCollateralForm.get('alamat_sesuai_sertifikat')?.value,
        kode_pos_sesuai_sertifikat: this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.value,
        rt_sertifikat: this.editCollateralForm.get('rt_sertifikat')?.value,
        rw_sertifikat: this.editCollateralForm.get('rw_sertifikat')?.value,
        id_rumah: this.editCollateralForm.get('id_rumah')?.value,
        blok_rumah: this.editCollateralForm.get('blok_rumah')?.value,
        nomor_rumah: this.editCollateralForm.get('nomor_rumah')?.value,
        app_no_de: this.app_no_de,
        curef: this.curef,
        harga_objek: this.editCollateralForm.get('harga_objek')?.value,
        harga_objek_sertifikat: this.editCollateralForm.get('harga_objek')?.value,
        luas_bangunan: this.editCollateralForm.get('luas_bangunan')?.value,
        luas_bangunan_sertifikat: this.editCollateralForm.get('luas_bangunan')?.value,
        luas_tanah: this.editCollateralForm.get('luas_tanah')?.value,
        luas_tanah_sertifikat: this.editCollateralForm.get('luas_tanah')?.value,
        tanggal_terbit: this.editCollateralForm.get('tanggal_terbit')?.value,
        tanggal_expired: this.editCollateralForm.get('tanggal_expired')?.value,

        /// provinsiiiaanann
        provinsi_agunan: provinsiSplit[1],
        provinsi_sesuai_sertifikat: provSerSplit[1],
        kabkota_agunan: kotaSplit[1],
        kabkota_sesuai_sertifikat: kotaSerSplit[1],
        kecamatan_agunan: kecSplit[1],
        kecamatan_sesuai_sertifikat: kecSerSplit[1],
        kelurahan_agunan: kelSplit[1],
        kelurahan_sesuai_sertifikat: kelSerSplit[1],
        status_active: '',
        id_collateral: this.tableAgunan.id_collateral,
        id_collateral_detail: this.tableAgunan.id_collateral_detail,
        nama_perumahan: '',
      })
      .subscribe({
        next: bawaan => {
          alert('Berhasil Menyimpan Data');
          this.router.navigate(['/data-entry/collateral'], {
            queryParams: {
              curef: this.curef,
              statusPerkawinan: this.statusPerkawinan,
              app_no_de: this.app_no_de,
            },
          });
        },
      });
  }

  carimenggunakankodeposagunan(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);
        this.untukKodeProvinsiAgunan = res.body?.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = res.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = res.body?.result.provKec.kd_kec;
        this.untukKodeKelurahanAgunan = res.body?.result.provKec.kd_kel;

        this.untukprovinsiagunan = res.body?.result.provKec.nm_prov;
        this.untukkobkotaagunan = res.body?.result.provKec.nm_kota;
        this.untukkecamatanagunan = res.body?.result.provKec.nm_kec;
        this.untukkelurahanagunan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_agunan option:first').text(this.untukprovinsiagunan);
        $('#provinsi_agunan option:first').val(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_agunan option:first').text(this.untukkobkotaagunan);
        $('#kabkota_agunan option:first').val(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_agunan option:first').text(this.untukkecamatanagunan);
        $('#kecamatan_agunan option:first').val(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_agunan option:first').text(this.untukkelurahanagunan);
        $('#kelurahan_agunan option:first').val(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
      },
    });

    console.log(req);
  }

  ///sertifikat

  carimenggunakankodepossertifikat(kodepost: any, req: any) {
    this.getkodepostnya(kodepost, req).subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        console.warn('kodepost', res);

        // this.dawakodepost = res.body?.result;
        // alert(this.postId);
        // this.onResponseSuccess(res);

        this.untukKodeProvinsiAgunan = res.body?.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = res.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = res.body?.result.provKec.kd_kec;
        this.untukKodeKelurahanAgunan = res.body?.result.provKec.kd_kel;
        this.untukprovinsiagunan = res.body?.result.provKec.nm_prov;
        this.untukkobkotaagunan = res.body?.result.provKec.nm_kota;
        this.untukkecamatanagunan = res.body?.result.provKec.nm_kec;
        this.untukkelurahanagunan = res.body?.result.provKec.nm_kel;

        // $('#provinsi_cabang').attr('selected', 'selected').val(this.provinsi_cabangkode + '|' +    this.provinsi_cabang);
        $('#provinsi_sesuai_sertifikat option:first').text(this.untukprovinsiagunan);
        $('#provinsi_sesuai_sertifikat option:first').val(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);

        // $('#kabkota').append(this.kabkota_cabang);

        $('#kabkota_sesuai_sertifikat option:first').text(this.untukkobkotaagunan);
        $('#kabkota_sesuai_sertifikat option:first').val(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);

        // $('#kecamatan').attr('selected', 'selected').val(this.kecamatankode + '|' +    this.kecamatan);
        $('#kecamatan_sesuai_sertifikat option:first').text(this.untukkecamatanagunan);
        $('#kecamatan_sesuai_sertifikat option:first').val(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);

        // $('#kelurahan').attr('selected', 'selected').val(this.kelurahankode + '|' +    this.kelurahan);
        $('#kelurahan_sesuai_sertifikat option:first').text(this.untukkelurahanagunan);
        $('#kelurahan_sesuai_sertifikat option:first').val(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
        // alert(this.provinsi_cabang)
      },
    });

    console.log(req);
  }

  ///serifikat

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

  onItemChange(event: any) {
    const provinsi_agunan = document.getElementById('provinsi_agunan') as HTMLInputElement | any;
    const kabkota_agunan = document.getElementById('kabkota_agunan') as HTMLInputElement | any;
    const kecamatan_agunan = document.getElementById('kecamatan_agunan') as HTMLInputElement | any;
    const kelurahan_agunan = document.getElementById('kelurahan_agunan') as HTMLInputElement | any;
    var kirimankabkota_agunan = kabkota_agunan.value.split('|');
    var kirimankecamatan_agunan = kecamatan_agunan.value.split('|');
    var kirimankelurahan_agunan = kelurahan_agunan.value.split('|');
    var kirimanprovinsi_agunan = provinsi_agunan.value.split('|');

    if (event.value == 1) {
      this.editCollateralForm.get('alamat_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('alamat_agunan')?.value);
      this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('kode_pos_agunan')?.value);
      this.editCollateralForm.get('rt_sertifikat')?.setValue(this.editCollateralForm.get('rt')?.value);
      this.editCollateralForm.get('rw_sertifikat')?.setValue(this.editCollateralForm.get('rw')?.value);

      $('#provinsi_sesuai_sertifikat option:first').html(kirimanprovinsi_agunan[1]);
      $('#kabkota_sesuai_sertifikat option:first').html(kirimankabkota_agunan[1]);
      $('#kecamatan_sesuai_sertifikat option:first').html(kirimankecamatan_agunan[1]);
      $('#kelurahan_sesuai_sertifikat option:first').html(kirimankelurahan_agunan[1]);
      $('#provinsi_sesuai_sertifikat option:first').val(provinsi_agunan.value);
      $('#kabkota_sesuai_sertifikat option:first').val(kabkota_agunan.value);
      $('#kecamatan_sesuai_sertifikat option:first').val(kecamatan_agunan.value);
      $('#kelurahan_sesuai_sertifikat option:first').val(kelurahan_agunan.value);
    } else {
      this.editCollateralForm.get('alamat_sesuai_sertifikat')?.setValue(' ');
      this.editCollateralForm.get('rt_sertifikat')?.setValue(' ');
      this.editCollateralForm.get('rw_sertifikat')?.setValue(' ');
    }
  }
}
