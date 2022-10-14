import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getJob } from 'app/data-entry/services/config/getJob.model';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';

@Component({
  selector: 'jhi-stuktur-pembiayaan',
  templateUrl: './stuktur-pembiayaan.component.html',
  styleUrls: ['./stuktur-pembiayaan.component.scss'],
})
export class StukturPembiayaanComponent implements OnInit {
  app_no_de: any;
  dataEntry: fetchAllDe = new fetchAllDe();
  fetchJob: Array<getJob> = new Array<getJob>();
  getDataJob: any;
  strukturForm!: FormGroup;
  submitted = false;
  curef: any;

  constructor(
    public router: Router,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService
  ) {
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.activatedRoute.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
      this.curef = params.curef;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.load();
    this.strukturForm = this.formBuilder.group({
      id: '',
      app_no_ide: '',
      app_no_de: '',
      curef: '',
      id_customer: '',
      nama: '',
      jenis_kelamin: '',
      tanggal_lahir: '',
      tempat_lahir: '',
      status_perkawinan: '',
      agama: '',
      pendidikan: '',
      kewarganegaraan: '',
      nama_ibu_kandung: '',
      npwp: '',
      alamat_ktp: '',
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
      rt: '',
      rw: '',
      no_ktp: '',
      tanggal_terbit_ktp: '',
      tanggal_exp_ktp: '',
      no_handphone: '',
      nama_pasangan: '',
      jenis_kelamin_pasangan: '',
      tanggal_lahir_pasangan: '',
      tempat_lahir_pasangan: '',
      agama_pasangan: '',
      pendidikan_pasangan: '',
      kewarganegaraan_pasangan: '',
      nama_ibu_kandung_pasangan: '',
      npwp_pasangan: '',
      alamat_ktp_pasangan: '',
      provinsi_pasangan: '',
      kabkota_pasangan: '',
      kecamatan_pasangan: '',
      kelurahan_pasangan: '',
      kode_pos_pasangan: '',
      rt_pasangan: '',
      rw_pasangan: '',
      no_ktp_pasangan: '',
      tanggal_terbit_ktp_pasangan: '',
      tanggal_exp_ktp_pasangan: '',
      no_handphone_pasangan: '',
      alamat_domisili: '',
      provinsi_domisili: '',
      kabkota_domisili: '',
      kecamatan_domisili: '',
      kelurahan_domisili: '',
      kode_pos_domisili: '',
      rt_domisili: '',
      rw_domisili: '',
      jumlah_anak: '',
      status_rumah: '',
      lama_menetap: '',
      status_kendaraan: '',
      tipe_kendaraan: '',
      email: '',
      no_telepon: '',
      usia: '',
      usia_pasangan: '',
      kategori_pekerjaan: '',
      status_ktp: '',
      status_ktp_pasangan: '',
      email_pasangan: '',
      customer_created_date: '',
      customer_updated_date: '',
      kode_fasilitas: '',
      program_pembiayaan: '',
      produk_pembiayaan: '',
      status_aplikasi_desc: '',
      status_aplikasi: '',
      status_alamat: '',
      jangka_waktu: '',
      nilai_pembiayaan: '',
      kode_fasilitas_name: '',

      // Job
      total_pendapatan: '',
    });
  }

  load(): void {
    // ambil semua data Job by Curef
    this.dataEntryService.getFetchSemuaDataJob(this.curef).subscribe(Job => {
      this.fetchJob = Job.result;
      // this.getDataJob = Job.result
      // console.log("DAta "+ this.fetchJob[0].total_pendapatan)
      // this.fetchJob.forEach(element => {
      //   console.log("Element "+ element)
      //   this.getDataJob.push(element as Array<getJob>)
      // });
      // console.log("Objek "+ this.getDataJob.total_pendapatan)
    });

    // ambil semua data DE
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe(data => {
      this.dataEntry = data.result;
      console.log(this.dataEntry);
      let retriveStruktur = {
        id: this.dataEntry.id,
        app_no_ide: this.dataEntry.app_no_ide,
        app_no_de: this.dataEntry.app_no_de,
        curef: this.dataEntry.curef,
        id_customer: this.dataEntry.id_customer,
        nama: this.dataEntry.nama,
        jenis_kelamin: this.dataEntry.jenis_kelamin,
        tanggal_lahir: this.dataEntry.tanggal_lahir,
        tempat_lahir: this.dataEntry.tempat_lahir,
        status_perkawinan: this.dataEntry.status_perkawinan,
        agama: this.dataEntry.agama,
        pendidikan: this.dataEntry.pendidikan,
        kewarganegaraan: this.dataEntry.kewarganegaraan,
        nama_ibu_kandung: this.dataEntry.nama_ibu_kandung,
        npwp: this.dataEntry.npwp,
        alamat_ktp: this.dataEntry.alamat_ktp,
        provinsi: this.dataEntry.provinsi,
        kabkota: this.dataEntry.kabkota,
        kecamatan: this.dataEntry.kecamatan,
        kelurahan: this.dataEntry.kelurahan,
        kode_pos: this.dataEntry.kode_pos,
        rt: this.dataEntry.rt,
        rw: this.dataEntry.rw,
        no_ktp: this.dataEntry.no_ktp,
        tanggal_terbit_ktp: this.dataEntry.tanggal_terbit_ktp,
        tanggal_exp_ktp: this.dataEntry.tanggal_exp_ktp,
        no_handphone: this.dataEntry.no_handphone,
        nama_pasangan: this.dataEntry.nama_pasangan,
        jenis_kelamin_pasangan: this.dataEntry.jenis_kelamin_pasangan,
        tanggal_lahir_pasangan: this.dataEntry.tanggal_lahir_pasangan,
        tempat_lahir_pasangan: this.dataEntry.tempat_lahir_pasangan,
        agama_pasangan: this.dataEntry.agama_pasangan,
        pendidikan_pasangan: this.dataEntry.pendidikan_pasangan,
        kewarganegaraan_pasangan: this.dataEntry.kewarganegaraan_pasangan,
        nama_ibu_kandung_pasangan: this.dataEntry.nama_ibu_kandung_pasangan,
        npwp_pasangan: this.dataEntry.npwp_pasangan,
        alamat_ktp_pasangan: this.dataEntry.alamat_ktp_pasangan,
        provinsi_pasangan: this.dataEntry.provinsi_pasangan,
        kabkota_pasangan: this.dataEntry.kabkota_pasangan,
        kecamatan_pasangan: this.dataEntry.kecamatan_pasangan,
        kelurahan_pasangan: this.dataEntry.kelurahan_pasangan,
        kode_pos_pasangan: this.dataEntry.kode_pos_pasangan,
        rt_pasangan: this.dataEntry.rt_pasangan,
        rw_pasangan: this.dataEntry.rw_pasangan,
        no_ktp_pasangan: this.dataEntry.no_ktp_pasangan,
        tanggal_terbit_ktp_pasangan: this.dataEntry.tanggal_terbit_ktp_pasangan,
        tanggal_exp_ktp_pasangan: this.dataEntry.tanggal_exp_ktp_pasangan,
        no_handphone_pasangan: this.dataEntry.no_handphone_pasangan,
        alamat_domisili: this.dataEntry.alamat_domisili,
        provinsi_domisili: this.dataEntry.provinsi_domisili,
        kabkota_domisili: this.dataEntry.kabkota_domisili,
        kecamatan_domisili: this.dataEntry.kecamatan_domisili,
        kelurahan_domisili: this.dataEntry.kelurahan_domisili,
        kode_pos_domisili: this.dataEntry.kode_pos_domisili,
        rt_domisili: this.dataEntry.rt_domisili,
        rw_domisili: this.dataEntry.rw_domisili,
        jumlah_anak: this.dataEntry.jumlah_anak,
        status_rumah: this.dataEntry.status_rumah,
        lama_menetap: this.dataEntry.lama_menetap,
        status_kendaraan: this.dataEntry.status_kendaraan,
        tipe_kendaraan: this.dataEntry.tipe_kendaraan,
        email: this.dataEntry.email,
        no_telepon: this.dataEntry.no_telepon,
        usia: this.dataEntry.usia,
        usia_pasangan: this.dataEntry.usia_pasangan,
        kategori_pekerjaan: this.dataEntry.kategori_pekerjaan,
        status_ktp: this.dataEntry.status_ktp,
        status_ktp_pasangan: this.dataEntry.status_ktp_pasangan,
        email_pasangan: this.dataEntry.email_pasangan,
        customer_created_date: this.dataEntry.customer_created_date,
        customer_updated_date: this.dataEntry.customer_updated_date,
        kode_fasilitas: this.dataEntry.kode_fasilitas,
        program_pembiayaan: this.dataEntry.program_pembiayaan,
        produk_pembiayaan: this.dataEntry.produk_pembiayaan,
        status_aplikasi_desc: this.dataEntry.status_aplikasi_desc,
        status_aplikasi: this.dataEntry.status_aplikasi,
        status_alamat: this.dataEntry.status_alamat,
        jangka_waktu: this.dataEntry.jangka_waktu,
        nilai_pembiayaan: this.dataEntry.nilai_pembiayaan,
        kode_fasilitas_name: this.dataEntry.kode_fasilitas_name,

        // Job
        total_pendapatan: this.fetchJob[0].total_pendapatan,
      };
      this.strukturForm.setValue(retriveStruktur);
    });
  }
  onSubmit(): void {
    this.submitted = true;
    alert('Belum Di Tambah Validasi');
  }
  // pindah
  viewStruktur(): void {
    // alert(getAppNoDe);
    this.router.navigate(['/checklist-document'], { queryParams: { app_no_de: this.app_no_de, curef: this.curef } });
  }
}
