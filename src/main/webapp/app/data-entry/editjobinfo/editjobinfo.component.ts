import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { createRequestOption } from 'app/core/request/request-util';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-editjobinfo',
  templateUrl: './editjobinfo.component.html',
  styleUrls: ['./editjobinfo.component.scss'],
})
export class EditjobinfoComponent implements OnInit {
  datakirimanappde: any;
  datakirimanakategoripekerjaan: any;
  datakiriman: any;
  datakirimanid: any;
  datakirimanstatus: any;

  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.178:8805/api/v1/efos-de/getJobById?si=');
  daWa: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakiriman = params['datakiriman'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanid = params['datakirimanid'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanstatus = params['datakirimanstatus'];
    });
  }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.getjobinfo().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('tabel', res.body?.result);
        this.daWa = res.body?.result;

        // this.tampunganid = this.daWa[0].id;
        // alert(this.tampunganid);
      },
    });
  }

  getjobinfo(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanid, { params: options, observe: 'response' });
  }

  updatejobinfo() // contohtampungstatuskawain: any, // contohtampungancuref: any,
  // contohtampunganappde: any,
  // contohtampungankategoripekerjaan: any
  {
    const kategori_pekerjaan = document.getElementById('kategori_pekerjaan') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const posisi = document.getElementById('posisi') as HTMLInputElement | any;
    const jenis_pekerjaan = document.getElementById('jenis_pekerjaan') as HTMLInputElement | any;
    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan = document.getElementById('alamat_perusahaan') as HTMLInputElement | any;
    const provinsi = document.getElementById('provinsi_cabang') as HTMLInputElement | any;
    const kabkota = document.getElementById('kabkota_cabang') as HTMLInputElement | any;
    const kecamatan = document.getElementById('kecamatan') as HTMLInputElement | any;
    const kelurahan = document.getElementById('kelurahan') as HTMLInputElement | any;
    const kode_pos = document.getElementById('kode_pos') as HTMLInputElement | any;
    const rt = document.getElementById('rt') as HTMLInputElement | any;
    const rw = document.getElementById('rw') as HTMLInputElement | any;
    const no_siup = document.getElementById('no_siup') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const sektor_ekonomi = document.getElementById('jenis_sektor') as HTMLInputElement | any;
    const umur = document.getElementById('umur1') as HTMLInputElement | any;
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

    alert(kategori_pekerjaan.value);
    alert(tunjangan.value);
    const headers = { Authorization: 'Bearer my-token', 'My-Custom-Header': 'foobar' };

    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_job_info_de', {
        // headers: headers,

        // alamat_pekerjaan_sebelum: alamat_perusahaan.value,
        alamat_perusahaan: alamat_perusahaan.value,
        // barang_jasa: contohtampungancuref,
        bulan_berdiri: lama_bekerja_bulan.value,
        // bulan_berdiri_sebelum: usia.value,
        // created_by: app_no_ide.value,
        // created_date: contohtampunganappde,
        curef: this.datakiriman,
        id: this.datakirimanid,
        jabatan: posisi.value,
        jenis_bidang: jenis_bidang.value,
        jenis_pekerjaan: jenis_pekerjaan.value,
        jumlah_karyawan: jumlah_karyawan.value,
        kabkota: kabkota.value,
        kategori_pekerjaan: kategori_pekerjaan.value,
        kecamatan: kecamatan.value,
        kelurahan: kelurahan.value,
        // nama_ibu_kandung: ' 1',
        // kepemilikan_perusahaan: npwp.value,
        kode_pos: kode_pos.value,
        lama_bekerja_bulan: lama_bekerja_bulan.value,
        lama_bekerja_tahun: lama_bekerja_tahun.value,
        nama_perusahaan: nama_perusahaan.value,
        no_siup: no_siup.value,
        // no_telepon: kabkota_cabang.value,
        // npwp: kabkota_domisili.value,
        // payroll: kecamatan.value,
        // pemilik_usaha: kecamatan_domisili.value,
        pendapatan: pendapatan.value,
        pendapatan_lain: pendapatan_lain.value,
        posisi: posisi.value,
        provinsi: provinsi.value,
        rt: rt.value,
        rw: rw.value,
        sektor_ekonomi: sektor_ekonomi.value,
        // status_active: '1',
        tahun_berdiri: lama_bekerja_tahun.value,
        tipe_kepegawaian: tipe_kepegawaian.value,
        tipe_pekerjaan: tipe_pekerjaan.value,
        tipe_perusahaan: tipe_perusahaan.value,
        total_pendapatan: total_pendapatan.value,
        tunjangan: tunjangan.value,
        umur_pensiun: umur_pensiun.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/job-info'], {
            // queryParams: {
            //   datakiriman: contohtampungancuref,
            //   datakirimanstatus: contohtampungstatuskawain,
            //   datakirimanappde: contohtampunganappde,
            //   datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
            // },
          });
        },
      });

    // alert(contohtampungancuref);
    // this.router.navigate(['/data-entry/job-info'], {
    //   queryParams: {
    //     datakiriman: contohtampungancuref,
    //     datakirimanstatus: contohtampungstatuskawain,
    //     datakirimanappde: contohtampunganappde,
    //     datakirimanakategoripekerjaan: contohtampungankategoripekerjaan,
    //   },
    // });
    this.router.navigate(['/data-entry/job-info'], {
      queryParams: {
        datakiriman: this.datakiriman,
        datakirimanstatus: this.datakirimanstatus,
        app_no_de: this.datakirimanappde,
        // datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }
}
