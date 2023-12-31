import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Validators } from 'ngx-editor';
import { ServiceVerificationService } from '../service/service-verification.service';
import { refHubunganAgunan } from '../service/config/refHubunganAgunan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { refAnalisaDataKantor } from './refAnalisaDataKantor.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { SessionStorageService } from 'ngx-webstorage';
import { getListTipePekerjaan } from 'app/data-entry/services/config/getListTipePekerjaan.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-data-kantor',
  templateUrl: './data-kantor.component.html',
  styleUrls: ['./data-kantor.component.scss'],
})
export class DataKantorComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  // model dukcapil
  kecamatan: any;
  kelurahan: any;
  kode_pos: string | undefined;
  // model dukcapil

  editor!: Editor;
  html = '';
  dataKantorForm!: FormGroup;
  formRetrive!: FormGroup;
  refHubunganAgunan?: refHubunganAgunan[];
  app_no_de: any;
  dataKantorMap: refAnalisaDataKantor = new refAnalisaDataKantor();
  dataEntry: fetchAllDe = new fetchAllDe();
  dataJob: getJob = new getJob();
  curef: any;
  changeUntukTipe: any;
  listTipePekerjaan?: getListTipePekerjaan[];

  // Role
  untukSessionRole: any;
  untukSessionUserName: any;

  // logic get Number
  verifikatorMelihat: any;

  // Cek Result
  cekResult: any;

  // Mappping
  listPembayaranGaji: refHubunganAgunan[] = [];
  responsePembayaranGaji = {
    code: 200,
    message: 'Success',
    result: [
      {
        id: 1,
        deskripsi: 'Transfer',
        active: 't',
      },
      {
        id: 2,
        deskripsi: 'Cash/Tunai',
        active: 't',
      },
      {
        id: 3,
        deskripsi: 'Transfer dan Cash/Tunai',
        active: 't',
      },
      {
        id: 4,
        deskripsi: 'Keterangan lain',
        active: 't',
      },
    ],
  };

  constructor(
    protected dataKantor: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    private formBuilder: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected dataEntryService: DataEntryService,
    private sessionStorageService: SessionStorageService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.verifikatorMelihat = this.untukSessionRole === 'VER_PRESCR';
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    // alert(this.untukSessionUserName)
    // this.postGetTokenDuckapil();
    // this.editor = new Editor();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.formRetrive = this.formBuilder.group({
      tipe_kepegawaian: { value: '', disabled: true },
      tipe_pekerjaan: { value: '', disabled: true },
    });

    this.dataKantorForm = this.formBuilder.group({
      tanggal_verifikasi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pemberi_keterangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      hubungan_pemberi_keterangan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_fax: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_fax: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_no_telepon: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_no_telepon: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_alamat_perusahaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_alamat_perusahaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_nama_perusahaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_nama_perusahaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_provinsi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_provinsi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kabkota: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kabkota: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kecamatan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kecamatan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kelurahan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kelurahan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_kode_pos: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_kode_pos: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_lama_bekerja: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_lama_bekerja: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_bidang_usaha: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_bidang_usaha: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_sektor_ekonomi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_sektor_ekonomi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_tipe_pekerjaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_tipe_pekerjaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_status_kepegawaian: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_status_kepegawaian: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_jabatan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_jabatan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      verif_usia_pensiun: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      note_verif_usia_pensiun: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      divisi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      aspek_syariah: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      waktu_verifikasi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },

      jumlah_pinjaman_kantor: [
        {
          value: '0',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        [Validators.maxLength(30), Validators.required],
      ],
      komponen_gaji: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        [Validators.maxLength(30), Validators.required],
      ],
      pembayaran_gaji: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        [Validators.maxLength(100), Validators.required],
      ],
      tenor_pinjaman_kantor: [
        {
          value: '',
          disabled:
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
            this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
        },
        [Validators.maxLength(20), Validators.required],
      ],
      pembayaran_gaji_input: '',
      // created_date: '',
      // updated_date: '',
      // created_by: '',
      // updated_by: '',
    });

    this.load();
  }

  load(): void {
    // get List Pembayaran gaji Manual
    this.listPembayaranGaji = this.responsePembayaranGaji.result;
    // get List Pembayaran gaji Manual

    setTimeout(() => {
      // ambil semua data DE
      this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        this.dataEntry = data.result;
      });
    }, 2);
    setTimeout(() => {
      // ref hubungan agunan
      this.dataKantor.getJabatanPemberiKeterangan().subscribe(data => {
        // console.warn('ref hubungan Agunan', data);
        if (data.code === 200) {
          this.refHubunganAgunan = data.result;
        }
      });
    }, 4);
    setTimeout(() => {
      // ambil Semua Data Job
      this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(job => {
        this.dataJob = job.result[0];
        if (this.dataJob.kategori_pekerjaan === 'Fix Income') {
          this.changeUntukTipe = 1;
        } else if (this.dataJob.kategori_pekerjaan === 'Non Fix Income') {
          this.changeUntukTipe = 2;
        } else {
          this.changeUntukTipe = 3;
        }
        this.dataEntryService.getFetchListTipePekerjaan(this.changeUntukTipe).subscribe(data => {
          this.listTipePekerjaan = data.result;
        });
        // alert(this.changeUntukTipe)
        const retriveForm = {
          tipe_kepegawaian: this.dataJob.tipe_kepegawaian,
          tipe_pekerjaan: this.dataJob.tipe_pekerjaan,
        };
        this.formRetrive.setValue(retriveForm);
      });
    }, 6);

    // ambil data Kantor
    setTimeout(() => {
      this.dataKantor.fetchDataKantor(this.app_no_de).subscribe(data => {
        this.dataKantorMap = data.result;

        if (data.result === null) {
          this.cekResult = 0;
          this.getLoading(false);

          const retriveDataKantor = {
            tanggal_verifikasi: '',
            pemberi_keterangan: '',
            hubungan_pemberi_keterangan: '',
            verif_fax: '',
            note_verif_fax: '',
            verif_no_telepon: '',
            note_verif_no_telepon: '',
            verif_alamat_perusahaan: '',
            note_verif_alamat_perusahaan: '',
            verif_nama_perusahaan: '',
            note_verif_nama_perusahaan: '',
            verif_provinsi: '',
            note_verif_provinsi: '',
            verif_kabkota: '',
            note_verif_kabkota: '',
            verif_kecamatan: '',
            note_verif_kecamatan: '',
            verif_kelurahan: '',
            note_verif_kelurahan: '',
            verif_kode_pos: '',
            note_verif_kode_pos: '',
            verif_lama_bekerja: '',
            note_verif_lama_bekerja: '',
            verif_bidang_usaha: '',
            note_verif_bidang_usaha: '',
            verif_sektor_ekonomi: '',
            note_verif_sektor_ekonomi: '',
            verif_tipe_pekerjaan: '',
            note_verif_tipe_pekerjaan: '',
            verif_status_kepegawaian: '',
            note_verif_status_kepegawaian: '',
            verif_jabatan: '',
            note_verif_jabatan: '',
            verif_usia_pensiun: '',
            note_verif_usia_pensiun: '',
            divisi: '',
            aspek_syariah: '',
            waktu_verifikasi: '',

            jumlah_pinjaman_kantor: '',
            komponen_gaji: '',
            pembayaran_gaji: '',
            pembayaran_gaji_input: '',
            tenor_pinjaman_kantor: '',
          };
          this.dataKantorForm.setValue(retriveDataKantor);
        } else {
          this.getLoading(false);
          this.cekResult = 1;

          const retriveDataKantor = {
            tanggal_verifikasi: this.dataKantorMap.tanggal_verifikasi,
            pemberi_keterangan: this.dataKantorMap.pemberi_keterangan,
            hubungan_pemberi_keterangan: this.dataKantorMap.hubungan_pemberi_keterangan,
            verif_fax: this.dataKantorMap.verif_fax,
            note_verif_fax: this.dataKantorMap.note_verif_fax,
            verif_no_telepon: this.dataKantorMap.verif_no_telepon,
            note_verif_no_telepon: this.dataKantorMap.note_verif_no_telepon,
            verif_alamat_perusahaan: this.dataKantorMap.verif_alamat_perusahaan,
            note_verif_alamat_perusahaan: this.dataKantorMap.note_verif_alamat_perusahaan,
            verif_nama_perusahaan: this.dataKantorMap.verif_nama_perusahaan,
            note_verif_nama_perusahaan: this.dataKantorMap.note_verif_nama_perusahaan,
            verif_provinsi: this.dataKantorMap.verif_provinsi,
            note_verif_provinsi: this.dataKantorMap.note_verif_provinsi,
            verif_kabkota: this.dataKantorMap.verif_kabkota,
            note_verif_kabkota: this.dataKantorMap.note_verif_kabkota,
            verif_kecamatan: this.dataKantorMap.verif_kecamatan,
            note_verif_kecamatan: this.dataKantorMap.note_verif_kecamatan,
            verif_kelurahan: this.dataKantorMap.verif_kelurahan,
            note_verif_kelurahan: this.dataKantorMap.note_verif_kelurahan,
            verif_kode_pos: this.dataKantorMap.verif_kode_pos,
            note_verif_kode_pos: this.dataKantorMap.note_verif_kode_pos,
            verif_lama_bekerja: this.dataKantorMap.verif_lama_bekerja,
            note_verif_lama_bekerja: this.dataKantorMap.note_verif_lama_bekerja,
            verif_bidang_usaha: this.dataKantorMap.verif_bidang_usaha,
            note_verif_bidang_usaha: this.dataKantorMap.note_verif_bidang_usaha,
            verif_sektor_ekonomi: this.dataKantorMap.verif_sektor_ekonomi,
            note_verif_sektor_ekonomi: this.dataKantorMap.note_verif_sektor_ekonomi,
            verif_tipe_pekerjaan: this.dataKantorMap.verif_tipe_pekerjaan,
            note_verif_tipe_pekerjaan: this.dataKantorMap.note_verif_tipe_pekerjaan,
            verif_status_kepegawaian: this.dataKantorMap.verif_status_kepegawaian,
            note_verif_status_kepegawaian: this.dataKantorMap.note_verif_status_kepegawaian,
            verif_jabatan: this.dataKantorMap.verif_jabatan,
            note_verif_jabatan: this.dataKantorMap.note_verif_jabatan,
            verif_usia_pensiun: this.dataKantorMap.verif_usia_pensiun,
            note_verif_usia_pensiun: this.dataKantorMap.note_verif_usia_pensiun,
            divisi: this.dataKantorMap.divisi,
            aspek_syariah: this.dataKantorMap.aspek_syariah,
            waktu_verifikasi: this.dataKantorMap.waktu_verifikasi,

            jumlah_pinjaman_kantor: this.dataKantorMap.jumlah_pinjaman_kantor,
            komponen_gaji: this.dataKantorMap.komponen_gaji,
            pembayaran_gaji: '',
            pembayaran_gaji_input: '',
            tenor_pinjaman_kantor: this.dataKantorMap.tenor_pinjaman_kantor,
          };
          this.dataKantorForm.setValue(retriveDataKantor);
        }

        // eslint-disable-next-line eqeqeq
        if (this.listPembayaranGaji.find((value: refHubunganAgunan) => value.deskripsi == this.dataKantorMap.pembayaran_gaji)) {
          this.dataKantorForm.get('pembayaran_gaji')?.setValue(this.dataKantorMap.pembayaran_gaji);
          this.dataKantorForm.get('pembayaran_gaji_input')?.setValue('');
        } else {
          this.dataKantorForm.get('pembayaran_gaji')?.setValue('Keterangan lain');
          this.dataKantorForm.get('pembayaran_gaji_input')?.setValue(this.dataKantorMap.pembayaran_gaji);
        }
      });
    }, 10);

    // // ref jabatan
    // this.dataKantor.getJabatan().subscribe(data => {
    //   // console.warn('ref', data);
    //   if (data.code === 200) {
    //     this.refJabatan = data.result;
    //   }
    // });
    // // ref Jumlah Karyawan
    // this.dataKantor.getJumlahKaryawan().subscribe(data => {
    //   // console.warn('ref', data);
    //   if (data.code === 200) {
    //     this.refJumlahKaryawan = data.result;
    //   }
    // });
    // // ref Jenis Bidang
    // this.IdeService.getBidang().subscribe(data => {
    //   // console.log('jenis Bidang', data.result);
    //   if (data.code === 200) {
    //     this.refBidang = data.result;
    //   }
    // });
  }

  onSubmit(): void {
    if (this.dataKantorForm.get('pembayaran_gaji')?.value === 'Keterangan lain') {
      this.dataKantorForm.get('pembayaran_gaji')?.setValue(this.dataKantorForm.get('pembayaran_gaji_input')?.value);
    } else {
      this.dataKantorForm.get('pembayaran_gaji')?.value;
    }

    if (this.cekResult === 0) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/create_analisa_kantor', {
          // id: 0,
          app_no_de: this.app_no_de,
          aspek_syariah: this.dataKantorForm.get('aspek_syariah')?.value,
          created_by: this.untukSessionUserName,
          created_date: '',
          divisi: this.dataKantorForm.get('divisi')?.value,
          hubungan_pemberi_keterangan: this.dataKantorForm.get('hubungan_pemberi_keterangan')?.value,
          note_verif_alamat_perusahan: this.dataKantorForm.get('note_verif_alamat_perusahan')?.value,
          note_verif_bidang_usaha: this.dataKantorForm.get('note_verif_bidang_usaha')?.value,
          note_verif_fax: this.dataKantorForm.get('note_verif_fax')?.value,
          note_verif_jabatan: this.dataKantorForm.get('note_verif_jabatan')?.value,
          // note_verif_jenis_pekerjaan: this.dataKantorForm.get('note_verif_jenis_pekerjaan')?.value,
          // note_verif_jumlah_karyawan: this.dataKantorForm.get('note_verif_jumlah_karyawan')?.value,
          note_verif_kabkota: this.dataKantorForm.get('note_verif_kabkota')?.value,
          note_verif_kecamatan: this.dataKantorForm.get('note_verif_kecamatan')?.value,
          note_verif_kelurahan: this.dataKantorForm.get('note_verif_kelurahan')?.value,
          note_verif_kode_pos: this.dataKantorForm.get('note_verif_kode_pos')?.value,
          note_verif_lama_bekerja: this.dataKantorForm.get('note_verif_lama_bekerja')?.value,
          note_verif_lama_beroperasi: this.dataKantorForm.get('note_verif_lama_beroperasi')?.value,
          note_verif_nama_perusahan: this.dataKantorForm.get('note_verif_nama_perusahan')?.value,
          note_verif_no_telepon: this.dataKantorForm.get('note_verif_no_telepon')?.value,
          note_verif_provinsi: this.dataKantorForm.get('note_verif_provinsi')?.value,
          note_verif_rt_rw: this.dataKantorForm.get('note_verif_rt_rw')?.value,
          note_verif_sektor_ekonomi: this.dataKantorForm.get('note_verif_sektor_ekonomi')?.value,
          note_verif_status_kepegawaian: this.dataKantorForm.get('note_verif_status_kepegawaian')?.value,
          note_verif_tipe_pekerjaan: this.dataKantorForm.get('note_verif_tipe_pekerjaan')?.value,
          // note_verif_tipe_perusahaan: this.dataKantorForm.get('note_verif_tipe_perusahaan')?.value,
          note_verif_usia_pensiun: this.dataKantorForm.get('note_verif_usia_pensiun')?.value,
          pemberi_keterangan: this.dataKantorForm.get('pemberi_keterangan')?.value,
          tanggal_verifikasi: this.dataKantorForm.get('tanggal_verifikasi')?.value,
          // updated_by: this.untukSessionUserName,
          // updated_date: this.dataKantorForm.get('updated_date')?.value,
          verif_alamat_perusahan: this.dataKantorForm.get('verif_alamat_perusahan')?.value,
          verif_bidang_usaha: this.dataKantorForm.get('verif_bidang_usaha')?.value,
          verif_fax: this.dataKantorForm.get('verif_fax')?.value,
          verif_jabatan: this.dataKantorForm.get('verif_jabatan')?.value,
          // verif_jenis_pekerjaan: this.dataKantorForm.get('verif_jenis_pekerjaan')?.value,
          // verif_jumlah_karyawan: this.dataKantorForm.get('verif_jumlah_karyawan')?.value,
          verif_kabkota: this.dataKantorForm.get('verif_kabkota')?.value,
          verif_kecamatan: this.dataKantorForm.get('verif_kecamatan')?.value,
          verif_kelurahan: this.dataKantorForm.get('verif_kelurahan')?.value,
          verif_kode_pos: this.dataKantorForm.get('verif_kode_pos')?.value,
          verif_lama_bekerja: this.dataKantorForm.get('verif_lama_bekerja')?.value,
          verif_lama_beroperasi: this.dataKantorForm.get('verif_lama_beroperasi')?.value,
          verif_nama_perusahan: this.dataKantorForm.get('verif_nama_perusahan')?.value,
          verif_no_telepon: this.dataKantorForm.get('verif_no_telepon')?.value,
          verif_provinsi: this.dataKantorForm.get('verif_provinsi')?.value,
          verif_rt_rw: this.dataKantorForm.get('verif_rt_rw ')?.value,
          verif_sektor_ekonomi: this.dataKantorForm.get('verif_sektor_ekonomi')?.value,
          verif_status_kepegawaian: this.dataKantorForm.get('verif_status_kepegawaian')?.value,
          verif_tipe_pekerjaan: this.dataKantorForm.get('verif_tipe_pekerjaan')?.value,
          // verif_tipe_perusahaan: this.dataKantorForm.get('verif_tipe_perusahaan')?.value,
          verif_usia_pensiun: this.dataKantorForm.get('verif_usia_pensiun')?.value,
          verif_nama_perusahaan: this.dataKantorForm.get('verif_nama_perusahaan')?.value,
          note_verif_nama_perusahaan: this.dataKantorForm.get('note_verif_nama_perusahaan')?.value,
          verif_alamat_perusahaan: this.dataKantorForm.get('verif_alamat_perusahaan')?.value,
          note_verif_alamat_perusahaan: this.dataKantorForm.get('note_verif_alamat_perusahaan')?.value,
          waktu_verifikasi: this.dataKantorForm.get('waktu_verifikasi')?.value,

          jumlah_pinjaman_kantor: this.dataKantorForm.get('jumlah_pinjaman_kantor')?.value,
          komponen_gaji: this.dataKantorForm.get('komponen_gaji')?.value,
          pembayaran_gaji: this.dataKantorForm.get('pembayaran_gaji')?.value,
          tenor_pinjaman_kantor: this.dataKantorForm.get('tenor_pinjaman_kantor')?.value,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/mutasi-rekening'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
          },
        });
    } else {
      // alert(this.dataKantorForm.get('hubungan_pemberi_keterangan')?.value)
      // return
      this.http
        .post<any>(this.baseUrl + 'v1/efos-verif/update_analisa_data_kantor', {
          id: this.dataKantorMap.id,
          app_no_de: this.app_no_de,
          aspek_syariah: this.dataKantorForm.get('aspek_syariah')?.value,
          created_by: this.untukSessionUserName,
          created_date: '',
          divisi: this.dataKantorForm.get('divisi')?.value,
          hubungan_pemberi_keterangan: this.dataKantorForm.get('hubungan_pemberi_keterangan')?.value,
          note_verif_alamat_perusahan: this.dataKantorForm.get('note_verif_alamat_perusahan')?.value,
          note_verif_bidang_usaha: this.dataKantorForm.get('note_verif_bidang_usaha')?.value,
          note_verif_fax: this.dataKantorForm.get('note_verif_fax')?.value,
          note_verif_jabatan: this.dataKantorForm.get('note_verif_jabatan')?.value,
          // note_verif_jenis_pekerjaan: this.dataKantorForm.get('note_verif_jenis_pekerjaan')?.value,
          // note_verif_jumlah_karyawan: this.dataKantorForm.get('note_verif_jumlah_karyawan')?.value,
          note_verif_kabkota: this.dataKantorForm.get('note_verif_kabkota')?.value,
          note_verif_kecamatan: this.dataKantorForm.get('note_verif_kecamatan')?.value,
          note_verif_kelurahan: this.dataKantorForm.get('note_verif_kelurahan')?.value,
          note_verif_kode_pos: this.dataKantorForm.get('note_verif_kode_pos')?.value,
          note_verif_lama_bekerja: this.dataKantorForm.get('note_verif_lama_bekerja')?.value,
          note_verif_lama_beroperasi: this.dataKantorForm.get('note_verif_lama_beroperasi')?.value,
          note_verif_nama_perusahan: this.dataKantorForm.get('note_verif_nama_perusahan')?.value,
          note_verif_no_telepon: this.dataKantorForm.get('note_verif_no_telepon')?.value,
          note_verif_provinsi: this.dataKantorForm.get('note_verif_provinsi')?.value,
          note_verif_rt_rw: this.dataKantorForm.get('note_verif_rt_rw')?.value,
          note_verif_sektor_ekonomi: this.dataKantorForm.get('note_verif_sektor_ekonomi')?.value,
          note_verif_status_kepegawaian: this.dataKantorForm.get('note_verif_status_kepegawaian')?.value,
          note_verif_tipe_pekerjaan: this.dataKantorForm.get('note_verif_tipe_pekerjaan')?.value,
          // note_verif_tipe_perusahaan: this.dataKantorForm.get('note_verif_tipe_perusahaan')?.value,
          note_verif_usia_pensiun: this.dataKantorForm.get('note_verif_usia_pensiun')?.value,
          pemberi_keterangan: this.dataKantorForm.get('pemberi_keterangan')?.value,
          tanggal_verifikasi: this.dataKantorForm.get('tanggal_verifikasi')?.value,
          updated_by: this.untukSessionUserName,
          updated_date: '',
          verif_alamat_perusahan: this.dataKantorForm.get('verif_alamat_perusahan')?.value,
          verif_bidang_usaha: this.dataKantorForm.get('verif_bidang_usaha')?.value,
          verif_fax: this.dataKantorForm.get('verif_fax')?.value,
          verif_jabatan: this.dataKantorForm.get('verif_jabatan')?.value,
          // verif_jenis_pekerjaan: this.dataKantorForm.get('verif_jenis_pekerjaan')?.value,
          // verif_jumlah_karyawan: this.dataKantorForm.get('verif_jumlah_karyawan')?.value,
          verif_kabkota: this.dataKantorForm.get('verif_kabkota')?.value,
          verif_kecamatan: this.dataKantorForm.get('verif_kecamatan')?.value,
          verif_kelurahan: this.dataKantorForm.get('verif_kelurahan')?.value,
          verif_kode_pos: this.dataKantorForm.get('verif_kode_pos')?.value,
          verif_lama_bekerja: this.dataKantorForm.get('verif_lama_bekerja')?.value,
          verif_lama_beroperasi: this.dataKantorForm.get('verif_lama_beroperasi')?.value,
          verif_nama_perusahan: this.dataKantorForm.get('verif_nama_perusahan')?.value,
          verif_no_telepon: this.dataKantorForm.get('verif_no_telepon')?.value,
          verif_provinsi: this.dataKantorForm.get('verif_provinsi')?.value,
          verif_rt_rw: this.dataKantorForm.get('verif_rt_rw ')?.value,
          verif_sektor_ekonomi: this.dataKantorForm.get('verif_sektor_ekonomi')?.value,
          verif_status_kepegawaian: this.dataKantorForm.get('verif_status_kepegawaian')?.value,
          verif_tipe_pekerjaan: this.dataKantorForm.get('verif_tipe_pekerjaan')?.value,
          // verif_tipe_perusahaan: this.dataKantorForm.get('verif_tipe_perusahaan')?.value,
          verif_usia_pensiun: this.dataKantorForm.get('verif_usia_pensiun')?.value,
          verif_nama_perusahaan: this.dataKantorForm.get('verif_nama_perusahaan')?.value,
          note_verif_nama_perusahaan: this.dataKantorForm.get('note_verif_nama_perusahaan')?.value,
          verif_alamat_perusahaan: this.dataKantorForm.get('verif_alamat_perusahaan')?.value,
          note_verif_alamat_perusahaan: this.dataKantorForm.get('note_verif_alamat_perusahaan')?.value,
          waktu_verifikasi: this.dataKantorForm.get('waktu_verifikasi')?.value,

          jumlah_pinjaman_kantor: this.dataKantorForm.get('jumlah_pinjaman_kantor')?.value,
          komponen_gaji: this.dataKantorForm.get('komponen_gaji')?.value,
          pembayaran_gaji: this.dataKantorForm.get('pembayaran_gaji')?.value,
          tenor_pinjaman_kantor: this.dataKantorForm.get('tenor_pinjaman_kantor')?.value,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/mutasi-rekening'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
          },
        });
    }

    // // else{
    // if (tanggalExpNya > 30) {
    //   alert('Data Sudah Expired / Data Sudah Melebihin 30 Hari');
    //   return;
    // } else if (tanggalExpNyaPakeKoma < 0.1) {
    //   alert('Data Tidak Boleh Melebihi Hari ini');
    //   return;
    // }
    // // }
  }

  // Only Numbers
  keyPressNumbers(event?: any): void {
    const charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return;
    }
  }

  // Selanjutnya
  Next(): void {
    this.router.navigate(['/mutasi-rekening'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
