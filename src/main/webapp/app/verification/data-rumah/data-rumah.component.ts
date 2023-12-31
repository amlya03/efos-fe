/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable prefer-const */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { getJobPasangan } from 'app/data-entry/services/config/getJobPasangan.model';
import { viewJobModel } from 'app/data-entry/services/config/viewJobModel.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { resultSlikTotal } from 'app/initial-data-entry/services/config/resultSlikTotal.model';
import { slik } from 'app/initial-data-entry/services/config/slik.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { refAnalisaKeuangan } from './refAnalisaKeuangan.model';
import { environment } from 'environments/environment';
import { InitialDataEntryService } from '../../initial-data-entry/services/initial-data-entry.service';
import { refAnalisaDataKantor } from '../data-kantor/refAnalisaDataKantor.model';

@Component({
  selector: 'jhi-data-rumah',
  templateUrl: './data-rumah.component.html',
  styleUrls: ['./data-rumah.component.scss'],
})
export class DataRumahComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  baseUrl: string = environment.baseUrl;
  analisaKeuanganForm!: FormGroup;
  slikForm!: FormGroup;
  submitted = false;
  app_no_de: any;
  curef: any;
  analisaKeuanganMap: refAnalisaKeuangan = new refAnalisaKeuangan();
  dataEntry: fetchAllDe = new fetchAllDe();
  dataJob: getJob = new getJob();
  getViewJob: viewJobModel = new viewJobModel();
  listSlik?: slik[];
  slikTotal: resultSlikTotal = new resultSlikTotal();
  listLajangSlik: slik[] = new Array<slik>();
  listMenikahSlik: slik[] = new Array<slik>();
  jobPasangan: getJobPasangan = new getJobPasangan();
  struktur: any;
  // Role
  untukSessionRole: any;
  untukSessionUsername: any;
  // Total Plafoud
  plafond: any;
  totalPlafonSlik: any;
  // Total Outstanding
  outstanding: any;
  totalOutstandingSlik: any;
  downloadSlik: any;

  // Table Slik
  totalOutNas: any;
  totalPlaNas: any;
  totalAngNas: any;
  totalPasOut: any;
  totalPasPla: any;
  totalPasAng: any;

  // cek result
  cekResult = 0;

  // kewajiban bank pasangan
  kewajibanBankPasangan: any;

  dataKantorMap: refAnalisaDataKantor = new refAnalisaDataKantor();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  sumOfNumber: any;

  constructor(
    protected dataRumah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService,
    private sessionStorageService: SessionStorageService,
    protected initalDataEntry: InitialDataEntryService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    // this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionUsername = this.sessionStorageService.retrieve('sessionUserName');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.analisaKeuanganForm = this.formBuilder.group({
      nama_dihubungi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      nama_pemeriksa: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      jabatan_dihubungi: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      tanggal_permintaan: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      tanggal_pemeriksa: {
        value: '',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },

      // Data Keuangan Nasabah \\
      gaji_kotor: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      gaji_kotor_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      tunjangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_kantor_lainnya: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_kotor: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_angsuran_kantor: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_bersih: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_usaha: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_profesional: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_penghasilan_kotor: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      // kewajiban_bank: {value:'0', disabled:this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' || this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2'},
      kewajiban_lainnya: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_penghasilan_bersih: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      tunjangan_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_kantor_lainnya_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_kotor_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_angsuran_kantor_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_bersih_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_usaha_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_profesional_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_penghasilan_kotor_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      // kewajiban_bank_pasangan: {value:'0', disabled:this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' || this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2'},
      kewajiban_lainnya_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_penghasilan_bersih_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      gaji_kotor_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      tunjangan_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_kantor_lainnya_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_kotor_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_angsuran_kantor_akumulasi: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_bersih_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      pendapatan_usaha_total: this.sumOfNumber,
      pendapatan_profesional_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_penghasilan_kotor_akumulasi: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      // kewajiban_bank_total: {value:'0', disabled:this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' || this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2'},
      kewajiban_lainnya_total: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_penghasilan_bersih_akumulasi: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },

      // tambahan
      angsuran_kewajiban_kantor: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      angsuran_kewajiban_kantor_pasangan: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
      total_angsuran_kewajiban_kantor: {
        value: '0',
        disabled:
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV' ||
          this.sessionStorageService.retrieve('sessionRole') === 'VER_PRE_SPV_2',
      },
    });

    // slik form
    this.slikForm = this.formBuilder.group({
      total_angsuran_nasabah: '0',
      total_angsuran_pasangan: '0',
    });
  }

  load(): void {
    // get Semua DE
    setTimeout(() => {
      this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        this.dataEntry = data.result;
        // console.warn(data)
        // alert(data.result.app_no_ide)
        // ambil semua data Slik
        // setTimeout(() => {
        this.dataRumah.fetchSlik(data.result.app_no_ide).subscribe({
          next: slikRes => {
            this.initalDataEntry.getDownloadSlik(data.result.app_no_ide).subscribe(download => {
              this.downloadSlik = download.result;
              // this.dtTrigger.next(download.result)
              // $('#downloadSlikOJK').DataTable().rows.add(download.result).draw();
            });
            this.getLoading(false);
            this.slikTotal = slikRes.result;
            const retSlik = {
              total_angsuran_nasabah: this.slikTotal.total_angsuran_nasabah,
              total_angsuran_pasangan: this.slikTotal.total_angsuran_pasangan,
            };
            this.slikForm.setValue(retSlik);
            // console.warn(data)
            // alert(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(this.slikTotal.total_angsuran_pasangan)))
            this.totalOutNas = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              Number(this.slikTotal.total_outstanding_nasabah)
            );
            this.totalPlaNas = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              Number(this.slikTotal.total_plafon_nasabah)
            );
            this.totalAngNas = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              Number(this.slikTotal.total_angsuran_nasabah)
            );
            this.totalPasOut = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              Number(this.slikTotal.total_outstanding_pasangan)
            );
            this.totalPasPla = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              Number(this.slikTotal.total_plafon_pasangan)
            );
            this.totalPasAng = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
              Number(this.slikTotal.total_angsuran_pasangan)
            );

            // List Slik
            this.listSlik = slikRes.result.dataSlikResult;
            // console.log(this.slikTotal.total_angsuran_pasangan)
            // this.struktur = ('Rp 10000').toLocaleString();
            // this.struktur = 'Rp 10000'.replace('Rp', '');
            // const cekkk = 'Rp 10,000'.replace(/,/g, '');
            // const cuukkk = cekkk.replace('Rp. ', '');
            // alert(this.struktur)
            // alert(cuukkk)

            this.listSlik?.forEach(element => {
              if (element.response_description === 'get SLIK Result Success') {
                if (element.status_applicant === 'Debitur Utama') {
                  this.listLajangSlik.push(element);
                } else if (element.status_applicant === 'Pasangan Debitur') {
                  this.listMenikahSlik.push(element);
                }
              }
            });
            this.dtTrigger.next(slikRes.result.dataSlikResult);
            const plafonNasabah = Number(this.slikTotal.total_plafon_nasabah);
            const plafonPasangan = Number(this.slikTotal.total_plafon_pasangan);
            const outstandingNasabah = Number(this.slikTotal.total_outstanding_nasabah);
            const outstandingPasangan = Number(this.slikTotal.total_outstanding_pasangan);
            this.totalPlafonSlik = plafonNasabah + plafonPasangan;
            this.totalOutstandingSlik = outstandingNasabah + outstandingPasangan;
            // alert(this.totalPlafonSlik)
          },
        });
      });
    }, 1);

    // get Semua JOB
    setTimeout(() => {
      this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(job => {
        this.dataJob = job.result[0];
        // alert(this.dataJob.total_pendapatan)
      });
    }, 3);

    // get Semua JOB Pasangan
    setTimeout(() => {
      this.dataEntryService.getSemuaDataJobPasangan(this.curef).subscribe(jobPasangan => {
        this.jobPasangan = jobPasangan.result;
        // console.log(this.jobPasangan)
      });
    }, 5);

    // ambil semua data Analisa
    setTimeout(() => {
      this.dataRumah.fetchAnalisaKeuangan(this.app_no_de).subscribe(data => {
        if (data.result === null) {
          this.cekResult = 0;
        } else {
          this.cekResult = 1;
        }
        this.analisaKeuanganMap = data.result;
        // }
        // alert(this.analisaKeuanganMap.jabatan_dihubungi)
        const retriveAnalisaKeuangan = {
          // id: 1,
          // app_no_de: this.app_no_de,
          nama_dihubungi: this.analisaKeuanganMap.nama_dihubungi,
          nama_pemeriksa: this.analisaKeuanganMap.nama_pemeriksa,
          jabatan_dihubungi: this.analisaKeuanganMap.jabatan_dihubungi,
          tanggal_permintaan: this.analisaKeuanganMap.tanggal_permintaan,
          tanggal_pemeriksa: this.analisaKeuanganMap.tanggal_pemeriksa,
          gaji_kotor: this.analisaKeuanganMap.gaji_kotor,
          tunjangan: this.analisaKeuanganMap.tunjangan,
          pendapatan_kantor_lainnya: this.analisaKeuanganMap.pendapatan_kantor_lainnya,
          pendapatan_kotor: this.analisaKeuanganMap.pendapatan_kotor,
          total_angsuran_kantor: this.analisaKeuanganMap.total_angsuran_kantor,
          pendapatan_bersih: this.analisaKeuanganMap.pendapatan_bersih,
          pendapatan_usaha: this.analisaKeuanganMap.pendapatan_usaha,
          pendapatan_profesional: this.analisaKeuanganMap.pendapatan_profesional,
          total_penghasilan_kotor: this.analisaKeuanganMap.total_penghasilan_kotor,
          // kewajiban_bank: this.slikTotal.total_angsuran_nasabah,
          kewajiban_lainnya: this.analisaKeuanganMap.kewajiban_lainnya,
          total_penghasilan_bersih: this.analisaKeuanganMap.total_penghasilan_bersih,
          gaji_kotor_pasangan: this.analisaKeuanganMap.gaji_kotor_pasangan,
          tunjangan_pasangan: this.analisaKeuanganMap.tunjangan_pasangan,
          pendapatan_kantor_lainnya_pasangan: this.analisaKeuanganMap.pendapatan_kantor_lainnya_pasangan,
          pendapatan_kotor_pasangan: this.analisaKeuanganMap.pendapatan_kotor_pasangan,
          total_angsuran_kantor_pasangan: this.analisaKeuanganMap.total_angsuran_kantor_pasangan,
          pendapatan_bersih_pasangan: this.analisaKeuanganMap.pendapatan_bersih_pasangan,
          pendapatan_usaha_pasangan: this.analisaKeuanganMap.pendapatan_usaha_pasangan,
          pendapatan_profesional_pasangan: this.analisaKeuanganMap.pendapatan_profesional_pasangan,
          total_penghasilan_kotor_pasangan: this.analisaKeuanganMap.total_penghasilan_kotor_pasangan,
          // kewajiban_bank_pasangan: this.slikTotal.total_angsuran_pasangan,
          kewajiban_lainnya_pasangan: this.analisaKeuanganMap.kewajiban_lainnya_pasangan,
          total_penghasilan_bersih_pasangan: this.analisaKeuanganMap.total_penghasilan_bersih_pasangan,
          gaji_kotor_total: this.analisaKeuanganMap.gaji_kotor_total,
          tunjangan_total: this.analisaKeuanganMap.tunjangan_total,
          pendapatan_kantor_lainnya_total: this.analisaKeuanganMap.pendapatan_kantor_lainnya_total,
          pendapatan_kotor_total: this.analisaKeuanganMap.pendapatan_kotor_total,
          total_angsuran_kantor_akumulasi: this.analisaKeuanganMap.total_angsuran_kantor_akumulasi,
          pendapatan_bersih_total: this.analisaKeuanganMap.pendapatan_bersih_total,
          pendapatan_usaha_total: this.analisaKeuanganMap.pendapatan_usaha_total,
          pendapatan_profesional_total: this.analisaKeuanganMap.pendapatan_profesional_total,
          total_penghasilan_kotor_akumulasi: this.analisaKeuanganMap.total_penghasilan_kotor_akumulasi,
          // kewajiban_bank_total: '',
          kewajiban_lainnya_total: this.analisaKeuanganMap.kewajiban_lainnya_total,
          total_penghasilan_bersih_akumulasi: this.analisaKeuanganMap.total_penghasilan_bersih_akumulasi,

          // Tambahajn
          angsuran_kewajiban_kantor: this.analisaKeuanganMap.angsuran_kewajiban_kantor,
          angsuran_kewajiban_kantor_pasangan: this.analisaKeuanganMap.angsuran_kewajiban_kantor_pasangan,
          total_angsuran_kewajiban_kantor: this.analisaKeuanganMap.total_angsuran_kewajiban_kantor,

          // created_date: "2022-09-29T10:59:20.895+00:00",
          // created_by: "",
          // updated_date: 'null',
          // updated_by: 'null'
        };
        this.analisaKeuanganForm.setValue(retriveAnalisaKeuangan);
        setTimeout(() => {
          if (this.dataEntry.joint_income == 0) {
            this.slikForm.get('total_angsuran_pasangan')?.setValue('0');
          }
          {
            this.slikForm.get('total_angsuran_pasangan')?.setValue(this.analisaKeuanganMap.kewajiban_lainnya_pasangan);
          }
        }, 10);
      });
    }, 5);
  }

  onSubmit(): void {
    this.getLoading(true);
    let total_pro: any;
    let total_kewa: any;
    let total_gaji: any;
    let total_kewaLain: any;
    let pend_kantorLain: any;
    let pend_usahaTot: any;
    let tunjangan_Tot: any;
    let pend_kotor: any;
    let pend_kotor_pas: any;
    let pend_kotor_tot: any;
    let pend_bersih_nas: any;
    let pend_bersih_pas: any;
    let pend_bersih: any;
    let angsuranKewaTotal: any;
    let totalPengKot: any;
    let totalPengKotPas: any;
    let totalTotalPengKot: any;
    let totalPengBersih: any;
    let totalPengBersihPas: any;
    let totalPengBersihTot: any;
    let slikKewajibanBankPasangan: any;
    let slikPlafondPasangan: any;
    let slikOutstandingPasangan: any;

    if (this.dataEntry.joint_income == 0 || this.dataEntry.kode_fasilitas_name === 'PTA') {
      // }else if(this.dataEntry.kode_fasilitas_name === 'PTA'){
      // alert('Join > '+this.dataEntry.joint_income + ' FAsilitas > ' +this.dataEntry.kode_fasilitas_name)
      // alert(this.dataEntry.joint_income == 0 || this.dataEntry.kode_fasilitas_name === 'PTA')
      total_kewa = Number(this.slikTotal.total_angsuran_nasabah);
      slikKewajibanBankPasangan = 0;
      this.slikForm.get('total_angsuran_pasangan')?.setValue(0);
      slikPlafondPasangan = 0;
      slikOutstandingPasangan = 0;
    } else {
      total_kewa = Number(this.slikTotal.total_angsuran_nasabah) + Number(this.slikTotal.total_angsuran_pasangan);
      slikKewajibanBankPasangan = this.slikTotal.total_angsuran_pasangan;
      this.slikForm.get('total_angsuran_pasangan')?.value;
      slikPlafondPasangan = this.slikTotal.total_plafon_pasangan;
      slikOutstandingPasangan = this.slikTotal.total_outstanding_pasangan;
    }

    total_pro =
      Number(this.analisaKeuanganForm.get('pendapatan_profesional')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value);
    total_gaji =
      Number(this.analisaKeuanganForm.get('gaji_kotor')?.value) + Number(this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value);
    total_kewaLain =
      Number(this.analisaKeuanganForm.get('kewajiban_lainnya')?.value) +
      Number(this.analisaKeuanganForm.get('kewajiban_lainnya_pasangan')?.value);
    pend_kantorLain =
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value);
    pend_usahaTot =
      Number(this.analisaKeuanganForm.get('pendapatan_usaha')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value);
    tunjangan_Tot =
      Number(this.analisaKeuanganForm.get('tunjangan')?.value) + Number(this.analisaKeuanganForm.get('tunjangan_pasangan')?.value);
    pend_kotor =
      Number(this.analisaKeuanganForm.get('gaji_kotor')?.value) +
      Number(this.analisaKeuanganForm.get('tunjangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value);
    pend_kotor_pas =
      Number(this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('tunjangan_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value);
    pend_kotor_tot = pend_kotor + pend_kotor_pas;
    pend_bersih_nas = pend_kotor - Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value);
    pend_bersih_pas = pend_kotor_pas - Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value);
    pend_bersih = pend_bersih_nas + pend_bersih_pas;
    angsuranKewaTotal =
      Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value) +
      Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value);
    // alert(pend_bersih_nas)
    totalPengKot =
      pend_bersih_nas +
      Number(this.analisaKeuanganForm.get('pendapatan_usaha')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_profesional')?.value);

    totalPengKotPas =
      pend_bersih_pas +
      Number(this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value);

    totalTotalPengKot = totalPengKot + totalPengKotPas;

    totalPengBersih =
      Number(this.analisaKeuanganForm.get('gaji_kotor')?.value) +
      Number(this.analisaKeuanganForm.get('tunjangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value) -
      Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value) +
      (Number(this.analisaKeuanganForm.get('pendapatan_usaha')?.value) +
        Number(this.analisaKeuanganForm.get('pendapatan_profesional')?.value)) -
      Number(this.analisaKeuanganForm.get('kewajiban_lainnya')?.value) -
      Number(this.slikForm.get('total_angsuran_nasabah')?.value);

    totalPengBersihPas =
      Number(this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('tunjangan_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value) -
      Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value) +
      (Number(this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value) +
        Number(this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value)) -
      Number(this.analisaKeuanganForm.get('kewajiban_lainnya_pasangan')?.value) -
      Number(this.slikForm.get('total_angsuran_pasangan')?.value);

    totalPengBersihTot = Number(totalPengBersih) + Number(totalPengBersihPas);

    // POST
    setTimeout(() => {
      this.submitted = true;
      if (this.analisaKeuanganForm.invalid) {
        return;
      } else if (this.cekResult === 0) {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/create_analisa_keuangan', {
            nama_pemohon: this.dataEntry.nama,
            alamat_perusahaan: this.dataJob.alamat_perusahaan,
            nama_perusahaan: this.dataJob.nama_perusahaan,
            app_no_de: this.app_no_de,
            no_telepon_perusahaan: this.dataJob.no_telepon,
            created_by: this.untukSessionUsername,
            created_date: '',
            nama_dihubungi: this.analisaKeuanganForm.get('nama_dihubungi')?.value,
            jabatan_dihubungi: this.analisaKeuanganForm.get('jabatan_dihubungi')?.value,
            gaji_kotor: this.analisaKeuanganForm.get('gaji_kotor')?.value,
            gaji_kotor_pasangan: this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value,
            gaji_kotor_total: total_gaji,
            kewajiban_bank: this.slikTotal.total_angsuran_nasabah,
            kewajiban_bank_pasangan: slikKewajibanBankPasangan,
            kewajiban_bank_total: total_kewa,
            kewajiban_lainnya: this.analisaKeuanganForm.get('kewajiban_lainnya')?.value,
            kewajiban_lainnya_pasangan: this.analisaKeuanganForm.get('kewajiban_lainnya_pasangan')?.value,
            kewajiban_lainnya_total: total_kewaLain,
            nama_pemeriksa: this.analisaKeuanganForm.get('nama_pemeriksa')?.value,
            pendapatan_bersih: pend_bersih_nas,
            pendapatan_bersih_pasangan: pend_bersih_pas,
            pendapatan_bersih_total: pend_bersih,
            pendapatan_kantor_lainnya: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value,
            pendapatan_kantor_lainnya_pasangan: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value,
            pendapatan_kantor_lainnya_total: pend_kantorLain,
            pendapatan_kotor: pend_kotor,
            pendapatan_kotor_pasangan: pend_kotor_pas,
            pendapatan_kotor_total: pend_kotor_tot,
            pendapatan_profesional: this.analisaKeuanganForm.get('pendapatan_profesional')?.value,
            pendapatan_profesional_pasangan: this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value,
            pendapatan_profesional_total: total_pro,
            pendapatan_usaha: this.analisaKeuanganForm.get('pendapatan_usaha')?.value,
            pendapatan_usaha_pasangan: this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value,
            pendapatan_usaha_total: pend_usahaTot,
            tanggal_pemeriksa: this.analisaKeuanganForm.get('tanggal_pemeriksa')?.value,
            tanggal_permintaan: this.analisaKeuanganForm.get('tanggal_permintaan')?.value,
            total_angsuran_kantor: this.analisaKeuanganForm.get('total_angsuran_kantor')?.value,
            total_angsuran_kantor_akumulasi: this.analisaKeuanganForm.get('total_angsuran_kantor_akumulasi')?.value,
            total_angsuran_kantor_pasangan: this.analisaKeuanganForm.get('total_angsuran_kantor_pasangan')?.value,
            total_penghasilan_bersih: totalPengBersih,
            total_penghasilan_bersih_akumulasi: totalPengBersihTot,
            total_penghasilan_bersih_pasangan: totalPengBersihPas,
            total_penghasilan_kotor: totalPengKot,
            total_penghasilan_kotor_akumulasi: totalTotalPengKot,
            total_penghasilan_kotor_pasangan: totalPengKotPas,
            tunjangan: this.analisaKeuanganForm.get('tunjangan')?.value,
            tunjangan_pasangan: this.analisaKeuanganForm.get('tunjangan_pasangan')?.value,
            tunjangan_total: tunjangan_Tot,

            // tambahan Total
            angsuran_kewajiban_kantor: this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value,
            angsuran_kewajiban_kantor_pasangan: this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value,
            total_angsuran_kewajiban_kantor: angsuranKewaTotal,
            outstanding_nasabah: this.slikTotal.total_outstanding_nasabah,
            outstanding_pasangan: slikOutstandingPasangan,
            total_outstanding: this.totalOutstandingSlik,
            plafon_nasabah: this.slikTotal.total_plafon_nasabah,
            plafon_pasangan: slikPlafondPasangan,
            total_plafon: this.totalPlafonSlik,
          })
          .subscribe({
            next: () => {
              this.getLoading(false);
              this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
            },
          });
      } else {
        this.http
          .post<any>(this.baseUrl + 'v1/efos-verif/update_analisa_keuangan', {
            nama_pemohon: this.dataEntry.nama,
            alamat_perusahaan: this.dataJob.alamat_perusahaan,
            nama_perusahaan: this.dataJob.nama_perusahaan,
            app_no_de: this.app_no_de,
            no_telepon_perusahaan: this.dataJob.no_telepon,
            created_by: this.untukSessionUsername,
            created_date: '',
            nama_dihubungi: this.analisaKeuanganForm.get('nama_dihubungi')?.value,
            jabatan_dihubungi: this.analisaKeuanganForm.get('jabatan_dihubungi')?.value,
            gaji_kotor: this.analisaKeuanganForm.get('gaji_kotor')?.value,
            gaji_kotor_pasangan: this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value,
            gaji_kotor_total: total_gaji,
            kewajiban_bank: this.slikTotal.total_angsuran_nasabah,
            kewajiban_bank_pasangan: slikKewajibanBankPasangan,
            kewajiban_bank_total: total_kewa,
            kewajiban_lainnya: this.analisaKeuanganForm.get('kewajiban_lainnya')?.value,
            kewajiban_lainnya_pasangan: this.analisaKeuanganForm.get('kewajiban_lainnya_pasangan')?.value,
            kewajiban_lainnya_total: total_kewaLain,
            nama_pemeriksa: this.analisaKeuanganForm.get('nama_pemeriksa')?.value,
            pendapatan_bersih: pend_bersih_nas,
            pendapatan_bersih_pasangan: pend_bersih_pas,
            pendapatan_bersih_total: pend_bersih,
            pendapatan_kantor_lainnya: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value,
            pendapatan_kantor_lainnya_pasangan: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value,
            pendapatan_kantor_lainnya_total: pend_kantorLain,
            pendapatan_kotor: pend_kotor,
            pendapatan_kotor_pasangan: pend_kotor_pas,
            pendapatan_kotor_total: pend_kotor_tot,
            pendapatan_profesional: this.analisaKeuanganForm.get('pendapatan_profesional')?.value,
            pendapatan_profesional_pasangan: this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value,
            pendapatan_profesional_total: total_pro,
            pendapatan_usaha: this.analisaKeuanganForm.get('pendapatan_usaha')?.value,
            pendapatan_usaha_pasangan: this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value,
            pendapatan_usaha_total: pend_usahaTot,
            tanggal_pemeriksa: this.analisaKeuanganForm.get('tanggal_pemeriksa')?.value,
            tanggal_permintaan: this.analisaKeuanganForm.get('tanggal_permintaan')?.value,
            total_angsuran_kantor: this.analisaKeuanganForm.get('total_angsuran_kantor')?.value,
            total_angsuran_kantor_akumulasi: this.analisaKeuanganForm.get('total_angsuran_kantor_akumulasi')?.value,
            total_angsuran_kantor_pasangan: this.analisaKeuanganForm.get('total_angsuran_kantor_pasangan')?.value,
            total_penghasilan_bersih: totalPengBersih,
            total_penghasilan_bersih_akumulasi: totalPengBersihTot,
            total_penghasilan_bersih_pasangan: totalPengBersihPas,
            total_penghasilan_kotor: totalPengKot,
            total_penghasilan_kotor_akumulasi: totalTotalPengKot,
            total_penghasilan_kotor_pasangan: totalPengKotPas,
            tunjangan: this.analisaKeuanganForm.get('tunjangan')?.value,
            tunjangan_pasangan: this.analisaKeuanganForm.get('tunjangan_pasangan')?.value,
            tunjangan_total: tunjangan_Tot,

            // tambahan Total
            angsuran_kewajiban_kantor: this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value,
            angsuran_kewajiban_kantor_pasangan: this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value,
            total_angsuran_kewajiban_kantor: angsuranKewaTotal,
            outstanding_nasabah: this.slikTotal.total_outstanding_nasabah,
            outstanding_pasangan: slikOutstandingPasangan,
            total_outstanding: this.totalOutstandingSlik,
            plafon_nasabah: this.slikTotal.total_plafon_nasabah,
            plafon_pasangan: slikPlafondPasangan,
            total_plafon: this.totalPlafonSlik,
          })
          .subscribe({
            next: () => {
              this.getLoading(false);
              this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
            },
          });
      }
    }, 10);
  }

  printLajang(ktp: any): void {
    window.open(this.baseUrl + 'v1/efos-ide/downloadSlik/', ktp);
  }

  printMenikah(ktp: any): void {
    window.open(this.baseUrl + 'v1/efos-ide/downloadSlik/', ktp);
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

  // Selanjutnya
  Next(): void {
    this.router.navigate(['/sturktur-pembiayaan'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
