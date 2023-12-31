import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DaftarAplikasiWaitingAssigmentComponent } from './verification/daftar-aplikasi-waiting-assigment/daftar-aplikasi-waiting-assigment.component';
import { DaftarAplikasiOnProcessComponent } from './verification/daftar-aplikasi-on-process/daftar-aplikasi-on-process.component';
import { DaftarAplikasiWaitingUpdateStatusComponent } from './verification/daftar-aplikasi-waiting-update-status/daftar-aplikasi-waiting-update-status.component';
import { DataCalonNasabahComponent } from './verification/data-calon-nasabah/data-calon-nasabah.component';
import { DataKantorComponent } from './verification/data-kantor/data-kantor.component';
import { DataRumahComponent } from './verification/data-rumah/data-rumah.component';
import { StukturPembiayaanComponent } from './verification/stuktur-pembiayaan/stuktur-pembiayaan.component';
import { MutasiRekeningComponent } from './verification/mutasi-rekening/mutasi-rekening.component';
import { ChecklistDocumentComponent } from './verification/checklist-document/checklist-document.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { JobInfoComponent } from './data-entry/job-info/job-info.component';
import { DataPasanganComponent } from './data-entry/data-pasangan/data-pasangan.component';
import { PekerjaanPasanganComponent } from './data-entry/pekerjaan-pasangan/pekerjaan-pasangan.component';
import { CollateralComponent } from './data-entry/collateral/collateral.component';
import { EmergencyContactComponent } from './data-entry/emergency-contact/emergency-contact.component';
import { CallReportComponent } from './data-entry/call-report/call-report.component';
import { MemoComponent } from './data-entry/memo/memo.component';
import { StrukturPembiayaanComponent } from './data-entry/struktur-pembiayaan/struktur-pembiayaan.component';
import { DaftarAplikasiPilihComponent } from './initial-data-entry/daftar-aplikasi-pilih/daftar-aplikasi-pilih.component';
import { InitialDataEntryFixComponent } from './initial-data-entry/initial-data-entry-fix/initial-data-entry-fix.component';
import { HasilPrescreeningComponent } from './initial-data-entry/hasil-prescreening/hasil-prescreening.component';
import { PersonalInfoComponent } from './data-entry/personal-info/personal-info.component';
import { VerificationComponent } from './verification/verification.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UploadDocumentDeComponent } from './upload-document/upload-document-de/upload-document-de.component';
import { UploadDocumentAgunanComponent } from './upload-document/upload-document-agunan/upload-document-agunan.component';
import { EditjobinfoComponent } from './data-entry/editjobinfo/editjobinfo.component';
import { InitialDataEntryComponent } from './initial-data-entry/initial-data-entry.component';
import { CollateralEditComponent } from './data-entry/collateral-edit/collateral-edit.component';
import { SyaratPersetujuanComponent } from './verification/syarat-persetujuan/syarat-persetujuan.component';
import { KesimpulanComponent } from './verification/kesimpulan/kesimpulan.component';
import { MemoVerificationComponent } from './verification/memo-verification/memo-verification.component';
import { DaftarAplikasiIsiMapisComponent } from './verification/daftar-aplikasi-isi-mapis/daftar-aplikasi-isi-mapis.component';
import { MapisComponent } from './verification/daftar-aplikasi-isi-mapis/mapis/mapis.component';
import { InputScoringComponent } from './input-scoring/input-scoring.component';
import { KomiteComponent } from './komite/komite.component';
import { DetailKomiteComponent } from './komite/detail-komite/detail-komite.component';
import { HomeComponent } from './home/home.component';
import { ParameterizedComponent } from './parameterized/parameterized.component';
import { InputparameterscoringComponent } from './inputparameterscoring/inputparameterscoring.component';
import { NegativeListComponent } from './data-entry/memo/negative-list/negative-list.component';
import { HeadAppraisalComponent } from './verification/daftar-aplikasi-isi-mapis/head-appraisal/head-appraisal.component';
import { ParameterjobComponent } from './parameterized/parameterjob/parameterjob.component';
import { ParameteragunanComponent } from './parameterized/parameteragunan/parameteragunan.component';
import { ParameterstrukturComponent } from './parameterized/parameterstruktur/parameterstruktur.component';
import { ParameterprogramComponent } from './parameterized/parameterstruktur/parameterprogram/parameterprogram.component';
import { ParameterprodukComponent } from './parameterized/parameterstruktur/parameterproduk/parameterproduk.component';
import { ParameterskemaComponent } from './parameterized/parameterstruktur/parameterskema/parameterskema.component';
import { ParameterskemafasilitasComponent } from './parameterized/parameterstruktur/parameterskemafasilitas/parameterskemafasilitas.component';
import { ParametermarginfixComponent } from './parameterized/parameterstruktur/parametermarginfix/parametermarginfix.component';
import { ParametermarginstepupComponent } from './parameterized/parameterstruktur/parametermarginstepup/parametermarginstepup.component';
import { ParameterdeveloperComponent } from './parameterized/parameteragunan/parameterdeveloper/parameterdeveloper.component';
import { ParameterfasilitaslistrikComponent } from './parameterized/parameteragunan/parameterfasilitaslistrik/parameterfasilitaslistrik.component';
import { ParameterhubkepemilikanagunanComponent } from './parameterized/parameteragunan/parameterhubkepemilikanagunan/parameterhubkepemilikanagunan.component';
import { DaftarAplikasiAppraisalComponent } from './verification/daftar-aplikasi-isi-mapis/mapis/daftar-aplikasi-appraisal/daftar-aplikasi-appraisal.component';
import { ParameterjenisobjekagunanComponent } from './parameterized/parameteragunan/parameterjenisobjekagunan/parameterjenisobjekagunan.component';
import { ParameterftpdpComponent } from './parameterized/parameterstruktur/parameterftpdp/parameterftpdp.component';
import { ParameterjenispekerjaanComponent } from './parameterized/parameterjob/parameterjenispekerjaan/parameterjenispekerjaan.component';
import { DaftarAplikasiReviewSpvComponent } from './verification/daftar-aplikasi-review-spv/daftar-aplikasi-review-spv.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { InqueryDetailComponent } from './inquiry/inquirydetail/inquery-detail/inquery-detail.component';
import { ParameterftpdpdetailComponent } from './parameterized/parameterstruktur/parameterftpdpdetail/parameterftpdpdetail.component';
import { ParameterRacComponent } from './parameter-rac/parameter-rac.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN]
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
        },
        {
          path: 'daftar-aplikasi-verification',
          component: VerificationComponent
        },
        {
          path: 'daftar-aplikasi-waiting-assigment',
          component: DaftarAplikasiWaitingAssigmentComponent
        },
        {
          path: 'daftar-aplikasi-on-process',
          component: DaftarAplikasiOnProcessComponent
        },
        {
          path: 'daftar-review-spv1',
          component: DaftarAplikasiWaitingUpdateStatusComponent
        },
        {
          path: 'daftar-review-spv2',
          component: DaftarAplikasiReviewSpvComponent
        },
        {
          path: 'data-calon-nasabah',
          component: DataCalonNasabahComponent
        },
        {
          path: 'data-kantor',
          component: DataKantorComponent
        },
        {
          path: 'analisa-keuangan',
          component: DataRumahComponent
        },
        {
          path: 'mutasi-rekening',
          component: MutasiRekeningComponent
        },
        {
          path: 'sturktur-pembiayaan',
          component: StukturPembiayaanComponent
        },
        {
          path: 'checklist-document',
          component: ChecklistDocumentComponent
        },
        {
          path: 'syarat-persetujuan',
          component: SyaratPersetujuanComponent
        },
        {
          path: 'verification/memo',
          component: MemoVerificationComponent
        },
        {
          path: 'kesimpulan',
          component: KesimpulanComponent
        },
        {
          path: 'data-entry',
          component: DataEntryComponent
        },
        {
          path: 'data-entry/personalinfo',
          component: PersonalInfoComponent
        },
        {
          path: 'data-entry/job-info',
          component: JobInfoComponent
        },
        {
          path: 'data-entry/data-pasangan',
          component: DataPasanganComponent
        },
        {
          path: 'data-entry/pekerjaan-pasangan',
          component: PekerjaanPasanganComponent
        },
        {
          path: 'data-entry/collateral',
          component: CollateralComponent
        },
        {
          path: 'data-entry/struktur-pembiayaan',
          component: StrukturPembiayaanComponent
        },
        {
          path: 'data-entry/emergency-contact',
          component: EmergencyContactComponent
        },
        {
          path: 'data-entry/call-report',
          component: CallReportComponent
        },
        {
          path: 'data-entry/editjobinfo',
          component: EditjobinfoComponent
        },
        {
          path: 'data-entry/editcollateral',
          component: CollateralEditComponent
        },
        {
          path: 'data-entry/memo',
          component: MemoComponent
        },
        {
          path: 'daftaraplikasiide',
          component: InitialDataEntryComponent
        },
        {
          path: 'daftaraplikasiidetambahide',
          component: DaftarAplikasiPilihComponent
        },
        {
          path: 'initial-data-entryfix',
          component: InitialDataEntryFixComponent
        },
        {
          path: 'hasilprescreening',
          component: HasilPrescreeningComponent
        },
        {
          path: 'upload_document',
          component: UploadDocumentComponent
        },
        {
          path: 'upload_document/upload_document_de',
          component: UploadDocumentDeComponent
        },
        {
          path: 'upload_document/upload_document_agunan',
          component: UploadDocumentAgunanComponent
        },
        {
          path: 'ideCoba',
          component: InitialDataEntryComponent
        },
        {
          path: 'daftar_input_mapis',
          component: DaftarAplikasiIsiMapisComponent
        },
        {
          path: 'mapis',
          component: MapisComponent
        },
        {
          path: 'input-scoring-manual',
          component: InputScoringComponent
        },
        {
          path: 'komite',
          component: KomiteComponent
        },
        {
          path: 'komite/detail-komite',
          component: DetailKomiteComponent
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'parameterized',
          component: ParameterizedComponent
        },
        {
          path: 'parameterjob',
          component: ParameterjobComponent
        },
        {
          path: 'parameterjobjenispekerjaan',
          component: ParameterjenispekerjaanComponent
        },

        {
          path: 'parameteragunan',
          component: ParameteragunanComponent
        },
        {
          path: 'parameteragunandeveloper',
          component: ParameterdeveloperComponent
        },
        {
          path: 'parameteragunanfasilitaslistrik',
          component: ParameterfasilitaslistrikComponent
        },
        {
          path: 'parameteragunanhubkepemilikanagunan',
          component: ParameterhubkepemilikanagunanComponent
        },
        {
          path: 'parameteragunanjenisobjekagunan',
          component: ParameterjenisobjekagunanComponent
        },

        {
          path: 'parameterstruktur',
          component: ParameterstrukturComponent
        },
        {
          path: 'parameterstrukturprogram',
          component: ParameterprogramComponent
        },
        {
          path: 'parameterstrukturproduk',
          component: ParameterprodukComponent
        },
        {
          path: 'parameterstrukturskema',
          component: ParameterskemaComponent
        },
        {
          path: 'parameterstrukturskemafasilitas',
          component: ParameterskemafasilitasComponent
        },
        {
          path: 'parameterstrukturmarginfix',
          component: ParametermarginfixComponent
        },
        {
          path: 'parameterstrukturmarginstepup',
          component: ParametermarginstepupComponent
        },
        {
          path: 'parameterstrukturftpdp',
          component: ParameterftpdpComponent
        },
        {
          path: 'parameterstrukturftpdpdetail',
          component: ParameterftpdpdetailComponent
        },
        {
          path: 'main-parameter-scoring',
          component: InputparameterscoringComponent
        },
        {
          path: 'negative-list',
          component: NegativeListComponent
        },
        {
          path: 'head-appraisal',
          component: HeadAppraisalComponent
        },
        {
          path: 'daftar-aplikasi-appraisal',
          component: DaftarAplikasiAppraisalComponent
        },
        {
          path: 'inquiry',
          component: InquiryComponent
        },
        {
          path: 'inquiry-detail',
          component: InqueryDetailComponent
        },
        {
          path: 'parameter-rac',
          component: ParameterRacComponent
        },
        {
          path: '',
          // loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
          redirectTo: 'login',
          pathMatch: 'full'
        },
        navbarRoute,
        ...errorRoute
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppRoutingModule {}
