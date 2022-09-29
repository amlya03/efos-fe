import { Component, OnInit } from '@angular/core';
import { createRequestOption } from 'app/core/request/request-util';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { datapasangamodel } from './data-pasangan-model';
import { Observable } from 'rxjs';

export type EntityResponseDaWa = HttpResponse<datapasangamodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-data-pasangan',
  templateUrl: './data-pasangan.component.html',
  styleUrls: ['./data-pasangan.component.scss'],
})
export class DataPasanganComponent implements OnInit {
  datakiriman: any;
  datakirimanakategoripekerjaan: any;
  daWa: any;
  datakirimanappde: any;

  datakirimancuref: any;

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
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanappde = params['datakirimanappde'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimancuref = params['datakirimancuref'];
    });

    // this.route.queryParams.subscribe(params => {
    //   this.datakiriman = params['datakiriman'];
    // });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');

  ngOnInit(): void {
    this.load();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        // console.log(res.body?.result);
        console.warn('pasangan', res);
        console.warn('!!!!!!!!!!!!!!!!!!!', this.datakiriman);
        // console.warn('@@@@@@@@@@@@@', this.datakiriman);
        // console.warn('@31231231231',this.route.snapshot.paramMap.get('datakiriman'));
        this.daWa = res.body?.result;
        // this.onResponseSuccess(res);
      },
    });
  }

  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return this.http.get<ApiResponse>(this.resourceUrl + this.datakirimanappde, { params: options, observe: 'response' });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  goto(contohtampungancuref: any) {
    // this.onResponseSuccess(res);
    alert(contohtampungancuref);
    alert(this.datakirimanappde);
    alert(this.datakirimancuref);
    this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
      queryParams: {
        datakirimanappde: this.datakirimanappde,
        datakirimancuref: this.datakirimancuref,
        datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
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

  updatedatapasngan(contohtampungancuref: any) {
    // this.onResponseSuccess(res);
    // alert(contohtampungancuref);
    // alert(this.datakirimanappde);
    // alert(this.datakirimancuref);

    const nama_pasangan = document.getElementById('nama_pasangan') as HTMLInputElement | any;
    const jenis_kelamin_pasangan = document.getElementById('jenis_kelamin_pasangan') as HTMLInputElement | any;
    const alamat_ktp_pasangan = document.getElementById('alamat_ktp_pasangan') as HTMLInputElement | any;
    const provinsi_pasangan = document.getElementById('provinsi_pasangan') as HTMLInputElement | any;
    const kabkota_pasangan = document.getElementById('kabkota_pasangan') as HTMLInputElement | any;
    const kecamatan_pasangan = document.getElementById('kecamatan_pasangan') as HTMLInputElement | any;
    const kelurahan_pasangan = document.getElementById('kelurahan_pasangan') as HTMLInputElement | any;
    const kode_pos_pasangan = document.getElementById('kode_pos_pasangan') as HTMLInputElement | any;
    const rt_pasangan = document.getElementById('rt_pasangan') as HTMLInputElement | any;
    const rw_pasangan = document.getElementById('rw_pasangan') as HTMLInputElement | any;
    const tanggal_lahir_pasangan = document.getElementById('tanggal_lahir_pasangan') as HTMLInputElement | any;
    const kewarganegaraan_pasangan = document.getElementById('kewarganegaraan_pasangan') as HTMLInputElement | any;
    const pendidikan_pasangan = document.getElementById('pendidikan_pasangan') as HTMLInputElement | any;
    const email_pasangan = document.getElementById('email_pasangan') as HTMLInputElement | any;
    const no_handphone_pasangan = document.getElementById('no_handphone_pasangan') as HTMLInputElement | any;
    const no_ktp_pasangan = document.getElementById('no_ktp_pasangan') as HTMLInputElement | any;
    const tanggal_terbit_ktp_pasangan = document.getElementById('tanggal_terbit_ktp_pasangan') as HTMLInputElement | any;
    const tanggal_exp_ktp_pasangan = document.getElementById('tanggal_exp_ktp_pasangan') as HTMLInputElement | any;
    const npwp_pasangan = document.getElementById('npwp_pasangan') as HTMLInputElement | any;
    const id = document.getElementById('id') as HTMLInputElement | any;
    const app_no_ide = document.getElementById('app_no_ide') as HTMLInputElement | any;
    const curef = document.getElementById('curef') as HTMLInputElement | any;

    alert(id.value);
    alert(contohtampungancuref);

    this.http
      .post<any>('http://10.20.34.178:8805/api/v1/efos-de/update_pasangan', {
        // headers: headers,

        // agama_pasangan: nama.value,
        alamat_ktp_pasangan: alamat_ktp_pasangan.value,
        app_no_ide: app_no_ide.value,
        // cabang: jenis_kelamin.value,
        // created_by: usia.value,
        curef: curef.value,
        email_pasangan: email_pasangan.value,
        id: id.value,
        // jenis_kelamin_pasangan: tempat_lahir.value,
        kabkota_pasangan: kabkota_pasangan.value,
        kecamatan_pasangan: kecamatan_pasangan.value,
        kelurahan_pasangan: kelurahan_pasangan.value,
        kewarganegaraan_pasangan: kewarganegaraan_pasangan.value,
        kode_pos_pasangan: kode_pos_pasangan.value,
        // nama_ibu_kandung_pasangan: agama.value,
        no_handphone_pasangan: no_handphone_pasangan.value,
        no_ktp_pasangan: no_ktp_pasangan.value,
        // nama_ibu_kandung: ' 1',
        pendidikan_pasangan: pendidikan_pasangan.value,
        provinsi_pasangan: provinsi_pasangan.value,
        rt_pasangan: rt_pasangan.value,
        rw_pasangan: rw_pasangan.value,
        // status_ktp_pasangan: provinsi_cabang.value,
        tanggal_exp_ktp_pasangan: tanggal_exp_ktp_pasangan.value,
        tanggal_lahir_pasangan: tanggal_lahir_pasangan.value,
        tanggal_terbit_ktp_pasangan: tanggal_terbit_ktp_pasangan.value,
        // tempat_lahir_pasangan: kecamatan.value,
        // usia_pasangan: kecamatan_domisili.value,
      })

      .subscribe({
        next: bawaan => {
          //           this.contohdata = bawaan.result.app_no_de;
          // this.databawaan = bawaan.result.app_no_de;
          // alert('MASUKAJAHSUSAH');
          this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
            queryParams: {
              datakirimanappde: this.datakirimanappde,
              datakirimancuref: this.datakirimancuref,
              datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
            },
          });
        },
      });

    this.router.navigate(['/data-entry/pekerjaan-pasangan'], {
      // queryParams: {
      //   datakirimanappde: this.datakirimanappde,
      //   datakirimancuref: this.datakirimancuref,
      //   datakirimanakategoripekerjaan: this.datakirimanakategoripekerjaan,
      // },
    });
  }
}
