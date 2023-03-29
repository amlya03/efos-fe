/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Component, Input, OnInit } from '@angular/core';
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
import { environment } from 'environments/environment';
import { modelCustomer } from 'app/initial-data-entry/services/config/modelCustomer.model';
import { listAgunan } from '../services/config/listAgunan.model';

export type EntityResponseDaWa = HttpResponse<strukturpembiayaanmodel>;
export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Component({
  selector: 'jhi-struktur-pembiayaan',
  templateUrl: './struktur-pembiayaan.component.html',
  styleUrls: ['./struktur-pembiayaan.component.scss'],
})
export class StrukturPembiayaanComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  strukturForm!: FormGroup;
  dataEntry: fetchAllDe = new fetchAllDe();
  tenor: refTenorFix[] = [];
  kodeskema: refSkema[] = [];
  strukturModel: getStrukturPembiayaan = new getStrukturPembiayaan();
  modelIde: modelCustomer = new modelCustomer();
  responseCollateral: listAgunan = new listAgunan();
  modelCollateral: listAgunan = new listAgunan();
  kodeFasilitasRet: any;
  kodeProgramRet: any;
  kodeProdukRet: any;
  skemaRet: any;
  jangkaWaktuRet: any;
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
  postId: getProduk[] = [];
  errorMessage: any;
  untukSessionRole: any;
  tujuanpembiayaan: any;

  // only show margin dan angsuran
  showAngsuran: any;
  showMargin: any;

  constructor(
    protected dataEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private sessionStorageService: SessionStorageService,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });

    this.route.queryParams.subscribe(params => {
      this.datakirimiancure = params.datakirimiancure;
    });
    this.route.queryParams.subscribe(params => {
      this.datakirimanakategoripekerjaan = params.datakirimanakategoripekerjaan;
    });
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.load();
    this.strukturForm = this.formBuilder.group({
      joint_income: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      kode_fasilitas: [{ value: '' || null, disabled: true }, Validators.required],
      program: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      produk: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      skema: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      akad: { value: '' || null, disabled: true },
      jangka_waktu: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      tipe_margin: { value: '', disabled: true },
      tujuan_pembiayaan: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      fasilitas_ke: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      harga_objek_pembiayaan: '',
      fee_based: [
        { value: '0' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      uang_muka: [
        { value: '0' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      detail_objek_pembiayaan: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      margin: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      angsuran: [
        { value: '' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
      nilai_pembiayaan: [
        { value: '0' || null, disabled: this.untukSessionRole === 'VER_PRE_SPV' || this.untukSessionRole === 'BRANCHMANAGER' },
        Validators.required,
      ],
    });
  }

  load(): void {
    setTimeout(() => {
      this.dataEntryService.getCollateralByCuref(this.curef).subscribe(coll => {
        this.responseCollateral = coll.result.shift();
        // console.warn(this.responseCollateral.harga_objek)
        // if (this.responseCollateral.find((value: listAgunan) => value.jenis_objek == 3)) {
        //   if (this.responseCollateral.find((value: listAgunan) => value.nilai_pasar)) {
        //     this.modelCollateral = this.responseCollateral.find((value: listAgunan) => value.nilai_pasar);
        //     this.strukturForm.get('harga_objek_pembiayaan')?.setValue(this.modelCollateral.nilai_pasar);
        //     // console.warn('p',this.modelCollateral)
        //   } else {
        //     this.modelCollateral = this.responseCollateral.find((value: listAgunan) => value.harga_objek);
        this.strukturForm.get('harga_objek_pembiayaan')?.setValue(this.responseCollateral.harga_objek);
        // console.warn('h',this.modelCollateral)
        // }
        // }
      });
    }, 2);

    setTimeout(() => {
      this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
        this.dataEntry = data.result;
      });
    }, 4);

    setTimeout(() => {
      this.dataEntryService.getFetchKodeFasilitas().subscribe(data => {
        this.Kodefasilitas = data.result;
      });
    }, 6);

    let modelCode: any;
    setTimeout(() => {
      this.dataEntryService.getCustomerByCuref(this.curef).subscribe(data => {
        this.modelIde = data.result;
        modelCode = data.code;
        this.kodeFasilitasRet = this.modelIde.kode_fasilitas + '|' + this.modelIde.fasilitas_name;
        this.strukturForm.get('kode_fasilitas')?.setValue(this.kodeFasilitasRet);
        this.onchangefasilitas(this.kodeFasilitasRet.split('|'));
        if (
          this.modelIde.status_perkawinan !== 'KAWIN' ||
          (this.modelIde.status_perkawinan === 'KAWIN' && this.modelIde.fasilitas_name === 'PTA')
        ) {
          this.strukturForm.get('joint_income')?.setValue('0');
        } else {
          this.strukturForm.get('joint_income')?.setValue('1');
        }
        if (this.modelIde.fasilitas_name !== 'PTA') {
          this.strukturForm.get('harga_objek_pembiayaan')?.disable();
        } else {
          this.strukturForm.get('harga_objek_pembiayaan')?.enable();
        }
      });
    }, 8);

    setTimeout(() => {
      this.dataEntryService.getFetchStrukturDE(this.app_no_de, this.curef).subscribe(data => {
        this.strukturModel = data.result;
        if (data.result == null || data.result == '') {
          this.kodeProgramRet = '';
          this.kodeProdukRet = '';
          this.skemaRet = '';
          this.jangkaWaktuRet = '';
          this.getLoading(false);
        } else {
          this.kodeProgramRet = this.strukturModel.program + '|' + this.strukturModel.program_name + '|' + this.strukturModel.fee_based;
          this.kodeProdukRet = this.strukturModel.produk + '|' + this.strukturModel.produk_name;
          this.skemaRet =
            this.strukturModel.skema +
            '|' +
            this.strukturModel.skema_master +
            '|' +
            this.strukturModel.skema_name +
            '|' +
            this.strukturModel.akad;
          this.jangkaWaktuRet = this.strukturModel.jangka_waktu + '|' + this.strukturModel.margin;

          setTimeout(() => {
            this.dataEntryService.getFetchTujuanPembiayaan(this.strukturModel.kode_fasilitas_name).subscribe(tujuanPem => {
              this.tujuanpembiayaan = tujuanPem.result;
            });
          }, 5);
          setTimeout(() => {
            this.dataEntryService.getFetchProgramByKode(this.strukturModel.kode_fasilitas).subscribe(fasilitas => {
              this.kodeprogram = fasilitas.result;
            });
          }, 10);
          setTimeout(() => {
            this.dataEntryService.getFetchProdukByKode(this.strukturModel.program).subscribe(program => {
              this.kodeproduk = program.result;
            });
          }, 15);
          setTimeout(() => {
            this.dataEntryService.getFetchSkemaByKode(this.strukturModel.produk).subscribe(produk => {
              this.kodeskema = produk.result;
            });
          }, 20);
          setTimeout(() => {
            if (this.strukturModel.skema_master == 1) {
              this.dataEntryService.getTenorFix(this.strukturModel.skema).subscribe(skemaFix => {
                this.tenor = skemaFix.result;
              });
            } else {
              this.dataEntryService.getTenorNon(this.strukturModel.skema).subscribe(skemaNon => {
                this.tenor = skemaNon.result;
              });
            }
          }, 25);

          let marginStep: any;
          let anguranStep: any;
          setTimeout(() => {
            if (this.strukturModel.skema_master == 1) {
              this.showMargin = 'Margin = ' + this.strukturModel.margin;
            } else {
              this.dataEntryService.getFetchMarginStepUp(this.strukturModel.skema).subscribe(margin => {
                marginStep = margin.result;

                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                this.showMargin = marginStep.map((element: any, i: any) => ` Margin Ke ${i + 1} = ${element}`);
              });
            }
          }, 30);

          setTimeout(() => {
            this.http
              .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
                app_no_de: this.app_no_de,
                curef: this.curef,
                dp: this.strukturModel.uang_muka,
                fasilitas: this.strukturModel.fasilitas_ke,
                harga_objek: this.strukturModel.harga_objek_pembiayaan,
                kode_fasilitas: this.strukturModel.kode_fasilitas,
                kode_produk: this.strukturModel.produk,
                skema_id: this.strukturModel.skema,
                skema_master: this.strukturModel.skema_master,
                tenor: this.strukturModel.jangka_waktu,
              })
              .subscribe({
                next: anguran => {
                  this.postId = anguran.result.angsuran;
                  // console.warn(this.postId)
                  if (this.postId[1]) {
                    this.showAngsuran = this.postId.map(
                      (value: any, i: any) =>
                        ` Angsuran Ke ${i + 1} = ${Number(value).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`
                    );
                  } else {
                    anguranStep = this.postId.shift();
                    this.showAngsuran = 'Angsuran = ' + Number(anguranStep).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                  }
                },
                error(err) {
                  if (err.error.code == 400) {
                    alert(err.error.message);
                  }
                },
              });
          }, 50);

          setTimeout(() => {
            // /////////////////////////////////////////////////////////////////////////
            const retrivestrukturForm = {
              joint_income: this.strukturModel.joint_income,
              kode_fasilitas: this.kodeFasilitasRet,
              program: this.kodeProgramRet,
              produk: this.kodeProdukRet,
              skema: this.skemaRet,
              akad: this.strukturModel.akad,
              jangka_waktu: this.jangkaWaktuRet,
              tipe_margin: this.strukturModel.tipe_margin,
              tujuan_pembiayaan: this.strukturModel.tujuan_pembiayaan,
              fasilitas_ke: this.strukturModel.fasilitas_ke,
              harga_objek_pembiayaan: this.strukturModel.harga_objek_pembiayaan,
              fee_based: this.strukturModel.fee_based,
              uang_muka: this.strukturModel.uang_muka,
              detail_objek_pembiayaan: this.strukturModel.detail_objek_pembiayaan,
              margin: this.strukturModel.margin,
              angsuran: this.strukturModel.angsuran,
              nilai_pembiayaan: this.strukturModel.nilai_pembiayaan,
            };
            this.strukturForm.setValue(retrivestrukturForm);
            this.getLoading(false);
            // /////////////////////////////////////////////////////////////////////////////
          }, 500);
        }
      });
    }, modelCode / 4);
  }

  goto(): void {
    this.sessionStorageService.store('strukturPemb', 1);
    this.router.navigate(['/data-entry/emergency-contact'], {
      queryParams: {
        curef: this.curef,
        app_no_de: this.app_no_de,
      },
    });
  }

  onchangefasilitas(kodefasilitasnya: any): void {
    if (kodefasilitasnya[0] == 'U') {
      $('#uang_muka').attr('hidden', 'hidden');
      $('#siapsiap').attr('hidden', 'hidden');
    } else {
      $('#siapsiap').removeAttr('hidden');
      $('#uang_muka').removeAttr('hidden');
    }
    this.dataEntryService.getFetchProgramByKode(kodefasilitasnya[0]).subscribe({
      next: data => {
        this.kodeprogram = data.result;
      },
      // error: () => {
      //   //
      // },
    });

    this.dataEntryService.getFetchTujuanPembiayaan(kodefasilitasnya[1]).subscribe(tujuanPem => {
      this.tujuanpembiayaan = tujuanPem.result;
    });
  }

  onchangeprogram(kodeProgram: any): void {
    this.getLoading(true);
    const kode = kodeProgram.split('|');
    this.dataEntryService.getFetchProdukByKode(kode[0]).subscribe({
      next: data => {
        this.getLoading(false);
        this.kodeproduk = data.result;
      },
      error: () => {
        this.getLoading(false);
      },
    });
    this.strukturForm.get('fee_based')?.setValue(kode[2]);
  }

  onchangeproduk(kodeProduk: any): void {
    this.getLoading(true);
    const kode = kodeProduk.split('|');
    this.dataEntryService.getFetchSkemaByKode(kode[0]).subscribe({
      next: data => {
        this.getLoading(false);
        this.kodeskema = data.result;
      },
      error: () => {
        this.getLoading(false);
      },
    });
  }

  onchangeskema(valueSkema: any): void {
    this.getLoading(true);
    const pemisahskemamaster = valueSkema.split('|');
    const programSkema = valueSkema.split('|');
    this.strukturForm.get('akad')?.setValue(pemisahskemamaster[3]);
    if (programSkema[1] === '1') {
      this.strukturForm.get('tipe_margin')?.setValue('FIX');
      this.dataEntryService.getTenorFix(pemisahskemamaster[0]).subscribe({
        next: data => {
          this.getLoading(false);
          this.tenor = data.result;
        },
        error: () => {
          this.getLoading(false);
        },
      });
    } else {
      this.getLoading(false);
      this.strukturForm.get('tipe_margin')?.setValue('STEPUP');
      this.dataEntryService.getTenorNon(pemisahskemamaster[0]).subscribe({
        next: data => {
          this.getLoading(false);
          this.tenor = data.result;
        },
        error: () => {
          this.getLoading(false);
        },
      });
    }
  }

  onchangejangkawaktu(jangkaWaktu: any, skema: any): void {
    const pemisahfixr = jangkaWaktu.split('|');
    const pemisahskemamaster = skema.split('|');

    if (pemisahskemamaster[1] == 1) {
      const margin = pemisahfixr[1];
      this.showMargin = 'Margin = ' + margin;
      this.strukturForm.get('margin')?.setValue(margin);
    } else {
      this.dataEntryService.getFetchMarginStepUp(pemisahskemamaster[0]).subscribe(data => {
        const marginStep = data.result;
        const marginFix = marginStep.unshift();

        if (marginStep[1]) {
          this.showMargin = marginStep.map((value: any, i: any) => ` Margin Ke ${i + 1} = ${Number(value)}`);
        } else {
          this.showMargin = 'Margin = ' + Number(marginFix);
        }
        this.strukturForm.get('margin')?.setValue(pemisahfixr[1]);
      });
    }
  }

  itungrincihan(): void {
    this.getLoading(true);
    const kirimanpotonganprovinsi = this.strukturForm.get('kode_fasilitas')?.value.split('|');
    const kirimanproduk = this.strukturForm.get('produk')?.value.split('|');
    const kirimanskema = this.strukturForm.get('skema')?.value.split('|');
    const kirimanjangkawaktu = this.strukturForm.get('jangka_waktu')?.value.split('|');
    let anguranStep: any;
    this.http
      .post<any>(this.baseUrl + 'v1/efos-de/hitung_angsuran', {
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
          this.postId = data.result.angsuran;
          anguranStep = this.postId.unshift();
          const nilai = data.result.nilai_pembiayaan;
          // console.warn(this.postId);
          // console.warn(anguranStep)
          if (this.postId[1]) {
            this.showAngsuran = this.postId.map(
              (value: any, i: any) =>
                ` Angsuran Ke ${i + 1} = ${Number(value).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`
            );
          } else {
            this.showAngsuran = 'Angsuran = ' + Number(this.postId).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
          }
          this.strukturForm.get('angsuran')?.setValue(anguranStep);
          this.strukturForm.get('nilai_pembiayaan')?.setValue(nilai);
          this.getLoading(false);
        },
        error: err => {
          this.getLoading(false);
          if (err.error.code == 400) {
            alert(err.error.message);
          }
        },
      });
  }

  simpanstruktur(): void {
    const kirimanpotongkodefasilitas = this.strukturForm.get('kode_fasilitas')?.value.split('|');
    const kirimanpotongproduk = this.strukturForm.get('produk')?.value.split('|');
    const kirimanpotongprogram = this.strukturForm.get('program')?.value.split('|');
    const kirimanpotongskema = this.strukturForm.get('skema')?.value.split('|');
    const kirimanjangwaktunya = this.strukturForm.get('jangka_waktu')?.value.split('|');
    if (this.strukturModel == null) {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/create_struktur_pembiayaan', {
          angsuran: this.strukturForm.get('angsuran')?.value,
          app_no_de: this.app_no_de,
          created_by: this.sessionStorageService.retrieve('sessionUserName'),
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
          margin: this.strukturForm.get('margin')?.value,
          nilai_pembiayaan: this.strukturForm.get('nilai_pembiayaan')?.value,
          produk: kirimanpotongproduk[0],
          produk_name: kirimanpotongproduk[1],
          program: kirimanpotongprogram[0],
          program_name: kirimanpotongprogram[1],
          skema: kirimanpotongskema[0],
          akad: this.strukturForm.get('akad')?.value,
          skema_master: kirimanpotongskema[1],
          skema_name: kirimanpotongskema[2],
          tipe_margin: this.strukturForm.get('tipe_margin')?.value,
          tujuan_pembiayaan: this.strukturForm.get('tujuan_pembiayaan')?.value,
          uang_muka: this.strukturForm.get('uang_muka')?.value,
        })
        .subscribe({
          next: () => {
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/data-entry/emergency-contact'], {
              queryParams: {
                curef: this.curef,
                app_no_de: this.app_no_de,
              },
            });
          },
          error(error) {
            if (error.error.code == 400) {
              alert('Gagal Menyimpan Data');
              alert(error.error.message);
            }
          },
        });
    } else {
      this.http
        .post<any>(this.baseUrl + 'v1/efos-de/update_struktur_pembiayaan', {
          angsuran: this.strukturForm.get('angsuran')?.value,
          app_no_de: this.app_no_de,
          updated_by: this.sessionStorageService.retrieve('sessionUserName'),
          updated_date: '',
          curef: this.curef,
          detail_objek_pembiayaan: this.strukturForm.get('detail_objek_pembiayaan')?.value,
          fasilitas_ke: this.strukturForm.get('fasilitas_ke')?.value,
          fee_based: this.strukturForm.get('fee_based')?.value,
          harga_objek_pembiayaan: this.strukturForm.get('harga_objek_pembiayaan')?.value,
          id: this.strukturModel.id,
          jangka_waktu: kirimanjangwaktunya[0],
          joint_income: this.strukturForm.get('joint_income')?.value,
          kode_fasilitas: kirimanpotongkodefasilitas[0],
          kode_fasilitas_name: kirimanpotongkodefasilitas[1],
          margin: this.strukturForm.get('margin')?.value,
          nilai_pembiayaan: this.strukturForm.get('nilai_pembiayaan')?.value,
          produk: kirimanpotongproduk[0],
          produk_name: kirimanpotongproduk[1],
          program: kirimanpotongprogram[0],
          program_name: kirimanpotongprogram[1],
          skema: kirimanpotongskema[0],
          akad: this.strukturForm.get('akad')?.value,
          skema_master: kirimanpotongskema[1],
          skema_name: kirimanpotongskema[2],
          tipe_margin: this.strukturForm.get('tipe_margin')?.value,
          tujuan_pembiayaan: this.strukturForm.get('tujuan_pembiayaan')?.value,
          uang_muka: this.strukturForm.get('uang_muka')?.value,
        })
        .subscribe({
          next: () => {
            alert('Berhasil Menyimpan Data');
            // setTimeout(() => {
            this.router.navigate(['/data-entry/emergency-contact'], {
              queryParams: {
                curef: this.curef,
                app_no_de: this.app_no_de,
              },
            });
          },
          error(error) {
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

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
