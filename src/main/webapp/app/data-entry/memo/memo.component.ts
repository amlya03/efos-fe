import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { memomodel } from './memo-model';
import { ServicesUploadDocumentService } from 'app/upload-document/services/services-upload-document.service';
import { getMemoUploadModel } from 'app/upload-document/services/config/getMemoUploadModel.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { DataEntryService } from '../services/data-entry.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { detailMemo } from '../services/config/detailMemo.model';

@Component({
  selector: 'jhi-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  memoForm!: FormGroup;
  file?: File; // Variable to store file
  curef: string | undefined;
  app_no_de: string | undefined;
  statusPerkawinan: string | undefined;
  getMemoUpload: getMemoUploadModel = new getMemoUploadModel();
  resultGetMemoUpload = 0;
  memoModel: memomodel[] = [];
  detailMemoModel: detailMemo = new detailMemo();
  modelResultmemo = 0;
  dataEntryModel: fetchAllDe = new fetchAllDe();
  tampilanfixornon: any;
  untukSessionRole: any;
  untukSessionusername: any;
  untukSessionfullname: any;
  popup: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private SessionStorageService: SessionStorageService,
    protected fileUploadService: ServicesUploadDocumentService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params['curef'];
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params['app_no_de'];
      this.statusPerkawinan = params['statusPerkawinan'];
    });
  }

  ngOnInit(): void {
    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.untukSessionusername = this.SessionStorageService.retrieve('sessionUserName');
    this.untukSessionfullname = this.SessionStorageService.retrieve('sessionFullName');

    this.load();

    this.memoForm = this.formBuilder.group({
      keterangan: '',
    });
  }

  load() {
    this.dataEntryService.getfetchMemo(this.app_no_de).subscribe(data => {
      this.memoModel = data.result;
      setTimeout(() => {
        if (data.result == null || data.result == '') {
          this.modelResultmemo = 1;
        } else {
          this.modelResultmemo = 0;
        }
        // alert(this.modelResultmemo)
      }, 300);
    });

    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntryModel = data.result;
      this.tampilanfixornon = data.result.kategori_pekerjaan;
    });

    this.fileUploadService.getMemoUpload(this.curef, this.app_no_de).subscribe(data => {
      this.getMemoUpload = data.result;
      if (this.getMemoUpload.nama_dokumen == null) {
        this.resultGetMemoUpload = 0;
      } else {
        this.resultGetMemoUpload = 1;
      }
    });
  }

  simpanmemo(): void {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/create_memo', {
        id: '',
        keterangan: this.memoForm.get('keterangan')?.value,
        users: this.untukSessionfullname,
        role: this.untukSessionRole,
        created_by: this.untukSessionusername,
        app_no_de: this.app_no_de,
      })
      .subscribe({
        next: bawaan => {
          window.location.reload();
        },
      });
  }

  kembalikede(): void {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_back_de', {
        app_no_de: this.app_no_de,
        created_by: this.SessionStorageService.retrieve('sessionFullName'),
        status_aplikasi: this.dataEntryModel.status_aplikasi,
      })
      .subscribe({
        next: bawaan => {
          alert("Data Telah Kembali Ke AO");
          this.router.navigate(['/data-entry'], {
            queryParams: { app_no_de: this.app_no_de },
          });
        },
      });
  }

  cetakmemo(): void {
    const divToPrint = document.getElementById('example') as HTMLInputElement | any;
    this.popup = window.open('');
    this.popup.document.write(divToPrint.outerHTML);
    this.popup.print();
    this.popup.close();
  }

  updatekeupload(): void {
    this.http
      .post<any>('http://10.20.34.110:8805/api/v1/efos-de/update_status_dataentry', {
        app_no_de: this.app_no_de,
        created_by: this.SessionStorageService.retrieve('sessionFullName'),
        status_aplikasi: this.dataEntryModel.status_aplikasi,
      })
      .subscribe({
        next: bawaan => {
          if (this.untukSessionRole === 'BRANCHMANAGER') {
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/data-entry']);
          } else {
            alert('Berhasil Menyimpan Data');
            this.router.navigate(['/upload_document/upload_document_de'], {
              queryParams: { curef: this.curef, app_no_de: this.app_no_de },
            });
          }
        },
      });
  }

  backtoverifikatro(): void {
    this.router.navigate(['/daftar-aplikasi-waiting-assigment'], {});
  }

  pilihFile(pilih: any) {
    this.file = pilih.target.files[0];
  }
  thisFileUpload() {
    if (this.getMemoUpload == null) {
      this.fileUploadService.uploadMemo(this.file, this.app_no_de, this.curef).subscribe({
        next: bawaan => {
          alert('Data Berhasil diupload');
          window.location.reload();
        },
      });
    } else {
      alert('Data Sudah diupload');
    }
  }
  download() {
    const buatPdf = this.getMemoUpload.nama_dokumen?.split('.').pop();
    if (buatPdf == 'pdf') {
      window.open('http://10.20.34.110:8805/api/v1/efos-de/downloadFile/' + this.getMemoUpload.nama_dokumen + '');
    } else {
      const url = 'http://10.20.34.110:8805/api/v1/efos-de/downloadFile/' + this.getMemoUpload.nama_dokumen + '';
      const img = '<img src="' + url + '">';
      this.popup = window.open('');
      this.popup.document.write(img);
    }
  }
  view(id: number | null | undefined) {
    this.dataEntryService.getFetchListMemo(id).subscribe(data => {
      this.detailMemoModel = data.result;
      Swal.fire({
        // title: 'Detail Memo',
        imageUrl: '../../../content/images/bank-mega-syariah.png',
        imageHeight: 100,
        html:
          '<div class="row"><div class="col">' +
          '<br/>' +
          '<ul><h5>Keterangan Memo :</h5><li>' +
          '<h6 style="text-align: left;">' +
          this.detailMemoModel.keterangan +
          '</h6>' +
          '</li></ul></div>' +
          '<div class="col">' +
          '<h4>' +
          this.dataEntryModel.nama +
          '</h4>' +
          '<p class="text-muted">Dibuat Oleh ' +
          this.detailMemoModel.role +
          ' /  ' +
          this.detailMemoModel.users +
          '</p>' +
          '<ul style="text-align: left;"><h6>' +
          this.dataEntryModel.produk_pembiayaan +
          '</h6>' +
          '<li style="text-align: left;"><label>Fasilitas</label> : ' +
          this.dataEntryModel.kode_fasilitas_name +
          '</li>' +
          '<li><label>Plafond</label>: ' +
          Number(this.dataEntryModel.nilai_pembiayaan).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) +
          '</li>' +
          '<li><label>Tenor</label> : ' +
          this.dataEntryModel.jangka_waktu +
          '</li>' +
          '</ul></div></div>',
        focusConfirm: false,
        // preConfirm: () => {
        //   return [$('#produk').val(), $('#joint_income').val(), $('#parameter').val(), $('#data_value').val(), $('#min').val(), $('#max').val(), $('#score').val()];
        // },
      }).then(result => {});

      // if (formValues) {
      //   Swal.fire(JSON.stringify(formValues));
      // }
      // ////////////// Pop Up Input Scoring ////////////////////////
    });
  }
}
