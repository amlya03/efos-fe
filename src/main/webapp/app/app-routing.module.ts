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
import { SuratPersetujuanComponent } from './verification/surat-persetujuan/surat-persetujuan.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { JobInfoComponent } from './data-entry/job-info/job-info.component';
import { DataPasanganComponent } from './data-entry/data-pasangan/data-pasangan.component';
import { PekerjaanPasanganComponent } from './data-entry/pekerjaan-pasangan/pekerjaan-pasangan.component';
import { CollateralComponent } from './data-entry/collateral/collateral.component';
import { EmergencyContactComponent } from './data-entry/emergency-contact/emergency-contact.component';
import { CallReportComponent } from './data-entry/call-report/call-report.component';
import { CallReportNonComponent } from './data-entry/call-report-non/call-report-non.component';
import { MemoComponent } from './data-entry/memo/memo.component';
import { StrukturPembiayaanComponent } from './data-entry/struktur-pembiayaan/struktur-pembiayaan.component';
import { DaftarAplikasiIdeComponent } from './initial-data-entry/daftar-aplikasi-ide/daftar-aplikasi-ide.component';
import { DaftarAplikasiPilihComponent } from './initial-data-entry/daftar-aplikasi-pilih/daftar-aplikasi-pilih.component';
import { InitialDataEntryFixComponent } from './initial-data-entry/initial-data-entry-fix/initial-data-entry-fix.component';
import { InitialDataEntryNonComponent } from './initial-data-entry/initial-data-entry-non/initial-data-entry-non.component';
import { HasilPrescreeningComponent } from './initial-data-entry/hasil-prescreening/hasil-prescreening.component';
import { PersonalInfoComponent } from './data-entry/personal-info/personal-info.component';
import { InitialDataEntryFixEditComponent } from './initial-data-entry/initial-data-entry-fix-edit/initial-data-entry-fix-edit.component';
import { InitialDataEntryNonEditComponent } from './initial-data-entry/initial-data-entry-non-edit/initial-data-entry-non-edit.component';
import { VerificationComponent } from './verification/verification.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UploadDocumentDeComponent } from './upload-document/upload-document-de/upload-document-de.component';
import { UploadDocumentAgunanComponent } from './upload-document/upload-document-agunan/upload-document-agunan.component';
import { EditjobinfoComponent } from './data-entry/editjobinfo/editjobinfo.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: 'daftar-aplikasi-verification',
          component: VerificationComponent,
        },
        {
          path: 'daftar-aplikasi-waiting-assigment',
          component: DaftarAplikasiWaitingAssigmentComponent,
        },
        {
          path: 'daftar-aplikasi-on-process',
          component: DaftarAplikasiOnProcessComponent,
        },
        {
          path: 'daftar-aplikasi-waiting-update-status',
          component: DaftarAplikasiWaitingUpdateStatusComponent,
        },
        {
          path: 'data-calon-nasabah',
          component: DataCalonNasabahComponent,
        },
        {
          path: 'data-kantor',
          component: DataKantorComponent,
        },
        {
          path: 'analisa-keuangan',
          component: DataRumahComponent,
        },
        {
          path: 'mutasi-rekening',
          component: MutasiRekeningComponent,
        },
        {
          path: 'sturktur-pembiayaan',
          component: StukturPembiayaanComponent,
        },
        {
          path: 'checklist-document',
          component: ChecklistDocumentComponent,
        },
        {
          path: 'surat-persetujuan',
          component: SuratPersetujuanComponent,
        },
        {
          path: 'data-entry',
          component: DataEntryComponent,
        },
        {
          path: 'data-entry/personalinfo',
          component: PersonalInfoComponent,
        },
        {
          path: 'data-entry/job-info',
          component: JobInfoComponent,
        },
        {
          path: 'data-entry/data-pasangan',
          component: DataPasanganComponent,
        },
        {
          path: 'data-entry/pekerjaan-pasangan',
          component: PekerjaanPasanganComponent,
        },
        {
          path: 'data-entry/collateral',
          component: CollateralComponent,
        },
        {
          path: 'data-entry/struktur-pembiayaan',
          component: StrukturPembiayaanComponent,
        },
        {
          path: 'data-entry/emergency-contact',
          component: EmergencyContactComponent,
        },
        {
          path: 'data-entry/call-report',
          component: CallReportComponent,
        },
        {
          path: 'data-entry/call-report-non',
          component: CallReportNonComponent,
        },
        {
          path: 'data-entry/editjobinfo',
          component: EditjobinfoComponent,
        },
        {
          path: 'data-entry/memo',
          component: MemoComponent,
        },
        {
          path: 'daftaraplikasiide',
          component: DaftarAplikasiIdeComponent,
        },
        {
          path: 'daftaraplikasiidetambahide',
          component: DaftarAplikasiPilihComponent,
        },
        {
          path: 'initial-data-entryfix',
          component: InitialDataEntryFixComponent,
        },
        {
          path: 'initial-data-entrynon',
          component: InitialDataEntryNonComponent,
        },
        {
          path: 'hasilprescreening',
          component: HasilPrescreeningComponent,
        },
        {
          path: 'editidefix',
          component: InitialDataEntryFixEditComponent,
        },
        {
          path: 'editidenon',
          component: InitialDataEntryNonEditComponent,
        },

        {
          path: 'upload_document',
          component: UploadDocumentComponent,
        },
        {
          path: 'upload_document/upload_document_de',
          component: UploadDocumentDeComponent,
        },
        {
          path: 'upload_document/upload_document_agunan',
          component: UploadDocumentAgunanComponent,
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
