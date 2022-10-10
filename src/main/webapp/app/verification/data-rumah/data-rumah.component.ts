import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { slik } from 'app/initial-data-entry/services/config/slik.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { Observable, Subject } from 'rxjs';
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
  analisaKeuanganMap: refAnalisaKeuangan = new refAnalisaKeuangan();
  dataEntry?: fetchAllDe = new fetchAllDe();
  listSlik?: slik[];
  listLajangSlik: Array<slik> = new Array<slik>();
  listMenikahSlik: Array<slik> = new Array<slik>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    protected dataRumah: ServiceVerificationService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  // API url
  protected getAnalisaKeuangan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-verif/getAnalisaKeuangan?sd='
  );

  // DE
  protected fetchSemuaData = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  // Slik
  protected getSlik = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.178:8805/api/v1/efos-ide/fetchDataSlik?sd='
  );


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      responsive: true,
    };
    this.load();
    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.analisaKeuanganForm = this.formBuilder.group({
      nama_pemohon: ['', Validators.required],
      app_no_de: new FormControl(this.app_no_de),
      nama_perusahaan: ['', Validators.required],
      alamat_perusahaan: ['', Validators.required],
      no_telepon_perusahaan: ['', Validators.required],
      nama_dihubungi: ['', Validators.required],
      jabatan_dihubungi: ['', Validators.required],
      tanggal_permintaan: ['', Validators.required],
      tanggal_pemeriksa: ['', Validators.required],
      nama_pemeriksa: ['', Validators.required],
      gaji_kotor: '',
      tunjangan: '',
      pendapatan_kantor_lainnya: '',
      pendapatan_kotor: '',
      total_angsuran_kantor: '',
      pendapatan_bersih: '',
      pendapatan_usaha: '',
      pendapatan_profesional: '',
      total_penghasilan_kotor: '',
      kewajiban_bank: '',
      kewajiban_lainnya: '',
      total_penghasilan_bersih: '',
      gaji_kotor_pasangan: '',
      tunjangan_pasangan: '',
      pendapatan_kantor_lainnya_pasangan: '',
      pendapatan_kotor_pasangan: '',
      total_angsuran_kantor_pasangan: '',
      pendapatan_bersih_pasangan: '',
      pendapatan_usaha_pasangan: '',
      pendapatan_profesional_pasangan: '',
      total_penghasilan_kotor_pasangan: '',
      kewajiban_bank_pasangan: '',
      kewajiban_lainnya_pasangan: '',
      total_penghasilan_bersih_pasangan: '',
      gaji_kotor_total: '',
      tunjangan_total: '',
      pendapatan_kantor_lainnya_total: '',
      pendapatan_kotor_total: '',
      total_angsuran_kantor_akumulasi: '',
      pendapatan_bersih_total: '',
      pendapatan_usaha_total: '',
      pendapatan_profesional_total: '',
      total_penghasilan_kotor_akumulasi: '',
      kewajiban_bank_total: '',
      kewajiban_lainnya_total: '',
      total_penghasilan_bersih_akumulasi: '',
    });
  }

  // Analisa
  fetchAnalisaKeuangan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getAnalisaKeuangan + this.app_no_de);
  }

  // DE
  getFetchSemuaData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.fetchSemuaData + this.app_no_de);
  }

  // Slik
  fetchSlik(): Observable<ApiResponse> {
    // return this.http.get<ApiResponse>(this.getSlik + this.dataEntry?.app_no_ide);
    return this.http.get<ApiResponse>(this.getSlik + "app_20221006_644");
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.analisaKeuanganForm.invalid) {
      return;
    } else if (this.analisaKeuanganMap == null) {
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/create_analisa_keuangan', {
          nama_pemohon: this.analisaKeuanganForm.get('nama_pemohon')?.value,
          alamat_perusahaan: this.analisaKeuanganForm.get('alamat_perusahaan')?.value,
          app_no_de: this.analisaKeuanganForm.get('app_no_de')?.value,
          created_by: '',
          created_date: '',
          gaji_kotor: this.analisaKeuanganForm.get('gaji_kotor')?.value,
          gaji_kotor_pasangan: this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value,
          gaji_kotor_total: this.analisaKeuanganForm.get('gaji_kotor_total')?.value,
          jabatan_dihubungi: this.analisaKeuanganForm.get('jabatan_dihubungi')?.value,
          kewajiban_bank: this.analisaKeuanganForm.get('kewajiban_bank')?.value,
          kewajiban_bank_pasangan: this.analisaKeuanganForm.get('kewajiban_bank_pasangan')?.value,
          kewajiban_bank_total: this.analisaKeuanganForm.get('kewajiban_bank_total')?.value,
          kewajiban_lainnya: this.analisaKeuanganForm.get('kewajiban_lainnya')?.value,
          kewajiban_lainnya_pasangan: this.analisaKeuanganForm.get('ewajiban_lainnya_pasangan')?.value,
          kewajiban_lainnya_total: this.analisaKeuanganForm.get('kewajiban_lainnya_total')?.value,
          nama_dihubungi: this.analisaKeuanganForm.get('nama_dihubungi')?.value,
          nama_pemeriksa: this.analisaKeuanganForm.get('nama_pemeriksa')?.value,
          nama_perusahaan: this.analisaKeuanganForm.get('nama_perusahaan')?.value,
          no_telepon_perusahaan: this.analisaKeuanganForm.get('no_telepon_perusahaan')?.value,
          pendapatan_bersih: this.analisaKeuanganForm.get('pendapatan_bersih')?.value,
          pendapatan_bersih_pasangan: this.analisaKeuanganForm.get('pendapatan_bersih_pasangan')?.value,
          pendapatan_bersih_total: this.analisaKeuanganForm.get('pendapatan_bersih_total')?.value,
          pendapatan_kantor_lainnya: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value,
          pendapatan_kantor_lainnya_pasangan: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value,
          pendapatan_kantor_lainnya_total: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_total')?.value,
          pendapatan_kotor: this.analisaKeuanganForm.get('pendapatan_kotor')?.value,
          pendapatan_kotor_pasangan: this.analisaKeuanganForm.get('pendapatan_kotor_pasangan')?.value,
          pendapatan_kotor_total: this.analisaKeuanganForm.get('pendapatan_kotor_total')?.value,
          pendapatan_profesional: this.analisaKeuanganForm.get('pendapatan_profesional')?.value,
          pendapatan_profesional_pasangan: this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value,
          pendapatan_profesional_total: this.analisaKeuanganForm.get('pendapatan_profesional_total')?.value,
          pendapatan_usaha: this.analisaKeuanganForm.get('pendapatan_usaha')?.value,
          pendapatan_usaha_pasangan: this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value,
          pendapatan_usaha_total: this.analisaKeuanganForm.get('pendapatan_usaha_total')?.value,
          tanggal_pemeriksa: this.analisaKeuanganForm.get('tanggal_pemeriksa')?.value,
          tanggal_permintaan: this.analisaKeuanganForm.get('tanggal_permintaan')?.value,
          total_angsuran_kantor: this.analisaKeuanganForm.get('total_angsuran_kantor')?.value,
          total_angsuran_kantor_akumulasi: this.analisaKeuanganForm.get('total_angsuran_kantor_akumulasi')?.value,
          total_angsuran_kantor_pasangan: this.analisaKeuanganForm.get('total_angsuran_kantor_pasangan')?.value,
          total_penghasilan_bersih: this.analisaKeuanganForm.get('total_penghasilan_bersih')?.value,
          total_penghasilan_bersih_akumulasi: this.analisaKeuanganForm.get('total_penghasilan_bersih_akumulasi')?.value,
          total_penghasilan_bersih_pasangan: this.analisaKeuanganForm.get('total_penghasilan_bersih_pasangan')?.value,
          total_penghasilan_kotor: this.analisaKeuanganForm.get('total_penghasilan_kotor')?.value,
          total_penghasilan_kotor_akumulasi: this.analisaKeuanganForm.get('total_penghasilan_kotor_akumulasi')?.value,
          total_penghasilan_kotor_pasangan: this.analisaKeuanganForm.get('total_penghasilan_kotor_pasangan')?.value,
          tunjangan: this.analisaKeuanganForm.get('tunjangan')?.value,
          tunjangan_pasangan: this.analisaKeuanganForm.get('tunjangan_pasangan')?.value,
          tunjangan_total: this.analisaKeuanganForm.get('tunjangan_total')?.value,
        })
        .subscribe({});
      this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de } });
    } else
      this.http
        .post<any>('http://10.20.34.178:8805/api/v1/efos-verif/update_analisa_keuangan', {
          nama_pemohon: this.analisaKeuanganForm.get('nama_pemohon')?.value,
          alamat_perusahaan: this.analisaKeuanganForm.get('alamat_perusahaan')?.value,
          app_no_de: this.analisaKeuanganForm.get('app_no_de')?.value,
          created_by: '',
          created_date: '',
          gaji_kotor: this.analisaKeuanganForm.get('gaji_kotor')?.value,
          gaji_kotor_pasangan: this.analisaKeuanganForm.get('gaji_kotor_pasangan')?.value,
          gaji_kotor_total: this.analisaKeuanganForm.get('gaji_kotor_total')?.value,
          jabatan_dihubungi: this.analisaKeuanganForm.get('jabatan_dihubungi')?.value,
          kewajiban_bank: this.analisaKeuanganForm.get('kewajiban_bank')?.value,
          kewajiban_bank_pasangan: this.analisaKeuanganForm.get('kewajiban_bank_pasangan')?.value,
          kewajiban_bank_total: this.analisaKeuanganForm.get('kewajiban_bank_total')?.value,
          kewajiban_lainnya: this.analisaKeuanganForm.get('kewajiban_lainnya')?.value,
          kewajiban_lainnya_pasangan: this.analisaKeuanganForm.get('ewajiban_lainnya_pasangan')?.value,
          kewajiban_lainnya_total: this.analisaKeuanganForm.get('kewajiban_lainnya_total')?.value,
          nama_dihubungi: this.analisaKeuanganForm.get('nama_dihubungi')?.value,
          nama_pemeriksa: this.analisaKeuanganForm.get('nama_pemeriksa')?.value,
          nama_perusahaan: this.analisaKeuanganForm.get('nama_perusahaan')?.value,
          no_telepon_perusahaan: this.analisaKeuanganForm.get('no_telepon_perusahaan')?.value,
          pendapatan_bersih: this.analisaKeuanganForm.get('pendapatan_bersih')?.value,
          pendapatan_bersih_pasangan: this.analisaKeuanganForm.get('pendapatan_bersih_pasangan')?.value,
          pendapatan_bersih_total: this.analisaKeuanganForm.get('pendapatan_bersih_total')?.value,
          pendapatan_kantor_lainnya: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya')?.value,
          pendapatan_kantor_lainnya_pasangan: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_pasangan')?.value,
          pendapatan_kantor_lainnya_total: this.analisaKeuanganForm.get('pendapatan_kantor_lainnya_total')?.value,
          pendapatan_kotor: this.analisaKeuanganForm.get('pendapatan_kotor')?.value,
          pendapatan_kotor_pasangan: this.analisaKeuanganForm.get('pendapatan_kotor_pasangan')?.value,
          pendapatan_kotor_total: this.analisaKeuanganForm.get('pendapatan_kotor_total')?.value,
          pendapatan_profesional: this.analisaKeuanganForm.get('pendapatan_profesional')?.value,
          pendapatan_profesional_pasangan: this.analisaKeuanganForm.get('pendapatan_profesional_pasangan')?.value,
          pendapatan_profesional_total: this.analisaKeuanganForm.get('pendapatan_profesional_total')?.value,
          pendapatan_usaha: this.analisaKeuanganForm.get('pendapatan_usaha')?.value,
          pendapatan_usaha_pasangan: this.analisaKeuanganForm.get('pendapatan_usaha_pasangan')?.value,
          pendapatan_usaha_total: this.analisaKeuanganForm.get('pendapatan_usaha_total')?.value,
          tanggal_pemeriksa: this.analisaKeuanganForm.get('tanggal_pemeriksa')?.value,
          tanggal_permintaan: this.analisaKeuanganForm.get('tanggal_permintaan')?.value,
          total_angsuran_kantor: this.analisaKeuanganForm.get('total_angsuran_kantor')?.value,
          total_angsuran_kantor_akumulasi: this.analisaKeuanganForm.get('total_angsuran_kantor_akumulasi')?.value,
          total_angsuran_kantor_pasangan: this.analisaKeuanganForm.get('total_angsuran_kantor_pasangan')?.value,
          total_penghasilan_bersih: this.analisaKeuanganForm.get('total_penghasilan_bersih')?.value,
          total_penghasilan_bersih_akumulasi: this.analisaKeuanganForm.get('total_penghasilan_bersih_akumulasi')?.value,
          total_penghasilan_bersih_pasangan: this.analisaKeuanganForm.get('total_penghasilan_bersih_pasangan')?.value,
          total_penghasilan_kotor: this.analisaKeuanganForm.get('total_penghasilan_kotor')?.value,
          total_penghasilan_kotor_akumulasi: this.analisaKeuanganForm.get('total_penghasilan_kotor_akumulasi')?.value,
          total_penghasilan_kotor_pasangan: this.analisaKeuanganForm.get('total_penghasilan_kotor_pasangan')?.value,
          tunjangan: this.analisaKeuanganForm.get('tunjangan')?.value,
          tunjangan_pasangan: this.analisaKeuanganForm.get('tunjangan_pasangan')?.value,
          tunjangan_total: this.analisaKeuanganForm.get('tunjangan_total')?.value,
        })
        .subscribe({});
    this.router.navigate(['/data-calon-nasabah'], { queryParams: { app_no_de: this.app_no_de } });
  }

  load(): void {
    // ambil semua data DE
    this.getFetchSemuaData().subscribe(data => {
      this.dataEntry = data.result;
    });

    // ambil semua data Slik
    this.fetchSlik().subscribe(data => {
      // if (data.code === 200) {
        // console.log(data)
        this.listSlik = data.result;
        // console.log(this.listSlik)

        this.listSlik?.forEach(element => {
          if(element.response_description=="get SLIK Result Success"){
            if(element.status_applicant=="Debitur Utama Individu"){
              this.listLajangSlik.push(element)
            }
            else if (element.status_applicant=="Pasangan Debitur"){
              this.listMenikahSlik.push(element)
            }
          }
        });
        this.dtTrigger.next(data.result);
    });
    // ambil semua data Analisa
    this.fetchAnalisaKeuangan().subscribe(data => {
      // if (data.message === "success") {
      this.analisaKeuanganMap = data.result;
      // alert('sdhgfhsghfgdh ' +this.analisaKeuanganMap.nama_perusahaan);
      // console.log('sdhgfhsghfgdh ' +this.analisaKeuanganMap.app_no_de);
      // }
      let retriveAnalisaKeuangan = {
        // id: 1,
        nama_pemohon: this.analisaKeuanganMap.nama_pemohon,
        app_no_de: this.analisaKeuanganMap.app_no_de,
        nama_perusahaan: this.analisaKeuanganMap.nama_perusahaan,
        alamat_perusahaan: this.analisaKeuanganMap.alamat_perusahaan,
        no_telepon_perusahaan: this.analisaKeuanganMap.no_telepon_perusahaan,
        nama_dihubungi: this.analisaKeuanganMap.nama_dihubungi,
        jabatan_dihubungi: this.analisaKeuanganMap.jabatan_dihubungi,
        tanggal_permintaan: this.analisaKeuanganMap.tanggal_permintaan,
        tanggal_pemeriksa: this.analisaKeuanganMap.tanggal_pemeriksa,
        nama_pemeriksa: this.analisaKeuanganMap.nama_pemeriksa,
        gaji_kotor: this.analisaKeuanganMap.gaji_kotor,
        tunjangan: this.analisaKeuanganMap.tunjangan,
        pendapatan_kantor_lainnya: this.analisaKeuanganMap.pendapatan_kantor_lainnya,
        pendapatan_kotor: this.analisaKeuanganMap.pendapatan_kotor,
        total_angsuran_kantor: this.analisaKeuanganMap.total_angsuran_kantor,
        pendapatan_bersih: this.analisaKeuanganMap.pendapatan_bersih,
        pendapatan_usaha: this.analisaKeuanganMap.pendapatan_usaha,
        pendapatan_profesional: this.analisaKeuanganMap.pendapatan_profesional,
        total_penghasilan_kotor: this.analisaKeuanganMap.total_penghasilan_kotor,
        kewajiban_bank: this.analisaKeuanganMap.kewajiban_bank,
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
        kewajiban_bank_pasangan: this.analisaKeuanganMap.kewajiban_bank_pasangan,
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
        kewajiban_bank_total: this.analisaKeuanganMap.kewajiban_bank_total,
        kewajiban_lainnya_total: this.analisaKeuanganMap.kewajiban_lainnya_total,
        total_penghasilan_bersih_akumulasi: this.analisaKeuanganMap.total_penghasilan_bersih_akumulasi,
        // created_date: "2022-09-29T10:59:20.895+00:00",
        // created_by: "",
        // updated_date: 'null',
        // updated_by: 'null'
      };
      this.analisaKeuanganForm.setValue(retriveAnalisaKeuangan);
    });

    // this.dataRumah.getDaWuS().subscribe(data => {
    //   console.warn(data);
    //   if (data.code === 200) {
    //     this.dataRumahModel = data.result;
    //   }
    // });
    // ref Hubungan Emergency
    // this.dataRumah.getHubunganEmergency().subscribe(data => {
    //   // console.warn('ref', data);
    //   if (data.code === 200) {
    //     this.refHubunganEmergency = data.result;
    //   }
    // });
    // get semua de
  }

  printLajang(ktp: any){
    window.open('http://10.20.34.178:8805/api/v1/efos-ide/downloadSlik/'+ktp);
  }

  printMenikah(ktp: any){
    console.log(ktp)
    window.open('http://10.20.34.178:8805/api/v1/efos-ide/downloadSlik/'+ktp);
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
}
