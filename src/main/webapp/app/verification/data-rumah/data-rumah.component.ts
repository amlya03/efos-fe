import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { LocalStorageService } from 'ngx-webstorage';
import { interval, Subject } from 'rxjs';
import { ServiceVerificationService } from '../service/service-verification.service';
import { refAnalisaKeuangan } from './refAnalisaKeuangan.model';

@Component({
  selector: 'jhi-data-rumah',
  templateUrl: './data-rumah.component.html',
  styleUrls: ['./data-rumah.component.scss'],
})
export class DataRumahComponent implements OnInit {
  analisaKeuanganForm!: FormGroup;
  submitted = false;
  app_no_de: any;
  curef: any;
  analisaKeuanganMap: refAnalisaKeuangan = new refAnalisaKeuangan();
  dataEntry: fetchAllDe = new fetchAllDe();
  dataJob: getJob = new getJob();
  getViewJob: viewJobModel = new viewJobModel();
  listSlik?: slik[];
  slikTotal: resultSlikTotal = new resultSlikTotal();
  listLajangSlik: Array<slik> = new Array<slik>();
  listMenikahSlik: Array<slik> = new Array<slik>();
  jobPasangan: getJobPasangan = new getJobPasangan();
  struktur: any;
  // Role
  untukSessionRole: any;
  untukSessionUsername: any;
  // Total Plafound
  plafond: any;
  totalPlafonSlik: any;
  // Total Outstanding
  outstanding: any;
  totalOutstandingSlik: any;

  formatter: any;

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
    private localStorageService: LocalStorageService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionUsername = this.localStorageService.retrieve('sessionUserName');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
    alert(this.untukSessionRole);
    this.formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.analisaKeuanganForm = this.formBuilder.group({
      nama_dihubungi: '',
      nama_pemeriksa: '',
      jabatan_dihubungi: '',
      tanggal_permintaan: '',
      tanggal_pemeriksa: '',

      // COba: [this.formatter.format('')],
      // Data Keuangan Nasabah \\
      gaji_kotor: '',
      gaji_kotor_pasangan: '',
      tunjangan: '',
      pendapatan_kantor_lainnya: '',
      pendapatan_kotor: '',
      total_angsuran_kantor: '',
      pendapatan_bersih: '',
      pendapatan_usaha: '',
      pendapatan_profesional: '',
      total_penghasilan_kotor: '',
      // kewajiban_bank: '',
      kewajiban_lainnya: '',
      total_penghasilan_bersih: '',
      tunjangan_pasangan: '',
      pendapatan_kantor_lainnya_pasangan: '',
      pendapatan_kotor_pasangan: '',
      total_angsuran_kantor_pasangan: '',
      pendapatan_bersih_pasangan: '',
      pendapatan_usaha_pasangan: '',
      pendapatan_profesional_pasangan: '',
      total_penghasilan_kotor_pasangan: '',
      // kewajiban_bank_pasangan: '',
      kewajiban_lainnya_pasangan: '',
      total_penghasilan_bersih_pasangan: '',
      gaji_kotor_total: '',
      tunjangan_total: '',
      pendapatan_kantor_lainnya_total: '',
      pendapatan_kotor_total: '',
      total_angsuran_kantor_akumulasi: '',
      pendapatan_bersih_total: '',
      pendapatan_usaha_total: this.sumOfNumber,
      pendapatan_profesional_total: '',
      total_penghasilan_kotor_akumulasi: '',
      kewajiban_bank_total: '',
      kewajiban_lainnya_total: '',
      total_penghasilan_bersih_akumulasi: '',

      // tambahan
      angsuran_kewajiban_kantor: '',
      angsuran_kewajiban_kantor_pasangan: '',
      total_angsuran_kewajiban_kantor: '',
    });
  }

  load(): void {
    // get Semua DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      // alert(this.dataEntry.joint_income)
    });

    // get Semua JOB
    this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(job => {
      this.dataJob = job.result[0];
      // alert(this.dataJob.total_pendapatan)
    });

    // get Semua JOB Pasangan
    this.dataEntryService.getSemuaDataJobPasangan(this.curef).subscribe(jobPasangan => {
      this.jobPasangan = jobPasangan.result;
      // console.log(this.jobPasangan)
    });

    // ambil semua data Slik
    this.dataRumah.fetchSlik('app_20221017_667').subscribe(data => {
      // if (data.code === 200) {
      // console.log(data)
      this.slikTotal = data.result;
      this.listSlik = data.result.dataSlikResult;
      // console.log(this.slikTotal.total_angsuran_pasangan)
      // this.struktur = ('Rp 10000').toLocaleString();
      this.struktur = 'Rp 10000'.replace('Rp', '');
      let cekkk = 'Rp 10,000'.replace(/\,/g, '');
      let cuukkk = cekkk.replace('Rp ', '');
      // alert(this.struktur)
      // alert(cuukkk)

      this.listSlik?.forEach(element => {
        if (element.response_description == 'get SLIK Result Success') {
          if (element.status_applicant == 'Debitur Utama Individu') {
            this.listLajangSlik.push(element);
          } else if (element.status_applicant == 'Pasangan Debitur') {
            this.listMenikahSlik.push(element);
          }
        }
      });
      this.dtTrigger.next(data.result.dataSlikResult);
      let plafonNasabah = Number(this.slikTotal.total_plafon_nasabah);
      let plafonPasangan = Number(this.slikTotal.total_plafon_pasangan);
      let outstandingNasabah = Number(this.slikTotal.total_outstanding_nasabah);
      let outstandingPasangan = Number(this.slikTotal.total_outstanding_pasangan);
      this.totalPlafonSlik = plafonNasabah + plafonPasangan;
      this.totalOutstandingSlik = outstandingNasabah + outstandingPasangan;
      // alert(this.totalPlafonSlik)
    });

    // ambil semua data Analisa
    this.dataRumah.fetchAnalisaKeuangan(this.app_no_de).subscribe(data => {
      this.analisaKeuanganMap = data.result;
      // }
      // alert(this.analisaKeuanganMap.jabatan_dihubungi)
      let retriveAnalisaKeuangan = {
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
        kewajiban_bank_total: '',
        kewajiban_lainnya_total: this.analisaKeuanganMap.kewajiban_lainnya_total,
        total_penghasilan_bersih_akumulasi: this.analisaKeuanganMap.total_penghasilan_bersih_akumulasi,

        //Tambahajn
        angsuran_kewajiban_kantor: this.analisaKeuanganMap.angsuran_kewajiban_kantor,
        angsuran_kewajiban_kantor_pasangan: this.analisaKeuanganMap.angsuran_kewajiban_kantor_pasangan,
        total_angsuran_kewajiban_kantor: this.analisaKeuanganMap.total_angsuran_kewajiban_kantor,

        // created_date: "2022-09-29T10:59:20.895+00:00",
        // created_by: "",
        // updated_date: 'null',
        // updated_by: 'null'
      };
      this.analisaKeuanganForm.setValue(retriveAnalisaKeuangan);
    });
  }

  onSubmit(): void {
    // this.formatMoney('Rp 100,000.00');
    const total_pro =
      Number(this.analisaKeuanganForm.get('pendapatan_profesional')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value);
    const total_kewa = Number(this.slikTotal.total_angsuran_nasabah) + Number(this.slikTotal.total_angsuran_pasangan);
    const total_gaji =
      Number(this.analisaKeuanganForm.get('gaji_kotor')?.value) + Number(this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value);
    const total_kewaLain =
      Number(this.analisaKeuanganForm.get('kewajiban_lainnya')?.value) +
      Number(this.analisaKeuanganForm.get('kewajiban_lainnya_pasangan')?.value);
    const pend_kantorLain =
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value);
    const pend_usahaTot =
      Number(this.analisaKeuanganForm.get('pendapatan_usaha')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value);
    const tunjangan_Tot =
      Number(this.analisaKeuanganForm.get('tunjangan')?.value) + Number(this.analisaKeuanganForm.get('tunjangan_pasangan')?.value);
    const pend_kotor =
      Number(this.analisaKeuanganForm.get('gaji_kotor')?.value) +
      Number(this.analisaKeuanganForm.get('tunjangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value);
    const pend_kotor_pas =
      Number(this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('tunjangan_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value);
    const pend_kotor_tot = pend_kotor + pend_kotor_pas;
    const pend_bersih_nas = pend_kotor - Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value);
    const pend_bersih_pas = pend_kotor_pas - Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value);
    const pend_bersih = pend_bersih_nas + pend_bersih_pas;
    const angsuranKewaTotal =
      Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor')?.value) +
      Number(this.analisaKeuanganForm.get('angsuran_kewajiban_kantor_pasangan')?.value);
    // alert(pend_bersih_nas)
    const totalPengKot =
      pend_bersih_nas +
      Number(this.analisaKeuanganForm.get('pendapatan_usaha')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_profesional')?.value);

    const totalPengKotPas =
      pend_bersih_pas +
      Number(this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value) +
      Number(this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value);

    const totalTotalPengKot = totalPengKot + totalPengKotPas;
    const totalPengBersih =
      totalPengKot - (Number(this.slikTotal.total_angsuran_nasabah) - Number(this.analisaKeuanganForm.get('kewajiban_lainnya')?.value));
    const totalPengBersihPas =
      totalPengKotPas -
      (Number(this.slikTotal.total_angsuran_pasangan) - Number(this.analisaKeuanganForm.get('kewajiban_lainnya_pasangan')?.value));
    const totalPengBersihTot = totalPengBersih + totalPengBersihPas;

    // POST
    this.submitted = true;
    if (this.analisaKeuanganForm.invalid) {
      return;
    } else if (this.analisaKeuanganMap == null) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/create_analisa_keuangan', {
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
          kewajiban_bank_pasangan: this.slikTotal.total_angsuran_pasangan,
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
          outstanding_pasangan: this.slikTotal.total_outstanding_pasangan,
          total_outstanding: this.totalOutstandingSlik,
          plafon_nasabah: this.slikTotal.total_plafon_nasabah,
          plafon_pasangan: this.slikTotal.total_plafon_pasangan,
          total_plafon: this.totalPlafonSlik,
        })
        .subscribe({});
      this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
    } else
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-verif/update_analisa_keuangan', {
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
          kewajiban_bank_pasangan: this.slikTotal.total_angsuran_pasangan,
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
          outstanding_pasangan: this.slikTotal.total_outstanding_pasangan,
          total_outstanding: this.totalOutstandingSlik,
          plafon_nasabah: this.slikTotal.total_plafon_nasabah,
          plafon_pasangan: this.slikTotal.total_plafon_pasangan,
          total_plafon: this.totalPlafonSlik,
        })
        .subscribe({});
    this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }

  printLajang(ktp: any) {
    window.open('http://10.20.34.110:8805/api/v1/efos-ide/downloadSlik/' + ktp);
  }

  printMenikah(ktp: any) {
    console.log(ktp);
    window.open('http://10.20.34.110:8805/api/v1/efos-ide/downloadSlik/' + ktp);
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
  formatMoney(value?: any) {
    const jdkfj = value.replace(/\,/g, '').replace('Rp ', '');
    // alert(jdkfj);
  }

  gotocalonnasabah() {
    this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
