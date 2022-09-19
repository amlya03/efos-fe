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
import { SuratPersetujuanComponent } from './verification/surat-persetujuan/surat-persetujuan.component';
import { NgxEditorModule } from 'ngx-editor';
import { StukturPembiayaanComponent } from './verification/stuktur-pembiayaan/stuktur-pembiayaan.component';
import { ChecklistDocumentComponent } from './verification/checklist-document/checklist-document.component';

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
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
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
    SuratPersetujuanComponent,
    StukturPembiayaanComponent,
    ChecklistDocumentComponent,
  ],
  bootstrap: [
    MainComponent,
    DaftarAplikasiWaitingAssigmentComponent,
    DaftarAplikasiOnProcessComponent,
    DaftarAplikasiWaitingUpdateStatusComponent,
    DataCalonNasabahComponent,
    DataRumahComponent,
    DataKantorComponent,
  ],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
