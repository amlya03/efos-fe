import { Component, Input, OnInit } from '@angular/core';
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
import { environment } from 'environments/environment';
// import { colateralmodel } from './collateral-model';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-collateral-edit',
  templateUrl: './collateral-edit.component.html',
  styleUrls: ['./collateral-edit.component.scss'],
})
export class CollateralEditComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
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

  untukProvinsiSertif: any;
  untukKobkotaSertif: any;
  untukKecamatanSertif: any;
  untukKelurahanSertif: any;
  untukKodeProvinsiSertif: any;
  untukKodeKobkotaSertif: any;
  untukKodeKecamatanSertif: any;
  untukKodeKelurahanSertif: any;
  kirimanhubungan1: any;
  kirimanhubungan1lainya: any;

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
    this.getLoading(true);
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();
    //////////////////////////// validasi /////////////////////////////////////////
    this.editCollateralForm = this.formBuilder.group({
      tipe_agunan: { value: '', disabled: true },
      jenis_objek: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tipe_kendaraan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      merk: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      model: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      seri: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nomor_bpkb: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_plat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      warna: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_mesin: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_rangka: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nama_bpkb: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      hubungan_pemegang_hak: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tipe_properti: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_developer: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      developer: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      status_jaminan_sebelumnya: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      tahun_dibuat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      usia_bangunan: { value: '', disabled: true },
      status_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nama_pemegang_hak: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_handphone_cp: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      no_id_pemegang_hak_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      alamat_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      //
      provinsi_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kabkota_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kecamatan_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      kelurahan_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      //
      kode_pos_agunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rt: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rw: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      luas_tanah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      luas_bangunan: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      harga_objek: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      alamat_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      //
      provinsi_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kabkota_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kecamatan_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      kelurahan_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      //
      kode_pos_sesuai_sertifikat: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
      rt_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      rw_sertifikat: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      id_rumah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      blok_rumah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      nomor_rumah: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_terbit: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      tanggal_expired: { value: '', disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
      hubungan_pemegang_hak_lainya: {
        value: '',
        disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER',
      },
    });
  }

  load() {
    ///////////////// REF ////////////////////////////////////////
    setTimeout(() => {
      this.datEntryService.getFetchListPemegangHak().subscribe(data => {
        this.pemegangHak = data.result;
        // if(data.result.deskripsi !='Diri Sendiri'||data.result.deskripsi !='Orang Tua'||data.result.deskripsi !='Anak' || data.result.deskripsi !='Lainya'){
        //   this.pemegangHak = 'Lainya';
        // }else{
        //   this.pemegangHak = data.result;
        // }
      });
    }, 10);
    setTimeout(() => {
      this.datEntryService.getFetchListTipeAgunan().subscribe(agunan => {
        this.listTipeAgunan = agunan.result;
      });
    }, 20);
    setTimeout(() => {
      this.datEntryService.getFetchListObjekAgunan().subscribe(objek => {
        this.objekAgunan = objek.result;
      });
    }, 30);
    setTimeout(() => {
      this.datEntryService.getFetchListDeveloper().subscribe(dev => {
        this.listDeveloper = dev.result;
      });
    }, 40);
    setTimeout(() => {
      this.datEntryService.getFetchListSertifikat().subscribe(sertif => {
        this.listSertif = sertif.result;
      });
    }, 50);
    setTimeout(() => {
      this.datEntryService.getFetchListKendaraan().subscribe(kendaraan => {
        this.listKendaraan = kendaraan.result;
      });
    }, 60);
    ///////////////// REF ////////////////////////////////////////
    setTimeout(() => {
      this.gettokendukcapil();
    }, 70);

    setTimeout(() => {
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

        if (
          table.result.hubungan_pemegang_hak == 'Diri Sendiri' ||
          table.result.hubungan_pemegang_hak == 'Orang Tua' ||
          table.result.hubungan_pemegang_hak == 'Anak' ||
          table.result.hubungan_pemegang_hak == 'Lainya'
        ) {
          // alert("ini if");
          // alert(table.result.hubungan_pemegang_hak =='Anak');
          this.kirimanhubungan1 = table.result.hubungan_pemegang_hak;
          this.kirimanhubungan1lainya = '';
        } else {
          // alert("ini else");
          this.kirimanhubungan1 = 'Lainya';
          this.kirimanhubungan1lainya = table.result.hubungan_pemegang_hak;
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
          hubungan_pemegang_hak_lainya: this.kirimanhubungan1lainya,
          no_mesin: this.tableAgunan.no_mesin,
          no_rangka: this.tableAgunan.no_rangka,
          nama_bpkb: this.tableAgunan.nama_bpkb,
          hubungan_pemegang_hak: this.kirimanhubungan1,
          tipe_properti: this.tableAgunan.tipe_properti,
          status_agunan: this.tableAgunan.status_agunan,
          status_developer: this.tableAgunan.status_developer,
          developer: this.tableAgunan.developer,
          status_jaminan_sebelumnya: this.tableAgunan.status_jaminan_sebelumnya,
          tahun_dibuat: this.tableAgunan.tahun_dibuat,
          usia_bangunan: '',
          status_sertifikat: this.tableAgunan.status_sertifikat,
          no_sertifikat: this.tableAgunan.no_sertifikat,
          nama_pemegang_hak: this.tableAgunan.nama_pemegang_hak,
          no_handphone_cp: this.tableAgunan.no_handphone_cp,
          no_id_pemegang_hak_sertifikat: this.tableAgunan.no_id_pemegang_hak_sertifikat,
          alamat_agunan: this.tableAgunan.alamat_agunan,
          //
          provinsi_agunan: '',
          kabkota_agunan: '',
          kecamatan_agunan: '',
          kelurahan_agunan: '',
          //
          kode_pos_agunan: this.tableAgunan.kode_pos_agunan,
          rt: this.tableAgunan.rt,
          rw: this.tableAgunan.rw,
          luas_tanah: this.tableAgunan.luas_tanah,
          luas_bangunan: this.tableAgunan.luas_bangunan,
          harga_objek: this.tableAgunan.harga_objek,
          alamat_sesuai_sertifikat: this.tableAgunan.alamat_sesuai_sertifikat,
          //
          provinsi_sesuai_sertifikat: '',
          kabkota_sesuai_sertifikat: '',
          kecamatan_sesuai_sertifikat: '',
          kelurahan_sesuai_sertifikat: '',
          //
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

        setTimeout(() => {
          this.getLoading(false);
          this.carimenggunakankodeposagunan(this.tableAgunan.kode_pos_agunan);
          this.carimenggunakankodepossertifikat(this.tableAgunan.kode_pos_sesuai_sertifikat);
        }, 300);
      });
    }, 80);
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
              //console.warn('PROVINSI', res);

              this.daWaprof = res.body?.result;
            },
          });
        },
      });
  }
  provinsiChange(value: any) {
    const valueProvinsi = value.split('|');
    this.datEntryService.getkabkota(this.postId, valueProvinsi[0]).subscribe(data => {
      //console.warn(data);
      this.daWakota = data.body?.result;
      this.editCollateralForm.get('kabkota_agunan')?.setValue(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);
    });
  }

  SertifProvChange(value: any): void {
    const valueKota = value.split('|');
    this.datEntryService.getkabkota(this.postId, valueKota[0]).subscribe(data => {
      this.daWakotas = data.body?.result;
      this.editCollateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif);
      // this.collateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.collateralForm.get('kabkota_agunan')?.value);
    });
  }
  kotaChange(value: any) {
    const valueKota = value.split('|');
    this.datEntryService.getkecamatan(this.postId, valueKota[0]).subscribe(data => {
      this.kecamatan = data.body?.result;
      this.editCollateralForm.get('kecamatan_agunan')?.setValue(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);
    });
  }
  SertifKotaChange(value: any): void {
    const proValue = value.split('|');
    this.datEntryService.getkecamatan(this.postId, proValue[0]).subscribe(data => {
      this.kecamatans = data.body?.result;
      this.editCollateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.untukKodeKecamatanSertif + '|' + this.untukKecamatanSertif);
      // this.collateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.collateralForm.get('kecamatan_agunan')?.value);
    });
  }
  kecamatanChange(value: any) {
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(this.postId, valueKecamatan[0]).subscribe(data => {
      this.kelurahan = data.body?.result;
      this.editCollateralForm.get('kelurahan_agunan')?.setValue(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
    });
  }
  SertifKecamatanChange(value: any): void {
    const valueKecamatan = value.split('|');
    this.datEntryService.getkelurahan(this.postId, valueKecamatan[0]).subscribe(data => {
      this.kelurahans = data.body?.result;
      this.editCollateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
      // this.collateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.collateralForm.get('kelurahan_agunan')?.value);
    });
  }
  kelurahanChange(value: any) {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.editCollateralForm.get('kode_pos_agunan')?.setValue(this.daWakodepos);
  }
  SertifKelurahanChange(value: any): void {
    const datakodepos = value.split('|');
    this.daWakodepos = datakodepos[0];
    this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.daWakodepos);
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

  createcollateral() {
    let provinsiSplit = this.editCollateralForm.get('provinsi_agunan')?.value.split('|');
    let kotaSplit = this.editCollateralForm.get('kabkota_agunan')?.value.split('|');
    let kecSplit = this.editCollateralForm.get('kecamatan_agunan')?.value.split('|');
    let kelSplit = this.editCollateralForm.get('kelurahan_agunan')?.value.split('|');
    let provSerSplit = this.editCollateralForm.get('provinsi_sesuai_sertifikat')?.value.split('|');
    let kotaSerSplit = this.editCollateralForm.get('kabkota_sesuai_sertifikat')?.value.split('|');
    let kecSerSplit = this.editCollateralForm.get('kecamatan_sesuai_sertifikat')?.value.split('|');
    let kelSerSplit = this.editCollateralForm.get('kelurahan_sesuai_sertifikat')?.value.split('|');

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

    if (this.editCollateralForm.get('hubungan_pemegang_hak')?.value == 'Lainya') {
      var kirimhubunganpemeganghak = this.editCollateralForm.get('hubungan_pemegang_hak_lainya')?.value;
    } else {
      var kirimhubunganpemeganghak = this.editCollateralForm.get('hubungan_pemegang_hak')?.value;
    }

    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/update_collateral', {
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
        hubungan_pemegang_hak: kirimhubunganpemeganghak,
        tipe_properti: this.editCollateralForm.get('tipe_properti')?.value,
        status_agunan: this.editCollateralForm.get('status_agunan')?.value,
        status_developer: this.editCollateralForm.get('status_developer')?.value,
        developer: this.editCollateralForm.get('developer')?.value,
        status_jaminan_sebelumnya: this.editCollateralForm.get('status_jaminan_sebelumnya')?.value,
        tahun_dibuat: this.editCollateralForm.get('tahun_dibuat')?.value,
        usia_bangunan: this.editCollateralForm.get('usia_bangunan')?.value,
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

  carimenggunakankodeposagunan(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe({
      next: sukses => {
        this.untukKodeProvinsiAgunan = sukses.body?.result.provKec.kd_prov;
        this.untukKodeKobkotAagunan = sukses.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanAgunan = sukses.body?.result.provKec.kd_kec;
        this.untukprovinsiagunan = sukses.body?.result.provKec.nm_prov;
        this.untukkobkotaagunan = sukses.body?.result.provKec.nm_kota;
        this.untukkecamatanagunan = sukses.body?.result.provKec.nm_kec;
        // console.warn(sukses);
        if (sukses.body?.result.provKec.kd_kel == null) {
          this.untukKodeKelurahanAgunan = kodepost;
          this.untukkelurahanagunan = sukses.body?.result.kels[0].namaWilayah;
          this.kelurahanChange(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
          // alert(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan)
        } else {
          this.untukKodeKelurahanAgunan = kodepost;
          this.untukkelurahanagunan = sukses.body?.result.provKec.nm_kel;
          this.kelurahanChange(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan);
          // alert(this.untukKodeKelurahanAgunan + '|' + this.untukkelurahanagunan)
        }
        this.editCollateralForm.get('provinsi_agunan')?.setValue(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
        this.provinsiChange(this.untukKodeProvinsiAgunan + '|' + this.untukprovinsiagunan);
        this.kotaChange(this.untukKodeKobkotAagunan + '|' + this.untukkobkotaagunan);
        this.kecamatanChange(this.untukKodeKecamatanAgunan + '|' + this.untukkecamatanagunan);
      },
    });
  }

  ///sertifikat

  carimenggunakankodepossertifikat(kodepost: any) {
    this.getkodepostnya(kodepost, 0).subscribe({
      next: sukses => {
        this.untukProvinsiSertif = sukses.body?.result.provKec.nm_prov;
        this.untukKobkotaSertif = sukses.body?.result.provKec.nm_kota;
        this.untukKecamatanSertif = sukses.body?.result.provKec.nm_kec;
        this.untukKodeProvinsiSertif = sukses.body?.result.provKec.kd_prov;
        this.untukKodeKobkotaSertif = sukses.body?.result.provKec.kd_kota;
        this.untukKodeKecamatanSertif = sukses.body?.result.provKec.kd_kec;
        const setNull = sukses.body?.result.provKec.kd_kel;
        //console.warn(sukses);
        // alert(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif)
        if (setNull == null) {
          this.untukKodeKelurahanSertif = kodepost;
          this.untukKelurahanSertif = sukses.body?.result.kels[0].namaWilayah;
          this.SertifKelurahanChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
          // alert(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif)
        } else {
          this.untukKodeKelurahanSertif = kodepost;
          this.untukKelurahanSertif = sukses.body?.result.provKec.nm_kel;
          this.SertifKelurahanChange(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif);
          // alert(this.untukKodeKelurahanSertif + '|' + this.untukKelurahanSertif)
        }
        this.editCollateralForm.get('provinsi_sesuai_sertifikat')?.setValue(this.untukKodeProvinsiSertif + '|' + this.untukProvinsiSertif);
        this.SertifProvChange(this.untukKodeProvinsiSertif + '|' + this.untukProvinsiSertif);
        this.SertifKotaChange(this.untukKodeKobkotaSertif + '|' + this.untukKobkotaSertif);
        this.SertifKecamatanChange(this.untukKodeKecamatanSertif + '|' + this.untukKecamatanSertif);
      },
    });
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
    if (event.value == 1) {
      this.editCollateralForm.get('alamat_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('alamat_agunan')?.value);
      this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('kode_pos_agunan')?.value);
      this.carimenggunakankodepossertifikat(this.editCollateralForm.get('kode_pos_agunan')?.value);
      this.editCollateralForm.get('rt_sertifikat')?.setValue(this.editCollateralForm.get('rt')?.value);
      this.editCollateralForm.get('rw_sertifikat')?.setValue(this.editCollateralForm.get('rw')?.value);
    } else {
      this.editCollateralForm.get('alamat_sesuai_sertifikat')?.setValue('');
      this.editCollateralForm.get('provinsi_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kabkota_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kecamatan_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kelurahan_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('kode_pos_sesuai_sertifikat')?.setValue(this.editCollateralForm.get('')?.value);
      this.editCollateralForm.get('rt_sertifikat')?.setValue('');
      this.editCollateralForm.get('rw_sertifikat')?.setValue('');
    }
  }

  hitungUsiaBangunan(tahun: any) {
    const d = new Date();
    let year = d.getFullYear();
    let total = Number(year) - Number(tahun);
    this.editCollateralForm.get('usia_bangunan')?.setValue(total);
  }

  public getLoading(loading: boolean) {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
