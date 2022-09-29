import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { jobinfolist } from './job-info-modellist';

export type EntityResponseDaWa = HttpResponse<jobinfolist>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
export type EntityArrayResponseDaWa1 = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss'],
})
export class JobInfoComponent implements OnInit {
  datakiriman!: string;
  datakirimanstatus!: string;
  datakirimanappde!: string;
  datakirimanakategoripekerjaan!: string;
  daWa: any;
  nampungsebelum: any;
  tampunganid: any;
  bawaidjob: any;
  nampungdatakatagoripekerjaan: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanstatus = params['datakirimanstatus'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
  }
  //  http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=572
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  //  protected resourceUrl1 = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobByCurefDe?sj=');
  ngOnInit(): void {
    // const job_info_retrive = (<HTMLInputElement>document.getElementById("job_info")).value;
    // localStorage.setItem('daftar_aplikasi_de', job_info_retrive)
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    alert(this.datakiriman);
    alert(this.datakirimanstatus);
    this.nampungdatakatagoripekerjaan = this.datakirimanakategoripekerjaan;
    alert(this.nampungdatakatagoripekerjaan);

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res.body?.result);
        this.daWa = res.body?.result;

        // this.tampunganid = this.daWa[0].id;
        // alert(this.tampunganid);
        console.warn('t1312abel', this.tampunganid);
        console.warn('tabe123l', this.tampunganid);
      },
    });

    this.sebelum(this.tampunganid).subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;
        this.tampunganid = this.nampungsebelum[0];
        // alert('ini masih hard code');
        console.warn('SEBELUMNYA', this.tampunganid);

        // this.onResponseSuccess(res);
      },
    });
    // console.warn('hitam')
    // console.warn('hitam',this.tampunganid)
    // alert(this.tampunganid);

    // throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load2() {
    this.sebelum().subscribe({
      next: (res: EntityArrayResponseDaWa1) => {
        // console.log(res.body?.result);
        console.warn('sebelum', res.body?.result);
        this.nampungsebelum = res.body?.result;

        // alert('ini masih hard code');
        console.warn('SEBELUMNYA', this.nampungsebelum);

        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakiriman, { params: options, observe: 'response' });
  }

  sebelum(req1?: any): Observable<EntityArrayResponseDaWa1> {
    const options = createRequestOption(req1);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl1 + this.datakiriman, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto(contohtampungancuref: any) {
    // this.onResponseSuccess(res);

    if (this.datakirimanstatus === 'Menikah') {
      this.router.navigate(['/data-entry/data-pasangan'], {
        queryParams: {
          datakirimanappde: this.datakirimanappde,
          datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
          datakirimancuref: this.datakiriman,
        },
      });
      // alert(' ini NIKAH');
      console.warn(this.datakiriman);
    } else {
      // alert('ini jomblo');
      // alert(contohtampungancuref);
      this.router.navigate(['/data-entry/collateral'], {
        queryParams: {
          datakirimanappde: this.datakirimanappde,
          datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
          datakirimancuref: this.datakiriman,
        },
      });
    }
  }

  vieweditjobinfo(contohtampungancuref: any, id: any): void {
    // alert(getAppNoDe);
    // alert(id);
    this.router.navigate(['/data-entry/editjobinfo'], {
      // queryParams: { app_no_de: getAppNoDe }
      queryParams: {
        datakirimanappde: this.datakirimanappde,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
        datakiriman: contohtampungancuref,
        datakirimanid: id,
        datakirimanstatus: this.datakirimanstatus,
      },
    });
  }

  buatcreatejobinfo() {
    const kategori_pekerjaan = document.getElementById('kategori_pekerjaan') as HTMLInputElement | any;
    const curef_id = document.getElementById('curef_id') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const payroll = document.getElementById('payroll') as HTMLInputElement | any;
    const payroll1 = document.getElementById('payroll1') as HTMLInputElement | any;
    const jabatan = document.getElementById('jabatan') as HTMLInputElement | any;
    const jenis_pekerjaan = document.getElementById('jenis_pekerjaan') as HTMLInputElement | any;
    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const provinsi_cabang_perusahaan = document.getElementById('provinsi_cabang_perusahaan') as HTMLInputElement | any;
    const kabkota_cabang_perusahaan = document.getElementById('kabkota_cabang_perusahaan') as HTMLInputElement | any;
    const kecamatan_perusahaan = document.getElementById('kecamatan_perusahaan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
    const jenis_bidang_perusahaan = document.getElementById('jenis_bidang_perusahaan') as HTMLInputElement | any;
    const jenis_sektor_perusahaan = document.getElementById('jenis_sektor_perusahaan') as HTMLInputElement | any;
    const umur1 = document.getElementById('umur1') as HTMLInputElement | any;
    const umur_pensiun = document.getElementById('umur_pensiun') as HTMLInputElement | any;
    const lama_bekerja_tahun = document.getElementById('lama_bekerja_tahun') as HTMLInputElement | any;
    const lama_bekerja_bulan = document.getElementById('lama_bekerja_bulan') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('jumlah_karyawan') as HTMLInputElement | any;
    const jumlah_karyawan2 = document.getElementById('jumlah_karyawan2') as HTMLInputElement | any;
    const pendapatan = document.getElementById('pendapatan') as HTMLInputElement | any;
    const pendapatan_lain = document.getElementById('pendapatan_lain') as HTMLInputElement | any;
    const tunjangan = document.getElementById('tunjangan') as HTMLInputElement | any;
    const total_pendapatan = document.getElementById('total_pendapatan') as HTMLInputElement | any;
    const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const tipe_kepegawaian = document.getElementById('tipe_kepegawaian') as HTMLInputElement | any;

    // alert(id.value);
    // alert(jenis_kelamin.value);

    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    alert('CREATE NIH');
    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-ide/create_job_info', {
        // headers: headers,
        alamat_perusahaan: alamat_perusahaan.value,
        // bulan_berdiri: contohtampungankategoripekerjaan,
        // created_by: contohtampungancuref,
        curef: this.datakiriman,
        id: '',
        jabatan: jabatan.value,
        jenis_bidang: alamat_perusahaan.value,
        jenis_pekerjaan: jenis_bidang_perusahaan.value,
        jumlah_karyawan: jumlah_karyawan.value,
        kabkota: alamat_perusahaan.value,
        kategori_pekerjaan: alamat_perusahaan.value,
        kecamatan: alamat_perusahaan.value,
        kelurahan: jumlah_karyawan.value,
        kepemilikan_perusahaan: alamat_perusahaan.value,
        kode_pos: alamat_perusahaan.value,
        lama_bekerja_bulan: jumlah_karyawan.value,
        lama_bekerja_tahun: jumlah_karyawan.value,
        nama_perusahaan: alamat_perusahaan.value,
        no_siup: alamat_perusahaan.value,
        no_telepon: jumlah_karyawan.value,
        npwp: jumlah_karyawan.value,
        pemilik_usaha: alamat_perusahaan.value,
        pendapatan: alamat_perusahaan.value,
        pendapatan_lain: jumlah_karyawan.value,
        posisi: jumlah_karyawan.value,
        provinsi: alamat_perusahaan.value,
        rt: alamat_perusahaan.value,
        rw: jumlah_karyawan.value,
        sektor_ekonomi: jumlah_karyawan.value,
        tahun_berdiri: alamat_perusahaan.value,
        tipe_kepegawaian: alamat_perusahaan.value,
        tipe_pekerjaan: jumlah_karyawan.value,
        tipe_perusahaan: jumlah_karyawan.value,
        total_pendapatan: alamat_perusahaan.value,
        tunjangan: alamat_perusahaan.value,
        umur_pensiun: jumlah_karyawan.value,
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
