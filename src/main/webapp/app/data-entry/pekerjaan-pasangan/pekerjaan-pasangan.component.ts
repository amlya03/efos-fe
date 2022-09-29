import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/core/request/request-util';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;

@Component({
  selector: 'jhi-pekerjaan-pasangan',
  templateUrl: './pekerjaan-pasangan.component.html',
  styleUrls: ['./pekerjaan-pasangan.component.scss'],
})
export class PekerjaanPasanganComponent implements OnInit {
  datakirimiancure: any;
  datakirimande: any;
  datakirimancuref: any;
  datakirimanakategoripekerjaan: any;
  datakirimanappde: any;
  daWa: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getJobPasanganByCuref?sc=');
  kirimansiup: any;

  constructor(
    private route: ActivatedRoute,
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
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    alert(this.datakirimancuref);

    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('strukturdata', res);
        // console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // /////////////////////// Untuk COnvert hasil yang angka ///////////////////////////////////
        if (this.daWa.kategori_pekerjaan == 1) {
          this.daWa.kategori_pekerjaan = 'Fix Income';
        }
        if (this.daWa.kategori_pekerjaan == 2) {
          this.daWa.kategori_pekerjaan = 'Non Fix Income';
        }
        if (this.daWa.kategori_pekerjaan == 3) {
          this.daWa.kategori_pekerjaan = 'Lainnya';
        }
        if (this.daWa.tipe_pekerjaan == 1) {
          this.daWa.tipe_pekerjaan = 'Pegawai Negeri Sipil';
        }
        if (this.daWa.tipe_pekerjaan == 2) {
          this.daWa.tipe_pekerjaan = 'Pegawai Swasta';
        }
        if (this.daWa.tipe_pekerjaan == 3) {
          this.daWa.tipe_pekerjaan = 'Wiraswasta';
        }
        if (this.daWa.tipe_pekerjaan == 4) {
          this.daWa.tipe_pekerjaan = 'Profesional';
        }
        if (this.daWa.tipe_pekerjaan == 5) {
          this.daWa.tipe_pekerjaan = 'Pensiunan';
        }
        if (this.daWa.tipe_pekerjaan == 6) {
          this.daWa.tipe_pekerjaan = 'Tidak Bekerja';
        }
        if (this.daWa.tipe_pekerjaan == 7) {
          this.daWa.tipe_pekerjaan = 'TNI / POLRI';
        }
        if (this.daWa.tipe_pekerjaan == 8) {
          this.daWa.tipe_pekerjaan = 'Pegawai BUMN';
        }
        if (this.daWa.tipe_perusahaan == 1) {
          this.daWa.tipe_perusahaan = 'Perseorangan';
        }
        if (this.daWa.tipe_perusahaan == 2) {
          this.daWa.tipe_perusahaan = 'PT Terbuka (Perseroan Terbatas TBK)';
        }
        if (this.daWa.tipe_perusahaan == 3) {
          this.daWa.tipe_perusahaan = 'PT (Perseroan Terbatas)';
        }
        if (this.daWa.tipe_perusahaan == 5) {
          this.daWa.tipe_perusahaan = 'CV';
        }
        if (this.daWa.tipe_perusahaan == 6) {
          this.daWa.tipe_perusahaan = 'Tidak Bekerja';
        }
        // /////////////////////// Untuk COnvert hasil yang angka ///////////////////////////////////
        // alert(this.daWa.tipe_perusahaan)
      },
    });
  }

  goto(): void {
    // this.onResponseSuccess(res);
    alert('otw collateral1 ');
    console.warn('colalteral', this.datakirimanappde, this.datakirimancuref, this.datakirimanakategoripekerjaan);
    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        datakirimande: this.datakirimanappde,
        datakirimancuref: this.datakirimancuref,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimancuref, { params: options, observe: 'response' });
  }

  updatejobpasangan(contohtampungancuref: any) {
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    // alert(this.datakirimanappde);
    // alert(this.datakirimancuref);

    const kate_peker = document.getElementById('kate_peker') as HTMLInputElement | any;
    const tipe_pekerjaan = document.getElementById('tipe_pekerjaan') as HTMLInputElement | any;
    const posisi1 = document.getElementById('posisi1') as HTMLInputElement | any;
    const nama_perusahaan = document.getElementById('nama_perusahaan') as HTMLInputElement | any;
    const alamat_perusahaan1 = document.getElementById('alamat_perusahaan1') as HTMLInputElement | any;
    const provinsi_cabang_swasta = document.getElementById('provinsi_cabang_swasta') as HTMLInputElement | any;
    const kabkota_cabang_swasta = document.getElementById('kabkota_cabang_swasta') as HTMLInputElement | any;
    const kecamatan_swasta = document.getElementById('kecamatan_swasta') as HTMLInputElement | any;
    const kelurahan_swasta = document.getElementById('kelurahan_swasta') as HTMLInputElement | any;
    const kode_pos_swasta = document.getElementById('kode_pos_swasta') as HTMLInputElement | any;
    const siup2 = document.getElementById('siup2') as HTMLInputElement | any;
    const jenis_bidang = document.getElementById('jenis_bidang') as HTMLInputElement | any;
    const sektor_ekonomi = document.getElementById('sektor_ekonomi') as HTMLInputElement | any;
    const jumlah_karyawan = document.getElementById('jumlah_karyawan') as HTMLInputElement | any;
    const tipe_perusahaan = document.getElementById('tipe_perusahaan') as HTMLInputElement | any;
    const lama_bekerja_bulan1 = document.getElementById('lama_bekerja_bulan1') as HTMLInputElement | any;
    const lama_bekerja_tahun1 = document.getElementById('lama_bekerja_tahun1') as HTMLInputElement | any;
    const status_kepegawaian = document.getElementById('status_kepegawaian') as HTMLInputElement | any;
    const pendapatan = document.getElementById('pendapatan') as HTMLInputElement | any;
    const tunjangan = document.getElementById('tunjangan') as HTMLInputElement | any;
    const pendapatan_lain = document.getElementById('pendapatan_lain') as HTMLInputElement | any;
    const total_pendapatan = document.getElementById('total_pendapatan') as HTMLInputElement | any;
    const usia = document.getElementById('usia') as HTMLInputElement | any;
    const id = document.getElementById('id') as HTMLInputElement | any;
    const curef = document.getElementById('curef') as HTMLInputElement | any;

    if (tipe_pekerjaan.value != 'Wiraswasta' || tipe_pekerjaan.value != 'Wiraswasta') {
      this.kirimansiup = '';
    } else {
      this.kirimansiup = siup2.value;
    }
    alert(id.value);
    alert(contohtampungancuref);

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_job_info_pasangan', {
        // headers: headers,

        curef: this.datakirimancuref,
        alamat_perusahaan: alamat_perusahaan1.value,
        // created_by: app_no_ide.value,
        // created_date: jenis_kelamin.value,
        id: id.value,
        // jarak_lokasi_usaha: curef.value,
        jenis_bidang: jenis_bidang.value,
        // jenis_pekerjaan: id.value,
        jumlah_karyawan: jumlah_karyawan.value,
        kabkota: kabkota_cabang_swasta.value,
        kategori_pekerjaan: kate_peker.value,
        kecamatan: kecamatan_swasta.value,
        kelurahan: kelurahan_swasta.value,
        kode_pos: kode_pos_swasta.value,
        lama_bekerja_bulan: lama_bekerja_bulan1.value,
        lama_bekerja_tahun: lama_bekerja_tahun1.value,
        nama_perusahaan: nama_perusahaan.value,
        no_siup: this.kirimansiup,
        pendapatan: pendapatan.value,
        pendapatan_lain: pendapatan_lain.value,
        posisi: posisi1.value,
        provinsi: provinsi_cabang_swasta.value,
        // rt: provinsi_cabang.value,
        // rw: tanggal_exp_ktp_pasangan.value,
        sektor_ekonomi: sektor_ekonomi.value,
        status_kepegawaian: status_kepegawaian.value,
        tipe_pekerjaan: tipe_pekerjaan.value,
        tipe_perusahaan: tipe_perusahaan.value,
        total_pendapatan: total_pendapatan.value,
        // total_pengeluaran: provinsi_pasangan.value,
        tunjangan: tunjangan.value,
        // umur_pensiun: rw_pasangan.value,
        // updated_by: provinsi_cabang.value,
        // updated_date: tanggal_exp_ktp_pasangan.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/collateral'], {
            queryParams: {
              datakirimande: this.datakirimanappde,
              datakirimancuref: this.datakirimancuref,
              datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
            },
          });
        },
      });

    this.router.navigate(['/data-entry/collateral'], {
      queryParams: {
        datakirimande: this.datakirimanappde,
        datakirimancuref: this.datakirimancuref,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      },
    });
  }
}
