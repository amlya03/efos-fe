import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { strukturpembiayaanmodel } from './struktur-pembiayaan-model';
import { SessionStorageService } from 'ngx-webstorage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataEntryService } from '../services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { refTenorFix } from 'app/verification/service/config/refTenorFix.model';
import { refSkema } from 'app/verification/service/config/refSkema.model';
import { getStrukturPembiayaan } from '../services/config/getStrukturPembiayaan.model';
import { getProgramModel } from '../services/config/getProgramModel.model';
import { getProduk } from '../services/config/getProduk.model';
import { getListFasilitasModel } from '../services/config/getListFasilitasModel.model';

export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-struktur-pembiayaan',
  templateUrl: './struktur-pembiayaan.component.html',
  styleUrls: ['./struktur-pembiayaan.component.scss'],
})
export class StrukturPembiayaanComponent implements OnInit {
  strukturForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  tenor: refTenorFix[] = [];
  kodeskema: refSkema[] = [];
  strukturModel: getStrukturPembiayaan = new getStrukturPembiayaan();
  joint_income?: number;
  kodeFasilitasRet: any;
  kodeProgramRet: any;
  kodeProdukRet: any;
  skemaRet: any;
  jangkaWaktuRet: any;

  statusPerkawinan: any;
  datakirimiancure: any;
  curef: any;
  datakirimanakategoripekerjaan: any;
  app_no_de: any;

  Kodefasilitas: getListFasilitasModel[] = [];
  kodeprogram: getProgramModel[] = [];
  kodeproduk: getProduk[] = [];
  kodetenor: any;
  merginstepup: any;
  databawaan: any;
  postId: any;
  errorMessage: any;
  untukSessionRole: any;
  tujuanpembiayaan: any;

  constructor(
    protected dataEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params['datakirimiancure'];
    });

    this.route.queryParams.subscribe(params => {
      this.statusPerkawinan = params['statusPerkawinan'];
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params['datakirimanakategoripekerjaan'];
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.load();
    this.strukturForm = this.formBuilder.group({
      joint_income: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_fasilitas: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      program: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      produk: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      skema: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      jangka_waktu: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_margin: { value: '', disabled: true },
      tujuan_pembiayaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      fasilitas_ke: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      harga_objek_pembiayaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      fee_based: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      uang_muka: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      detail_objek_pembiayaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      margin: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      angsuran: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
      nilai_pembiayaan: [
        { value: '' || null, disabled: this.untukSessionRole == 'VER_PRE_SPV' || this.untukSessionRole == 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load() {
    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      if (this.dataEntry.status_perkawinan == 'Menikah') {
        this.joint_income = 1;
      } else {
        this.joint_income = 0;
      }
    });

    setTimeout(() => {
      this.dataEntryService.getFetchStrukturDE(this.app_no_de, this.curef).subscribe(data => {
        this.strukturModel = data.result;
        this.kodeFasilitasRet = this.strukturModel.kode_fasilitas + '|' + this.strukturModel.kode_fasilitas_name;
        this.kodeProgramRet = this.strukturModel.program + '|' + this.strukturModel.program_name;
        this.kodeProdukRet = this.strukturModel.produk + '|' + this.strukturModel.produk_name;
        this.skemaRet = this.strukturModel.skema + '|' + this.strukturModel.skema_master + '|' + this.strukturModel.skema_name;
        this.jangkaWaktuRet = this.strukturModel.jangka_waktu + '|' + this.strukturModel.margin;

        // setTimeout(() => {
        // }, 300);
        ///////////////////////////////////////////////////////////////////////////
        let retrivestrukturForm = {
          joint_income: this.joint_income,
          kode_fasilitas: this.kodeFasilitasRet,
          program: this.kodeProgramRet,
          produk: this.kodeProdukRet,
          skema: this.skemaRet,
          jangka_waktu: this.jangkaWaktuRet,
          tipe_margin: this.strukturModel.tipe_margin,
          tujuan_pembiayaan: this.strukturModel.tujuan_pembiayaan,
          fasilitas_ke: this.strukturModel.fasilitas_ke,
          harga_objek_pembiayaan: this.strukturModel.harga_objek_pembiayaan,
          fee_based: this.strukturModel.fee_based,
          uang_muka: this.strukturModel.uang_muka,
          detail_objek_pembiayaan: this.strukturModel.detail_objek_pembiayaan,
          margin: 'Margin = ' + this.strukturModel.margin,
          angsuran: this.strukturModel.angsuran,
          nilai_pembiayaan: this.strukturModel.nilai_pembiayaan,
        };
        this.strukturForm.setValue(retrivestrukturForm);
        ///////////////////////////////////////////////////////////////////////////////
        setTimeout(() => {
          this.dataEntryService.getFetchProgramByKode(this.strukturModel.kode_fasilitas).subscribe(data => {
            this.kodeprogram = data.result;
          });
        }, 300);
        setTimeout(() => {
          this.dataEntryService.getFetchProdukByKode(this.strukturModel.program).subscribe(data => {
            this.kodeproduk = data.result;
          });
        }, 300);
        setTimeout(() => {
          this.dataEntryService.getFetchSkemaByKode(this.strukturModel.produk).subscribe(data => {
            this.kodeskema = data.result;
          });
        }, 300);
        setTimeout(() => {
          if (this.strukturModel.kode_fasilitas_name == 'PTA') {
            this.dataEntryService.getTenorFix(this.strukturModel.skema).subscribe(data => {
              this.tenor = data.result;
            });
          } else {
            this.dataEntryService.getTenorNon(this.strukturModel.skema).subscribe(data => {
              this.tenor = data.result;
            });
          }
        }, 300);

        setTimeout(() => {
          if (this.strukturModel.skema_master == 1) {
            this.strukturForm.get('margin')?.setValue('Margin = ' + this.strukturModel.margin);
          } else {
            this.dataEntryService.getFetchMarginStepUp(this.strukturModel.skema).subscribe(data => {
              let marginStep = data.result;
              this.strukturForm
                .get('margin')
                ?.setValue('Margin Tahun Ke 1 = ' + marginStep[0] + '; ' + 'Margin Tahun Ke 2 = ' + marginStep[1]);
            });
          }
        }, 1000);

        setTimeout(() => {
          this.http
            .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
              app_no_de: this.app_no_de,
              curef: this.curef,
              dp: this.strukturForm.get('uang_muka')?.value,
              fasilitas: this.strukturForm.get('fasilitas_ke')?.value,
              harga_objek: this.strukturForm.get('harga_objek_pembiayaan')?.value,
              kode_fasilitas: this.strukturModel.kode_fasilitas,
              kode_produk: this.strukturModel.produk,
              skema_id: this.strukturModel.skema,
              skema_master: this.strukturModel.skema_master,
              tenor: this.strukturModel.jangka_waktu,
            })
            .subscribe({
              next: data => {
                let anguran1 = data.result.angsuran[0];
                let anguran2 = data.result.angsuran[1];

                if (anguran2 == null) {
                  this.strukturForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
                } else {
                  this.strukturForm
                    .get('angsuran')
                    ?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
                }
              },
              error: err => {
                if (err.error.code == 400) {
                  alert(err.error.message);
                }
              },
            });
        }, 1000);
      });
    }, 300);

    this.dataEntryService.getFetchKodeFasilitas().subscribe(data => {
      this.Kodefasilitas = data.result;
    });

    this.dataEntryService.getFetchTujuanPembiayaan().subscribe(data => {
      this.tujuanpembiayaan = data.result;
    });
  }

  goto() {
    this.router.navigate(['/data-entry/emergency-contact'], {
      queryParams: {
        app_no_de: this.app_no_de,
        datakirimiancure: this.datakirimiancure,
      },
    });
  }

  onchangefasilitas(kodefasilitasnya: any) {
    var potongankodefasilitas = kodefasilitasnya.split('|');
    if (potongankodefasilitas[0] == 'U') {
      $('#uang_muka').attr('hidden', 'hidden');
      $('#siapsiap').attr('hidden', 'hidden');
    } else {
      $('#siapsiap').removeAttr('hidden');
      $('#uang_muka').removeAttr('hidden');
    }
    this.dataEntryService.getFetchProgramByKode(potongankodefasilitas[0]).subscribe(data => {
      this.kodeprogram = data.result;
    });
  }

  onchangeprogram(kodeProgram: any) {
    let kode = kodeProgram.split('|');
    this.dataEntryService.getFetchProdukByKode(kode[0]).subscribe(data => {
      this.kodeproduk = data.result;
    });
  }

  onchangeproduk(kodeProduk: any) {
    let kode = kodeProduk.split('|');
    this.dataEntryService.getFetchSkemaByKode(kode[0]).subscribe(data => {
      this.kodeskema = data.result;
      console.warn(this.kodeskema);
    });
  }

  onchangeskema(valueSkema: any, program: any) {
    const pemisahskemamaster = valueSkema.split('|');
    const programSkema = program.split('|');
    if (programSkema[1] == 'PTA') {
      this.strukturForm.get('tipe_margin')?.setValue('FIX');
      this.dataEntryService.getTenorFix(pemisahskemamaster[0]).subscribe(data => {
        this.tenor = data.result;
      });
    } else {
      this.strukturForm.get('tipe_margin')?.setValue('STEPUP');
      this.dataEntryService.getTenorNon(pemisahskemamaster[0]).subscribe(data => {
        this.tenor = data.result;
      });
    }
  }

  onchangejangkawaktu(jangkaWaktu: any, skema: any) {
    const pemisahfixr = jangkaWaktu.split('|');
    const pemisahskemamaster = skema.split('|');

    if (pemisahskemamaster[1] == 1) {
      let margin = pemisahfixr[1];
      this.strukturForm.get('margin')?.setValue('Margin = ' + margin);
    } else {
      this.dataEntryService.getFetchMarginStepUp(pemisahskemamaster[0]).subscribe(data => {
        let marginStep = data.result;
        this.strukturForm.get('margin')?.setValue('Margin Tahun Ke 1 = ' + marginStep[0] + '; ' + 'Margin Tahun Ke 2 = ' + marginStep[1]);
      });
    }
  }

  itungrincihan() {
    var kirimanpotonganprovinsi = this.strukturForm.get('kode_fasilitas')?.value.split('|');
    var kirimanprogram = this.strukturForm.get('program')?.value.split('|');
    var kirimanproduk = this.strukturForm.get('produk')?.value.split('|');
    var kirimanskema = this.strukturForm.get('skema')?.value.split('|');
    var kirimanjangkawaktu = this.strukturForm.get('jangka_waktu')?.value.split('|');
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/hitung_angsuran', {
        // headers: headers,

        app_no_de: this.app_no_de,
        curef: this.curef,
        dp: this.strukturForm.get('uang_muka')?.value,
        fasilitas: this.strukturForm.get('fasilitas_ke')?.value,
        harga_objek: this.strukturForm.get('harga_objek_pembiayaan')?.value,
        kode_fasilitas: kirimanpotonganprovinsi[0],
        kode_produk: kirimanproduk[0],
        skema_id: kirimanskema[0],
        skema_master: kirimanskema[1],
        tenor: kirimanjangkawaktu[0],
      })
      .subscribe({
        next: data => {
          this.postId = data.result;

          var anguran1 = data.result.angsuran[0];
          var anguran2 = data.result.angsuran[1];
          var nilai = data.result.nilai_pembiayaan;

          if (anguran2 == null) {
            this.strukturForm.get('angsuran')?.setValue('Angsuran = ' + anguran1);
          } else {
            this.strukturForm.get('angsuran')?.setValue('Angsuran Tahun Ke 1 = ' + anguran1 + '; ' + 'Angsuran Tahun Ke 2 = ' + anguran2);
          }
          this.strukturForm.get('nilai_pembiayaan')?.setValue(nilai);
        },
        error: err => {
          if (err.error.code == 400) {
            alert(err.error.message);
          }
        },
      });
  }

  simpanstruktur() {
    let kirimanpotongkodefasilitas = this.strukturForm.get('kode_fasilitas')?.value.split('|');
    let kirimanpotongproduk = this.strukturForm.get('produk')?.value.split('|');
    let kirimanpotongprogram = this.strukturForm.get('program')?.value.split('|');
    let kirimanpotongskema = this.strukturForm.get('skema')?.value.split('|');
    let kirimanjangwaktunya = this.strukturForm.get('jangka_waktu')?.value.split('|');
    let marginfix = this.strukturForm.get('margin')?.value.replace('Margin = ', '');
    let marginNon1 = marginfix.replace('Margin Tahun Ke 1 = ', '');
    let marginNon2 = marginNon1.replace('Margin Tahun Ke 2 = ', '');
    let marginnya = marginNon2.split('; ');
    let angsuranfix = this.strukturForm.get('angsuran')?.value.replace('Angsuran = ', '');
    let angsuranNon1 = angsuranfix.replace('Angsuran Tahun Ke 1 = ', '');
    let angsuranNon2 = angsuranNon1.replace('Angsuran Tahun Ke 2 = ', '');
    let angsurannya = angsuranNon2.split('; ');

    if (this.strukturModel == null) {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_struktur_pembiayaan', {
          angsuran: angsurannya[0],
          app_no_de: this.app_no_de,
          created_by: this.SessionStorageService.retrieve('sessionUserName'),
          created_date: '',
          curef: this.curef,
          detail_objek_pembiayaan: this.strukturForm.get('detail_objek_pembiayaan')?.value,
          fasilitas_ke: this.strukturForm.get('fasilitas_ke')?.value,
          fee_based: this.strukturForm.get('fee_based')?.value,
          harga_objek_pembiayaan: this.strukturForm.get('harga_objek_pembiayaan')?.value,
          id: '',
          jangka_waktu: kirimanjangwaktunya[0],
          joint_income: this.strukturForm.get('joint_income')?.value,
          kode_fasilitas: kirimanpotongkodefasilitas[0],
          kode_fasilitas_name: kirimanpotongkodefasilitas[1],
          margin: kirimanjangwaktunya[1],
          nilai_pembiayaan: this.strukturForm.get('nilai_pembiayaan')?.value,
          produk: kirimanpotongproduk[0],
          produk_name: kirimanpotongproduk[1],
          program: kirimanpotongprogram[0],
          program_name: kirimanpotongprogram[1],
          skema: kirimanpotongskema[0],
          skema_master: kirimanpotongskema[1],
          skema_name: kirimanpotongskema[2],
          tipe_margin: this.strukturForm.get('tipe_margin')?.value,
          tujuan_pembiayaan: this.strukturForm.get('tujuan_pembiayaan')?.value,
          uang_muka: this.strukturForm.get('uang_muka')?.value,
        })
        .subscribe({
          next: bawaan => {
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/data-entry/emergency-contact'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
          error: error => {
            if (error.error.code == 400) {
              alert('Gagal Menyimpan Data');
              alert(error.error.message);
            }
          },
        });
    } else {
      this.http
        .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_struktur_pembiayaan', {
          angsuran: angsurannya[0],
          app_no_de: this.app_no_de,
          updated_by: this.SessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
          curef: this.curef,
          detail_objek_pembiayaan: this.strukturForm.get('detail_objek_pembiayaan')?.value,
          fasilitas_ke: this.strukturForm.get('fasilitas_ke')?.value,
          fee_based: this.strukturForm.get('fee_based')?.value,
          harga_objek_pembiayaan: this.strukturForm.get('harga_objek_pembiayaan')?.value,
          id: '',
          jangka_waktu: kirimanjangwaktunya[0],
          joint_income: this.strukturForm.get('joint_income')?.value,
          kode_fasilitas: kirimanpotongkodefasilitas[0],
          kode_fasilitas_name: kirimanpotongkodefasilitas[1],
          margin: kirimanjangwaktunya[1],
          nilai_pembiayaan: this.strukturForm.get('nilai_pembiayaan')?.value,
          produk: kirimanpotongproduk[0],
          produk_name: kirimanpotongproduk[1],
          program: kirimanpotongprogram[0],
          program_name: kirimanpotongprogram[1],
          skema: kirimanpotongskema[0],
          skema_master: kirimanpotongskema[1],
          skema_name: kirimanpotongskema[2],
          tipe_margin: this.strukturForm.get('tipe_margin')?.value,
          tujuan_pembiayaan: this.strukturForm.get('tujuan_pembiayaan')?.value,
          uang_muka: this.strukturForm.get('uang_muka')?.value,
        })
        .subscribe({
          next: bawaan => {
            alert('Berhasil Menyimpan Data');
            // setTimeout(() => {
            this.router.navigate(['/data-entry/emergency-contact'], {
              queryParams: {
                curef: this.curef,
                statusPerkawinan: this.statusPerkawinan,
                app_no_de: this.app_no_de,
              },
            });
          },
          error: error => {
            if (error.error.code == 400) {
              alert('Gagal Menyimpan Data');
              alert(error.error.message);
            }
          },
        });
    }
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
}
