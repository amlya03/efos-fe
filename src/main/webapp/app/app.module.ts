import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/en';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import dayjs from 'dayjs/esm';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { TranslationModule } from 'app/shared/language/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DaftarAplikasiOnProcessComponent } from './verification/daftar-aplikasi-on-process/daftar-aplikasi-on-process.component';
import { DaftarAplikasiWaitingUpdateStatusComponent } from './verification/daftar-aplikasi-waiting-update-status/daftar-aplikasi-waiting-update-status.component';
import { DaftarAplikasiWaitingAssigmentComponent } from './verification/daftar-aplikasi-waiting-assigment/daftar-aplikasi-waiting-assigment.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataCalonNasabahComponent } from './verification/data-calon-nasabah/data-calon-nasabah.component';
import { DataRumahComponent } from './verification/data-rumah/data-rumah.component';
import { DataKantorComponent } from './verification/data-kantor/data-kantor.component';
import { MutasiRekeningComponent } from './verification/mutasi-rekening/mutasi-rekening.component';
import { NgxEditorModule } from 'ngx-editor';
import { StukturPembiayaanComponent } from './verification/stuktur-pembiayaan/stuktur-pembiayaan.component';
import { ChecklistDocumentComponent } from './verification/checklist-document/checklist-document.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { PersonalInfoComponent } from './data-entry/personal-info/personal-info.component';
import { JobInfoComponent } from './data-entry/job-info/job-info.component';
import { DataPasanganComponent } from './data-entry/data-pasangan/data-pasangan.component';
import { PekerjaanPasanganComponent } from './data-entry/pekerjaan-pasangan/pekerjaan-pasangan.component';
import { CollateralComponent } from './data-entry/collateral/collateral.component';
import { CallReportComponent } from './data-entry/call-report/call-report.component';
import { MemoComponent } from './data-entry/memo/memo.component';
import { EmergencyContactComponent } from './data-entry/emergency-contact/emergency-contact.component';
import { StrukturPembiayaanComponent } from './data-entry/struktur-pembiayaan/struktur-pembiayaan.component';
import { InitialDataEntryComponent } from './initial-data-entry/initial-data-entry.component';
import { HasilPrescreeningComponent } from './initial-data-entry/hasil-prescreening/hasil-prescreening.component';
import { DaftarAplikasiIdeComponent } from './initial-data-entry/daftar-aplikasi-ide/daftar-aplikasi-ide.component';
import { InitialDataEntryFixComponent } from './initial-data-entry/initial-data-entry-fix/initial-data-entry-fix.component';
import { InitialDataEntryNonComponent } from './initial-data-entry/initial-data-entry-non/initial-data-entry-non.component';
import { InitialDataEntryNonEditComponent } from './initial-data-entry/initial-data-entry-non-edit/initial-data-entry-non-edit.component';
import { InitialDataEntryFixEditComponent } from './initial-data-entry/initial-data-entry-fix-edit/initial-data-entry-fix-edit.component';
import { DaftarAplikasiPilihComponent } from './initial-data-entry/daftar-aplikasi-pilih/daftar-aplikasi-pilih.component';
import { VerificationComponent } from './verification/verification.component';
import { EditjobinfoComponent } from './data-entry/editjobinfo/editjobinfo.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UploadDocumentDeComponent } from './upload-document/upload-document-de/upload-document-de.component';
import { UploadDocumentAgunanComponent } from './upload-document/upload-document-agunan/upload-document-agunan.component';
import { CollateralEditComponent } from './data-entry/collateral-edit/collateral-edit.component';
import { SyaratPersetujuanComponent } from './verification/syarat-persetujuan/syarat-persetujuan.component';
import { KesimpulanComponent } from './verification/kesimpulan/kesimpulan.component';
import { MemoVerificationComponent } from './verification/memo-verification/memo-verification.component';
import { CurrencyPipe } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';
import { DaftarAplikasiIsiMapisComponent } from './verification/daftar-aplikasi-isi-mapis/daftar-aplikasi-isi-mapis.component';
import { MapisComponent } from './verification/daftar-aplikasi-isi-mapis/mapis/mapis.component';
import { InputScoringComponent } from './input-scoring/input-scoring.component';
import { KomiteComponent } from './komite/komite.component';
import { DetailKomiteComponent } from './komite/detail-komite/detail-komite.component';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    TranslationModule,
    DataTablesModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxEditorModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
    CurrencyPipe,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    DaftarAplikasiOnProcessComponent,
    DaftarAplikasiWaitingUpdateStatusComponent,
    DaftarAplikasiWaitingAssigmentComponent,
    DataCalonNasabahComponent,
    DataRumahComponent,
    DataKantorComponent,
    MutasiRekeningComponent,
    StukturPembiayaanComponent,
    ChecklistDocumentComponent,
    DataEntryComponent,
    PersonalInfoComponent,
    JobInfoComponent,
    DataPasanganComponent,
    PekerjaanPasanganComponent,
    CollateralComponent,
    CallReportComponent,
    MemoComponent,
    EmergencyContactComponent,
    StrukturPembiayaanComponent,
    InitialDataEntryComponent,
    HasilPrescreeningComponent,
    DaftarAplikasiIdeComponent,
    InitialDataEntryFixComponent,
    InitialDataEntryNonComponent,
    InitialDataEntryNonEditComponent,
    InitialDataEntryFixEditComponent,
    DaftarAplikasiPilihComponent,
    VerificationComponent,
    EditjobinfoComponent,
    UploadDocumentComponent,
    UploadDocumentDeComponent,
    UploadDocumentAgunanComponent,
    CollateralEditComponent,
    SyaratPersetujuanComponent,
    KesimpulanComponent,
    MemoVerificationComponent,
    DaftarAplikasiIsiMapisComponent,
    MapisComponent,
    InputScoringComponent,
    KomiteComponent,
    DetailKomiteComponent,
  ],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
